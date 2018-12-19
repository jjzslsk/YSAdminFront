<template>
  <section class="app-container sectionBox">
    <el-card class="box-card">

    <!-- 头部文字说明 -->
    <!-- <div class="panel-heading">
      <div class="panel-lead">
        <em>接口管理</em>
        <span>规则通常对应一个控制器的方法,同时左侧的菜单栏数据也从规则中体现,通常建议通过命令行进行生成规则节点</span>
      </div>
    </div> -->

    <!--工具条-->
    <div class="toolBox">
      <el-col :span="24" class="toolbar" style="height:100%; padding-bottom: 0px;line-height:40px">
        <el-form
          :inline="true"
          :model="filters"
          label-position
          label-width="120px"
          @submit.native.prevent
        >
          <div style="float: left;width:100%">
            <el-form-item>
              <el-button
                size="mini"
                v-if="ObjButton.query.isShow==true"
                icon="el-icon-refresh"
                type="info"
                v-on:click="Refresh"
              ></el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                size="mini"
                icon="el-icon-plus"
                v-if="this.ObjButton.add.isShow==true"
                type="primary"
                @click="handleAdd"
              >{{ObjButton.add.text}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                v-if="ObjButton.del.isShow==true"
                @click="manyDel"
                :disabled="this.sels.length===0"
              >{{ObjButton.manyDel.text}}</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                size="mini"
                icon="el-icon-more"
                v-if="this.ObjButton.add.isShow==true"
                type="success"
                @click="getKeyLists"
              >全部显示</el-button>
            </el-form-item>
            <el-form-item>
              <el-button
                size="mini"
                icon="el-icon-more"
                v-if="this.ObjButton.add.isShow==true"
                type="success"
                @click="allotButton"
              >图标</el-button>
            </el-form-item>
            <el-form-item style="float: right;">
              <el-input size="mini" v-model="filters.jiekoumingcheng" class="input-with-select">
                <el-select v-model="selectValue" slot="prepend" placeholder="请选择">
                  <el-option label="ID" value="1"></el-option>
                  <el-option label="接口名称" value="2"></el-option>
                  <el-option label="上级菜单" value="3"></el-option>
                  <el-option label="链接地址" value="4"></el-option>
                  <el-option label="页面标识" value="5"></el-option>
                  <el-option label="排序" value="6"></el-option>
                </el-select>
                <el-button size="mini" v-on:click="getKeyList" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-form-item>
          </div>
          <!-- <div style="float: right;line-height:40px;">
            <el-button-group>
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-tooltip class="item" effect="light" content="列" placement="top">
                    <el-button type="primary" size="mini" icon="el-icon-menu"></el-button>
                  </el-tooltip>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-checkbox-group v-model="checkList">
                    <el-checkbox
                      v-for="item in tableLabel"
                      :key="item.Label"
                      :label="item.Label"
                    >{{item.Label}}</el-checkbox>
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
          </div> -->
        </el-form>
      </el-col>
    </div>

    <el-table
      class="tablesSyl"
      fit
      @row-dblclick="Rowdblclick"
      stripe
      border
      :data="dataList"
      highlight-current-row
      @selection-change="selsChange"
    >
      <el-table-column
        v-for="item in tableLabel"
        :key="item.Label"
        :label="item.Label"
        :prop="item.prop"
        :width="item.width"
        :type="item.type"
      ></el-table-column>
      <!-- <el-table-column v-if="ischeckshow==true" prop="shifouyanzheng" label="是否验证" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shifouyanzheng" @change="setIsCheckInterface(scope.row)">
          </el-switch>
        </template>
      </el-table-column>-->
      <el-table-column v-if="setstateshow==true" prop="shifouqiyong" label="是否启用" width="100">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.shifouqiyong" @change="setStateInterface(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="shifouguanlihoutai"
        label="是否管理后台"
        width="120"
        :formatter="function(row, column){
          return row.shifouguanlihoutai == true ? '是' : '否'}"
      ></el-table-column>
      <el-table-column
        prop="shifouxuyaodenglu"
        label="是否需要登录"
        width="120"
        :formatter="function (row, column) {
          return row.shifouxuyaodenglu == true ? '是' : '否'}"
      ></el-table-column>
      <el-table-column
        v-if="ObjButton.edit.isShow==true||ObjButton.del.isShow==true"
        label="操作"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="padding: 7px 9px;margin-left: 0px;"
            icon="el-icon-edit"
            type="primary"
            v-if="ObjButton.query.isShow==true"
            @click="handleEdit(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            style="padding: 7px 9px;margin-left: 0px;"
            icon="el-icon-delete"
            type="danger"
            v-if="ObjButton.del.isShow==true"
            @click="handleDel(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" background :page-size="15" :total="total"
        style="float:right;">
      </el-pagination>-->
      <el-pagination
        style="float:right;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </el-col>

    </el-card>


    <!--图标-->
    <el-dialog title="添加" :visible.sync="dialogFormVisibleIcon" :close-on-click-modal="false">
      <ul class="anticons-list">
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleIcon=false">取消</el-button>
        <el-button size="mini" type="primary" @click.native="dialogFormVisibleIcon=false">确认</el-button>
      </div>
    </el-dialog>

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
            <el-form-item hidden="true" label="是否验证">
              <el-radio-group v-model="editForm.shifouyanzheng">
                <el-radio class="radio" :label="true">是</el-radio>
                <el-radio class="radio" :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否管理后台">
              <el-radio-group v-model="editForm.shifouguanlihoutai">
                <el-radio class="radio" :label="true">是</el-radio>
                <el-radio class="radio" :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否需要登录">
              <el-radio-group v-model="editForm.shifouxuyaodenglu">
                <el-radio class="radio" :label="true">是</el-radio>
                <el-radio class="radio" :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="菜单关联">
              <el-select v-model="editForm.caidanguanlian" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.mingcheng"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
              <el-radio-group v-model="editForm.shifouqiyong">
                <el-radio class="radio" :label="true">是</el-radio>
                <el-radio class="radio" :label="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" v-model="editForm.beizhu"></el-input>
            </el-form-item>
            <el-form-item label>
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
            multiple
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
          <el-row>
            <el-col :span="24" :offset="20">
              <el-button size="mini" type="primary">提交</el-button>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
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
        <el-form-item hidden="true" label="是否验证">
          <el-radio-group v-model="editForm.shifouyanzheng">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否管理后台">
          <el-radio-group v-model="editForm.shifouguanlihoutai">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否需要登录">
          <el-radio-group v-model="editForm.shifouxuyaodenglu">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单关联">
          <el-select v-model="editForm.caidanguanlian" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.mingcheng"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="editForm.shifouqiyong">
            <el-radio class="radio" :label="true">是</el-radio>
            <el-radio class="radio" :label="false">否</el-radio>
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
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { handlePost, handleGet } from "@/api/apihelper.js"; //统一操作api

