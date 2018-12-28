<template>
  <section class="app-container">
    <el-card class="box-card">
        
    <!--工具条-->
      <el-form :inline="true" :model="filters" @submit.native.prevent>
          <a-button  v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">刷新</a-button>
          <a-button type="primary" @click="handleAdd">{{button.add}}</a-button>
          <!-- <a-button type="primary" @click="handleAdd">编辑</a-button> -->
          <a-button type="primary" @click="Refresh">刷新</a-button>
          <!-- <a-button type="primary" @click="allotButton">分配按钮</a-button> -->
          <a-button type="primary" @click="allotMent">权限</a-button>
          <a-button type="primary" @click="allotRoles">角色</a-button>
      <a-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</a-button>
      <el-form-item style="float: right;">
          <a-button type="primary" @click="getKeyList">查询</a-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <a-input-group compact>
            <a-select  @change="this.handleSelectChange" defaultValue="名称" style="width: 40%">
                <a-select-option value='Id'>Id</a-select-option>
                <a-select-option value='Pid'>名称</a-select-option>
                <a-select-option value='Url'>账号</a-select-option>
                <!-- <a-select-option value='Name'>名称</a-select-option> -->
            </a-select>
          <a-input style="width: 60%" defaultValue="" v-model="filters.data"/>
        </a-input-group>
        </el-form-item>
      </el-form>

    <!-- 部门树形 -->
  <el-col style="height:100%;margin-top: 2.5rem;" :span="4">
  <el-card class="box-card">
  <!-- <div slot="header" class="clearfix">
    <el-input
      placeholder="快速查找部门"
      v-model="filterText">
    </el-input>
    <el-button style="float: right; padding: 3px 0" type="text"></el-button>
  </div> -->
  <div class="text item">
    <template>
      <a-tree
        @select="onSelect"
        :treeData="dataList"
      />
    </template>

    <!-- <el-tree
      class="filter-tree"
      :data="menus"
      :props="defaultProps"
      default-expand-all
      node-key="value"
      :highlight-current='true'
      :filter-node-method="filterNode"
      @node-click='changeClick'
      ref="tree2">
    </el-tree> -->
  </div>
