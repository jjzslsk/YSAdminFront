<template>
  <section class="app-container">
    <el-card class="box-card">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input size="mini" v-if="buttons.selectshow==true" v-model="filters.keyword" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-if="buttons.selectshow==true" type="primary" v-on:click="getUsers">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-if="buttons.addshow==true" type="primary" buttontag="add" @click="handleAdd">新增部门</el-button>
        </el-form-item>
        <el-form-item>
      <el-button type="danger" size="mini" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table @row-dblclick='Rowdblclick' stripe border :data="users" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="mingcheng" label="部门名称" width="120">
      </el-table-column>
      <el-table-column prop="shangjimingcheng" label="上级部门" width="120">
      </el-table-column>
      <el-table-column prop="paixu" label="排序" width="120">
      </el-table-column>
      <el-table-column prop="beizhu" label="备注" min-width="100">
      </el-table-column>
      <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true" label="操作" width="300">
        <template slot-scope="scope"><el-button size="mini" v-if="buttons.updateshow==true" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" v-if="buttons.delshow==true" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar"><el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    </el-card>

    <!--添加界面-->
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="部门名称:">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item>
        <el-form-item label="上级部门:">
          <el-select v-model="editForm.shangjiid" placeholder="请选择">
            <el-option v-for="item in departments" :key="item.mingcheng" :label="item.mingcheng" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisibleAdd=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>

        <!--编辑界面-->
    <el-dialog title="编辑菜单" :visible.sync="dialogFormVisibleAddEdit" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="部门名称:">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item>
        <el-form-item label="上级部门:">
          <el-select v-model="editForm.shangjiid" placeholder="请选择">
            <el-option v-for="item in departments" :key="item.mingcheng" :label="item.mingcheng" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisibleAdd=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>
  import store from '@/store/index.js'//引入本地存储
  import util from "@/utils/table.js";
  import {
    handlePost,
    handleGet
  } from "@/api/apihelper.js";
  import {
    paraHelper
  } from "@/utils/para.js"; //请求参数格式
