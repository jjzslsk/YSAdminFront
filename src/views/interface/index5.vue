<template>
  <section class="app-container sectionBox">
    <!--工具条-->
    <div class="toolBox">
      <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;">
        <el-form :inline="true" :model="filters" label-position label-width="120px" @submit.native.prevent>
          <div style="float: left;">
            <el-form-item>
              <el-button size="mini" icon="el-icon-refresh" v-if="ObjButton.query.isShow==true" type="info" v-on:click="getKeyList"></el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" icon="el-icon-zoom-in" v-if="ObjButton.query.isShow==true" type="primary" v-on:click="elCard">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" icon="el-icon-edit" v-if="buttons.addshow==true" type="primary" @click="handleAdd">添加</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </div>

    <!-- 查询筛选 -->
    <el-card class="box-card box-cardBox" v-if="elCardBox">
      <el-row>
        <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;">
          <el-form :inline="true" :model="filters" label-position label-width="120px" @submit.native.prevent>
            <el-form-item :label="formLabel.value1">
              <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-if="buttons.selectshow==true"
                v-model="filters.jiekoumingcheng" :placeholder="formPlaceholder.value1"></el-input>
            </el-form-item>
            <el-form-item :label="formLabel.value2">
              <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-if="buttons.selectshow==true"
                v-model="filters.bllCode" :placeholder="formPlaceholder.value2"></el-input>
            </el-form-item>
            <el-form-item size="small" :label="formLabel.value4">
              <el-select style="width: 180px;" v-model="filters.shifouyanzheng" :placeholder="formPlaceholder.value4">
                <el-option label="是" :value='true'>是</el-option>
                <el-option label="否" :value='false'>否</el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small" :label="formLabel.value5">
              <el-select style="width: 180px;" v-model="filters.shifouguanlihoutai" :placeholder="formPlaceholder.value5">
                <el-option label="是" :value='true'>是</el-option>
                <el-option label="否" :value='false'>否</el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small" :label="formLabel.value6">
              <el-select style="width: 180px;" v-model="filters.shifouqiyong" :placeholder="formPlaceholder.value6">
                <el-option label="是" :value='true'>是</el-option>
                <el-option label="否" :value='false'>否</el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small" :label="formLabel.value7">
              <el-select style="width: 180px;" v-model="filters.shifouxuyaodenglu" :placeholder="formPlaceholder.value7">
                <el-option label="是" :value='true'>是</el-option>
                <el-option label="否" :value='false'>否</el-option>
              </el-select>
            </el-form-item>
            <!-- 按钮 -->
            <el-form-item size="small">
              <el-button size="mini" v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">确定</el-button>
              <el-button size="mini" v-if="buttons.selectshow==true" type="" v-on:click="getDataList">{{button.Reset}}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <!-- 列表 -->
    <el-table fit @row-dblclick="Rowdblclick" stripe border :data="dataList" highlight-current-row @selection-change="selsChange"
      style="width: 100%;">
      <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width'
        :type='item.type'>
      </el-table-column>
      <el-table-column v-if="buttons.ischeckshow==true" prop="shifouyanzheng" label="是否验证" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shifouyanzheng" @change="setIsCheckInterface(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column v-if="buttons.setstateshow==true" prop="shifouqiyong" label="是否启用" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shifouqiyong" @change="setStateInterface(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="shifouguanlihoutai" label="是否管理后台" width="120" :formatter="function(row, column){
          return row.shifouguanlihoutai == true ? '是' : '否'}">
      </el-table-column>
      <el-table-column prop="shifouxuyaodenglu" label="是否需要登录" width="120" :formatter="function (row, column) {
          return row.shifouxuyaodenglu == true ? '是' : '否'}">
      </el-table-column>
      <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-edit" v-if="buttons.updateshow==true"
            @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-delete" type="danger" v-if="buttons.delshow==true"
            @click="handleDel(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    <!--添加界面-->
    <el-dialog title="添加" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
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
                <el-option v-for="item in options" :key="item.id" :label="item.mingcheng" :value="item.id">
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
            <!-- 按钮 -->
            <el-form-item label="">
              <el-button size="mini" @click.native="dialogFormVisibleAdd=false">取消</el-button>
              <el-button size="mini" type="primary" @click="createData">添加</el-button>
            </el-form-item>
          </el-form>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
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
            <el-option v-for="item in options" :key="item.id" :label="item.mingcheng" :value="item.id">
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
      </el-form>
      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleEdit=false">取消</el-button>
        <el-button size="mini" type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>


  </section>
</template>

