<template>
  <section class="app-container">
    <el-card class="box-card">
        <div class="panel-heading">
        <div class="panel-lead">
        <em>角色组</em>
        <span>
        角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别的下级角色组或管理员
        </span>
        </div>
        </div>
        
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

    <template>
      <a-table :columns="columnsTree" :dataSource="dataTree" :rowSelection="rowSelectionTree" />
    </template>



    <!--列表--> 
    <el-table @row-dblclick='Rowdblclick' stripe border :data="dataList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width' :type='item.type'>
      </el-table-column>
      <!-- <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="ID" type="index" width="60">
      </el-table-column>
      <el-table-column prop="mingcheng" label="菜单名称" width="120">
      </el-table-column>
      <el-table-column prop="shangjimingcheng" label="上级菜单" width="120">
      </el-table-column>
      <el-table-column prop="lianjie" label="链接地址" min-width="160">
      </el-table-column>
      <el-table-column prop="code" label="页面标识" min-width="160">
      </el-table-column>
      <el-table-column prop="paixu" label="排序" min-width="160">
      </el-table-column> -->
      <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true" label="操作" width="150">
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
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="菜单名称:" prop="mingcheng">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="页面标识:" prop="code">
          <el-input v-model="editForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单:" prop="shangjiid">
          <el-select v-model="editForm.shangjiid" placeholder="请选择">
              <el-option
                v-for="item in ListsuperiorMenu"
                :key="item.id"
                :label="item.mingcheng"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="链接地址:" prop="lianjie">
          <el-input v-model="editForm.lianjie" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item>
        <el-form-item label="显示菜单:">
          <el-checkbox v-model="editForm.shifouxianshi">显示</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleAdd=false">{{button.cancel}}</el-button>
        <el-button size="mini" type="primary" @click="createData">{{button.add}}</el-button>
      </div>
    </el-dialog>

    <!--编辑界面-->
    <el-dialog title="编辑菜单" :visible.sync="dialogFormVisibleEdit" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="菜单名称:" prop="name">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="页面标识:">
          <el-input v-model="editForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单:">
          <el-select v-model="editForm.shangjiid" placeholder="请选择">
              <el-option
                v-for="item in ListsuperiorMenu"
                :key="item.id"
                :label="item.mingcheng"
                :value="item.id">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="链接地址:">
          <el-input v-model="editForm.lianjie" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.paixu"></el-input-number>
        </el-form-item>
        <el-form-item label="显示菜单:">
          <el-checkbox v-model="editForm.shifouxianshi">显示</el-checkbox>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleEdit=false">{{button.cancel}}</el-button>        
        <el-button size="mini" type="primary" @click="updateData">{{button.modify}}</el-button>        
      </div>
    </el-dialog>
    </el-card>
  </section>
</template>
<script>
// import script from "./script";
// export default {
//   ...script
// };
import store from "@/store/index.js"; //引入本地存储
import util from "@/utils/table.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { handlePost, handleGet } from "@/api/apihelper.js";

const columnsTree = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
  width: '12%',
}, {
  title: 'Address',
  dataIndex: 'address',
  width: '30%',
  key: 'address',
}];

