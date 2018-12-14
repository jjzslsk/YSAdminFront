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
            <el-form-item>
              <el-button size="mini" icon="el-icon-menu" v-if="this.ObjButton.add.isShow==true" type="success" @click="basics">更多控件</el-button>
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

    <!--控件界面 -->
    <el-dialog title="基础控件" :visible.sync="dialogFormVisibleBasics" :close-on-click-modal="false">
      <template>
  <div id="components-button-demo-button-group">
    <h4>Basic</h4>
    <a-button-group>
      <a-button>Cancel</a-button>
      <a-button type="primary">OK</a-button>
    </a-button-group>
    <a-button-group>
      <a-button disabled>L</a-button>
      <a-button disabled>M</a-button>
      <a-button disabled>R</a-button>
    </a-button-group>
    <a-button-group>
      <a-button type="primary">L</a-button>
      <a-button>M</a-button>
      <a-button>M</a-button>
      <a-button type="dashed">R</a-button>
    </a-button-group>

    <h4>With Icon</h4>
    <a-button-group>
      <a-button type="primary">
        <a-icon type="left" />Go back
      </a-button>
      <a-button type="primary">
        Go forward<a-icon type="right" />
      </a-button>
    </a-button-group>
    <a-button-group>
      <a-button type="primary" icon="cloud" />
      <a-button type="primary" icon="cloud-download" />
    </a-button-group>
  </div>
</template>
      <el-row>
        <h5>按钮</h5>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
      <hr>
      <el-row>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="success" icon="el-icon-check" circle></el-button>
        <el-button type="info" icon="el-icon-message" circle></el-button>
        <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-row>
      <hr>
      <h5>多选</h5>
      <template>
        <el-checkbox-group v-model="checkList1">
          <el-checkbox label="复选框 A"></el-checkbox>
          <el-checkbox label="复选框 B"></el-checkbox>
          <el-checkbox label="复选框 C"></el-checkbox>
          <el-checkbox label="禁用" disabled></el-checkbox>
          <el-checkbox label="选中且禁用" disabled></el-checkbox>
        </el-checkbox-group>
      </template>
      <hr>
      <h5>select 选择器</h5> 
      <template>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <hr>
      <h5>开关</h5> 
      <el-switch
        v-model="value3"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
      <hr>
      <h5>Transfer 穿梭框</h5> 
      <template>
        <el-transfer v-model="value1" :data="data"></el-transfer>
      </template>
      <hr>
      <h5>Table 表格</h5>
      <template>
        <el-table
          :data="tableData1"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </template>
      <hr>
      <h5>树</h5>
      <el-tree :data="data3" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      <hr>
      <h5>Pagination 分页</h5>
      <div class="block">
        <span class="demonstration">页数较少时的效果</span>
        <el-pagination
          layout="prev, pager, next"
          :total="50">
        </el-pagination>
      </div>
      <div class="block">
        <span class="demonstration">大于 7 页时的效果</span>
        <el-pagination
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <hr>
      <h5>下拉菜单</h5>
      <el-dropdown>
        <span class="el-dropdown-link">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <hr>
      <el-form :model="getDataForm" label-width="100px"  ref="getDataForm">
        <el-form-item label="name" prop="jiekoumingcheng">
          <el-input v-model="getDataForm.jiekoumingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <hr>
        <el-form-item label="name">
          <el-radio-group v-model="getDataForm.shifouxuyaodenglu">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <hr>
        <h5>文本框</h5>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="getDataForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleBasics=false">取消</el-button>
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
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };

      return {
         checkList1: ['选中且禁用','复选框 A'],

         options2: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value2: '',

        value3:true,

      data: generateData(),
        value1: [1, 4],

        tableData1: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],

          data3: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
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
        dialogFormVisibleBasics: false, //控件显示
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

      handleNodeClick(data) {
        console.log(data);
      },
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
      //显示所有控件
      basics(){
        this.dialogFormVisibleBasics = true;
        this.$refs["getDataForm"].resetFields(); //重置getDataForm 
      },
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
/* -------------------------- */
#components-button-demo-button-group h4 {
  margin: 16px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
}
#components-button-demo-button-group h4:first-child {
  margin-top: 0;
}
#components-button-demo-button-group .ant-btn-group {
  margin-right: 8px;
}
</style
</style>