<script>
//引入
  import store from "@/store/index.js"; //引入本地存储
  import util from "@/utils/table.js";
  import {paraHelper} from "@/utils/para.js"; //请求参数格式
  import {handlePost,handleGet} from "@/api/apihelper.js";

  export default {
    data() {
      return {
        bllCode: {
          //接口标识，由后端提供
          add: "AddInterface", //添加
          edit: "UpdateInterface", //修改
          del: "DelInterface", //删除
          getList: "GetListInterface", //获取列表
          getObj: "GetInterface", //获取对象（单个）
          isCheck: "SetIsCheckInterface", //设置验证
          setState: "SetStateInterface", //设置状态
          getListMenu: "GetListMenu" //获取菜单
        },

      //按钮
      ObjButton:{
        add:{
          text:'添加',//按钮文字
          Code:'AddInterface',
          isShow: false,//是否显示
        },
        query:{
          text:'查询',
          Code:'GetListMenu',
          isShow: false,
        },
        edit:{
          text:'编辑',
          Code:'UpdateInterface',
          isShow: false,
        },
        del:{
          text:'删除',
          Code:'DelInterface',
          isShow: false,
        },
        manyDel:{
          text:'批量删除',
          Code:'DelInterface',
          isShow: false,
        },
        Cancel:{
          text:'取消',
          Code:'',
          isShow: false,
        },
        confirm:{
          text:'确定',
          Code:'',
          isShow: false,
        }
      },

      //搜索
      formRemove: {
        value1:{
          text:'接口名称',//搜索标题
          tips:'接口名称',//搜索提示
        },
        value2:{
          text:'接口标识',
          tips:'接口标识'
        },
        value3:{
          text:'菜单关联',
          tips:'菜单关联'
        },
        value4:{
          text:'是否验证',
          tips:'是否验证'
        },
        value5:{
          text:'是否启用',
          tips:'是否启用'
        },
        value6:{
          text:'是否管理后台',
          tips:'是否管理后台'
        },
        value7:{
          text:'是否需要登录',
          tips:'是否需要登录'
        },
      },

        //参数分类
        paraSwitch: paraHelper, //开关按钮使用
        paraMenu: paraHelper, //菜单列表使用
        para: paraHelper, //列表
        addPara: paraHelper, //添加参数
        updatePara: paraHelper, //编辑参数
        delPara: paraHelper, //删除参数

        //列表数组
        tableLabel: [{
          Label: "接口名称",
          prop: "jiekoumingcheng"
        }, ],

        currentRow: null,//双击编辑，存储行数据
        elCardBox: false,//筛选模块，显示或隐藏
        dialogFormVisibleAdd: false, //控制添加显示
        dialogFormVisibleEdit: false, //控制编辑显示
        inputAutofocus: false,//输入框获取焦点

        options: [],//初始化 菜单关联
        sels: [], // 列表选中列，全选单选多选
        menuList: [], //菜单列表
        dataList: [], //列表数据

        total: 0,//分页初始化
        page: 1,//分页初始化
        filters: {Page: 1,Size: 10},//查询筛选初始化
        
        //表单校验
        editFormRules: {
          jiekoumingcheng: [{
            required: true,
            message: "接口名称",
            trigger: "blur"
          }],
          bllcode: [{
            required: true,
            message: "接口标识必填",
            trigger: "blur"
          }]
        },
        editForm: {},// 编辑界面数据
        addFormRules: {
          name: [{
            required: true,
            message: "接口名称",
            trigger: "blur"
          }]
        },
      };
    },
    methods: {
    //刷新页面
    Refresh(){
      this.filters = {
        Page: 1,
        Size: 10
      },
      this.getDataList()
    },
      //筛选条件模块显示隐藏
      elCard() {
        if (this.elCardBox == false) {
          this.elCardBox = true;
        } else {
          this.elCardBox = false;
        }
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
          this.buttons.ischeckshow =
            this.interfaces.indexOf(this.bllCode.isCheck) > 0 ? true : false;
          this.buttons.setstateshow =
            this.interfaces.indexOf(this.bllCode.setState) > 0 ? true : false;
        }
      },
      //分页
      handleCurrentChange(val) {
        this.page = val;
        this.getDataList();
      },
      // 获取列表
      getDataList() {
        this.getList();
        this.para.Code = this.bllCode.getList;
        this.para.Data = JSON.stringify(this.filters);
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.total = res.Data.Count;
            this.dataList = res.Data.List;
            this.filters = {
              Page: 1,
              Size: 10
            };
          }
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
            this.delPara.Code = this.bllCode.del;
            this.delPara.Data = JSON.stringify(paraId);
            handlePost(this.delPara).then(res => {
              if (res.IsSuccess == true) {
                this.getDataList();
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
              }
            });
          })
      },
      //双击编辑
      Rowdblclick(val) {
        this.currentRow = val;
        this.getList();
        this.dialogFormVisibleEdit = true;
        this.editForm = Object.assign({}, this.currentRow);
      },
      // 显示编辑界面
      handleEdit(index, row) {
        this.getList();
        this.dialogFormVisibleEdit = true;
        this.editForm = Object.assign({}, row);
      },
      // 显示添加界面
      handleAdd() {
        this.editForm = {};
        this.getList();
        this.dialogFormVisibleAdd = true;
        this.editForm = {
          shifouyanzheng: true,
          shifouxuyaodenglu: true,
          shifouguanlihoutai: true,
          caidanguanlian: 0,
          shifouqiyong: true,
        };
      },
      // 编辑
      updateData() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
              .then(() => {
                const paraId = Object.assign({}, this.editForm);
                this.updatePara.Code = this.bllCode.edit;
                this.updatePara.Data = JSON.stringify(paraId);
                handlePost(this.updatePara)
                  .then(res => {
                    if (res.IsSuccess == true) {
                      this.$refs["editForm"].resetFields(); //重置editForm
                      this.dialogFormVisibleEdit = false;
                      this.getDataList();
                      this.$message({
                        message: "修改成功！",
                        type: "success"
                      });
                    } else {
                      this.$refs["editForm"].resetFields();
                      this.dialogFormVisibleEdit = false;
                    }
                  })
              })
          }
        });
      },
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
                this.addPara.Data = JSON.stringify(paraForm);
                this.addPara.Code = this.bllCode.add;
                handlePost(this.addPara)
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
                      this.$refs["editForm"].resetFields();
                      this.dialogFormVisibleAdd = false;
                    }
                  })
              })
          }
        });
      },
      // 全选单选多选
      selsChange(sels) {
        this.sels = sels;
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
                }
              })
          })
      }
    },
    mounted() { //首次加载
      this.loadButton(store.getters.interfaces); //按钮显示
      this.getDataList();//获取列表
    }
  };

</script>
