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
        <el-form-item>
      <el-button size="mini" v-if="buttons.addshow==true" type="primary" @click="handlePermissionData">分配权限</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
      
    <el-table class="tablesSyl" @row-dblclick='Rowdblclick' :data="dataList" stripe border fit  highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="juesemingcheng" label="角色名称" width="120">
      </el-table-column>
      <el-table-column prop="paixu" label="排序" width="120">
      </el-table-column>
      <!-- <el-table-column prop="moren" label="默认" width="120">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.moren" @change="setMorenRole(scope.row)">
          </el-switch>
        </template>
      </el-table-column> -->
      <el-table-column prop="beizhu" label="备注" min-width="160">
      </el-table-column>
      <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true||buttons.interfaceshow==true||buttons.menushow==true" label="操作" width="400">
        <template slot-scope="scope">
          <el-button size="mini" v-if="buttons.updateshow==true" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!-- <el-button size="mini" v-if="buttons.menushow==true" @click="handlePermissionMenu(scope.$index, scope.row)">菜单权限</el-button> -->
          <!-- <el-button size="mini" v-if="buttons.interfaceshow==true" @click="handlePermissionInterface(scope.$index, scope.row)">接口权限</el-button> -->
          <!-- <el-button size="mini" v-if="buttons.interfaceshow==true" @click="handlePermissionData(scope.$index, scope.row)">接口权限1</el-button> -->
          <el-button size="mini" v-if="buttons.delshow==true" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    </el-card>

        <!--添加界面-->
    <el-dialog title="添加" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="editForm.juesemingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="默认">
          <el-radio-group v-model="editForm.moren">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="权限">
          <el-select v-model="value11" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleAdd=false">取消</el-button>
        <el-button size="mini" type="primary" @click="createData">添加</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="dialogFormVisibleEdit" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称" prop="RoleName">
          <el-input v-model="editForm.juesemingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item>
        <!-- <el-form-item label="默认">
          <el-radio-group v-model="editForm.moren">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <!-- <el-form-item label="权限">
          <el-select v-model="value11" multiple collapse-tags style="margin-left: 20px;" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleEdit=false">取消</el-button>
        <el-button size="mini" type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>



    <!-- 分配菜单权限 -->
    <el-dialog style="Height:400px" title="菜单分配" :visible.sync="dialogFormPermissionVisibleMenu"
      :close-on-click-modal="false" @open="callbackUp(dialogStatus)">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input size="mini" v-model="editForm.juesemingcheng" placeholder="角色名称"><template slot="prepend">
                当前选中角色为：</template></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-row class="tac tree-row">
        <el-col :span="24">
          <el-tree :data="menus" ref="tree" show-checkbox node-key="value" :default-expanded-keys="[2, 3]"
            :default-checked-keys="this.editForm.caidanguanlian" :props="defaultProps" default-expand-all>
          </el-tree>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormPermissionVisibleMenu=false">取消</el-button>
        <el-button size="mini" type="primary" @click="SetMenuRole">保存</el-button>
      </div>
    </el-dialog>

      <!-- 分配接口权限1 -->
    <el-dialog width="80%" style="Height:400px" title="1接口分配" :visible.sync="dialogFormVisibleData"
      :close-on-click-modal="false" @open="callbackUp(dialogStatus)">
      <!--工具条-->
      <!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input size="mini" v-model="editForm.juesemingcheng" placeholder="角色名称"><template slot="prepend">
                当前选中角色为：</template></el-input>
          </el-form-item>
        </el-form>
      </el-col> -->
      <div class="table-operations">
        <el-button size="mini" type="primary">全选</el-button>
        <el-button size="mini" type="primary">应用</el-button>        
      </div>
    <!--列表--> 
      <template>
        <a-table defaultExpandAllRows :pagination="false" size="small" :columns="columnsTree" :dataSource="dataTree" :rowSelection="rowSelectionTree">
          <a slot="name" slot-scope="text" href="javascript:;">{{text}}1</a>
          <span slot="customTitle">
            <!-- <a-checkbox></a-checkbox>  -->
            菜单名称</span>
          <span slot="tags" slot-scope="tags">
            <!-- <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag> -->
            <a-checkbox></a-checkbox>
          </span>
        </a-table>
        <!-- <template slot-scope="scope">
          <el-switch>
          </el-switch>
        </template> -->
      </template>


      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleData=false">取消</el-button>
        <el-button size="mini" type="primary">保存</el-button>
      </div>
    </el-dialog>

    <!-- 分配接口权限 -->
    <el-dialog style="Height:400px" title="接口分配" :visible.sync="dialogFormPermissionVisibleInterface"
      :close-on-click-modal="false" @open="callbackUp(dialogStatus)">
      <!--工具条-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters" @submit.native.prevent>
          <el-form-item>
            <el-input size="mini" v-model="editForm.juesemingcheng" placeholder="角色名称"><template slot="prepend">
                当前选中角色为：</template></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-row class="tac">
        <el-col :span="24">
          <!--列表-->
          <el-table :data="this.interface" ref="table" highlight-current-row @selection-change="selsChangeInterface"
            :max-height="400" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="40">
            </el-table-column>
            <el-table-column prop="jiekoumingcheng" label="接口名称" width="150">
            </el-table-column>
            <el-table-column prop="bllcode" label="接口标识" width="150">
            </el-table-column>
            <el-table-column prop="beizhu" label="备注" min-width="160">
            </el-table-column>
            <el-table-column prop="chuangjianriqi" label="创建时间" width="100">
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormPermissionVisibleInterface=false">取消</el-button>
        <el-button size="mini" type="primary" @click="SetInterfaceRole">保存</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import store from "@/store/index.js"; //引入本地存储
