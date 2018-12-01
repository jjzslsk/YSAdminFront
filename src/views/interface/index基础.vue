<template>
  <section class="app-container sectionBox">


    <!--左侧工具按钮-->
    <div class="toolBox">
      <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;line-height:40px">
        <el-form :inline="true" :model="filters" label-position label-width="120px" @submit.native.prevent>
          <div style="float: left;">
            <el-form-item>
              <el-button size="mini" v-if="ObjButton.query.isShow==true" icon="el-icon-refresh" type="info" v-on:click="Refresh"></el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" icon="el-icon-zoom-in" v-if="ObjButton.query.isShow==true" type="primary"
                v-on:click="elCard">{{ObjButton.query.text}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" icon="el-icon-plus" v-if="this.ObjButton.add.isShow==true" type="primary" @click="handleAdd">{{ObjButton.add.text}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" icon="el-icon-delete" size="mini" v-if="ObjButton.del.isShow==true" @click="manyDel"
                :disabled="this.sels.length===0">{{ObjButton.manyDel.text}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="info" icon="el-icon-setting" size="mini" v-if="ObjButton.del.isShow==true" :disabled="this.sels.length===0">更多</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" icon="el-icon-more" v-if="this.ObjButton.add.isShow==true" type="success" @click="getKeyLists">全部显示</el-button>
            </el-form-item>
          </div>

          <!-- 右侧工具按钮 -->
          <div style="position: relative;float: right;top: .6rem;">
            <el-button-group>

              <el-dropdown trigger="click">
              <span class="el-dropdown-link">
              <el-tooltip class="item" effect="light" content="列" placement="top">
              <el-button type="primary" size="mini" icon="el-icon-menu"></el-button>
              </el-tooltip>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox v-for="item in tableLabel" :key="item.Label" :label="item.Label">{{item.Label}}</el-checkbox>
                </el-checkbox-group>
              </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown trigger="click">
              <span class="el-dropdown-link">
              <el-tooltip class="item" effect="light" content="导出数据" placement="top">
              <el-button type="primary" size="mini" icon="el-icon-download"></el-button>
              </el-tooltip>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>JSON</el-dropdown-item>
                <el-dropdown-item>XML</el-dropdown-item>
                <el-dropdown-item>CSV</el-dropdown-item>
                <el-dropdown-item>TXT</el-dropdown-item>
                <el-dropdown-item>MS-Word</el-dropdown-item>
                <el-dropdown-item>MS-Excel</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            </el-button-group>

          </div>
        </el-form>
      </el-col>
    </div>

        <!-- 字段搜索# -->
        
            <!-- 搜索筛选 -->
    <el-card class="box-card box-cardBox" v-if="elCardBox">
      <el-row>
        <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;">
          <el-form :model="filters" ref="filters" :inline="true" label-position label-width="120px"
            @submit.native.prevent>
            <el-form-item :label="formRemove.jiekoumingcheng.text" prop="jiekoumingcheng">
              <el-input style="width: 180px;" size="small" v-model="filters.jiekoumingcheng"
                :placeholder="formRemove.jiekoumingcheng.text"></el-input>
            </el-form-item>
            <el-form-item size="small">
              <el-button size="mini" type="primary" v-on:click="getDataList">确定</el-button>
              <el-button size="mini" type="" @click="resetForm('filters')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <!--列表-->
    <el-table class="tablesSyl" fit @row-dblclick="Rowdblclick" stripe border :data="dataList" highlight-current-row
      @selection-change="selsChange">

      <!-- 列表# -->
      <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop"
        :type='item.type'>
      </el-table-column>

      <el-table-column v-if="ObjButton.edit.isShow==true||ObjButton.del.isShow==true" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-edit" type="primary" v-if="ObjButton.query.isShow==true"
            @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-delete" type="danger" v-if="ObjButton.del.isShow==true"
            @click="handleDel(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" background :page-size="15" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    <!--添加界面-->
    <el-dialog title="添加" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">

      <el-tabs type="border-card">
        <el-tab-pane label="添加接口">
          <el-form :model="editForm" label-width="100px"  ref="editForm">
            <el-form-item label="接口名称" prop="jiekoumingcheng">
              <el-input v-model="editForm.jiekoumingcheng" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="接口标识" prop="bllcode">
              <el-input v-model="editForm.bllcode" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item hidden=true label="是否验证">
              <el-radio-group v-model="editForm.shifouyanzheng">
                <el-radio class="radio" :label=true>是</el-radio>
                <el-radio class="radio" :label=false>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否管理后台">
              <el-radio-group v-model="editForm.shifouguanlihoutai">
                <el-radio class="radio" :label=true>是</el-radio>
                <el-radio class="radio" :label=false>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否需要登录">
              <el-radio-group v-model="editForm.shifouxuyaodenglu">
                <el-radio class="radio" :label=true>是</el-radio>
                <el-radio class="radio" :label=false>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单关联">
              <el-select v-model="editForm.caidanguanlian" placeholder="请选择">
                <el-option v-for="item in options" :key="item.id" :label="item" :value="item">{{item}}
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="editForm.shifouqiyong">
                <el-radio class="radio" :label=true>是</el-radio>
                <el-radio class="radio" :label=false>否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="editForm.beizhu"></el-input>
            </el-form-item>
            <el-form-item label="">
              <el-button size="mini" @click.native="dialogFormVisibleAdd=false">取消</el-button>
              <el-button size="mini" type="primary" @click="createData">添加</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!--编辑界面 -->
    <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit" :close-on-click-modal="false">
      <el-form :model="getDataForm" label-width="100px"  ref="getDataForm">
        <el-form-item label="接口名称" prop="jiekoumingcheng">
          <el-input v-model="getDataForm.jiekoumingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="接口标识" prop="bllcode">
          <el-input v-model="getDataForm.bllcode" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item hidden=true label="是否验证">
          <el-radio-group v-model="getDataForm.shifouyanzheng">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否管理后台">
          <el-radio-group v-model="getDataForm.shifouguanlihoutai">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否需要登录">
          <el-radio-group v-model="getDataForm.shifouxuyaodenglu">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单关联">
          <el-select v-model="getDataForm.caidanguanlian" placeholder="请选择">
            <el-option v-for="item in options" :key="item.id" :label="item" :value="item">{{item}}
                </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="getDataForm.shifouqiyong">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="getDataForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleEdit=false">取消</el-button>
        <el-button size="mini" type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  import store from "@/store/index.js"; //引入本地存储
  import {paraHelper} from "@/utils/para.js"; //请求参数格式
  import {handlePost,handleGet} from "@/api/apihelper.js"; //统一操作api

  export default {
    data() {
      return {
      //==================数据定义===========================
        //字段name code 

        //添加 模型
        editForm: {}, 
        //修改 模型
        getDataForm:{},
        //搜索 模型
        filters: {
          Page: 1,
          Size: 15,
        },

        //分页 列表 
        total: 0, //分页
        dataList: [], //列表数据
        sels: [], // 列表选中列 全选
        currentRow: null, //双击编辑 存列表数据
        tableLabel: [ //列表数组
          {
            type: "selection",
          },
          {
            Label: "接口名称",
            prop: "jiekoumingcheng",
          },
        ],

        //控制模块显示隐藏
        elCardBox: false, //搜索模块显示隐藏
        dialogFormVisibleAdd: false, //控制添加显示
        dialogFormVisibleEdit: false, //控制编辑显示
        para: paraHelper, //交互格式
        options:[0],
        checkList:{},

        //权限
        interfaces: null, //初始值

      //===================按钮定义==========================
        ObjButton: {

          add: {
            text: '添加', //按钮文字
            Code: 'AddInterface',
            isShow: false, //是否显示
          },
          query: {
            text: '查询',
            Code: 'GetListInterface',
            isShow: false,
          },
          details:{
            text:'详情',
            Code:'GetInterface'//获取单条数据
          },
          edit: {
            text: '编辑',
            Code: 'UpdateInterface',
            isShow: false,
          },
          del: {
            text: '删除',
            Code: 'DelInterface',
            isShow: false,
          },
          manyDel: {
            text: '批量删除',
            Code: 'DelInterface',
            isShow: false,
          },
        },
      //===================搜索定义==========================
        formRemove: {
          jiekoumingcheng: {
            text: '接口名称', //搜索标题
            tips: '接口名称', //搜索提示
            isShow: false,
          },
        },
      };
    },

  //===================js方法==========================
  //===================初始化 ==========================
    //初始化方法
    mounted() {
      this.Init()
    },
    methods: {
      Init(){//初始化方法执行
        this.loadButton(store.getters.interfaces); //权限控制 按钮显示隐藏
        this.getDataList(); //获取列表
      },
    //===================数据展示==========================
      //加载按钮
      loadButton(data) {
        if (data && data.length > 0) {
          this.interfaces = data.map(item => item.bllcode);
          this.ObjButton.add.isShow =
            this.interfaces.indexOf(this.ObjButton.add.Code) > 0 ? true : false;
          this.ObjButton.query.isShow =
            this.interfaces.indexOf(this.ObjButton.query.Code) > 0 ? true : false;
          this.ObjButton.edit.isShow =
            this.interfaces.indexOf(this.ObjButton.edit.Code) > 0 ? true : false;
          this.ObjButton.del.isShow =
            this.interfaces.indexOf(this.ObjButton.del.Code) > 0 ? true : false;
        }
      },
  //===================界面展示==========================
      //点击编辑按钮,显示编辑
      handleEdit(index, row) {
        this.getInfoData(row.id)
        this.dialogFormVisibleEdit = true;
        this.$refs["getDataForm"].resetFields(); //重置getDataForm     
      },
      //双击列表,显示编辑
      Rowdblclick(val) {
        this.getInfoData(val.id)
        this.dialogFormVisibleEdit = true;
        this.$refs["getDataForm"].resetFields(); //重置getDataForm  
      },
      // 显示添加界面
      handleAdd() {
        this.editForm = {};
        this.dialogFormVisibleAdd = true;
        this.editForm = {
          shifouyanzheng: true,
          shifouxuyaodenglu: true,
          shifouguanlihoutai: true,
          caidanguanlian: 0,
          shifouqiyong: true,
        };
      },
      //搜索显示隐藏
      elCard() {
        if (this.elCardBox == false) {
          this.elCardBox = true;
        } else {
          this.elCardBox = false;
        }
      },
  //===================增==========================
      // 添加
      createData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
              .then(() => {
                this.editForm.id = parseInt(Math.random() * 100).toString(); // mock a id
                const paraForm = Object.assign({}, this.editForm);
                this.para.Data = JSON.stringify(paraForm);
                this.para.Code = this.ObjButton.add.Code;
                handlePost(this.para)
                  .then(res => {
                    if (res.IsSuccess == true) {
                      this.$refs["editForm"].resetFields();
                      this.dialogFormVisibleAdd = false;
                      this.getDataList();
                      this.$message({
                        message: "添加成功！",
                        type: "success"
                      });
                    } else {
                      this.$message({
                        message: res.Code + ':' + res.Message,
                        type: "warning"
                      });
                    }
                  })
              })
          }
        });
      },
  //===================删==========================
      //删除
      del(val){
          this.$confirm("确认删除该记录吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.para.Code = this.ObjButton.del.Code;
          this.para.Data = JSON.stringify(val);
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.getDataList();
              this.$message({
                message: "删除成功！",
                type: "success"
              });
            }
            else
            {
              this.$message({
                      message: res.Code + ':' + res.Message,
                      type: "warning"
                    });
            }
          });
        })
      },
      // 单条记录删除
      handleDel(index, row) {
          const paraId = {id: row.id};
          this.del(paraId)
      },
      // 批量删除
      manyDel() {
        var ids = this.sels.map(item => item.id);
        const paraId = {ids: ids};
        this.del(paraId)
      },
  //===================查==========================
      // 获取列表
      getDataList() {
        this.para.Code = this.ObjButton.query.Code;
        this.para.Data = JSON.stringify(this.filters);
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.total = res.Data.Count;
            this.dataList = res.Data.List;
          }
          else
          {
           this.$message({
                        message: res.Code + ':' + res.Message,
                        type: "warning"
                      });
          }
        });
      },
      //获取单条数据
      getInfoData(val) {
        const paraId = {
          id: val
        };
        this.para.Code = this.ObjButton.details.Code;
        this.para.Data = JSON.stringify(paraId);
        handlePost(this.para)
          .then(res => {
            if (res.IsSuccess == true) {
              this.getDataForm = res.Data;
            }
              else {
                this.$message({
                message: res.Code + ':' + res.Message,
                type: "warning"
              });
            }
          })
      },
      //显示所有列表
      getKeyLists() {
       this.filters = {
            Page: 1,
            Size: 0,
          },
          this.getDataList()
      },
      //刷新页面
      Refresh() {
        this.filters = {
            Page: 1,
            Size: 15
          },
          this.getDataList()
      },
      //分页查询
      handleCurrentChange(val) {
        this.filters.Page = val;
        this.getDataList();
      },
  //===================改==========================
      // 更新
      updateData() {
        this.$refs.getDataForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
              .then(() => {
                const paraInfo = Object.assign({}, this.getDataForm);
                this.para.Code = this.ObjButton.edit.Code;
                this.para.Data = JSON.stringify(paraInfo);
                handlePost(this.para)
                  .then(res => {
                    if (res.IsSuccess == true) {
                      this.$refs["getDataForm"].resetFields(); //重置getDataForm
                      this.dialogFormVisibleEdit = false;
                      this.getDataList();
                      this.$message({
                        message: "修改成功！",
                        type: "success"
                      });
                    } else {
                      this.$refs["getDataForm"].resetFields();
                      this.$message({
                        message: res.Code + ':' + res.Message,
                        type: "warning"
                      });
                      this.dialogFormVisibleEdit = false;
                    }
                  })
              })
          }
        });
      },
  //===================操作类==========================
      //重置表单
      resetForm(formName) {
        this.$refs["filters"].resetFields();
      },
      // 全选单选多选
      selsChange(sels) {
        this.sels = sels;
      },
    },
  };

</script>

<style scoped>
  .box-cardBox {
    background: #e8edf0;
  }

  .panel-heading {
    padding: 15px;
    background: #e8edf0;
    border-color: #e8edf0;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
  }

  .panel-lead {
    /* margin-bottom: 15px; */
  }

  .panel-lead em {
    font-weight: bold;
    font-size: 14px;
    display: block;
  }

  .panel-lead span {
    color: #666;
    font-size: 14px;
  }

  .toolBox {
    background: #fff;
    /* min-height: 3.6rem; */
  }

  .el-form-item {
    margin-bottom: 0px;
  }

  .tablesSyl td,
  .tablesSyl th {
    padding: 5px 0
  }

</style>
