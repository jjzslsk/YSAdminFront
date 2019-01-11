<template>
  <section class="app-container">
    <el-card class="box-card">
      
        
    <!--工具条-->
      <el-form :inline="true" :model="filters" @submit.native.prevent>
          <!-- <a-button  v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">刷新</a-button> -->
          <a-button type="primary" @click="handleAdd">{{button.add}}</a-button>
          <!-- <a-button type="primary" @click="handleAdd">编辑</a-button> -->
          <!-- <a-button type="primary" @click="Refresh">刷新</a-button> -->
          <a-button type="primary" :loading="loadingRefresh" @click="Refresh">刷新</a-button>
          <!-- <a-button type="primary" @click="allotButton">分配按钮</a-button> -->
          <!-- <a-button type="primary" @click="allotMent">分配权限</a-button> -->
      <!-- <a-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</a-button> -->
      <el-form-item style="float: right;">
          <a-button type="primary" @click="getKeyList">查询</a-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <a-input-group compact>
            <a-select  @change="this.handleSelectChange" defaultValue="部门名称" style="width: 40%">
                <a-select-option value='Id'>Id</a-select-option>
                <a-select-option value='Pid'>部门名称</a-select-option>
                <a-select-option value='Url'>排序</a-select-option>
                <!-- <a-select-option value='Name'>名称</a-select-option> -->
            </a-select>
          <a-input style="width: 60%" defaultValue="" v-model="filters.data"/>
        </a-input-group>
        </el-form-item>
      </el-form>

    <!--列表--> 
          <!-- <el-table @row-dblclick='Rowdblclick' stripe :data="dataList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
            <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width' :type='item.type'>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">{{button.edit}}</el-button>
                <el-button type="text"  @click="handleDel(scope.$index, scope.row)">{{button.del}}</el-button>
              </template>
            </el-table-column>
          </el-table> -->

          <!-- 分页 -->
        <!-- <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col> -->

          <a-table defaultExpandAllRows :pagination="false" :columns="columnsTree" :dataSource="dataList">
          <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
          <!-- <span slot="customTitle"><a-icon type="smile-o" /> Name</span> -->

              <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
                <a-input
                  ref="searchInput"
                  placeholder='请输入名称'
                  :value="selectedKeys[0]"
                  @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                  @pressEnter="() => handleSearch(selectedKeys, confirm)"
                />
                <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">快速定位</a-button>
                <a-button @click="() => handleReset(clearFilters)">取消</a-button>
              </div>
              <a-icon slot="filterIcon" slot-scope="filtered" type='tag' :style="{ color: filtered ? '#108ee9' : '#aaa' }" />
              <template slot="customRender" slot-scope="text">
                <span v-if="searchText">
                  <template v-for="(fragment, i) in text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
                    <span v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</span>
                    <template v-else>{{fragment}}</template>
                  </template>
                </span>
                <template v-else>{{text}}</template>
              </template>

          <template slot="action" slot-scope="text, record">
            <!-- <a href="javascript:;" @click="allotButton(record.Key)">分配按钮</a>
            <a-divider type="vertical" />           -->
            <a href="javascript:;" @click="onEdit(record)">{{record.Edit}}</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="onDelete(record)">{{record.Del}}</a>
          </template>
        </a-table>

            <a-pagination style="margin-top:2rem;text-align: right;" 
    showSizeChanger
     showQuickJumper 
     v-model="current" 
     :total="total"
     :showTotal="(total, range) => ` 共${total}条记录 第 ${range[0]}/${range[1]}页` "
      @showSizeChange="onShowSizeChange" />

    

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
        <a-button @click.native="dialogFormVisibleIcon=false">取消</a-button>
        <a-button type="primary" @click.native="dialogFormVisibleIcon=false">确认</a-button>
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
            <a-button class="transfer-footer" slot="left-footer" size="small">操作</a-button>
            <a-button class="transfer-footer" slot="right-footer" size="small">操作</a-button>
          </el-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleButton=false">取消</a-button>
        <a-button type="primary" @click.native="dialogFormVisibleButton=false">确认</a-button>
      </div>
    </el-dialog>

    <!--添加界面-->
    <a-modal title="添加部门" @ok="handleOkAdd" @click="createData" v-model="dialogFormVisibleAdd">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="部门名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门:">
            <el-select v-model="editForm.Pid" placeholder="请选择">
                <el-option v-for="item in departments" :key="item.Name" :label="item.Name" :value="item.Id">
                  {{item.Name}}</el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.Sort"></el-input-number>
        </el-form-item>
        <el-form-item label="备注:" prop="Memo">
          <el-input v-model="editForm.Memo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleAdd=false">{{button.cancel}}</a-button>
        <a-button type="primary" @click="createData">{{button.add}}</a-button>
      </div>
    </a-modal>

    <!--编辑界面-->
    <a-modal title="编辑部门" @ok="handleOkEdit" @click="updateData" v-model="dialogFormVisibleEdit">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="部门名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门:">
            <el-select v-model="editForm.Pid" placeholder="请选择">
                <el-option v-for="item in departments" :key="item.Name" :label="item.Name" :value="item.Id">
                  {{item.Name}}</el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.Sort"></el-input-number>
        </el-form-item>
        <el-form-item label="备注:" prop="Memo">
          <el-input v-model="editForm.Memo" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleEdit=false">{{button.cancel}}</a-button>        
        <a-button type="primary" @click="updateData">{{button.modify}}</a-button>        
      </div>
    </a-modal>
    <a-divider orientation="left">部门规则</a-divider>
    <p>以部门树形展示方式，一级部门包含二级部门，用于用户管理分配所属集群</p>
    <a-divider dashed />
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