export default {
  data() {
    return {
            //搜索
      input3: '',
      input4: '',
      input5: '',
      selectValue: '',
      //==================数据定义===========================
      //字段name code

      //添加 修改
      editForm: {
        // 界面数据
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
        Size: 15
      },

      //分页 列表
      total: 0, //分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4, //分页
      dataList: [], //列表数据
      sels: [], // 列表选中列 全选
      checkList: [], //存储列表字段隐藏，
      currentRow: null, //双击编辑 存列表数据
      tableLabel: [
        //列表数组
        {
          type: "selection"
        },
        {
          Label: "ID",
          prop: "id"
        },
        {
          Label: "接口名称",
          prop: "jiekoumingcheng"
        },
        {
          Label: "接口标识",
          prop: "bllcode"
        },
        {
          Label: "菜单关联",
          prop: "caidanguanlian"
        },
        {
          Label: "备注",
          prop: "beizhu"
        }
      ],

      //控制模块显示隐藏
      elCardBox: false, //搜索模块显示隐藏
      dialogFormVisibleAdd: false, //控制添加显示
      dialogFormVisibleIcon: false, //控制添加显示
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
          text: "添加", //按钮文字
          Code: "AddInterface",
          isShow: false //是否显示
        },
        query: {
          text: "查询",
          Code: "GetListInterface",
          isShow: false
        },
        edit: {
          text: "编辑",
          Code: "UpdateInterface",
          isShow: false
        },
        del: {
          text: "删除",
          Code: "DelInterface",
          isShow: false
        },
        manyDel: {
          text: "批量删除",
          Code: "DelInterface",
          isShow: false
        }
      },
      //===================搜索定义==========================
      formRemove: {
        jiekoumingcheng: {
          text: "接口名称", //搜索标题
          tips: "接口名称", //搜索提示
          isShow: false
        },
        bllCode: {
          text: "接口标识",
          tips: "接口标识"
        },
        caidanguanlian: {
          text: "菜单关联",
          tips: "菜单关联"
        },
        shifouyanzheng: {
          text: "是否验证",
          tips: "是否验证"
        },
        shifouqiyong: {
          text: "是否启用",
          tips: "是否启用"
        },
        shifouguanlihoutai: {
          text: "是否管理后台",
          tips: "是否管理后台"
        },
        shifouxuyaodenglu: {
          text: "是否需要登录",
          tips: "是否需要登录"
        }
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

      addFormRules: {
        name: [
          {
            required: true,
            message: "接口名称",
            trigger: "blur"
          }
        ]
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
    //分配按钮
    allotButton() {
      this.dialogFormVisibleIcon = true;
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
        shifouqiyong: true
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
      this.para.Code = "GetInterface";
      this.para.Data = JSON.stringify(id);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.editModel = res.Data;
          //弹窗
        } else {
          this.$message({
            message: res.Code + ":" + res.message,
            type: "warning"
          });
        }
      });
    },
    //刷新页面
    Refresh() {
      (this.filters = {
        Page: 1,
        Size: 15
      }),
        this.getDataList();
    },
    //分页查询
    handleCurrentChange(val) {
      this.filters.Page = val;
      this.getDataList();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
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
      this.para.Code = "SetIsCheckInterface";
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
      this.para.Code = "SetStateInterface";
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
    //显示所有
    getKeyLists() {
      (this.filters = {
        Page: 1,
        Size: null
      }),
        (this.para.Code = this.ObjButton.query.Code);
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
      this.para.Code = "GetListMenu";
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
    }
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
  padding: 5px 0;
}
.anticons-list {
  overflow: hidden;
  padding-left: 0px;
}
.anticons-list li {
  float: left;
  /* width: 16.66%; */
  text-align: center;
  list-style: none;
  cursor: pointer;
  /* height: 100px; */
  color: #555;
  -webkit-transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;
  position: relative;
  /* margin: 3px 0; */
  /* border-radius: 4px; */
  background-color: #fff;
  overflow: hidden;
  /* padding: 10px 0 0; */
}
.anticons-list li .anticon {
    font-size: 36px;
    /* margin: 12px 0 8px; */
    -webkit-transition: -webkit-transform .3s ease-in-out;
    transition: -webkit-transform .3s ease-in-out;
    transition: transform .3s ease-in-out;
    transition: transform .3s ease-in-out,-webkit-transform .3s ease-in-out;
    will-change: transform;
}
</style>
