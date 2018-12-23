<template>
  <section class="app-container">
    <el-card class="box-card">
        
    <!--工具条-->
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-button v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">刷新</el-button>
        </el-form-item>
        <el-form-item>
          <a-button type="primary" @click="handleAdd">{{button.add}}</a-button>
        </el-form-item>
        <el-form-item>
          <!-- <a-button type="primary" @click="handleEdit">编辑</a-button> -->
        </el-form-item>
        <el-form-item>
          <a-button type="primary" @click="Refresh">刷新</a-button>
        </el-form-item>
        <el-form-item>
          <!-- <a-button type="primary" @click="allotButton">获取菜单按钮</a-button> -->
        </el-form-item>
        <!-- <el-form-item>
          <a-button type="primary" @click="SetButton">设置按钮</a-button>
        </el-form-item> -->
        <!-- <el-form-item>
          <a-button type="primary" @click="allotIcon">图标</a-button>
        </el-form-item> -->
        <el-form-item>
      <!-- <a-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</a-button> -->
      <!-- <div style="margin-bottom: 16px">
          <a-button
            type="primary"
            @click="start"
            :disabled="!hasSelected"
            :loading="loading"
          >
            Reload
          </a-button>
          <span style="margin-left: 8px">
            <template v-if="hasSelected">
              {{`Selected ${selectedRowKeys.length} items`}}
            </template>
          </span>
        </div> -->
        </el-form-item>

        <el-form-item style="float: right;">
          <a-button type="primary" @click="getKeyList">查询</a-button>
        </el-form-item>
        <el-form-item style="float: right;">

    <a-input-group compact>
      <a-select @change="this.handleSelectChange" defaultValue="菜单名称" style="width: 40%">
          <a-select-option value='Id'>Id</a-select-option>
          <a-select-option value='Name'>菜单名称</a-select-option>
          <a-select-option value='Pid'>上级菜单</a-select-option>
          <a-select-option value='Url'>链接地址</a-select-option>
          <a-select-option value='Param'>页面标识</a-select-option>
          <a-select-option value='Icon'>图标</a-select-option>
          <a-select-option value='Sort'>排序</a-select-option>
      </a-select>
    <a-input style="width: 60%" defaultValue="" v-model="filters.data"/>
  </a-input-group>

          <!-- <el-input v-model="filters.Name" :placeholder="filtersName" class="input-with-select">
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="ID" value="1"></el-option>
          <el-option label="接口名称" value="2"></el-option>
          <el-option label="上级菜单" value="3"></el-option>
          <el-option label="链接地址" value="4"></el-option>
          <el-option label="页面标识" value="5"></el-option>
          <el-option label="排序" value="6"></el-option>
        </el-select> -->
        <!-- <el-button v-on:click="getKeyList" slot="append" icon="el-icon-search"></el-button> -->
      <!-- </el-input> -->
        </el-form-item>
        
      </el-form>

    <!--列表--> 
          <!-- <el-table @row-dblclick='Rowdblclick' stripe :data="dataList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
            <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width' :type='item.type'>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="handleEdit(scope.$index, scope.row)">{{button.edit}}</el-button>
                <el-button type="text" @click="handleDel(scope.$index, scope.row)">{{button.del}}</el-button>
              </template>
            </el-table-column>
          </el-table> -->

          <!-- 分页 -->
        <!-- <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col> -->

      <a-table defaultExpandAllRows :pagination="false" :columns="columnsTree" :dataSource="dataList" :rowSelection="rowSelectionTree">
          <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>

          <template slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="allotButton(record.Key)">分配按钮</a>
            <a-divider type="vertical" />          
            <a href="javascript:;" @click="onEdit(record)">{{record.Edit}}</a>
            <a-divider type="vertical" />
            <a href="javascript:;" @click="onDelete(record)">{{record.Del}}</a>
          </template>
          
        </a-table>

        <!--图标-->
    <a-modal title="添加图标" @ok="handleOk" @click="allotIcon" v-model="dialogFormVisibleIcon" >
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
    </a-modal>

            <!--按钮-->
    <a-modal title="添加" v-model="dialogFormVisibleButton" @ok="handleOkButton" @click="allotIcon">
          <div style="text-align: center" class="transferBox">
          <a-button type="primary" @click="GetYsMenuButton()">获取单个菜单按钮</a-button>
          <a-button type="primary" @click="GetYsMenuButtons">获取所有菜单按钮</a-button>
          <a-button type="primary" @click="SetButton">设置按钮</a-button>
          {{buttonKey}}
          {{this.GetYsMenuButtonData}}
          <hr>
          ==============
          {{this.GetYsMenuButtonsData}}
      <template>
        <a-transfer
          :dataSource="mockData"
          :filterOption="filterOption"
          :targetKeys="targetKeys"
          @change="handleChange"
          :render="item=>item.title"
        >
        </a-transfer>
      </template>
      </div>

      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleButton=false">取消</a-button>
        <a-button type="primary" @click.native="dialogFormVisibleButton=false">确认</a-button>
      </div>
    </a-modal>

    <!--添加界面-->
    <a-modal title="添加按钮" @ok="handleOkAdd" @click="createData" v-model="dialogFormVisibleAdd">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">

        <!-- <a-form-item label='菜单名称' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
          <a-input v-decorator="['note',{rules: [{ required: true, message: 'Please input your note!' }]} ]" />
        </a-form-item>

        <a-form-item
            label='上级菜单'
            :labelCol="{ span: 5 }"
            :wrapperCol="{ span: 12 }"
          >
            <a-select
              v-decorator="[
                'gender',
                {rules: [{ required: true, message: 'Please select your gender!' }]}
              ]"
              placeholder='Select a option and change input text above'
              @change="this.handleSelectChange"
            >
              <a-select-option value='male'>male</a-select-option>
              <a-select-option value='female'>female</a-select-option>
            </a-select>
          </a-form-item> -->

        <el-form-item label="菜单名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数:" prop="Param">
          <el-input v-model="editForm.Param" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="Memo">
          <el-input v-model="editForm.Memo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标:" prop="">
          <el-input placeholder="请输入内容" v-model="editForm.Icon" class="input-with-select">
            <a-button slot="append" icon="el-icon-search" @click="allotIcon"></a-button>
          </el-input>
        </el-form-item>
        <el-form-item label="上级菜单:" prop="Pid">
          <el-select v-model="editForm.Pid" placeholder="请选择">
              <el-option
                v-for="item in ListsuperiorMenu"
                :key="item.Id"
                :label="item.Name"
                :value="item.Id">
              </el-option>
            </el-select>
            {{editForm.Pid}}

            <!-- <template>
              <div>
                <a-select defaultValue="" style="width: 120px" @change="handleChangePid">
                  <a-select-option value="1">导航菜单</a-select-option>
                  <a-select-option value="2">操作按钮</a-select-option>
                  <a-select-option value="3">角色管理</a-select-option>
                  <a-select-option value="4">用户管理</a-select-option>
                </a-select>
              </div>
            </template> -->

        </el-form-item>
        <el-form-item label="链接地址:">
          <el-input v-model="editForm.Url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.Sort"></el-input-number>
        </el-form-item>
        <el-form-item label="显示菜单:">
          <a-switch @change='aSwitch' v-model="editForm.Isvisiable"/>
        </el-form-item>
        <el-form-item label="是否启用:">
          <a-switch @change='aState' v-model="editForm.State"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleAdd=false">{{button.cancel}}</a-button>
        <a-button type="primary" @click="createData">{{button.add}}</a-button>
      </div>
    </a-modal>

    <!--编辑界面-->
    <a-modal title="编辑按钮" @ok="handleOkEdit" @click="updateData" v-model="dialogFormVisibleEdit">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="菜单名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标:" prop="Icon">
          <el-input v-model="editForm.Icon" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="参数:" prop="Param">
          <el-input v-model="editForm.Param" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注:" prop="Memo">
          <el-input v-model="editForm.Memo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单:" prop="Pid">
          <el-select v-model="editForm.Pid" placeholder="请选择">
              <el-option
                v-for="item in ListsuperiorMenu"
                :key="item.Id"
                :label="item.Name"
                :value="item.Id">
              </el-option>
            </el-select>
            {{editForm.Pid}}
        </el-form-item>
        <el-form-item label="链接地址:">
          <el-input v-model="editForm.Url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.Sort"></el-input-number>
        </el-form-item>
        <el-form-item label="显示菜单:">
          <a-switch @change='aSwitch' v-model="editForm.Isvisiable"/>
        </el-form-item>
        <el-form-item label="是否启用:">
          <a-switch @change='aState' v-model="editForm.State"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <a-button @click.native="dialogFormVisibleEdit=false">{{button.cancel}}</a-button>        
        <a-button type="primary" @click="updateData">{{button.modify}}</a-button>        
      </div>
    </a-modal>
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
,{
  title: '菜单名称',
  Key: 'Name',
  dataIndex: 'Name',
  scopedSlots: { customRender: 'name' },
},
{
  title: '图标',
  Key: 'Icon',
  dataIndex: 'Icon',
},{
  title: '标记',
  Key: 'Code',
  dataIndex: 'Code',
},{
  title: '链接地址',
  Key: 'Url',
  dataIndex: 'Url',
},{
  title: '是否显示',
  Key: 'Show',
  dataIndex: 'Show',
},{
  title: '排序',
  Key: 'Sort',
  dataIndex: 'Sort',
},{
  title: '操作',
  Key: 'action',
  dataIndex: 'action',
  scopedSlots: { customRender: 'action' },
}];