</el-card>

    </el-col>
    <el-col :span="20" class="UserTable">
    <el-card class="box-card">

    <el-table @row-dblclick='Rowdblclick' :data="users" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="Id" label="Id" width="60">
      </el-table-column>
      <el-table-column prop="Name" label="名称" width="120">
      </el-table-column>
      <el-table-column prop="Username" label="账号" width="120">
      </el-table-column>
      <el-table-column prop="DepartmentName" label="部门名称" width="120">
      </el-table-column>
      <el-table-column prop="Rolejson" label="角色名称" width="120">
      </el-table-column>
      <el-table-column prop="Email" label="邮箱" width="120">
      </el-table-column>
      <el-table-column prop="Mobile" label="手机" width="120">
      </el-table-column>
      <el-table-column prop="Issuper" label="是否超管" width="100" :formatter="formatIsAdmin">
      </el-table-column>
      <el-table-column prop="State" label="是否启用" min-width="100" :formatter="formatIsDisabled">
      </el-table-column>
      <el-table-column prop="Memo" label="备注" min-width="100">
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <a @click="handleEdit(scope.$index, scope.row)">编辑</a>
          <a @click="handleDel(scope.$index, scope.row)">删除</a>
        </template>
      </el-table-column>
    </el-table>

      <!--工具条-->
    <el-col :span="24" class="toolbar"><el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    </el-card>
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
    <!-- <el-col :span="24" class="toolbar"><el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col> -->

        <a-modal title="分配按钮" v-model="dialogFormVisibleRoles" @ok="dialogFormVisibleRoles = true" @click="dialogFormVisibleRoles = true">
      <template>
        <a-transfer
          :titles="['未选角色', '已选角色']"
          :dataSource="mockData"
          :filterOption="filterOption"
          :targetKeys="targetKeys"
          @change="handleChange"
          :render="item=>item.title"
        >
        </a-transfer>
      </template>

      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleRoles=false">取消</a-button>
        <a-button type="primary" @click.native="dialogFormVisibleRoles=false">确认</a-button>
      </div>
    </a-modal>

        <!--二维权限-->
    <a-modal class="allotMent" title="分配权限" @ok="handleOkData" @click="allotMent" v-model="dialogFormVisibleData">
          <a-table defaultExpandAllRows :pagination="false" size="small" :columns="columnsTree" :dataSource="dataTree" :rowSelection="rowSelectionTree">
              <span slot="tags" slot-scope="tags">
                <a-checkbox></a-checkbox>
              </span>
              <span slot="action" slot-scope="text, record">
                <a href="javascript:;">{{record.edit}}</a>
                <a-divider type="vertical" />
                <a href="javascript:;">{{record.del}}</a>
              </span>
          </a-table>
      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleData=false">取消</a-button>
        <a-button type="primary" @click.native="dialogFormVisibleData=false">确认</a-button>
      </div>
    </a-modal>

    <!--添加界面-->
    <a-modal title="添加用户" @ok="dialogFormVisibleAdd = true" @click="createData" v-model="dialogFormVisibleAdd">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="Username">
          <el-input v-model="editForm.Username" auto-complete="off" :disabled="disabledZhangHao" placeholder="设置后不可更改"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="PasWord-">
          <el-input type="password" :disabled="disabledMima" v-model="editForm.PasWord" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="真实姓名:" prop="zhenshixingming">
          <el-input v-model="editForm.zhenshixingming" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="手机:" prop="Mobile">
          <el-input v-model="editForm.Mobile"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否超管:" prop="Issuper">
          <el-radio-group v-model="editForm.Issuper">
            <el-radio class="radio" :label='true'>是</el-radio>
            <el-radio class="radio" :label='false'>否</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="是否启用:" prop="State">
          <el-radio-group v-model="editForm.State">
            <el-radio class="radio" :label='true'>启用</el-radio>
            <el-radio class="radio" :label='false'>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="邮箱:" prop="Email" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="editForm.Email"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="editForm.Memo"></el-input>
        </el-form-item>
        <!-- <el-form-item label="角色:">
            <el-select v-model="editForm.RoleIds" placeholder="请选择">
                <el-option v-for="item in roles" :key="item.Id" :label="item.Name" :value="item.Id">
                  {{item.Name}}</el-option>
            </el-select>
        </el-form-item> -->
        {{editForm}}
        {{editForm.RoleIds}}11

        <el-form-item label="角色:">
        <template>
          <a-select size="large" mode="multiple" style="width: 100%" @change="handleChangeSelect" placeholder="选择角色">
            <a-select-option v-for="item in roles" :key="item.Id">{{item.Name}}</a-select-option>
          </a-select>

        </template>

        </el-form-item>
        <el-form-item label="部门:">
            <el-select v-model="editForm.DepartmentId" placeholder="请选择">
                <el-option v-for="item in departments" :key="item.Name" :label="item.Name" :value="item.Id">
                  {{item.Name}}</el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisibleAdd=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </a-modal>

    <!--编辑界面-->
    <a-modal title="编辑用户" @ok="dialogFormVisibleEdit = true" @click="updateData" v-model="dialogFormVisibleEdit">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号:" prop="Username">
          <el-input v-model="editForm.Username" auto-complete="off" :disabled="disabledZhangHao" placeholder="设置后不可更改"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="PasWord">
          <el-input type="password" :disabled="disabledMima" v-model="editForm.PasWord" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="真实姓名:" prop="zhenshixingming">
          <el-input v-model="editForm.zhenshixingming" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="手机:" prop="Mobile">
          <el-input v-model="editForm.Mobile"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否超管:" prop="Issuper">
          <el-radio-group v-model="editForm.Issuper">
            <el-radio class="radio" :label='true'>是</el-radio>
            <el-radio class="radio" :label='false'>否</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
          <el-col :span="12">
        <el-form-item label="是否启用:" prop="State">
          <el-radio-group v-model="editForm.State">
            <el-radio class="radio" :label='true'>启用</el-radio>
            <el-radio class="radio" :label='false'>禁用</el-radio>
          </el-radio-group>
        </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="邮箱:" prop="Email" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="editForm.Email"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
        <el-form-item label="部门:">
                        <el-select v-model="editForm.DepartmentId" placeholder="请选择">
                            <el-option v-for="item in departments" :key="item.Name" :label="item.Name" :value="item.Id">
                              {{item.Name}}</el-option>
                        </el-select>
                    </el-form-item>
          </el-col>
          <el-col :span="12">
                    <el-form-item label="角色:">
                        <el-select v-model="editForm.RoleIds" placeholder="请选择">
                            <el-option v-for="item in roles" :key="item.Id" :label="item.Name" :value="item.Id">
                              {{item.Name}}</el-option>
                        </el-select>
                    </el-form-item>
          </el-col>
          </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisibleEdit=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </a-modal>


    </el-card>
  </section>