const dataTree = [{
  key: 1,
  name: 'John Brown sr.',
  age: 60,
  address: 'New York No. 1 Lake Park',
  children: [{
    key: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
  }, {
    key: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    children: [{
      key: 121,
      name: 'Jimmy Brown',
      age: 16,
      address: 'New York No. 3 Lake Park',
    }],
  }, {
    key: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    children: [{
      key: 131,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 2 Lake Park',
      children: [{
        key: 1311,
        name: 'Jim Green jr.',
        age: 25,
        address: 'London No. 3 Lake Park',
      }, {
        key: 1312,
        name: 'Jimmy Green sr.',
        age: 18,
        address: 'London No. 4 Lake Park',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
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
        add: "AddMenu", //添加
        edit: "UpdateMenu", //修改
        del: "DelMenu", //删除
        getList: "GetListMenu", //获取列表
        getObj: "GetMenu", //获取对象（单个）
        getRolesList: "GetListRole" //获取角色
      },
      tableLabel: [
        { type: "selection", width: "50" },
        { Label: "ID", prop: "id", width: "50", type: "index" },
        { Label: "接口名称", prop: "mingcheng", width: "100" },
        { Label: "上级菜单", prop: "shangjimingcheng", width: "100" },
        { Label: "链接地址", prop: "lianjie" },
        { Label: "页面标识", prop: "code", width: "180" },
        { Label: "排序", prop: "paixu", width: "50" }
        // {Label:'是否管理后台',prop:"shifouguanlihoutai",width:'150'},
        // {Label:'是否需要登录',prop:"shifouxuyaodenglu",width:'150'},
        // {Label:'创建时间',prop:"beizhu",width:'150'},
        // {Label:'备注',prop:"beizhu",width:'150'},
      ],
      filtersName: "菜单名称",
      button: {
        query: "查询",
        add: "添加",
        batchRemove: "批量删除",
        edit: "编辑",
        del: "删除",
        cancel: "取消",
        modify: "修改"
      },

      para: paraHelper, //列表
      buttons: {
        //按钮去权限控制
        selectshow: false,
        addshow: false,
        updateshow: false,
        delshow: false
      },
      // para: paraHelper,
      dialogStatus: "",
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      filters: {
        name: ""
      },
      ListsuperiorMenu: [],
      dataList: [], //主页数据
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        mingcheng: [
          {
            required: true,
            message: "菜单名称必填",
            trigger: "blur"
          }
        ],
        code: [
          {
            required: true,
            message: "标识必填",
            trigger: "blur"
          }
        ],
        shangjiid: [
          {
            required: true,
            message: "上级菜单必填",
            trigger: "blur"
          }
        ],
        lianjie: [
          {
            required: true,
            message: "链接必填",
            trigger: "blur"
          }
        ]
      },

      // 编辑界面数据
      editForm: {
        id: "",
        shangjiid: "",
        mingcheng: "",
        lianjie: "",
        shifouxianshi: "",
        paixu: "",
        tubiao: ""
      },

      filterdataListData: [],
      //查询条件
      filters: {
        name: ""
      },
      ids: [],
      page: 1,
      addFormVisible: false, // 添加界面是否显示
      addFormRules: {
        name: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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

    // 删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const paraId = {
            id: row.id
          };
          this.para.Code = this.bllCode.del;
          this.para.Data = JSON.stringify(paraId);
          console.log(this.para.Data);
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.getDataList();
            }
          });
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    // 获取列表
    getDataList() {
      const paraId = {
        Page: this.page,
        mingcheng: this.filters.name,
        Size: 10
      };
      // this.dataList = [];
      this.para.Code = this.bllCode.getList;
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.total = res.Data.Count;
          this.dataList = res.Data.List;
        }
      });
    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const paraId = {
            id: row.id
          };
          this.para.Code = this.bllCode.del;
          this.para.Data = JSON.stringify(paraId);
          console.log(this.para.Data);
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
        .catch(() => {});
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = Object.assign({}, row);
      let paert = {
        shangjiid: -1
      };
      this.para.Data = JSON.stringify(paert);
      this.para.Code = this.bllCode.getList;
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.ListsuperiorMenu = res.Data.List;
          let top = {
            id: 0,
            mingcheng: "无"
          };
          this.ListsuperiorMenu.push(top);
        }
      });
    },

    // 显示添加界面
    handleAdd() {
      this.dialogStatus = "create";
      this.dialogFormVisibleAdd = true;
      this.editForm = {
        id: "",
        shangjiid: 0,
        mingcheng: "",
        lianjie: "",
        shifouxianshi: true,
        paixu: ""
      };

      let paert = {
        shangjiid: -1
      };
      this.para.Data = JSON.stringify(paert);
      this.para.Code = this.bllCode.getList;
      console.log(this.para);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.ListsuperiorMenu = res.Data.List;
          let top = {
            id: 0,
            mingcheng: "无"
          };
          this.ListsuperiorMenu.push(top);
        }
      });
    },
    // 编辑
    updateData() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(() => {
            let paert = {
              shangjiid: -1
            };
            this.para.Data = JSON.stringify(this.paert);
            this.para.Code = this.bllCode.edit;
            this.para.Data = JSON.stringify(this.editForm);
            handlePost(this.para).then(res => {
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
            });
          });
        }
      });
    },
    //查询
    getKeyList() {
      this.page = 1;
      this.getDataList();
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
              this.para.Code = this.bllCode.add;
              this.para.Data = JSON.stringify(this.editForm);
              handlePost(paraHelper).then(res => {
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
              });
            })
            .catch(e => {});
        }
      });
    },
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels;
    },
    // 批量删除
    batchRemove() {
      // this.idData = this.sels.map(item => item.id).toString();//转换为字符串
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
          this.para.Code = this.bllCode.del;
          this.para.Data = JSON.stringify(paraId);
          handlePost(this.para).then(res => {
            this.getDataList();
            this.$message({
              message: "删除成功！",
              type: "success"
            });
          });
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.loadButton(store.getters.interfaces); //按权限加载按钮
    this.getDataList();
  }
};
</script>
<style scoped>
.panel-heading {
  padding: 15px;
    padding-bottom: 0;
    background: #e8edf0;
    border-color: #e8edf0;
    position: relative;
    border-bottom: 1px solid transparent;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
}
.panel-lead {
    margin-bottom: 15px;
}
.app-container {
  background: #F0F2F5;
}
</style>
