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
          <el-button size="mini" icon="el-icon-zoom-in" v-if="ObjButton.query.isShow==true" type="primary" v-on:click="elCard">{{ObjButton.query.text}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" icon="el-icon-plus" v-if="Obj_button.buttons.addshow==true" type="primary" @click="handleAdd">{{ObjButton.add.text}}</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <el-button size="mini" icon="el-icon-edit" v-if="Obj_button.buttons.addshow==true" type="primary">{{Obj_button.buttonText.edit}}</el-button>
        </el-form-item> -->
        <!-- <el-form-item>
      <el-button size="mini" icon="el-icon-menu" type="primary" @click="getKeyLists" v-if="Obj_button.buttons.selectshow==true">{{Obj_button.buttonText.query}}</el-button>
        </el-form-item> -->
        <el-form-item>
      <el-button type="danger" icon="el-icon-delete" size="mini" v-if="ObjButton.del.isShow==true" @click="manyDel" :disabled="this.sels.length===0">{{ObjButton.manyDel.text}}</el-button>
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
              <el-form :inline="true" label-position label-width="120px" @submit.native.prevent>
                <el-form-item :label="formRemove.value1.text">
                  <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-model="formRemove.value1.inputData" :placeholder="formRemove.value1.text"></el-input>
                </el-form-item>
                <el-form-item :label="formRemove.value2.text">
                  <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-model="filters.bllCode" :placeholder="formRemove.value2.text"></el-input>
                </el-form-item>
                <!-- <el-form-item size="small" :label="formRemove.value1.text">
                  <el-select style="width: 180px;" v-model="filters.caidanguanlian" :placeholder="formRemove.value1.text">
                    <el-option v-for="item in options" :key="item.id" :label="item.mingcheng" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item size="small" :label="formRemove.value4.text">
                  <el-select style="width: 180px;" v-model="filters.shifouyanzheng" :placeholder="formRemove.value4.text">
                    <el-option label="是" :value='true'>是</el-option>
                    <el-option label="否" :value='false'>否</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item size="small" :label="formRemove.value6.text">
                  <el-select style="width: 180px;" v-model="filters.shifouguanlihoutai" :placeholder="formRemove.value6.text">
                    <el-option label="是" :value='true'>是</el-option>
                    <el-option label="否" :value='false'>否</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item size="small" :label="formRemove.value5.text">
                  <el-select style="width: 180px;" v-model="filters.shifouqiyong" :placeholder="formRemove.value5.text">
                    <el-option label="是" :value='true'>是</el-option>
                    <el-option label="否" :value='false'>否</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item size="small" :label="formRemove.value7.text">
                  <el-select style="width: 180px;" v-model="filters.shifouxuyaodenglu" :placeholder="formRemove.value7.text">
                    <el-option label="是" :value='true'>是</el-option>
                    <el-option label="否" :value='false'>否</el-option>
                  </el-select>
                </el-form-item>
                <!-- <div style="float: right;"> -->
                  <el-form-item size="small">
                    <el-button size="mini" type="primary" v-on:click="getKeyList">确定</el-button>
                    <el-button size="mini" type="" v-on:click="getDataList">重置</el-button>
                  </el-form-item>
                  <!-- <el-form-item> -->
                  <!-- </el-form-item> -->
                  <!-- </div> -->
              </el-form>
            </el-col>
          </el-row>
         </el-card>

    <el-table class="tablesSyl" fit @row-dblclick="Rowdblclick" stripe border :data="dataList" @current-change="checkbox" highlight-current-row @selection-change="selsChange">
      <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width' :type='item.type'>
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
      <el-table-column v-if="Obj_button.buttons.ischeckshow==true" prop="shifouyanzheng" label="是否验证" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shifouyanzheng" @change="setIsCheckInterface(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column v-if="Obj_button.buttons.setstateshow==true" prop="shifouqiyong" label="是否启用" width="100">
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
      <el-table-column v-if="ObjButton.edit.isShow==true||ObjButton.del.isShow==true" label="操作" fixed="right" >
        <template slot-scope="scope">
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-edit" type="primary" v-if="ObjButton.query.isShow==true" @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button size="mini" style="padding: 7px 9px;margin-left: 0px;" icon="el-icon-delete" type="danger" v-if="ObjButton.del.isShow==true" @click="handleDel(scope.$index, scope.row)"></el-button>
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
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple>
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
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { handlePost, handleGet } from "@/api/apihelper.js";

export default {
  data() {
    return {
      Obj_button:{
        buttonText: {//按钮文字
          edit: "编辑",
          del: "删除",
          query: "查询",
          add: "添加",
          whole: "显示所有",
          manyDel: "批量删除",
          condition: "筛选",
          Reset: "重置",
        },
        buttons: {//按钮的权限控制
          selectshow: false,
          addshow: false,
          updateshow: false,
          delshow: false,
          ischeckshow: false,
          setstateshow: false
        },
      },
         //按钮
      ObjButton:{
        paraSwitch: paraHelper, //开关按钮使用
        paraMenu: paraHelper, //菜单列表使用
        para: paraHelper, //列表
        addPara: paraHelper, //添加参数
        updatePara: paraHelper, //编辑参数
        delPara: paraHelper, //删除参数
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
          inputData:"",
          key:{
            jiekoumingcheng: '',
            Page: 1,
            Size: 15
          }
        },
        value2:{
          text:'接口标识',
          tips:'接口标识',
          inputData:"",
          key:{
            Code: '',
            Page: 1,
            Size: 15
          }
        },
        value3:{
          text:'菜单关联',
          tips:'菜单关联',
          inputData:"",
          key:{}
        },
        value4:{
          text:'是否验证',
          tips:'是否验证',
          inputData:"",
          key:{}
        },
        value5:{
          text:'是否启用',
          tips:'是否启用',
          inputData:"",
          key:{}
        },
        value6:{
          text:'是否管理后台',
          tips:'是否管理后台',
          inputData:"",
          key:{}
        },
        value7:{
          text:'是否需要登录',
          tips:'是否需要登录',
          inputData:"",          
          key:{}
        },
      },
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
      //列表数组
      tableLabel: [
        { type: "selection", width: "55" },
        // { type: "index", width: "60" },
        { Label: "ID", prop: "id", width: "150" },
        { Label: "接口名称", prop: "jiekoumingcheng", width: "150" },
        { Label: "接口标识", prop: "bllcode", width: "150" },
        { Label: "菜单关联", prop: "caidanguanlian", width: "150" },
        { Label: "备注", prop: "beizhu", width: "150" }
        // { Label: "是否验证", prop: "shifouyanzheng", width: "150" }
        // { Label: "是否启用", prop: "shifouqiyong", width: "150" }
        // {Label:'是否管理后台',prop:"shifouguanlihoutai",width:'150'},
        // {Label:'是否需要登录',prop:"shifouxuyaodenglu",width:'150'},
        // {Label:'操作',width:'150'},
      ],

      // //搜索
      // removeForm: {
      //   formLabel: {//搜索标题
      //     value1: "接口名称",
      //     value2: "接口标识",
      //     value3: "菜单关联",
      //     value4: "是否验证",
      //     value5: "是否启用",
      //     value6: "是否管理后台",
      //     value7: "是否需要登录"
      //   },
      //   //搜索框提示文字
      //   formPlaceholder: {
      //     value1: "名称",
      //     value2: "标识",
      //     value3: "关联",
      //     value4: "是否验证",
      //     value5: "是否启用",
      //     value6: "是否管理后台",
      //     value7: "是否需要登录"
      //   },
      // },
      
      currentRow: null,
      // buttons: {
      //   //按钮的权限控制
      //   selectshow: false,
      //   addshow: false,
      //   updateshow: false,
      //   delshow: false,
      //   ischeckshow: false,
      //   setstateshow: false
      // },
      elCardBox: false,
      options: [],
      selectedOptions: [],
      dialogStatus: "",
      dialogFormVisibleAdd: false, //控制添加显示
      dialogFormVisibleEdit: false, //控制编辑显示
        //查询筛选
      filters: {
        // Page: this.page,
        // jiekoumingcheng:this.modelData.value1,
        Page: 1,
        Size: 15,
      },
      // modelData: {
      //   value1:'',
      // },
      menuList: [], //菜单
      dataList: [], //主页数据
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        jiekoumingcheng: [
          {
            required: true,
            message: "接口名称",
            trigger: "blur"
          }
        ],
        bllcode: [
          {
            required: true,
            message: "接口标识必填",
            trigger: "blur"
          }
        ]
      },
      
      editForm: {},// 编辑界面数据
      addFormRules: {
        name: [
          {
            required: true,
            message: "接口名称",
            trigger: "blur"
          }
        ]
      },
      tabs: null,
      inputAutofocus: false
    };
  },
  methods: {
    //刷新页面
    Refresh(){
      this.filters = {
        Page: 1,
        Size: 15
      },
      this.getDataList()
    },
    //
    // formatterManage(row, column){
    //       return row.shifouguanlihoutai == true ? '是' : '否'
    // },

    //选定筛选条件
    conditionClick(val) {
      console.log(val);
      this.elCard();
    },
    //条件显示隐藏
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
        console.log("this.interfaces.show", this.interfaces);
        this.Obj_button.buttons.addshow =
          this.interfaces.indexOf(this.bllCode.add) > 0 ? true : false;
        this.ObjButton.query.isShow =
          this.interfaces.indexOf(this.bllCode.getList) > 0 ? true : false;
        this.ObjButton.edit.isShow =
          this.interfaces.indexOf(this.bllCode.edit) > 0 ? true : false;
        this.ObjButton.del.isShow =
          this.interfaces.indexOf(this.bllCode.del) > 0 ? true : false;
        this.Obj_button.buttons.ischeckshow =
          this.interfaces.indexOf(this.bllCode.isCheck) > 0 ? true : false;
        this.Obj_button.buttons.setstateshow =
          this.interfaces.indexOf(this.bllCode.setState) > 0 ? true : false;
        //console.log('this.interfaces.show', this.interfaces)
        //console.log('this.bllCode.add',this.bllCode.add)
      }
    },
    //设置是否验证
    setIsCheckInterface(rowdata) {
      // console.log('setIsCheckInterface--rowdata===',rowdata)
      this.paraSwitch.Code = this.bllCode.isCheck;
      let data = {
        id: rowdata.id,
        shifouyanzheng: rowdata.shifouyanzheng
      };
      this.paraSwitch.Data = JSON.stringify(data);
      handlePost(this.paraSwitch).then(res => {
        if (res.IsSuccess == true) {
          this.getDataList();
        }
      });
    },
    //设置是否启用
    setStateInterface(rowdata) {
      //  console.log('setStateInterface--rowdata===',rowdata)
      this.paraSwitch.Code = this.bllCode.setState;
      let data = {
        id: rowdata.id,
        shifouqiyong: rowdata.shifouqiyong
      };
      this.paraSwitch.Data = JSON.stringify(data);
      handlePost(this.paraSwitch).then(res => {
        if (res.IsSuccess == true) {
          this.getDataList();
        }
      });
    },
    //显示所有
    getKeyLists() {
      this.page = 1;
      this.para.Code = this.bllCode.getList;
      this.para.Data = "";
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.total = res.Data.Count;
          this.dataList = res.Data.List;
        }
      });
    },
    // 布尔值显示转换
    formatBoole: function(row, column) {
      return row.shifouyanzheng == true ? "是" : "否";
    },
    handleCurrentChange(val) {
      this.filters.Page = val;
      this.getDataList();
    },
    //获取菜单列表
    getData() {
      this.ObjButton.paraMenu.Code = this.bllCode.getListMenu;
      // this.paraMenu.Code = "GetTreeMenu"
      this.ObjButton.paraMenu.Data = "";
      handlePost(this.ObjButton.paraMenu)
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
        //查询
    getKeyList() {
      // console.log("modelData:!!!!!", this.modelData);
      // var filters = { a: 1 };

      // if (this.modelData.length > 0) {
      //   var target = { jiekoumingcheng: this.modelData };

      //   console.log("098");
      // }
      // Object.assign(this.filters,target);
      // filters // {a:1, b:2, c:3}

      // this.page = 1;
      this.getDataList();
    },
    // 获取列表
    getDataList() {
      this.getData();
      // const paraSelect = {
      //   jiekoumingcheng: this.modelData,
      //   Page: this.page,
      //   Size: 10
      // };
      this.formRemove.value1.key.jiekoumingcheng = this.formRemove.value1.inputData
      this.ObjButton.para.Code = this.bllCode.getList;
      this.ObjButton.para.Data = JSON.stringify(this.formRemove.value1.key);
      // console.log("filters!!!", this.filters);
      console.log("para!!!", this.para);
      handlePost(this.ObjButton.para).then(res => {
        if (res.IsSuccess == true) {
          this.total = res.Data.Count;
            console.log ("11111111111222",this.total)

          this.dataList = res.Data.List;
          this.filters = {
            Page: 1,
            Size: 15,
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
          this.ObjButton.delPara.Code = this.bllCode.del;
          this.ObjButton.delPara.Data = JSON.stringify(paraId);
          handlePost(this.ObjButton.delPara).then(res => {
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
    //双击编辑
    Rowdblclick(val) {
      this.currentRow = val;
      console.log(this.currentRow);
      this.getData();
      // this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = Object.assign({}, this.currentRow);
    },

    //
    checkbox(val) {
      console.log("单击：", val);
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.getData();
      // this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = Object.assign({}, row);
    },
    // 显示添加界面
    handleAdd() {
      this.editForm = {};
      this.getData();
      // this.dialogStatus = "create";
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
              this.ObjButton.updatePara.Code = this.bllCode.edit;
              this.ObjButton.updatePara.Data = JSON.stringify(paraId);
              handlePost(this.ObjButton.updatePara)
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
    // 添加
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              this.editForm.id = parseInt(Math.random() * 100).toString(); // mock a id
              const paraForm = Object.assign({}, this.editForm);
              this.ObjButton.addPara.Data = JSON.stringify(paraForm);
              this.ObjButton.addPara.Code = this.bllCode.add;
              handlePost(this.ObjButton.addPara)
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
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels;
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
          this.ObjButton.para.Data = JSON.stringify(paraId);
          this.ObjButton.para.Code = this.bllCode.del;
          handlePost(this.ObjButton.para)
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
    this.loadButton(store.getters.interfaces); //按钮显示

    this.getDataList();
  }
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
.panel-lead em{
    font-weight: bold;
    font-size: 14px;
    display: block;
}
.panel-lead span{
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
.tablesSyl td, .tablesSyl th{
  padding: 5px 0
}
</style>