import util from "@/utils/table.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { handlePost, handleGet } from "@/api/apihelper.js";

const columnsTree = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' },
},{
  title: '浏览',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
},{
  title: '添加',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
},{
  title: '编辑',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
},{
  title: '删除',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
},{
  title: '导入',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
},{
  title: '导出',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
},{
  title: '下话单',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
},{
  title: '重发通知',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
},{
  title: '重置',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
}];

const dataTree = [{
  key: 1,
  name: '系统设置',
  age: 60,
  add: 'New York No. 1 Lake Park',
  edit:'编辑1',
  del:'删除1',
  children: [{
    key: 11,
    name: '导航菜单',
    age: 42,
    add: 'New York No. 2 Lake Park',
    edit:'编辑1',
    del:'删除1',
  }, {
    key: 12,
    name: '用户管理',
    age: 30,
    add: 'New York No. 3 Lake Park',
    edit:'编辑1',
    del:'删除1',
    tags: ['nice', 'developer','111'],
  }, {
    key: 13,
    name: '部门管理',
    age: 72,
    add: 'London No. 1 Lake Park',
    edit:'编辑1',
    del:'删除1',
  }],
}, {
  key: 2,
  name: '财务管理',
  age: 32,
  add: 'Sidney No. 1 Lake Park',
  edit:'编辑1',
  del:'删除1',
  children: [{
    key: 22,
    name: '奖金明细',
    age: 42,
    add: 'New York No. 2 Lake Park',
    edit:'编辑1',
    del:'删除1',
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

export default {
  data() {
    return {
      // tree列表
      dataTree,
      columnsTree,
      rowSelectionTree,
      bllCode: {
        
        //接口标识，由后端提供
        add: "AddRole", //添加
        edit: "UpdateRole", //修改
        del: "DelRole", //删除
        getList: "GetListRole", //获取列表
        getObj: "GetRole", //获取对象（单个）
        getInterfaceList: "GetListInterface", //获取接口列表
        setInterfaceRole: "SetInterfaceRole", //提交接口分配
        setMorenRole: "SetMorenRole", //设置默认角色
        getTreeMenu: "GetTreeMenu", //获取树形菜单
        setMenuRole: "SetMenuRole" //提交菜单分配
      },
      filtersName: "角色名称",
      button: {
        query: "查询",
        add: "添加",
        batchRemove: "批量删除"
      },
      buttons: {
        //按钮的权限控制
        selectshow: false,
        addshow: false,
        updateshow: false,
        delshow: false,
        menushow: false,
        interfaceshow: false
      },
      paraSwitch: paraHelper, //开关按钮使用
      paraInterface: paraHelper, //获取interface
      paraMenu: paraHelper, //获取menus
      para: paraHelper, //获取主list
      addPara: paraHelper, //添加参数
      editPara: paraHelper, //编辑参数
      delPara: paraHelper, //删除参数
      defaultProps: {
        children: "children",
        label: "label"
      },
      dialogStatus: "",
      textMap: {
        update: "编辑角色",
        create: "添加角色",
        updatePermissionMenu: "菜单分配",
        updatePermissionInterface: "接口分配"
      },
      dialogFormVisibleData: false, //添加权限
      dialogFormVisibleAdd: false, //添加角色显示
      dialogFormVisibleEdit: false, //编辑角色显示
      dialogFormPermissionVisibleMenu: false, //分配菜单权限显示
      dialogFormPermissionVisibleInterface: false, //分配接口权限显示
      filters: {
        juesemingcheng: ""
      },
      dataList: [],
      menus: [], //菜单列表
      interface: [], //接口列表
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      selsInterface: [], //选中接口列表
      editFormRules: {
        juesemingcheng: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ]
      },
      // 编辑界面数据
      editForm: {
        id: "",
        juesemingcheng: "",
        caidanguanlian: [],
        jiekouguanlian: [],
        paixu: 1,
        moren: true,
        beizhu: ""
      },
      //查询条件
      selectData: {
        juesemingcheng: null,
        Page: 1,
        Size: 10
      },
      list: [],
      addFormVisible: false, // 添加界面是否显示
      addFormRules: {
        RoleName: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // //设置默认角色
    // setMorenRole(rowdata) {
    //   // console.log('setIsCheckInterface--rowdata===',rowdata)
    //   this.paraSwitch.Code = this.bllCode.setMorenRole
    //   let data = {
    //     id: rowdata.id,
    //     moren: rowdata.moren
    //   }
    //   this.paraSwitch.Data = JSON.stringify(data)
    //   handlePost(this.paraSwitch).then(res => {
    //     if (res.IsSuccess == true) {
    //       this.getDataList()
    //     }
    //   })
    // },

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
        this.buttons.menushow =
          this.interfaces.indexOf(this.bllCode.getTreeMenu) > 0 ? true : false;
        this.buttons.interfaceshow =
          this.interfaces.indexOf(this.bllCode.getInterfaceList) > 0
            ? true
            : false;
        //console.log('this.interfaces.show', this.interfaces)
        //console.log('this.bllCode.add',this.bllCode.add)
      }
    },

    //查询
    getKeyList() {
      this.selectData.Page = 1;
      this.getDataList();
    },
    handleNodeClick(data) {
      console.log(data);
    },
    handleCurrentChange(val) {
      this.selectData.Page = val;
      this.getDataList();
    },
    // 获取接口列表
    getInterfaceList() {
      this.paraInterface.Code = this.bllCode.getInterfaceList;
      this.paraInterface.Data = "";
      handlePost(this.paraInterface).then(res => {
        if (res.IsSuccess == true) {
          this.interface = res.Data.List;
          this.dialogStatus = "updatePermissionInterface";
          this.dialogFormPermissionVisibleInterface = true;
        }
      });
    },
    //加载选中
    callbackUp(val) {
      if (val == "updatePermissionInterface") {
        let selected = this.editForm.jiekouguanlian;
        this.$nextTick(function() {
          selected.forEach(i => {
            this.$refs.table.toggleRowSelection(
              this.interface.find(d => d.id == i),
              true
            ); // 设置默认选中
          });
        });
      }
    },
    //获取菜单列表
    getMenuList() {
      this.paraMenu.Code = this.bllCode.getTreeMenu;
      this.paraMenu.Data = "";
      handlePost(this.paraMenu)
        .then(res => {
          if (res.IsSuccess == true) {
            this.menus = res.Data;
            this.dialogStatus = "updatePermissionMenu";
            this.dialogFormPermissionVisibleMenu = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取角色列表
    getDataList() {
      this.dataList = [];
      this.para.Data = JSON.stringify(this.selectData);
      this.para.Code = this.bllCode.getList;
      handlePost(this.para)
        .then(res => {
          if (res.IsSuccess == true) {
            this.dataList = res.Data.List;
            this.total = res.Data.Count;
          }
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
          this.delPara.Code = this.bllCode.del;
          this.delPara.Data = JSON.stringify(paraId);
          handlePost(this.delPara)
            .then(res => {
              if (res.IsSuccess == true) {
                this.getDataList();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          console.log(err);
        });
    },
        //行点击事件
    Rowdblclick(index, row) {
      this.handleEdit(index, row);
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = Object.assign({}, row);
    },
    // 显示菜单权限界面
    handlePermissionMenu(index, row) {
      this.editForm = Object.assign({}, row);
      this.getMenuList();
    },
        // -----------------------------------权限Data
    handlePermissionData(index, row) {
      this.editForm = Object.assign({}, row);
      this.dialogFormVisibleData = true;
      // this.getInterfaceList();
    },
    // 显示接口权限界面
    handlePermissionInterface(index, row) {
      this.editForm = Object.assign({}, row);
      this.getInterfaceList();
    },
    // 显示添加界面
    handleAdd() {
      this.dialogStatus = "create";
      this.dialogFormVisibleAdd = true;
      this.editForm = {
        id: "",
        juesemingcheng: "",
        caidanguanlian: [],
        jiekouguanlian: [],
        paixu: 1,
        moren: true,
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
              this.editPara.Code = this.bllCode.edit;
              this.editPara.Data = JSON.stringify(this.editForm);
              handlePost(this.editPara)
                .then(res => {
                  if (res.IsSuccess == true) {
                    this.getDataList();
                    this.$refs["editForm"].resetFields();
                    this.dialogFormVisibleEdit = false;
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
    // 添加
    createData: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          })
            .then(() => {
              this.editForm.id = 0;
              this.addPara.Code = this.bllCode.add;
              this.addPara.Data = JSON.stringify(this.editForm);
              handlePost(this.addPara)
                .then(res => {
                  if (res.IsSuccess == true) {
                    this.getDataList();
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
    //取出id数组
    changeHelp(array) {
      this.list = array.map(item => item.id);
      return this.list;
    },
    //菜单分配保存
    SetMenuRole() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          //console.log(this.$refs.tree.getCheckedKeys());
          this.paraMenu.Code = this.bllCode.setMenuRole;
          this.editForm.caidanguanlian = this.$refs.tree.getCheckedKeys();
          //console.log('this.editForm.jiekouguanlian',this.editForm.caidanguanlian)
          this.paraMenu.Data = JSON.stringify(this.editForm);
          handlePost(this.paraMenu)
            .then(res => {
              if (res.IsSuccess == true) {
                let ift = this.$store.dispatch("GetInfo"); //更新用户权限信息
                this.getDataList();
                this.dialogFormPermissionVisibleMenu = false;
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
    },
    //接口分配保存
    SetInterfaceRole() {
      this.$confirm("确认提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.paraInterface.Code = this.bllCode.setInterfaceRole;
          this.editForm.jiekouguanlian = this.changeHelp(this.selsInterface);
          console.log("this.editForm", this.editForm);
          this.paraInterface.Data = JSON.stringify(this.editForm);
          handlePost(this.paraInterface)
            .then(res => {
              if (res.IsSuccess == true) {
                let ift = this.$store.dispatch("GetInfo"); //更新用户权限信息
                this.getDataList();
                this.dialogFormPermissionVisibleInterface = false;
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
    },
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels;
      //console.log(this.sels)
    },
    // 接口全选单选多选
    selsChangeInterface(sels) {
      this.selsInterface = sels;
      //console.log('this.selsInterface ',this.selsInterface )
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
.table-operations {
  margin-bottom: 16px;
}
</style>