import { Alert } from 'element-ui';

  export default {
    data() {
      return {
        bllCode: { //接口标识，由后端提供 
          add: 'AddDepartment', //新增
          edit: 'UpdateDepartment', //修改
          del: 'DelDepartment', //删除
          getList: 'GetListDepartment', //获取列表
          getObj: 'GetDepartment', //获取对象（单个）
          getRolesList: 'GetListRole' //获取角色
        },
        buttons: { //按钮去权限控制
          selectshow: false,
          addshow: false,
          updateshow: false,
          delshow: false
        },
        para: paraHelper,
        dialogStatus: "",
        dialogFormVisibleAdd: false, 
        dialogFormVisibleAddEdit: false, 

        filters: {
          keyword: ""
        },
        users: [],
        roles: [],
        total: 0,
        page: 1,
        sels: [], // 列表选中列
        editFormRules: {
          UserName: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }]
        },
        // 选中用户信息
        selectUserForm: {
          id: 0,
          mingcheng: "",
          shifouchaoguan: "",
          zhanghao: "",
          mima: "",
          zhenshixingming: "",
          youxiang: "",
          shifoushanchu: "",
          shifouqiyong: "",
          beizhu: ""
        },

        //查询条件
        selectData: {
          mingcheng: null,
          Page: 1,
          Size: 10
        },

        // 编辑界面数据
        editForm: {},

        departments: [],
        departmentsinfo:[],

        // 编辑界面数据
        RolesForm: {
          id: 0,
          mingcheng: "",
          shifouchaoguan: "",
          zhanghao: "",
          mima: "",
          zhenshixingming: "",
          youxiang: "",
          shifoushanchu: "",
          shifouqiyong: "",
          beizhu: ""
        },

        addFormVisible: false, // 新增界面是否显示
        addFormRules: {
          UserName: [{
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }]
        }
      };
    },
    methods: {
      //行点击事件
    Rowdblclick() {
      this.handleAdd();
    },
      //加载按钮
      loadButton(data){
        if(data&&data.length>0)
        {
          this.interfaces=data.map(item=>item.bllcode)
          this.buttons.addshow =this.interfaces.indexOf(this.bllCode.add)>0?true:false
          this.buttons.selectshow =this.interfaces.indexOf(this.bllCode.getList)>0?true:false
          this.buttons.updateshow =this.interfaces.indexOf(this.bllCode.edit)>0?true:false
          this.buttons.delshow =this.interfaces.indexOf(this.bllCode.del)>0?true:false
        }
      },
      // 超管显示转换
      formatIsAdmin: function (row, column) {
        return row.shifouchaoguan === 1 ? "是" : "否";
      },
      // 状态显示转换
      formatIsDisabled: function (row, column) {
        return row.shifouqiyong === 1 ? "禁用" : "启用";
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      // 获取用户列表
      getUsers() {
        const paraSelect = {
          mingcheng: this.filters.keyword,
          Page: this.page,
          Size: 10
        };
        this.para.Data = JSON.stringify(paraSelect);
        this.para.Code = this.bllCode.getList;
        handlePost(this.para)
          .then(res => {
            if (res.IsSuccess == true) {
              this.total = res.Data.Count;
              this.users = res.Data.List;
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 删除
      handleDel(index, row) {
        this.$confirm("确认删除该记录吗?", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "warning"
          })
          .then(() => {
            const paraId = {
              id: row.id
            };
            this.para.Data = JSON.stringify(paraId);
            this.para.Code = this.bllCode.del;
            handlePost(this.para)
              .then(res => {
                if (res.IsSuccess == true) {
                  this.getUsers(); //刷新列表
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 显示编辑界面
      handleEdit(index, row) {
        this.dialogStatus = "update";
        this.dialogFormVisibleAdd = true;
        this.editForm = Object.assign({}, row);
        this.para.Code = this.bllCode.getList;
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.departments = res.Data.List;
            let top={
                id:0,
                mingcheng:'无',
              }
            this.departments.push(top)
            this.para.Code = this.bllCode.getRolesList;
            }
        });
      },
      // 显示新增界面
      handleAdd() {
        this.dialogStatus = "create";
        this.dialogFormVisibleAdd = true;
        this.editForm = {};
        this.para.Code = this.bllCode.getList;
        this.para.Data = {}
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            console.log ('RES::',res)
            this.departments = res.Data.List;
            let top={
                id:0,
                mingcheng:'无',
              }
            this.departments.push(top)
            this.para.Code =this.bllCode.getRolesList;
            handlePost(this.para).then(res => {
            console.log ('RES1::',res)
              if (res.IsSuccess == true) {
                this.roles = res.Data.List;
                console.log(this.roles);
              }
            });
          }

        });
        console.log ('user::',this.user)
        console.log ('this.para::',this.para)
      },
      // 编辑
      updateData() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认修改该记录吗?", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "warning"
          })
              .then(() => {
                const paraObj = Object.assign({}, this.editForm);
                this.para.Data = JSON.stringify(paraObj);
                this.para.Code = this.bllCode.edit;
                handlePost(this.para)
                  .then(res => {
                    if (res.IsSuccess == true) {
                      this.$refs["editForm"].resetFields();
                      this.dialogFormVisibleAdd = false;

                      const paraSelect = {
                        mingcheng: this.filters.keyword,
                        Page: this.page,
                        Size: 10
                      };
                      this.para.Data = {}
                      this.para.Code = this.bllCode.getList;
                      handlePost(this.para)
                        .then(res => {
                          if (res.IsSuccess == true) {
                            this.total = res.Data.Count;
                            this.users = res.Data.List;
                          }
                        })


                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      // 新增
      createData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认新增吗?", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "warning"
          })
            .then(() => {
              const paraObj = Object.assign({}, this.editForm);
              this.para.Data = JSON.stringify(paraObj);
              this.para.Code =this.bllCode.add
              console.log(this.para);
              handlePost(this.para).then(res => {
                if (res.IsSuccess == true) {
                  this.$refs["editForm"].resetFields();
                  this.dialogFormVisibleAdd = false;
                  
                  const paraSelect = {
                        mingcheng: this.filters.keyword,
                        Page: this.page,
                        Size: 10
                      };
                      this.para.Data = {}
                      this.para.Code = this.bllCode.getList;
                      handlePost(this.para)
                        .then(res => {
                          if (res.IsSuccess == true) {
                            this.total = res.Data.Count;
                            this.users = res.Data.List;
                          }
                        })


                }
              });
            });
          }
        });
      },
      // 全选单选多选
      selsChange(sels) {
        this.sels = sels;
        console.log(sels);
      },
      // 批量删除
      batchRemove() {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm("确认删除选中记录吗？", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "warning"
          })
          .then(() => {
            const paraIds = {
              ids: ids
            };
            this.para.Data = JSON.stringify(paraObj);
            this.para.Code = this.bllCode.del;
            handlePost(this.para)
              .then(res => {
                if (res.IsSuccess == true) {
                  this.getUsers(); //刷新列表
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    mounted() {
      this.loadButton(store.getters.interfaces)//按权限加载按钮
      this.getUsers();
    }
  };

</script>

<style scoped>
</style>
