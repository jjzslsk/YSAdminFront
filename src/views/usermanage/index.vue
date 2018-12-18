<template>
  <section class="app-container">
    <el-card class="box-card">

    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input size="mini" v-if="buttons.selectshow==true" v-model="filters.name" :placeholder="filtersName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">{{button.query}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-if="buttons.addshow==true" type="primary" @click="handleAdd">{{button.add}}</el-button>
        </el-form-item>
        <el-form-item>
      <el-button type="danger" size="mini" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!-- 部门树形 -->
  <el-col style="height:100%" :span="4">
  <el-card class="box-card">
  <!-- <div slot="header" class="clearfix">
    <el-input
      placeholder="快速查找部门"
      v-model="filterText">
    </el-input>
    <el-button style="float: right; padding: 3px 0" type="text"></el-button>
  </div> -->
  <div class="text item">
    <el-tree
      class="filter-tree"
      :data="menus"
      :props="defaultProps"
      default-expand-all
      node-key="value"
      :highlight-current='true'
      :filter-node-method="filterNode"
      @node-click='changeClick'
      ref="tree2">
    </el-tree>
  </div>
  {{data9}}
</el-card>

    </el-col>
    <el-col :span="20">
    <el-table border @row-dblclick='Rowdblclick' :data="users" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="mingcheng" label="名称" width="120">
      </el-table-column>
      <el-table-column prop="zhanghao" label="账号" width="120">
      </el-table-column>
      <el-table-column prop="zhenshixingming" label="真实姓名" width="120">
      </el-table-column>
      <el-table-column prop="bumenmingcheng" label="部门名称" width="120">
      </el-table-column>
      <el-table-column prop="juesemingcheng" label="角色名称" width="120">
      </el-table-column>
      <el-table-column prop="youxiang" label="邮箱" width="120">
      </el-table-column>
      <el-table-column prop="shoujihaoma" label="手机" width="120">
      </el-table-column>
      <el-table-column prop="shifouchaoguan" label="是否超管" width="100" :formatter="formatIsAdmin">
      </el-table-column>
      <el-table-column prop="chuangjianriqi" label="是否启用" min-width="100" :formatter="formatIsDisabled">
      </el-table-column>
      <el-table-column prop="beizhu" label="备注" min-width="100">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope"><el-button size="mini" v-if="buttons.updateshow==true" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" v-if="buttons.delshow==true" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    </el-col>



    <!--列表-->
    <!-- <el-table @row-dblclick='Rowdblclick' :data="users" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="mingcheng" label="名称" width="120">
      </el-table-column>
      <el-table-column prop="zhanghao" label="账号" width="120">
      </el-table-column>
      <el-table-column prop="zhenshixingming" label="真实姓名" width="120">
      </el-table-column>
      <el-table-column prop="bumenmingcheng" label="部门名称" width="120">
      </el-table-column>
      <el-table-column prop="juesemingcheng" label="角色名称" width="120">
      </el-table-column>
      <el-table-column prop="youxiang" label="邮箱" width="120">
      </el-table-column>
      <el-table-column prop="shoujihaoma" label="手机" width="120">
      </el-table-column>
      <el-table-column prop="shifouchaoguan" label="是否超管" width="100" :formatter="formatIsAdmin">
      </el-table-column>
      <el-table-column prop="chuangjianriqi" label="是否启用" min-width="100" :formatter="formatIsDisabled">
      </el-table-column>
      <el-table-column prop="beizhu" label="备注" min-width="100">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope"><el-button size="mini" v-if="buttons.updateshow==true" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" v-if="buttons.delshow==true" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <!--工具条-->
    <el-col :span="24" class="toolbar"><el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    </el-card>

    <!--添加界面-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称:" prop="mingcheng">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="zhanghao">
          <el-input v-model="editForm.zhanghao" auto-complete="off" :disabled="disabledZhangHao" placeholder="设置后不可更改"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="mima">
          <el-input type="password" :disabled="disabledMima" v-model="editForm.mima" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="zhenshixingming">
          <el-input v-model="editForm.zhenshixingming" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="shoujihaoma">
          <el-input v-model="editForm.shoujihaoma"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否超管:" prop="shifouchaoguan">
          <el-radio-group v-model="editForm.shifouchaoguan">
            <el-radio class="radio" :label='true'>是</el-radio>
            <el-radio class="radio" :label='false'>否</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="是否启用:" prop="shifouqiyong">
          <el-radio-group v-model="editForm.shifouqiyong">
            <el-radio class="radio" :label='true'>启用</el-radio>
            <el-radio class="radio" :label='false'>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="邮箱:" prop="youxiang" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="editForm.youxiang"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
        <el-form-item label="部门:">
                        <el-select v-model="editForm.bumen" placeholder="请选择">
                            <el-option v-for="item in departments" :key="item.mingcheng" :label="item.mingcheng" :value="item.id">
                              {{item.mingcheng}}</el-option>
                        </el-select>
                    </el-form-item>
          </el-col>
          <el-col :span="12">
                    <el-form-item label="角色:">
                        <el-select v-model="editForm.juese" placeholder="请选择">
                            <el-option v-for="item in roles" :key="item.id" :label="item.juesemingcheng" :value="item.id">
                              {{item.juesemingcheng}}</el-option>
                        </el-select>
                    </el-form-item>
          </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisibleAdd=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleAddEdit" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称:" prop="mingcheng">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="zhanghao">
          <el-input v-model="editForm.zhanghao" auto-complete="off" :disabled="disabledZhangHao" placeholder="设置后不可更改"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="mima">
          <el-input type="password" :disabled="disabledMima" v-model="editForm.mima" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:" prop="zhenshixingming">
          <el-input v-model="editForm.zhenshixingming" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机:" prop="shoujihaoma" :rules="[{ type: 'number', message: '手机号码格式不正确'}]">
          <el-input v-model="editForm.shoujihaoma"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否超管:" prop="shifouchaoguan">
          <el-radio-group v-model="editForm.shifouchaoguan">
            <el-radio class="radio" :label='true'>是</el-radio>
            <el-radio class="radio" :label='false'>否</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="是否启用:" prop="shifouqiyong">
          <el-radio-group v-model="editForm.shifouqiyong">
            <el-radio class="radio" :label='true'>启用</el-radio>
            <el-radio class="radio" :label='false'>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="邮箱:" prop="youxiang" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="editForm.youxiang"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
        <el-form-item label="部门:" prop="bumen">
                        <el-select v-model="editForm.bumen" placeholder="请选择">
                            <el-option v-for="item in departments" :key="item.mingcheng" :label="item.mingcheng" :value="item.id">
                              {{item.mingcheng}}</el-option>
                        </el-select>
                    </el-form-item>
          </el-col>
          <el-col :span="12">
                    <el-form-item label="角色:" prop="juese">
                        <el-select v-model="editForm.juese" placeholder="请选择">
                            <el-option v-for="item in roles" :key="item.id" :label="item.juesemingcheng" :value="item.id">
                              {{item.juesemingcheng}}</el-option>
                        </el-select>
                    </el-form-item>
          </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisibleAddEdit=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>


  </section>
</template>

<script>
import store from "@/store/index.js"; //引入本地存储
import util from "@/utils/table.js";
import { handlePost, handleGet } from "@/api/apihelper.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式

export default {
  data() {
    return {
      data9:null,
      TreeData: [
        {
          label: "所有部门",
          children: [
            {
              // label: this.departments.departments,
            }
          ]
        },
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      filterText: "",

      bllCode: {
        //接口标识，由后端提供
        add: "AddAdmin", //新增
        edit: "UpdateAdmin", //修改
        del: "DelAdmin", //删除
        getList: "GetListAdmin", //获取列表
        getObj: "GetSource", //获取对象（单个）
        getRolesList: "GetListRole", //获取角色
        getListDepartment: "GetListDepartment", //获取角色
        GetTreeDepartment: "GetTreeDepartment" //获取部门树
      },
      filtersName: "用户名称",
      button: {
        query: "查询",
        add: "添加",
        batchRemove: "批量删除"
      },
      buttons: {
        //按钮去权限控制
        selectshow: false,
        addshow: false,
        updateshow: false,
        delshow: false
      },
      // shifouchaoguan: false,
      // shifouqiyong: true,
      disabledZhangHao: false,
      disabledMima: false,
      para: paraHelper,
      dialogStatus: "",
      dialogFormVisibleAdd: false,
      dialogFormVisibleAddEdit: false,
      filters: {
        name: ""
      },
      users: [],
      roles: [],
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        mingcheng: [
          {
            required: true,
            message: "名称必填",
            trigger: "blur"
          }
        ],
        zhanghao: [
          {
            required: true,
            message: "账号必填",
            trigger: "blur"
          }
        ],
        mima: [
          {
            required: true,
            message: "密码必填",
            trigger: "blur"
          }
        ],
        zhenshixingming: [
          {
            required: true,
            message: "真实姓名必填",
            trigger: "blur"
          }
        ],
        youxiang: [
          {
            type: "email",
            required: false,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        shoujihaoma: [
          {
            required: true,
            message: "手机必填",
            trigger: "blur"
          }
          // {
          //   type: "number",
          //   message: "手机号码格式不正确",
          //   trigger: ["blur", "change"]
          // }
        ]
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
      // 编辑界面数据
      editForm: {
        // juesemingcheng: "",
        // bumen: "",
        // id: "",
        // mingcheng: "",
        // shifouchaoguan: "",
        // zhanghao: "",
        // mima: "",
        // zhenshixingming: "",
        // youxiang: "",
        // shifoushanchu: "",
        // shifouqiyong: "",
        // beizhu: ""
      },

      departments: [],
      menus: [], //菜单列表


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
        UserName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    nodeClick(data9){
      // console.log ('vaaaaaaaaaaaaaaa',data9)      
    },
    changeClick(data){
      console.log(data);
      },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      console.log(data);
    },
    //行点击事件
    Rowdblclick() {
      this.handleAdd();
    },
    //加载按钮
    loadButton(data) {
      if (data && data.length > 0) {
        this.interfaces = data.map(item => item.bllcode);
        this.buttons.addshow =
          this.interfaces.indexOf(this.bllCode.add) > 0 ? true : false;
        this.buttons.selectshow =
          this.interfaces.indexOf(this.bllCode.getList) > 0 ? true : false;
        this.buttons.updateshow =
          this.interfaces.indexOf(this.bllCode.edit) > 0 ? true : false;
        this.buttons.delshow =
          this.interfaces.indexOf(this.bllCode.del) > 0 ? true : false;
      }
    },
    // 超管显示转换
    formatIsAdmin: function(row, column) {
      return row.shifouchaoguan === true ? "是" : "否";
    },
    // 状态显示转换
    formatIsDisabled: function(row, column) {
      return row.shifouqiyong === false ? "禁用" : "启用";
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    //查询
    getKeyList() {
      this.page = 1;
      this.getDataList();
    },
    // 获取用户列表
    getDataList() {
      const paraSelect = {
        mingcheng: this.filters.name,
        Page: this.page,
        Size: 10
      };
      this.para.Code = this.bllCode.getList;
      this.para.Data = JSON.stringify(paraSelect);
      handlePost(this.para)
        .then(res => {
          if (res.IsSuccess == true) {
            this.total = res.Data.Count;
            this.users = res.Data.List;
          }
          console.log("userslist:", this.users);
          this.para.Data = "";
          this.para.Code = this.bllCode.getListDepartment;
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.departments = res.Data.List;
              console.log("departments111111:", this.departments);
              this.para.Code = this.bllCode.getRolesList;
              handlePost(this.para).then(res => {
                if (res.IsSuccess == true) {
                  this.roles = res.Data.List;
                  console.log("roles:", this.roles);
                }
              });
              // 获取部门树
            this.para.Code = this.bllCode.GetTreeDepartment;
            this.para.Data = '';
            handlePost(this.para)
              .then(res => {
                if (res.IsSuccess == true) {
                  this.menus = res.Data;
                  // this.total = res.Data.Count;
                  // this.users = res.Data.List;
                }
              })
            }
          });
        })
        .catch(err => {
          console.log(err);
        });

        
       

    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const paraId = {
            id: row.id
          };
          this.para.Code = this.bllCode.del;
          this.para.Data = JSON.stringify(paraId);
          handlePost(this.para)
            .then(res => {
              if (res.IsSuccess == true) {
                this.getDataList();
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
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
      this.dialogFormVisibleAddEdit = true;
      this.disabledZhangHao = true;
      this.disabledMima = true;
      this.editForm = Object.assign({}, row);
      this.para.Data = "";
      this.para.Code = this.bllCode.getListDepartment;
      console.log(this.para);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.departments = res.Data.List;
          this.para.Code = this.bllCode.getRolesList;
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.roles = res.Data.List;
            }
          });
        }
      });
    },
    // 显示新增界面
    handleAdd() {
      this.dialogStatus = "create";
      this.dialogFormVisibleAdd = true;
      this.editForm = {
        shifouchaoguan: true,
        shifouqiyong: true
      };
      this.para.Code = this.bllCode.getListDepartment;
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.departments = res.Data.List;
          // console.log(this.departments);
          this.para.Code = this.bllCode.getRolesList;
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.roles = res.Data.List;
              // console.log(this.roles);
            }
          });
        }
      });
    },
    // 编辑
    updateData() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              // Vue.delete(this.editForm,'zhanghao')
              const paraObj = Object.assign({}, this.editForm);
              this.para.Data = JSON.stringify(paraObj);
              this.para.Code = this.bllCode.edit;
              handlePost(this.para)
                .then(res => {
                  if (res.IsSuccess == true) {
                    this.$refs["editForm"].resetFields();
                    this.dialogFormVisibleAdd = false;
                    this.getDataList(); //刷新列表
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
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            // console.log (this.para)

            // this.editForm.KeyId = (parseInt(Math.random() * 100)).toString() // mock a id
            const paraObj = Object.assign({}, this.editForm);
            // console.log (paraObj)
            this.para.Data = JSON.stringify(paraObj);
            this.para.Code = this.bllCode.add;
            console.log(this.para);
            handlePost(this.para).then(res => {
              if (res.IsSuccess == true) {
                this.$refs["editForm"].resetFields();
                this.dialogFormVisibleAdd = false;
                this.getDataList();
                this.$message({
                  message: "添加成功！",
                  type: "success"
                });
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
      var ids = this.sels.map(item => item.id);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const paraId = {
            ids: ids
          };
          this.para.Data = JSON.stringify(paraId);
          this.para.Code = this.bllCode.del;
          handlePost(this.para)
            .then(res => {
              if (res.IsSuccess == true) {
                this.getDataList();
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
              } else {
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
    this.loadButton(store.getters.interfaces); //按权限加载按钮
    this.getDataList();
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
/* .el-card__header{
    padding: 12px 14px;
} */
.box-card {
  /* width: 480px; */
  /* height: 40.625rem; */
}
</style>
