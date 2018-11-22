<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" label-position label-width="120px" @submit.native.prevent>
        <el-form-item :label="formLabel.value1">
          <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-if="buttons.selectshow==true" v-model="filters.bllCode" :placeholder="formPlaceholder.value1"></el-input>
        </el-form-item>
        <el-form-item :label="formLabel.value2">
          <el-input style="width: 180px;" size="small" :autofocus='inputAutofocus' v-if="buttons.selectshow==true" v-model="filters.bllCode" :placeholder="formPlaceholder.value2"></el-input>
        </el-form-item>
        <el-form-item size="small" :label="formLabel.value3">
          <el-select style="width: 180px;" v-model="filters.caidanguanlian" :placeholder="formPlaceholder.value3">
            <el-option v-for="item in options" :key="item.id" :label="item.mingcheng" :value="item.id">
            </el-option>
          </el-select>
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
        <div style="float: right;">
        <el-form-item>
          <el-button size="mini" v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">{{button.query}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-if="buttons.addshow==true" type="primary" @click="handleAdd">{{button.add}}</el-button>
        </el-form-item>
        <el-form-item>
      <el-button size="mini" type="primary" @click="getKeyLists" v-if="buttons.selectshow==true">{{button.whole}}</el-button>
        </el-form-item>
        <el-form-item>
      <el-button type="danger" size="mini" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</el-button>
        </el-form-item>
        </div>
      </el-form>

    </el-col>

    <!--列表-->
      <el-card class="box-card box-cardBox" v-if="elCardBox">
          <el-row>
            <el-button size="mini" round v-for="item in tableLabel" :key="item.Label" @click="conditionClick(item.Label)">{{item.Label}}</el-button>
          </el-row>
        </el-card>
    <el-table @row-dblclick="Rowdblclick" border :data="dataList" @current-change="checkbox" highlight-current-row @selection-change="selsChange" style="width: 100%;">
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
      <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          
          <el-button size="mini" v-if="buttons.updateshow==true" @click="handleEdit(scope.$index, scope.row)">{{button.edit}}</el-button>
          <el-button size="mini" type="danger" v-if="buttons.delshow==true" @click="handleDel(scope.$index, scope.row)">{{button.del}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
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
import store from "@/store/index.js"; //引入本地存储
import util from "@/utils/table.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { handlePost, handleGet } from "@/api/apihelper.js";

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
      tableLabel: [
        { type: "selection", width: "55" },
        { type: "index", width: "60" },
        { Label: "ID", prop: "id", width: "150" },
        { Label: "接口名称", prop: "jiekoumingcheng", width: "150" },
        { Label: "接口标识", prop: "bllcode", width: "150" },
        { Label: "菜单关联", prop: "caidanguanlian", width: "150" },
        {Label:'备注',prop:"beizhu",width:'150'},
        // { Label: "是否验证", prop: "shifouyanzheng", width: "150" }
        // { Label: "是否启用", prop: "shifouqiyong", width: "150" }
        // {Label:'是否管理后台',prop:"shifouguanlihoutai",width:'150'},
        // {Label:'是否需要登录',prop:"shifouxuyaodenglu",width:'150'},
        // {Label:'操作',width:'150'},
      ],
      formLabel:{
        value1: "接口名称",
        value2: "接口标识",
        value3: "菜单关联",
        value4: "是否验证",
        value5: "是否启用",
        value6:'是否管理后台',
        value7:'是否需要登录',
      },
      formPlaceholder:{
        value1: "输入接口名称",
        value2: "输入接口标识",
        value3: "输入菜单关联",
        value4: "输入是否验证",
        value5: "输入是否启用",
        value6:'输入否管理后台',
        value7:'输入否需要登录',
      },
      button: {
        edit:'编辑',
        del:'删除',
        query: "查询",
        add: "添加",
        whole:'显示所有',
        batchRemove: "批量删除",
        condition: "显示筛选"
      },
      currentRow: null,
      buttons: {
        //按钮的权限控制
        selectshow: false,
        addshow: false,
        updateshow: false,
        delshow: false,
        ischeckshow: false,
        setstateshow: false
      },
      elCardBox: false,
      paraSwitch: paraHelper, //开关按钮使用
      paraMenu: paraHelper, //菜单列表使用
      para: paraHelper, //列表
      addPara: paraHelper, //添加参数
      updatePara: paraHelper, //编辑参数
      delPara: paraHelper, //删除参数
      options: [],
      selectedOptions: [],
      dialogStatus: "",
      dialogFormVisibleAdd: false, //控制添加显示
      dialogFormVisibleEdit: false, //控制编辑显示

      filters: {//查询筛选
        // Page: this.page,
        // jiekoumingcheng: this.modelData1,
        Page: 1,
        Size: 10
      },
      // modelData:{
      //   Data1
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
      // 编辑界面数据
      editForm: {
        id: 0,
        jiekoumingcheng: "",
        bllcode: "",
        shifouyanzheng: true,
        shifouxuyaodenglu: true,
        shifouguanlihoutai: true,
        // caidanguanlian: 9,
        caidanguanlian: "",
        shifouqiyong: true,
        chuangjianriqi: "",
        beizhu: ""
      },
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
    //查询
    getKeyList() {
      this.page = 1;
      this.getDataList();
    },
    //显示所有
    getKeyLists() {
      this.page = 1;
      this.para.Code = this.bllCode.getList;
      this.para.Data = ''
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
      this.page = val;
      this.getDataList();
    },
    //获取菜单列表
    getMenuList() {
      this.paraMenu.Code = this.bllCode.getListMenu;
      // this.paraMenu.Code = "GetTreeMenu"
      this.paraMenu.Data = "";
      handlePost(this.paraMenu)
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
    // 获取列表
    getDataList() {
      this.getMenuList()
      // const paraSelect = {
      //   jiekoumingcheng: this.filters,
      //   Page: this.page,
      //   Size: 10
      // };
      this.para.Code = this.bllCode.getList;
      this.para.Data = JSON.stringify(this.filters);
      console.log ('filters!!!',this.filters)
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.total = res.Data.Count;
          this.dataList = res.Data.List;
          this.filters = {
            Page: 1,
            Size: 10
          }
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
        .catch(err => {
          console.log(err);
        });
    },
    //双击编辑
    Rowdblclick(val) {
      this.currentRow = val;
      console.log(this.currentRow);
      this.getMenuList();
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = Object.assign({}, this.currentRow);
    },

    //
    checkbox(val) {
      console.log("单击：", val);
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.getMenuList();
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = Object.assign({}, row);
    },
    // 显示添加界面
    handleAdd() {
      this.editForm = {};
      this.getMenuList();
      this.dialogStatus = "create";
      this.dialogFormVisibleAdd = true;
      this.editForm = {
        id: 0,
        jiekoumingcheng: "",
        bllcode: "",
        shifouyanzheng: true,
        shifouxuyaodenglu: true,
        shifouguanlihoutai: true,
        // caidanguanlian: [4, 4, 9],
        caidanguanlian: 0,
        shifouqiyong: true,
        chuangjianriqi: "",
        beizhu: ""
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
    this.loadButton(store.getters.interfaces); //按钮显示
    this.getDataList();
  }
};
</script>

<style scoped>
.box-cardBox {
  background: #e8edf0;
}

</style>