//表主体数据
// const dataTree = [{
//   key: 1,
//   name: '系统设置',
//   icon:'icon',
//   code:'Button',
//   url:'sys/ButtonList',
//   sort:'1',
//   edit:'编辑',
//   del:'删除',
//   show:'√',
//   children: [{
//     key: 11,
//     name: '导航菜单',
//     icon:'icon',
//     code:'Button',
//     url:'sys/ButtonList',
//     sort:'1',
//     edit:'编辑',
//     del:'删除',
//     show:'√',
//   }, {
//     key: 12,
//     name: '用户管理',
//     icon:'icon',
//     code:'Button',
//     url:'sys/ButtonList',
//     sort:'1',
//     edit:'编辑',
//     del:'删除',
//     show:'√',
//   }, {
//     key: 13,
//     name: '部门管理',
//     icon:'icon',
//     code:'Button',
//     url:'sys/ButtonList',
//     sort:'1',
//     edit:'编辑',
//     del:'删除',
//     show:'√',
//   }],
// }, {
//   key: 2,
//   name: '财务管理',
//   icon:'icon',
//   code:'Button',
//   url:'sys/ButtonList',
//   sort:'1',
//   edit:'编辑',
//   del:'删除',
//   show:'√',
//   children: [{
//     key: 22,
//     name: '奖金明细',
//     icon:'icon',
//     code:'Button',
//     url:'sys/ButtonList',
//     sort:'1',
//     edit:'编辑',
//     del:'删除',
//     show:'x',
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
    return {
      //按钮KEY
      buttonKey:'',
      //菜单按钮
      GetYsMenuButtonData:[],//获取单按钮
      GetYsMenuButtonsData:[],//获取多按钮
      selectValue:'Name',
            //穿梭框
      dataListButton:[],//按钮列表数组

      mockData: [],
      targetKeys: [],

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
        add: "AddYsdatabaseYsMenu", //添加
        edit: "UpdateYsdatabaseYsMenu", //修改
        del: "DelYsdatabaseYsMenu", //删除
        getList: "GetListYsdatabaseYsMenu", //获取列表
        getObj: "GetYsdatabaseYsMenu", //获取对象（单个）
        getRolesList: "GetListYsdatabaseYsRole" //获取角色
      },
      tableLabel: [
        { type: "selection", width: "50" },
        { Label: "ID", prop: "Id", width: "50", type: "index" },
        { Label: "名称", prop: "Name", width: "100" },
        { Label: "上级菜单", prop: "Pid", width: "80" },
        { Label: "链接地址", prop: "Url"},
        { Label: "页面标识", prop: "Param",width: "150"},
        { Label: "图标", prop: "Icon", width: "50" },
        { Label: "排序", prop: "Sort", width: "50" }
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
        tubiao: "",
        Isvisiable:'',
      },

      filterdataListData: [],
      //查询条件
      filters: {},
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

  selectedRowKeys: [], // Check here to configure the default column
  loading: false,
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    }
  },
  methods: {
    start () {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys
    },
    //
    handleChangePid(value) {
      console.log(`selected ${value}`);
    },
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
        // 显示编辑界面
    onEdit(row) {
      console.log (row)
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      // this.$refs["editForm"].resetFields(); //重置editForm
      this.editForm = {},
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
    //搜索
    handleSelectChange (value) {
      this.selectValue = value
      // this.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      // })
    },
        //刷新页面
    Refresh() {
      (this.filters = {
        Page: 1,
        Size: 15
      }),
        this.getDataList();
    },
       

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
    allotButton(data) {
      this.GetYsMenuButtonData=[]
      this.GetYsMenuButtonsData=[]
      this.buttonKey = data
      this.dialogFormVisibleButton = true;
    },
    //

    //是否显示
    aSwitch(checked){
      this.editForm.Isvisiable = checked
    },
    //是否启用
    aState(checked){
      this.editForm.State = checked
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
      var dataSource = this.selectValue
      const paraId = [{
        Page: this.page,
        Data: this.filters.data,
        Size: 10
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
          // this.total = res.Data.Count;
          this.dataList = res.Data;
        }
      });
    },
        // 获取按钮
    getDataListButton() {
      const paraId = {
        Page: this.page,
        Size: 10
      };
      // this.dataList = [];
      this.para.Code = 'GetListYsdatabaseYsButton';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          // this.total = res.Data.Count;
          this.dataListButton = res.Data.List;
          console.log ('111rrttt',this.dataListButton)
          console.log ('this.mockData::',this.mockData)
        }
      });
    },
      GetYsMenuButton(){//获取单菜单按钮
      const paraId = {
        MenuId:this.buttonKey,
      };
      this.para.Code = 'GetYsMenuButton';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.GetYsMenuButtonData = res.Data;
          console.log ('resres:',this.GetYsMenuButtonData)
        }
      });
    },

    GetYsMenuButtons(){//获取多菜单按钮
      const paraId = {
        // MenuId:this.sels[0].Key,
      };
      this.para.Code = 'GetYsMenuButton';
      this.para.Data = JSON.stringify(paraId);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.GetYsMenuButtonsData = res.Data;
          console.log ('resres:',this.GetYsMenuButtonsData)
        }
      });
    },
     //穿梭框
        getMock() {
      // const targetKeys = [];
      // const mockData = [];
        console.log ('this.GetYsMenuButtonData.length:',this.GetYsMenuButtonData)

      for (let i = 0; i < this.GetYsMenuButtonData.length; i++) {
        // console.log (this.GetYsMenuButtonData[i])
        // console.log (1)
        // const data = {
        //   key: i.toString(),
        //   title: `content${i + 1}`,
        //   description: `description of content${i + 1}`,
        //   chosen: Math.random() * 2 > 1,
        // };
        // if (data.chosen) {
        //   targetKeys.push(data.key);
        // }
        // mockData.push(data);
      }
      // this.mockData = mockData
      // this.targetKeys = targetKeys
    },
    filterOption(inputValue, option) {
      return option.description.indexOf(inputValue) > -1;
    },
    handleChange(targetKeys, direction, moveKeys) {
      console.log(targetKeys, direction, moveKeys);
      this.targetKeys = targetKeys
    },
        // 设置按钮
    SetButton(){
      const paraId = [{
        MenuId:this.sels[0].Key,
		    ButtonIds:[5,6]
      }];
      this.para.Code = 'SetYsMenuButton';
      this.para.Data = JSON.stringify(paraId);
      console.log ('menu',this.para)
      // handlePost(this.para).then(res => {
      //   if (res.IsSuccess == true) {
      //     console.log ('ButtonIds',res)
      //   }
      // });
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

        //双击编辑
    Rowdblclick(val) {
      this.currentRow = val;
      this.getDataList();
      this.dialogFormVisibleEdit = true;
      this.editForm = Object.assign({}, this.currentRow);
    },

    // 显示编辑界面
    handleEdit(index, row) {
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      // this.$refs["editForm"].resetFields(); //重置editForm
      this.editForm = {},
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
      this.dialogStatus = "create";
      this.dialogFormVisibleAdd = true;
      // this.$refs["editForm"].resetFields(); //重置editForm
      this.editForm = {
        Isvisiable:true,
        State:true,
        Sort:1,
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
      console.log (this.sels)
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
    this.getMock()
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
