<template>
  <section class="app-container">
    <el-card class="box-card">
      
        
      <!--工具条-->
      <el-form :inline="true" :model="filters" @submit.native.prevent>
          <a-button  v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">刷新</a-button>
          <a-button type="primary" @click="handleAdd">{{button.add}}</a-button>
          <!-- <a-button type="primary" @click="handleAdd">编辑</a-button> -->
          <a-button type="primary" :loading="loadingRefresh" @click="Refresh">刷新</a-button>
          <!-- <a-button type="primary" @click="allotMent">分配权限</a-button> -->
          <!-- <a-button type="primary" @click="allotButton">分配按钮</a-button> -->
      <a-button
        type="primary"
        @click="start"
        :disabled="!hasSelected"
        :loading="loading"
      >
        批量删除
        <template v-if="hasSelected">
          {{`(${selectedRowKeys.length})`}}
        </template>
      </a-button>
      <el-form-item style="float: right;">
          <a-button type="primary" @click="getKeyList">查询</a-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <a-input-group compact>
            <a-select  @change="this.handleSelectChange" defaultValue="名称" style="width: 40%">
                <a-select-option value='Id'>Id</a-select-option>
                <a-select-option value='Name'>名称</a-select-option>
                <a-select-option value='Sort'>排序</a-select-option>
                <a-select-option value='Memo'>备注</a-select-option>
            </a-select>
          <a-input style="width: 60%" defaultValue="" v-model="filters.data"/>
        </a-input-group>
        </el-form-item>
      </el-form>

    <!--列表--> 
          <!-- <el-table @row-dblclick='Rowdblclick' stripe :data="dataList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
            <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width' :type='item.type'>
            </el-table-column>
            <el-table-column label="操作" width="180" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="allotMent(scope.$index, scope.row)">分配权限</el-button>
                <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">{{button.edit}}</el-button>
                <el-button type="text" ssize="mini" @click="handleDel(scope.$index, scope.row)">{{button.del}}</el-button>
              </template>
            </el-table-column>
          </el-table> -->

          <!-- 分页 -->
        <!-- <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col> -->

        <a-table :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :pagination='false' :dataSource="dataList" :columns="columns">
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
    <template slot="statu" slot-scope="text,record">
        <a-badge v-if="record.Isvisiable" status="success" text="正常" />
    </template>
    <template slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="allotMent(record)">分配权限</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="onEdit(record)">编辑</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="onDelete(record)">删除</a>
          </template>

                          <div
        slot="expandedRowRender"
        slot-scope="record"
        style="margin: 0">
        <a-row
          :gutter="24">
          <a-col :span="12">
            <a-col :lg="4" :md="24" style="margin-bottom: 12px;">
              <span>用户管理：</span>
            </a-col>
            <a-col :lg="20" :md="24" style="margin-bottom: 12px;">
              <a-tag color="cyan" >{{ record.description }}</a-tag>
              <a-tag color="cyan" >查询</a-tag>
              <a-tag color="cyan" >详情</a-tag>
              <a-tag color="cyan" >修改</a-tag>
              <a-tag color="cyan" >删除</a-tag>
            </a-col>
            <a-col :lg="4" :md="24" style="margin-bottom: 12px;">
              <span>菜单管理：</span>
            </a-col>
            <a-col :lg="20" :md="24" style="margin-bottom: 12px;">
              <a-tag color="cyan" >{{ record.description }}</a-tag>
              <a-tag color="cyan" >查询</a-tag>
              <a-tag color="cyan" >详情</a-tag>
              <a-tag color="cyan" >修改</a-tag>
              <a-tag color="cyan" >导入</a-tag>
            </a-col>
            <a-col :lg="4" :md="24" style="margin-bottom: 12px;">
              <span>权限管理：</span>
            </a-col>
            <a-col :lg="20" :md="24" style="margin-bottom: 12px;">
              <a-tag color="cyan" >{{ record.description }}</a-tag>
              <a-tag color="cyan" >查询</a-tag>
              <a-tag color="cyan" >详情</a-tag>
              <a-tag color="cyan" >删除</a-tag>
            </a-col>
            <a-col :lg="4" :md="24" style="margin-bottom: 12px;">
              <span>测试权限</span>
            </a-col>
            <a-col :span="20" style="margin-bottom: 12px;" >-</a-col>
          </a-col>

                    <a-col :span="12">
            <a-col :lg="4" :md="24" style="margin-bottom: 12px;">
              <span>角色管理：</span>
            </a-col>
            <a-col :lg="20" :md="24" style="margin-bottom: 12px;">
              <a-tag color="cyan" >{{ record.description }}</a-tag>
              <a-tag color="cyan" >查询</a-tag>
              <a-tag color="cyan" >详情</a-tag>
              <a-tag color="cyan" >修改</a-tag>
              <a-tag color="cyan" >删除</a-tag>
            </a-col>
            <a-col :lg="4" :md="24" style="margin-bottom: 12px;">
              <span>会员管理：</span>
            </a-col>
            <a-col :lg="20" :md="24" style="margin-bottom: 12px;">
              <a-tag color="cyan" >{{ record.description }}</a-tag>
              <a-tag color="cyan" >查询</a-tag>
              <a-tag color="cyan" >详情</a-tag>
              <a-tag color="cyan" >修改</a-tag>
              <a-tag color="cyan" >删除</a-tag>
            </a-col>
            <a-col :lg="4" :md="24" style="margin-bottom: 12px;">
              <span>测试权限：</span>
            </a-col>
            <a-col :lg="20" :md="24" style="margin-bottom: 12px;" >-</a-col>
          </a-col>

        </a-row>
      </div>

  </a-table>

      <a-pagination style="margin-top:2rem;text-align: right;" 
    showSizeChanger
     showQuickJumper 
     v-model="current" 
     :total="total"
     :showTotal="(total, range) => ` 共${total}条记录 第 ${range[0]}/${range[1]}页` "
      @showSizeChange="onShowSizeChange" />



        <!--图标-->
    <a-modal title="添加图标" @ok="handleOk" @click="allotIcon" v-model="dialogFormVisibleIcon" >
      <ul class="anticons-list">
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-copy"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-book"></i></li>
        <li class><i class="anticon anticon-calendar"></i></li>
        <li class><i class="anticon anticon-cloud"></i></li>
        <li class><i class="anticon anticon-cloud-download"></i></li>
        <li class><i class="anticon anticon-code"></i></li>
        <li class><i class="anticon anticon-credit-card"></i></li>
        <li class><i class="anticon anticon-download"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-copy"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-book"></i></li>
        <li class><i class="anticon anticon-calendar"></i></li>
        <li class><i class="anticon anticon-cloud"></i></li>
        <li class><i class="anticon anticon-cloud-download"></i></li>
        <li class><i class="anticon anticon-code"></i></li>
        <li class><i class="anticon anticon-credit-card"></i></li>
        <li class><i class="anticon anticon-download"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-copy"></i></li>
        <li class><i class="anticon anticon-lock"></i></li>
        <li class><i class="anticon anticon-unlock"></i></li>
        <li class><i class="anticon anticon-bars"></i></li>
        <li class><i class="anticon anticon-book"></i></li>
        <li class><i class="anticon anticon-calendar"></i></li>
        <li class><i class="anticon anticon-cloud"></i></li>
        <li class><i class="anticon anticon-cloud-download"></i></li>
        <li class><i class="anticon anticon-code"></i></li>
        <li class><i class="anticon anticon-credit-card"></i></li>
        <li class><i class="anticon anticon-download"></i></li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleIcon=false">取消</a-button>
        <a-button type="primary" @click.native="dialogFormVisibleIcon=false">确认</a-button>
      </div>
    </a-modal>

        <!--二维权限-->
    <a-modal class="allotMent" title="分配权限" @ok="handleOkData" @click="allotMent" v-model="dialogFormVisibleData">
          <a-table defaultExpandAllRows :pagination="false" size="small" :columns="columnsTree" :dataSource="dataTree" :rowSelection="rowSelectionTree">
              <!-- <span slot="tags" slot-scope="tags">
                <a-checkbox></a-checkbox>
              </span> -->
              <template slot="tags" slot-scope="text, record, index">
                <!-- <a-switch defaultChecked @change='onChangeSwitch(text,record)'/> -->
                <!-- <a-switch size="small" @change='onChangeSwitch'/> -->
                <a-checkbox v-model="record.enable"  @click="onChangeClick" @change='onChangeSwitch(text, record, index)'></a-checkbox>
                <!-- <editable-cell :text="text" @change="onCellChange(record.key, 'name')"/> -->
              </template>
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
    <a-modal title="添加角色" @ok="handleOkAdd" @click="createData" v-model="dialogFormVisibleAdd">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
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
    <a-modal title="编辑角色" @ok="handleOkEdit" @click="updateData" v-model="dialogFormVisibleEdit">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="角色名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
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
    <a-divider orientation="left">角色规则</a-divider>
    <p>角色组可以有多个,角色有上下级层级关系,如果子角色有角色组和管理员的权限则可以派生属于自己组别的下级角色组或管理员</p>
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
  // enable:
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
  //分页触发
      watch:{
      pageSize(val) {
        console.log('pageSize',val);
      },
      current(val) {
        console.log('current',val);
        this.page = val;
        this.getDataList();
      }
    },
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
      //列表
      // dataButton,
      searchText: '',
                  columns: [{
        title: '名称',
        dataIndex: 'Name',
        key: 'Name',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.$refs.searchInput.focus()
            })
          }
        },
      }, {
        title: '编号',
        dataIndex: 'Id',
        key: 'Id',
      },{
        title: '排序',
        dataIndex: 'Sort',
        key: 'Sort',
      },
      {
        title: '备注',
        dataIndex: 'Memo',
        key: 'Memo',
      },

      // { title: '显示状态', dataIndex: 'Isvisiable', key: 'Isvisiable', scopedSlots: { customRender: 'statu' } },
      {
        title: '操作',
        Key: 'action',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
        width: 200
      }, 
      // {
      //   title: 'Address',
      //   dataIndex: 'address',
      //   key: 'address',
      //   filters: [{
      //     text: 'London',
      //     value: 'London',
      //   }, {
      //     text: 'New York',
      //     value: 'New York',
      //   }],
      //   onFilter: (value, record) => record.address.indexOf(value) === 0,
      // }
      ],
      
      checkboxModel:false,
      selectValue:'Name',
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
        add: "AddYsdatabaseYsRole", //添加
        edit: "UpdateYsdatabaseYsRole", //修改
        del: "DelYsdatabaseYsRole", //删除
        getList: "GetListYsdatabaseYsRole", //获取列表
        getObj: "GetYsdatabaseYsRole", //获取对象（单个）
        getRolesList: "GetListYsdatabaseYsRole" //获取角色
      },
      tableLabel: [
        { type: "selection", width: "50" },
        { Label: "ID", prop: "id", width: "50", type: "index" },
        { Label: "名称", prop: "Name", width: "100" },
        // { Label: "上级菜单", prop: "Pid", width: "80" },
        // { Label: "链接地址", prop: "Url"},
        // { Label: "页面标识", prop: "Param",width: "150"},
        // { Label: "图标", prop: "Icon", width: "50" },
        { Label: "排序", prop: "Sort", width: "50" },
        // {Label:'是否管理后台',prop:"shifouguanlihoutai",width:'150'},
        // {Label:'是否需要登录',prop:"shifouxuyaodenglu",width:'150'},
        // {Label:'创建时间',prop:"beizhu",width:'150'},
        {Label:'备注',prop:"Memo"},
      ],
      filtersName: "角色名称",
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
      dialogFormVisibleData:false,
      dialogFormVisibleButton:false,
      dialogFormVisibleIcon:false,
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      ListsuperiorMenu: [],
      dataList: [], //主页数据
      //分页初始化
      total: 0,
      page: 1,
      size:10,

      sels: [], // 列表选中列
      editFormRules: {
        Name: [
          {
            required: true,
            message: "名称必填",
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
    //搜索
    handleSelectChange (value) {
      console.log (value)
      this.selectValue = value
      console.log (this.selectValue)
      // this.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      // })
    },
      //查询条件
      filters: {
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
    computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
        //分页操作
    onShowSizeChange(current, pageSize) {
        console.log('111',current, pageSize);
        // this.page = val;
        this.page = current;
        this.size = pageSize;
        this.getDataList();
      },
        //批量选择
    start () {
      this.loading = true;
      // ajax request after empty completing
      this.$confirm("确认执行删除操作吗？", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
      .then(() => {
        setTimeout(() => {
        this.loading = false;
        // this.selectedRowKeys = [];

      // this.idData = this.sels.map(item => item.id).toString();//转换为字符串
      // var Ids = this.sels.map(item => item.Id);
          const paraId = {
            Ids: this.selectedRows
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
            this.selectedRowKeys = []
            }
          });

      }, 1000);
        })
    },
        //列表查询
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
                // 显示编辑界面
    onEdit(row) {
      // ----------
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = {};
      const paraId = {
        Id: row.Id,
      }; 
      this.para.Code = 'GetYsdatabaseYsRole';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
      this.editForm = Object.assign({}, res.Data);


        }
      });
    },
    //表记录删除
      onDelete (data) {
      console.log (data)
        this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const paraId = {
            Id: data.Id
          };
          this.para.Code = 'DelYsdatabaseYsRole';
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
    },
        //列表
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
        onSelectChange (selectedRowKeys,selectedRows) {
      this.selectedRows = []
      console.log('selectedRowKeys changed: ', selectedRowKeys,selectedRows);
      this.selectedRowKeys = selectedRowKeys
       selectedRows.forEach(car =>{
        this.selectedRows.push(car.Id)
      })
      console.log (this.selectedRows)
      
    },
    //表开关
    onChangeSwitch(text, record, index){
      console.log (text, record, index)
      // console.log (text, record, index)
      // console.log(`checked = ${e.target.checked}`)

            // console.log('setIsCheckInterface--rowdata===',rowdata)
      // this.paraSwitch.Code = this.bllCode.isCheck;
      // let data = {
      //   id: rowdata.id,
      //   shifouyanzheng: rowdata.shifouyanzheng
      // };
      // this.paraSwitch.Data = JSON.stringify(data);
      // handlePost(this.paraSwitch).then(res => {
      //   if (res.IsSuccess == true) {
      //     this.getDataList();
      //   }
      // });
    },
    onChangeClick(e){
      console.log(`checked = ${e.target.checked}`)
      console.log (this.checkboxModel)
    },
    //窗口事件
    handleOk() {
      this.dialogFormVisibleIcon = false;
    },
    handleOkEdit() {
      this.dialogFormVisibleEdit = false;
    },
    handleOkAdd(){
      this.dialogFormVisibleAdd = false;
    },
    handleOkData(){
      this.dialogFormVisibleData = false;
    },
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
    //分配二维权限
    allotMent() {
      this.dialogFormVisibleData = true;
    },
    //行点击事件
    Rowdblclick(row) {
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = {};
      const paraId = {
        Id: row.Id,
      }; 
      this.para.Code = 'GetYsdatabaseYsRole';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
      this.editForm = Object.assign({}, res.Data);
        }
      });
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
      this.selectedRowKeys = []
      var dataSource = this.selectValue
      const paraId = [{
        Page: this.page,
        Data: this.filters.data,
        Size: this.size
      }];

      var keyMap = {
            "Data" : dataSource,
        };

        for(var i = 0;i < paraId.length;i++){
                var obj = paraId[i];
                for(var key in obj){
                          var newKey = keyMap[key];
                          if(newKey){
                                    obj[newKey] = obj[key];
                                    delete obj[key];
                            }
                    }
        }

        
        
      this.para.Code = this.bllCode.getList;
      this.para.Data = JSON.stringify(paraId[0]);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.total = res.Data.Count;
          this.dataList = res.Data.List;

          this.dataList.map((car)=>{
              // var obj = {};
              var key = "description";
              var value = "添加"
              eval("car." + key + "='" + value + "'");
            })
          
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
            }
          });
        })
        .catch(() => {});
    },
    // 显示编辑界面
    handleEdit(index, row) {
    this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = {};
      const paraId = {
        Id: row.Id,
      }; 
      this.para.Code = 'GetYsdatabaseYsRole';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
      this.editForm = Object.assign({}, res.Data);
        }
      });
    },

    // 显示添加界面
    handleAdd() {
      this.dialogStatus = "create";
      this.dialogFormVisibleAdd = true;
      // this.$refs["editForm"].resetFields(); //重置editForm
      this.editForm = {

      };

      let paert = {
        Pid: -1
      };
      this.para.Data = JSON.stringify(paert);
      this.para.Code = this.bllCode.getList;
      console.log(this.para);
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
.allotMent {
  width: 600px !important;
}
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
}

.custom-filter-dropdown input {
  width: 130px;
  margin-right: 8px;
}

.custom-filter-dropdown button {
  margin-right: 8px;
}

.highlight {
  color: #f50;
}

</style>
