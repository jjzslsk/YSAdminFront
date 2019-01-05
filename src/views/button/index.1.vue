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
      <a-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">{{button.batchRemove}}</a-button>
      <el-form-item style="float: right;">
          <a-button type="primary" @click="getKeyList">查询</a-button>
        </el-form-item>
        <el-form-item style="float: right;">
          <a-input-group compact>
            <a-select  @change="this.handleSelectChange" defaultValue="按钮名称" style="width: 40%">
                <a-select-option value='Id'>Id</a-select-option>
                <a-select-option value='Icon'>图标</a-select-option>
                <a-select-option value='ClassName'>参数</a-select-option>
                <a-select-option value='Name'>按钮名称</a-select-option>
            </a-select>
          <a-input style="width: 60%" defaultValue="" v-model="filters.data"/>
        </a-input-group>
        </el-form-item>
      </el-form>

    <!--列表--> 
      <!-- <a-table defaultExpandAllRows :pagination="false" size="small" :columns="columnsTree" :dataSource="dataTree" :rowSelection="rowSelectionTree">
          <span slot="tags" slot-scope="tags">
            <a-checkbox></a-checkbox>
          </span>
          <span slot="action" slot-scope="text, record">
            <a href="javascript:;">{{record.edit}}</a>
            <a-divider type="vertical" />
            <a href="javascript:;">{{record.del}}</a>
          </span>
      </a-table> -->

          <el-table @row-dblclick='Rowdblclick' stripe :data="dataList" highlight-current-row @selection-change="selsChange" style="width: 100%;">
            <el-table-column v-for="item in tableLabel" :key="item.Label" :label="item.Label" :prop="item.prop" :width='item.width' :type='item.type'>
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button type="text"  @click="handleEdit(scope.$index, scope.row)">{{button.edit}}</el-button>
                <el-button type="text"  @click="handleDel(scope.$index, scope.row)">{{button.del}}</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
        <el-col :span="24" class="toolbar">
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

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
        <a-button  @click.native="dialogFormVisibleButton=false">取消</a-button>
        <a-button  type="primary" @click.native="dialogFormVisibleButton=false">确认</a-button>
      </div>
    </el-dialog>

    <!--添加界面-->
    <a-modal title="添加按钮" @ok="handleOkAdd" @click="createData" v-model="dialogFormVisibleAdd">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="按钮名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="样式:" prop="ClassName">
          <el-input v-model="editForm.ClassName" auto-complete="off"></el-input>
        </el-form-item>
                <el-form-item label="图标:" prop="">
          <el-input placeholder="请输入内容" v-model="editForm.Icon" class="input-with-select">
            <a-icon type="picture"  slot="append" @click="allotIcon"/>
          </el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.Sort"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <a-button  @click.native="dialogFormVisibleAdd=false">{{button.cancel}}</a-button>
        <a-button  type="primary" @click="createData">{{button.add}}</a-button>
      </div>
    </a-modal>

    <!--编辑界面-->
    <a-modal title="编辑按钮" @ok="handleOkEdit" @click="updateData" v-model="dialogFormVisibleEdit">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="按钮名称:" prop="Name">
          <el-input v-model="editForm.Name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="样式:" prop="Classname">
          <el-input v-model="editForm.Classname" auto-complete="off"></el-input>
        </el-form-item>
                <el-form-item label="图标:" prop="">
          <el-input placeholder="请输入内容" v-model="editForm.Icon" class="input-with-select">
            <a-icon type="picture"  slot="append" @click="allotIcon"/>
          </el-input>
        </el-form-item>
        <el-form-item label="排序:">
          <el-input-number v-model="editForm.Sort"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <a-button  @click.native="dialogFormVisibleEdit=false">{{button.cancel}}</a-button>        
        <a-button  type="primary" @click="updateData">{{button.modify}}</a-button>
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
        add: "AddYsdatabaseYsButton", //添加
        edit: "UpdateYsdatabaseYsButton", //修改
        del: "DelYsdatabaseYsButton", //删除
        getList: "GetListYsdatabaseYsButton", //获取列表
        getObj: "GetYsdatabaseYsButton", //获取对象（单个）
        getRolesList: "GetListYsdatabaseYsRole" //获取角色
      },
      tableLabel: [
        { type: "selection", width: "50" },
        { Label: "ID", prop: "Id", width: "50", type: "index" },
        { Label: "图标", prop: "Icon", width: "100" },
        { Label: "按钮名称", prop: "Name", width: "200" },
        // { Label: "权限标识", prop: "Url"},
        // { Label: "排序", prop: "Sort", width: "50" },
        {Label:'说明',prop:"beizhu"},
        // {Label:'是否管理后台',prop:"shifouguanlihoutai",width:'150'},
        // {Label:'是否需要登录',prop:"shifouxuyaodenglu",width:'150'},
        // {Label:'创建时间',prop:"beizhu",width:'150'},
        // {Label:'备注',prop:"beizhu",width:'150'},
      ],
      filtersName: "按钮名称",
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
      selectValue:'Name',

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
    allotButton() {
      this.dialogFormVisibleButton = true;
    },
    //行点击事件
    Rowdblclick(row) {
      this.dialogStatus = "update";
      this.dialogFormVisibleEdit = true;
      this.editForm = {};
      const paraId = {
        Id: row.Id,
      }; 
      this.para.Code = 'GetYsdatabaseYsButton';
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
        //搜索
    handleSelectChange (value) {
      this.selectValue = value
      // this.form.setFieldsValue({
      //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      // })
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
      this.para.Code = 'GetYsdatabaseYsButton';
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
</style>
