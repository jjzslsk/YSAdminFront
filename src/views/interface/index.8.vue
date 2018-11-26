<template>
  <section class="app-container sectionBox">
    <!-- 头部文字说明 -->
    <div class="panel-heading">
      <div class="panel-lead">
        <em>接口管理</em>
        <span>
          规则通常对应一个控制器的方法,同时左侧的菜单栏数据也从规则中体现,通常建议通过命令行进行生成规则节点
        </span>
      </div>
    </div>

    <!--工具条-->
    <div class="toolBox">
      <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;">
        <el-form :inline="true" :model="filters" label-position label-width="120px" @submit.native.prevent>
          <div style="float: left;">
            <el-form-item>
              <el-button size="mini" v-if="ObjButton.query.isShow==true" icon="el-icon-refresh" type="info" v-on:click="Refresh"></el-button>
            </el-form-item>
            <!-- <el-form-item>
          <el-button size="mini" icon="el-icon-search" v-if="Obj_button.buttons.selectshow==true" type="primary" v-on:click="getKeyList">{{Obj_button.buttonText.query}}</el-button>
        </el-form-item> -->
            <el-form-item>
              <el-button size="mini" icon="el-icon-zoom-in" v-if="ObjButton.query.isShow==true" type="primary"
                v-on:click="elCard">{{ObjButton.query.text}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button size="mini" icon="el-icon-plus" v-if="this.ObjButton.add.isShow==true" type="primary" @click="handleAdd">{{ObjButton.add.text}}</el-button>
            </el-form-item>
            <!-- <el-form-item>
          <el-button size="mini" icon="el-icon-edit" v-if="Obj_button.buttons.addshow==true" type="primary">{{Obj_button.buttonText.edit}}</el-button>
        </el-form-item> -->
            <!-- <el-form-item>
      <el-button size="mini" icon="el-icon-menu" type="primary" @click="getKeyLists" v-if="Obj_button.buttons.selectshow==true">{{Obj_button.buttonText.query}}</el-button>
        </el-form-item> -->
            <el-form-item>
              <el-button type="danger" icon="el-icon-delete" size="mini" v-if="ObjButton.del.isShow==true" @click="manyDel"
                :disabled="this.sels.length===0">{{ObjButton.manyDel.text}}</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-col>
    </div>

    <!-- 搜索筛选 -->
    <el-card class="box-card box-cardBox" v-if="elCardBox">
      <el-row>
        <!-- <el-button size="mini" round v-for="item in tableLabel" :key="item.Label" @click="conditionClick(item.Label)">{{item.Label}}</el-button> -->
        <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;">
          <el-form :model="filters" ref="filters" :inline="true" label-position label-width="120px"
            @submit.native.prevent>
            <el-form-item :label="formRemove.jiekoumingcheng.text" prop="jiekoumingcheng">
              <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-model="filters.jiekoumingcheng"
                :placeholder="formRemove.jiekoumingcheng.text"></el-input>
            </el-form-item>
            <el-form-item :label="formRemove.bllCode.text" prop="bllCode">
              <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-model="filters.bllCode"
                :placeholder="formRemove.bllCode.text"></el-input>
            </el-form-item>
            <el-form-item size="small" :label="formRemove.caidanguanlian.text">
              <el-select style="width: 180px;" v-model="filters.caidanguanlian" :placeholder="formRemove.caidanguanlian.text">
                <el-option v-for="item in options" :key="item.id" :label="item.mingcheng" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small" :label="formRemove.shifouyanzheng.text" prop="shifouyanzheng">
              <el-select style="width: 180px;" v-model="filters.shifouyanzheng" :placeholder="formRemove.shifouyanzheng.text">
                <el-option label="是" :value='true'>是</el-option>
                <el-option label="否" :value='false'>否</el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small" :label="formRemove.shifouguanlihoutai.text" prop="shifouguanlihoutai">
              <el-select style="width: 180px;" v-model="filters.shifouguanlihoutai" :placeholder="formRemove.shifouguanlihoutai.text">
                <el-option label="是" :value='true'>是</el-option>
                <el-option label="否" :value='false'>否</el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small" :label="formRemove.shifouqiyong.text" prop="shifouqiyong">
              <el-select style="width: 180px;" v-model="filters.shifouqiyong" :placeholder="formRemove.shifouqiyong.text">
                <el-option label="是" :value='true'>是</el-option>
                <el-option label="否" :value='false'>否</el-option>
              </el-select>
            </el-form-item>
            <el-form-item size="small" :label="formRemove.shifouxuyaodenglu.text" prop="shifouxuyaodenglu">
              <el-select style="width: 180px;" v-model="filters.shifouxuyaodenglu" :placeholder="formRemove.shifouxuyaodenglu.text">
                <el-option label="是" :value='true'>是</el-option>
                <el-option label="否" :value='false'>否</el-option>
              </el-select>
            </el-form-item>
            <!-- <div style="float: right;"> -->
            <el-form-item size="small">
              <el-button size="mini" type="primary" v-on:click="getKeyList">确定</el-button>
              <el-button size="mini" type="" @click="resetForm('filters')">重置</el-button>
            </el-form-item>
            <!-- <el-form-item> -->
            <!-- </el-form-item> -->
            <!-- </div> -->
          </el-form>
        </el-col>
      </el-row>
    </el-card>

    <el-table class="tablesSyl" fit @row-dblclick="Rowdblclick" stripe border :data="dataList" highlight-current-row
      @selection-change="selsChange">
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width'
        :type='item.type'>
      </el-table-column>
      <!-- <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="jiekoumingcheng" show-overflow-tooltip label="接口名称" width="150">
      </el-table-column>
      <el-table-column prop="bllcode" label="接口标识" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="caidanguanlian" label="菜单关联" min-width="160">
      </el-table-column>
      <el-table-column prop="beizhu" label="备注" min-width="160">
      </el-table-column> -->
      <el-table-column v-if="ischeckshow==true" prop="shifouyanzheng" label="是否验证" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shifouyanzheng" @change="setIsCheckInterface(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column v-if="setstateshow==true" prop="shifouqiyong" label="是否启用" width="100">
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
      <el-table-column v-if="ObjButton.edit.isShow==true||ObjButton.del.isShow==true" label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-edit" type="primary" v-if="ObjButton.query.isShow==true"
            @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-delete" type="danger" v-if="ObjButton.del.isShow==true"
            @click="handleDel(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="15" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    <!--添加界面-->
    <el-dialog title="添加" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">

      <el-tabs type="border-card">
        <el-tab-pane label="添加接口">
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
              <!-- <el-cascader  expand-trigger="hover" :options="options" :v-model="selectedOptions"  :show-all-levels="false">
          </el-cascader> -->
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
        <el-tab-pane label="配置信息">
          <el-steps :active="1">
            <el-step title="上传图片" icon="el-icon-edit"></el-step>
            <el-step title="审核" icon="el-icon-upload"></el-step>
            <el-step title="完成" icon="el-icon-picture"></el-step>
          </el-steps>
          <br>
          <br>
          <br>
          <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-row>
            <el-col :span="24" :offset="20">
              <el-button size="mini" type="primary">提交</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>




      <!-- <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
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
          <el-cascader  expand-trigger="hover" :options="options" :v-model="selectedOptions"  :show-all-levels="false">
          </el-cascader>
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
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleAdd=false">取消</el-button>
        <el-button size="mini" type="primary" @click="createData">添加</el-button>
      </div> -->

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
          <!-- <el-cascader  expand-trigger="hover" :options="options" :v-model="selectedOptions"  :show-all-levels="false">
          </el-cascader> -->
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
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleEdit=false">取消</el-button>
        <el-button size="mini" type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>


  </section>
</template>

<script>
  import edit from './edit'
  import store from "@/store/index.js"; //引入本地存储
  import util from "@/utils/table.js";
  import {
    paraHelper
  } from "@/utils/para.js"; //请求参数格式
  import {
    handlePost,
    handleGet
  } from "@/api/apihelper.js";

  export default {
    data() {
      return {
      //==================数据定义===========================
        //字段name code 

        //添加 修改
        editForm: { // 界面数据
          // jiekoumingcheng: '',
          // shifouyanzheng: true,
          // shifouxuyaodenglu: true,
          // shifouguanlihoutai: true,
          // caidanguanlian: null,
          // shifouqiyong: true,
          // beizhu:'',
          // bllcode: '',
        },
        //搜索
        filters: {
          // jiekoumingcheng: '',
          // shifouxuyaodenglu: null,
          // shifouguanlihoutai: null,
          // caidanguanlian: null,
          // shifouqiyong: null,
          // beizhu:'',
          // bllcode: '',
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
            width: "55"
          },
          {
            Label: "ID",
            prop: "id",
            width: "150"
          },
          {
            Label: "接口名称",
            prop: "jiekoumingcheng",
            width: "150"
          },
          {
            Label: "接口标识",
            prop: "bllcode",
            width: "150"
          },
          {
            Label: "菜单关联",
            prop: "caidanguanlian",
            width: "150"
          },
          {
            Label: "备注",
            prop: "beizhu",
            width: "150"
          }
        ],

        //控制模块显示隐藏
        elCardBox: false, //搜索模块显示隐藏
        dialogFormVisibleAdd: false, //控制添加显示
        dialogFormVisibleEdit: false, //控制编辑显示
        para: paraHelper, //交互格式

        //权限
        interfaces: null, //初始值
        selectshow: false, //搜索
        ischeckshow: false, //验证
        setstateshow: false, //启用

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
          bllCode: {
            text: '接口标识',
            tips: '接口标识',
          },
          caidanguanlian: {
            text: '菜单关联',
            tips: '菜单关联',
          },
          shifouyanzheng: {
            text: '是否验证',
            tips: '是否验证',
          },
          shifouqiyong: {
            text: '是否启用',
            tips: '是否启用',
          },
          shifouguanlihoutai: {
            text: '是否管理后台',
            tips: '是否管理后台',
          },
          shifouxuyaodenglu: {
            text: '是否需要登录',
            tips: '是否需要登录',
          },
        },
      //===================业务数据==========================
        options: [], //初始化菜单列表
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

        addFormRules: {
          name: [{
            required: true,
            message: "接口名称",
            trigger: "blur"
          }]
        },
        inputAutofocus: false //自动对焦点
      };
    },

  //===================js方法==========================
  //===================初始化 ==========================
    //初始化方法
    mounted() {
      this.loadButton(store.getters.interfaces); //权限控制 按钮显示隐藏
      this.getDataList(); //获取列表
    },
    methods: {
    //===================数据展示==========================
      //加载按钮
      loadButton(data) {
        if (data && data.length > 0) {
          this.interfaces = data.map(item => item.bllcode);
          this.ObjButton.add.isShow =
            this.interfaces.indexOf(this.bllCode.add) > 0 ? true : false;
          this.ObjButton.query.isShow =
            this.interfaces.indexOf(this.bllCode.getList) > 0 ? true : false;
          this.ObjButton.edit.isShow =
            this.interfaces.indexOf(this.bllCode.edit) > 0 ? true : false;
          this.ObjButton.del.isShow =
            this.interfaces.indexOf(this.bllCode.del) > 0 ? true : false;
          this.ischeckshow =
            this.interfaces.indexOf(this.bllCode.isCheck) > 0 ? true : false;
          this.setstateshow =
            this.interfaces.indexOf(this.bllCode.setState) > 0 ? true : false;
        }
      },
  //===================界面展示==========================
      // 显示编辑界面
      handleEdit(index, row) {
        this.getData();
        this.dialogFormVisibleEdit = true;
        this.editForm = Object.assign({}, row);
      },
      // 显示添加界面
      handleAdd() {
        this.editForm = {};
        this.getData();
        this.dialogFormVisibleAdd = true;
        this.editForm = {
          shifouyanzheng: true,
          shifouxuyaodenglu: true,
          shifouguanlihoutai: true,
          caidanguanlian: 0,
          shifouqiyong: true,
        };
      },
      //条件显示隐藏
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
                      this.$refs["editForm"].resetFields();
                      this.dialogFormVisibleAdd = false;
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
  //===================删==========================
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
            this.para.Code = this.ObjButton.del.Code;
            this.para.Data = JSON.stringify(paraId);
            handlePost(this.para).then(res => {
              if (res.IsSuccess == true) {
                this.getDataList();
                this.$message({
                  message: "删除成功！",
                  type: "success"
                });
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      },
      // 批量删除
      manyDel() {
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
            this.para.Code = this.ObjButton.del.Code;
            handlePost(this.para)
              .then(res => {
                if (res.IsSuccess == true) {
                  this.getDataList();
                  this.$message({
                    message: "删除成功！",
                    type: "success"
                  });
                } else {}
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      },
  //===================查==========================
      // 获取列表
      getDataList() {
        this.getData();
        this.para.Code = this.ObjButton.query.Code;
        this.para.Data = JSON.stringify(this.filters);
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.total = res.Data.Count;
            this.dataList = res.Data.List;
          }
        });
      },
      //获取单条数据
      getInfoData(id) {
        this.para.Code = 'GetInterface'
        this.para.Data = JSON.stringify(id);
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.editModel = res.Data;
            //弹窗
          } else {
            this.$message({
              message: res.Code + ':' + res.message,
              type: "warning"
            });
          }
        })
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
      //双击编辑
      Rowdblclick(val) {
        this.currentRow = val;
        this.getData();
        this.dialogFormVisibleEdit = true;
        this.editForm = Object.assign({}, this.currentRow);
      },


      // 更新
      updateData() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消"
              })
              .then(() => {

                const paraId = Object.assign({}, this.editForm);
                this.para.Code = this.ObjButton.edit.Code;
                this.para.Data = JSON.stringify(paraId);
                handlePost(this.para)
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
                  .catch(err => {
                    // 打印一下错误
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
  //===================操作类==========================
      //重置表单
      resetForm(formName) {
        this.$refs["filters"].resetFields();
      },
      //选定筛选条件
      conditionClick(val) {
        console.log(val);
        this.elCard();
      },
      //设置是否验证
      setIsCheckInterface(rowdata) {
        this.para.Code = 'SetIsCheckInterface';
        let data = {
          id: rowdata.id,
          shifouyanzheng: rowdata.shifouyanzheng
        };
        this.para.Data = JSON.stringify(data);
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.getDataList();
          }
        });
      },
      //设置是否启用
      setStateInterface(rowdata) {
        this.para.Code = 'SetStateInterface';
        let data = {
          id: rowdata.id,
          shifouqiyong: rowdata.shifouqiyong
        };
        this.para.Data = JSON.stringify(data);
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.getDataList();
          }
        });
      },
      //显示所有 预留
      getKeyLists() {
        this.filters.Page = 1;
        this.para.Code = this.ObjButton.query.Code;
        this.para.Data = "";
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.total = res.Data.Count;
            this.dataList = res.Data.List;
          }
        });
      },
      // 布尔值显示转换
      formatBoole: function (row, column) {
        return row.shifouyanzheng == true ? "是" : "否";
      },
      handleCurrentChange(val) {
        this.filters.Page = val;
        this.getDataList();
      },
      //查询过滤
      getKeyList() {
        this.getDataList();
      },
      // 全选单选多选
      selsChange(sels) {
        this.sels = sels;
      },
      //获取菜单列表
      getData() {
        this.para.Code = 'GetListMenu';
        this.para.Data = "";
        handlePost(this.para)
          .then(res => {
            if (res.IsSuccess == true) {
              this.options = res.Data.List;
              let addOptions = {
                id: 0,
                mingcheng: "无"
              };
              this.options.push(addOptions);
            }
          })
          .catch(err => {
            console.log(err);
          });
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