</template>

<script>
import store from "@/store/index.js"; //引入本地存储
import util from "@/utils/table.js";
import { handlePost, handleGet } from "@/api/apihelper.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式

const columnsTree= [
//   {
//   dataIndex: 'name',
//   key: 'name',
//   slots: { title: 'customTitle' },
// }
,{
  title: '菜单名称',
  key: 'name',
  dataIndex: 'name',
},{
  title: '浏览',
  key: 'icon',
  dataIndex: 'icon',
  scopedSlots: { customRender: 'tags' },
},{
  title: '添加',
  key: 'code',
  dataIndex: 'code',
  scopedSlots: { customRender: 'tags' },
},{
  title: '下话单',
  key: 'url',
  dataIndex: 'url',
  scopedSlots: { customRender: 'tags' },
},{
  title: '重发通知',
  key: 'show',
  dataIndex: 'show',
  scopedSlots: { customRender: 'tags' },
},{
  title: '重置',
  key: 'sort',
  dataIndex: 'sort',
  scopedSlots: { customRender: 'tags' },
},{
  title: '编辑',
  key: 'action',
  dataIndex: 'action',
  scopedSlots: { customRender: 'tags' },
  // scopedSlots: { customRender: 'action' },
},{
  title: '删除',
  key: 'del',
  dataIndex: 'del',
  scopedSlots: { customRender: 'tags' },
  // scopedSlots: { customRender: 'action' },
},{
  title: '查询',
  key: 'query',
  dataIndex: 'query',
  scopedSlots: { customRender: 'tags' },
  // scopedSlots: { customRender: 'action' },
},{
  title: '导出',
  key: 'export',
  dataIndex: 'export',
  scopedSlots: { customRender: 'tags' },
  // scopedSlots: { customRender: 'action' },
}];

const dataTree = [{
  key: 1,
  name: '系统设置',
  icon:'icon',
  code:'Button',
  url:'sys/ButtonList',
  sort:'1',
  age: 60,
  edit:'编辑',
  del:'删除',
  children: [{
    key: 11,
    name: '导航菜单',
    icon:'icon',
    code:'Button',
    url:'sys/ButtonList',
    sort:'1',
    age: 42,
    edit:'编辑',
    del:'删除',
  }, {
    key: 12,
    name: '用户管理',
    icon:'icon',
    code:'Button',
    url:'sys/ButtonList',
    sort:'1',
    age: 30,
    edit:'编辑',
    del:'删除',
    tags: ['nice', 'developer','111'],
  }, {
    key: 13,
    name: '部门管理',
    icon:'icon',
    code:'Button',
    url:'sys/ButtonList',
    sort:'1',
    age: 72,
    edit:'编辑',
    del:'删除',
  }],
}, {
  key: 2,
  name: '财务管理',
  icon:'icon',
  code:'Button',
  url:'sys/ButtonList',
  sort:'1',
  age: 32,
  edit:'编辑',
  del:'删除',
  children: [{
    key: 22,
    name: '奖金明细',
    icon:'icon',
    code:'Button',
    url:'sys/ButtonList',
    sort:'1',
    age: 42,
    edit:'编辑',
    del:'删除',
  }
  ]
}];