//表头部
const columnsTree = [
{
  title: '部门名称',
  Key: 'title',
  dataIndex: 'title',
  scopedSlots: { customRender: 'name' },
},{
  title: '排序',
  Key: 'Sort',
  dataIndex: 'Sort',
},{
  title: '操作',
  // fixed: 'right',
  Key: 'action',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
}
];

// const dataTree = [{
//   key: 1,
//   name: '系统设置',
//   icon:'icon',
//   code:'Button',
//   url:'sys/ButtonList',
//   sort:'1',
//   age: 60,
//   edit:'编辑',
//   del:'删除',
//   children: [{
//     key: 11,
//     name: '导航菜单',
//     icon:'icon',
//     code:'Button',
//     url:'sys/ButtonList',
//     sort:'1',
//     age: 42,
//     edit:'编辑',
//     del:'删除',
//   }, {
//     key: 12,
//     name: '用户管理',
//     icon:'icon',
//     code:'Button',
//     url:'sys/ButtonList',
//     sort:'1',
//     age: 30,
//     edit:'编辑',
//     del:'删除',
//     tags: ['nice', 'developer','111'],
//   }, {
//     key: 13,
//     name: '部门管理',
//     icon:'icon',
//     code:'Button',
//     url:'sys/ButtonList',
//     sort:'1',
//     age: 72,
//     edit:'编辑',
//     del:'删除',
//   }],
// }, {
//   key: 2,
//   name: '财务管理',
//   icon:'icon',
//   code:'Button',
//   url:'sys/ButtonList',
//   sort:'1',
//   age: 32,
//   edit:'编辑',
//   del:'删除',
//   children: [{
//     key: 22,
//     name: '奖金明细',
//     icon:'icon',
//     code:'Button',
//     url:'sys/ButtonList',
//     sort:'1',
//     age: 42,
//     edit:'编辑',
//     del:'删除',
//   }
//   ]
// }];

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
            //批量选择
      selectedRowKeys: [], // Check here to configure the default column
      selectedRows:[],
      loading: false,
      loadingRefresh: false,
      //分页
      current:1,
          //图标
    allotIcon() {
      this.dialogFormVisibleIcon = true;
    },
    handleOk() {
      this.dialogFormVisibleIcon = false;
    },
    handleOkEdit() {
      this.dialogFormVisibleEdit = false;
    },
    handleOkAdd(){
      this.dialogFormVisibleAdd = false;
    },
    handleOkButton() {
      this.dialogFormVisibleButton = false;
    },
    // allotButton(data) {
    //   this.GetYsMenuButtonData=[]
    //   this.GetYsMenuButtonsData=[]
    //   this.buttonKey = data
    //   this.dialogFormVisibleButton = true;
    // },
    //
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
      // dataTree,
      columnsTree,
      rowSelectionTree,
      
      bllCode: {
        //接口标识，由后端提供
        add: "AddYsdatabaseYsDepartment", //添加
        edit: "UpdateYsdatabaseYsDepartment", //修改
        del: "DelYsdatabaseYsDepartment", //删除
        getList: "GetListYsdatabaseYsDepartment", //获取列表
        getObj: "GetYsdatabaseYsDepartment", //获取对象（单个）
        getRolesList: "GetListYsdatabaseYsRole" //获取角色
      },
      departments: [],
      tableLabel: [
        { type: "selection", width: "50" },
        { Label: "ID", prop: "id", width: "50", type: "index" },
        { Label: "部门名称", prop: "Name", width: "100" },
        { Label: "上级部门", prop: "Pid", width: "100" },
        // { Label: "链接地址", prop: "Url"},
        // { Label: "页面标识", prop: "Param",width: "150"},
        // { Label: "图标", prop: "Icon", width: "50" },
        { Label: "排序", prop: "Sort", width: "50" },
        // {Label:'是否管理后台',prop:"shifouguanlihoutai",width:'150'},
        // {Label:'是否需要登录',prop:"shifouxuyaodenglu",width:'150'},
        // {Label:'创建时间',prop:"beizhu",width:'150'},
        {Label:'备注',prop:"Memo"},
      ],
      filtersName: "请输入部门",
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
      filters: {},
      ListsuperiorMenu: [],
      dataList: [], //主页数据
      total: 0,
      page: 1,
      sels: [], // 列表选中列
      editFormRules: {
        Name: [
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
        Name: "",
        Url:'',
        id: "",
        shangjiid: "",
        lianjie: "",
        shifouxianshi: "",
        paixu: "",
        tubiao: ""
      },

      filterdataListData: [],
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
        //列表查询
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },
        handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
            //刷新页面
    Refresh() {
        this.filters = {}
        this.loadingRefresh = true;
        setTimeout(() => {
        this.loadingRefresh = false;
        this.page = 1
        this.current = 1
        this.getDataList();
      }, 1000);
    },
        handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    //分页操作
    onShowSizeChange(current, pageSize) {
        console.log('111',current, pageSize);
        // this.page = val;
        this.page = current;
        this.size = pageSize;
        this.getDataList();
      },
        //搜索
    handleSelectChange (value) {
      this.selectValue = value
      // this.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      // })
    },
        //搜索
    handleSelectChange (value) {
      this.selectValue = value
      // this.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      // })
    },
    // 显示编辑界面
    onEdit(row) {
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = {};
      const paraId = {
        Id: row.Key,
      }; 
      this.para.Code = 'GetYsdatabaseYsDepartment';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.editForm = Object.assign({}, res.Data);
        }
      });
    },
    //操作删除
        onDelete (data) {
      console.log (data)
        this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const paraId = {
            Id: data.Key
          };
          this.para.Code = this.bllCode.del;
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
        .catch(() => {});
      // const dataSource = [...this.dataSource]
      // this.dataSource = dataSource.filter(item => item.key !== key)
    },
        //穿梭框
    handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
      },
    //
    // allotButton() {
    //   this.dialogFormVisibleButton = true;
    // },
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
    // handleDel(index, row) {
    //   this.$confirm("确认删除该记录吗?", "提示", {
    //     type: "warning",
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消"
    //   })
    //     .then(() => {
    //       const paraId = {
    //         Id: row.id
    //       };
    //       this.para.Code = this.bllCode.del;
    //       this.para.Data = JSON.stringify(paraId);
    //       console.log(this.para.Data);
    //       handlePost(this.para).then(res => {
    //         if (res.IsSuccess == true) {
    //           this.getDataList();
    //         }
    //       });
    //     })
    //     .catch(() => {});
    // },
    handleCurrentChange(val) {
      this.page = val;
      this.getDataList();
    },
    // 获取列表
    getDataList() {
      const paraId = {
        Page: this.page,
        Name: this.filters.data,
        Size: 10
      };
      // this.dataList = [];
      this.para.Code = 'GetTreeYsdatabaseYsDepartment';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.total = res.Data.Count;
          this.dataList = res.Data;
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
            Id: row.Id
          };
          this.para.Code = this.bllCode.del;
          this.para.Data = JSON.stringify(paraId);
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.getDataList();
              this.$message({
                message: "删除成功！",
                type: "success"
              });
            }else {
                  this.$message({
                    message: res.Code + ':' + res.Message,
                    type: "warning"
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
      // this.$refs["editForm"].resetFields(); //重置editForm
      this.editForm = Object.assign({}, row);
      let paert = {
        Pid: -1
      };
      this.para.Data = JSON.stringify(paert);
      this.para.Code = this.bllCode.getList;
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.ListsuperiorMenu = res.Data.List;
          let top = {
            Id: 0,
            Name: "无"
          };
          this.ListsuperiorMenu.push(top);
        }
      });
    },

    // 显示添加界面
    handleAdd() {
      this.editForm = {};
      this.dialogStatus = "create";
      this.dialogFormVisibleAdd = true;
      this.para.Code = 'GetListYsdatabaseYsDepartment';      
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.departments = res.Data.List;
        }else {
                  this.$message({
                    message: res.Code + ':' + res.Message,
                    type: "warning"
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
                  this.$message({
                    message: res.Code + ':' + res.Message,
                    type: "warning"
                  });
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
                  this.$message({
                    message: res.Code + ':' + res.Message,
                    type: "warning"
                  });
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
      var Ids = this.sels.map(item => item.Id);
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const paraId = {
            Ids: Ids
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
