<template>
  <section class="app-container">
    <el-card class="box-card">
        
    <!--工具条-->
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <!-- <el-form-item>
          <el-button size="mini" v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">刷新</el-button>
        </el-form-item> -->
        <el-form-item>
          <el-button size="mini" v-if="buttons.addshow==true" type="primary" @click="handleAdd">{{button.add}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-if="buttons.addshow==true" type="primary" @click="handleAdd">编辑</el-button>
        </el-form-item>
        <el-form-item>
      <el-button type="danger" size="mini" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</el-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <el-input size="mini" v-if="buttons.selectshow==true" v-model="filters.name" :placeholder="filtersName" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="ID" value="1"></el-option>
          <el-option label="接口名称" value="2"></el-option>
          <el-option label="上级菜单" value="3"></el-option>
          <el-option label="链接地址" value="4"></el-option>
          <el-option label="页面标识" value="5"></el-option>
          <el-option label="排序" value="6"></el-option>
        </el-select>
        <el-button size="mini" v-if="buttons.selectshow==true" v-on:click="getKeyList" slot="append" icon="el-icon-search"></el-button>
      </el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" v-if="buttons.addshow==true" type="primary" @click="allotButton">分配按钮</el-button>
        </el-form-item>
      </el-form>

    <!--列表--> 
      <!-- <template>
      <a-table style="margin-top:10rem" :columns="columnsTree" :dataSource="dataTree" :rowSelection="rowSelectionTree" />
    </template> -->
      <a-table defaultExpandAllRows :pagination="false" size="small" :columns="columnsTree" :dataSource="dataTree" :rowSelection="rowSelectionTree">
          <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
          <span slot="customTitle"> -->
            <!-- <a-checkbox></a-checkbox>  -->
            <!-- 菜单名称</span> -->
          <span slot="tags" slot-scope="tags">
            <!-- <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag> -->
            <a-checkbox></a-checkbox>
          </span>
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;">{{record.edit}}</a>
            <a-divider type="vertical" />
            <a href="javascript:;">{{record.del}}</a>
          </span>
        </a-table>

          <!-- <el-table @row-dblclick='Rowdblclick' stripe border :data="dataList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width' :type='item.type'>
      </el-table-column>
      <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" v-if="buttons.updateshow==true" @click="handleEdit(scope.$index, scope.row)">{{button.edit}}</el-button>
          <el-button size="mini" type="danger" v-if="buttons.delshow==true" @click="handleDel(scope.$index, scope.row)">{{button.del}}</el-button>
        </template>
      </el-table-column>
    </el-table> -->

          <!-- 分页 -->
        <!-- <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col> -->

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

            <!--按钮-->
    <el-dialog title="添加" :visible.sync="dialogFormVisibleButton" :close-on-click-modal="false">
             <div style="text-align: center" class="transferBox">
          <el-transfer
          
            style="text-align: left; display: inline-block"
            v-model="value3"
            filterable
            filter-placeholder="请输入搜索内容"
            :left-default-checked="[2, 3]"
            :right-default-checked="[1]"
            :render-content="renderFunc"
            :titles="['所有菜单', '已有菜单']"
            
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="data">
            <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
            <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
          </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click.native="dialogFormVisibleButton=false">取消</el-button>
        <el-button size="mini" type="primary" @click.native="dialogFormVisibleButton=false">确认</el-button>
      </div>
    </el-dialog>

    <!--添加界面-->
    <el-dialog title="添加菜单" :visible.sync="dialogFormVisibleAdd" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="菜单名称:" prop="mingcheng">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="小图标:" prop="">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="allotIcon"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="大图标:" prop="">
          <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="allotIcon"></el-button>
          </el-input>
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

const columnsTree = [
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
  title: '图标',
  key: 'icon',
  dataIndex: 'icon',
},{
  title: '标记',
  key: 'code',
  dataIndex: 'code',
},{
  title: '链接地址',
  key: 'url',
  dataIndex: 'url',
},{
  title: '是否显示',
  key: 'show',
  dataIndex: 'show',
  scopedSlots: { customRender: 'tags' },
},{
  title: '排序',
  key: 'sort',
  dataIndex: 'sort',
},{
  title: '操作',
  key: 'action',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
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

export default {
  data() {
        // 穿梭框
        const generateData = _ => {
        const data = [];
        
        for (let i = 1; i <= 10; i++) {
          data.push({
            key: i,
            label: `备选项 ${ i }`,
            disabled: i % 4 === 0
          });
        }
        return data;
      };
    return {
            //穿梭框
        data: generateData(),
        value3: [1],
        value4: [1],
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        },
      //搜索
      input3: '',
      input4: '',
      input5: '',
      select: '',

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
      dialogFormVisibleButton:false,
      dialogFormVisibleIcon:false,
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
        //穿梭框
    handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
    //图标
    allotIcon() {
      this.dialogFormVisibleIcon = true;
    },
    allotButton() {
      this.dialogFormVisibleButton = true;
    },
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
.el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
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