const rowSelectionTree = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const treeData = [{
  title: '0-0',
  key: '0-0',
  children: [{
    title: '0-0-0',
    key: '0-0-0',
    children: [
      { title: '0-0-0-0', key: '0-0-0-0' },
      { title: '0-0-0-1', key: '0-0-0-1' },
      { title: '0-0-0-2', key: '0-0-0-2' },
    ],
  }, {
    title: '0-0-1',
    key: '0-0-1',
    children: [
      { title: '0-0-1-0', key: '0-0-1-0' },
      { title: '0-0-1-1', key: '0-0-1-1' },
      { title: '0-0-1-2', key: '0-0-1-2' },
    ],
  }, {
    title: '0-0-2',
    key: '0-0-2',
  }],
}, {
  title: '0-1',
  key: '0-1',
  children: [
    { title: '0-1-0-0', key: '0-1-0-0' },
    { title: '0-1-0-1', key: '0-1-0-1' },
    { title: '0-1-0-2', key: '0-1-0-2' },
  ],
}, {
  title: '0-2',
  key: '0-2',
}]
export default {
  data() {
    return {

      //按钮KEY
      buttonKey:'',

    mockDatas: [
    { chosen: true,
      key: "0",
      title: "管理员",
      },
      {
      chosen: false,
      key: "1",
      title: "运营管理",
      },
      { chosen: true,
      key: "2",
      title: "运营人员",
      },
      {
      chosen: false,
      key: "3",
      title: "市场管理",
      }
  ],

      mockData: [],
      targetKeys: [],

      // tree列表
      dataTree,
      columnsTree,
      rowSelectionTree,

        dataList: [], //主页数据
      //tree
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
      treeData,


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
        getList: "GetYsdatabaseYsAdmin", //获取列表
        getObj: "GetSource", //获取对象（单个）
        getRolesList: "GetListYsdatabaseYsRole", //获取角色
        getListDepartment: "GetYsdatabaseYsDepartment", //获取部门
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
      dialogFormVisibleEdit: false,
      dialogFormVisibleData:false,
      dialogFormVisibleButton:false,
      dialogFormVisibleRoles:false,
      filters: {},
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
        RoleIds:[]
      },
      Roles: [],

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
        checkedKeys(val) {
      console.log('onCheck', val)
    },
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    //穿梭框
      getMock() {
      const targetKeys = [];
      const mockData = [];
      for (let i = 0; i < this.mockDatas.length; i++) {
        const data = {
          key: this.mockDatas[i].key,
          title: this.mockDatas[i].title,
          chosen:this.mockDatas[i].chosen,
        };
        if (data.chosen) {
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
      this.mockData = mockData

      this.targetKeys = targetKeys
    },
    filterOption(inputValue, option) {
      return option.description.indexOf(inputValue) > -1;
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys
    },
    //搜索
    handleSelectChange (value) {
      this.selectValue = value
      // this.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      // })
    },
        //窗口事件
    handleOk() {
      this.dialogFormVisibleIcon = false;
    },
    handleOkEdit() {
      this.dialogFormVisibleEdit = false;
    },
    handleOkButton() {
      this.dialogFormVisibleButton = false;
    },
    handleOkData(){
      this.dialogFormVisibleData = false;
    },
        //刷新页面
    Refresh() {
      (this.filters = {
        Page: 1,
        Size: 15
      }),
        this.getDataList();
    },
        //穿梭框
    handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
    //图标
    allotIcon() {
      this.dialogFormVisibleIcon = true;
    },
    allotRoles() {
      // this.buttonKey = data
      this.getMock()
      this.dialogFormVisibleRoles = true;
    },
    //分配二维权限
    allotMent() {
      this.dialogFormVisibleData = true;
    },
    //
    onExpand (expandedKeys) {
      console.log('onExpand', expandedKeys)
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    // onSelect (selectedKeys, info) {
    //   console.log('onSelect', info)
    //   this.selectedKeys = selectedKeys
    // },
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    //
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
    //窗口控制
    handleOkEdit() {
      this.dialogFormVisibleEdit = false;
    },
    //刷新页面
    Refresh() {
      (this.filters = {
        Page: 1,
        Size: 15
      }),
        this.getDataList();
    },
    //多选角色
    handleChangeSelect(value) {
      console.log(`Selected: ${value}`);
      this.editForm.RoleIds = value
    },
    popupScroll(){
      console.log('popupScroll')
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
      return row.Issuper === true ? "是" : "否";
    },
    // 状态显示转换
    formatIsDisabled: function(row, column) {
      return row.State === false ? "禁用" : "启用";
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
      //取列表
      const paraSelect = {
        DepartmentId: 1,
        Page: this.page,
        Size: 10
      };
      this.para.Code = 'GetListYsdatabaseYsAdmin';
      this.para.Data = JSON.stringify(paraSelect);
      handlePost(this.para)
        .then(res => {
          if (res.IsSuccess == true) {
            this.total = res.Data.Count;
            this.users = res.Data.List;
          }
          console.log("userslist:", this.users);
          this.para.Data = "";
          this.para.Code = 'GetListYsdatabaseYsDepartment';          
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.departments = res.Data.List;
              console.log("departments111111:", this.departments);
              this.para.Code = 'GetListYsdatabaseYsRole';
              handlePost(this.para).then(res => {
                if (res.IsSuccess == true) {
                  this.roles = res.Data.List;
                  console.log("roles:", this.roles);
                }
              });
            
            }
          });
          //取部门树
      const paraTree = {
        // Page: this.page,
        // Size: 10
      };
      // this.dataList = [];
      this.para.Code = 'GetTreeYsdatabaseYsDepartment';
      this.para.Data = JSON.stringify(paraTree);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.dataList = res.Data;
          console.log ('this.dataList:::000000',this.dataList)
          this.getMenuName()


        }
      });


        })
        .catch(err => {
          console.log(err);
        });

        
       

    },
    //
    
    //闭包
    getMenuName() {
            var menus  = this.dataList
            var Key = 1
            var name = "" ;
            for (var i = 0; i < menus.length; i++) {
              if (menus[i].Key == Key) {
                name = menus[i].Name;
                break;
              }
              else {
                (function () {
                  var m = arguments[0];
                  var menuKey = arguments[1];
                  for (var j = 0; j < m.length; j++) {
                    if (m[j].Key == menuKey) {
                      name = m[j].Name;
                      break;
                    }
                    else if (m[j].children != null && m[j].children.length > 0) {
                      arguments.callee(m[j].children, val);//递归匿名方法
                    }
                  }
                })(menus[i].children, Key);
              }
            }
            return name;
            // return alert (name)
            //
            
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
      this.dialogFormVisibleEdit = true;
      this.disabledZhangHao = true;
      this.disabledMima = true;
      this.editForm = {};
      const paraId = {
        Id: row.Id,
      }; 
      this.para.Code = 'GetYsdatabaseYsAdmin';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
      this.editForm = Object.assign({}, res.Data);
          // this.dataList = res.Data;

      this.para.Data = "";
      this.para.Code = 'GetListYsdatabaseYsDepartment';
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.departments = res.Data.List;
          this.para.Code = 'GetListYsdatabaseYsRole';
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.roles = res.Data.List;
            }
          });
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
        Issuper: true,
        State: true
      };
      this.para.Code = 'GetListYsdatabaseYsDepartment';      
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.departments = res.Data.List;
          // console.log(this.departments);
          this.para.Code = 'GetListYsdatabaseYsRole';
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
              this.para.Code = 'UpdateYsdatabaseYsAdmin';
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
            // this.editForm = {
              // RoleIds:[0,1,2]
            // }
            const paraObj = Object.assign({}, this.editForm);
            console.log (paraObj)
            this.para.Data = JSON.stringify(paraObj);
            this.para.Code = 'AddYsdatabaseYsAdmin';
            console.log('parapara111',this.para);
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
  height: 68rem;
}

</style>
