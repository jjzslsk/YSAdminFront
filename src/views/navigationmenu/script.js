// import script from "./script";
// export default {
//   ...script
// };
import store from "@/store/index.js"; //引入本地存储
import util from "@/utils/table.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { handlePost, handleGet } from "@/api/apihelper.js";
export default {
  data() {
    return {
      bllCode: {
        //接口标识，由后端提供
        add: "AddMenu", //添加
        edit: "UpdateMenu", //修改
        del: "DelMenu", //删除
        getList: "GetListMenu", //获取列表
        getObj: "GetMenu", //获取对象（单个）
        getRolesList: "GetListRole" //获取角色
      },
      tableLabel:[
        {type:'selection',width:'50'},
        {Label:'ID',prop:"id",width:'50',type:"index"},
        {Label:'接口名称',prop:"mingcheng",width:'100'},
        {Label:'上级菜单',prop:"shangjimingcheng",width:'100'},
        {Label:'链接地址',prop:"lianjie"},
        {Label:'页面标识',prop:"code",width:'180'},
        {Label:'排序',prop:"paixu",width:'50'},
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
        edit:'编辑',
        del:'删除',
        cancel:'取消',
        modify:'修改',
      },

      para: paraHelper, //列表
      buttons: {
        //按钮去权限控制
        selectshow: false,
        addshow: false,
        updateshow: false,
        delshow: false
      },
      DataNull: paraHelper,
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
      ids:[],
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
          this.DataNull.Code = this.bllCode.del;
          this.DataNull.Data = JSON.stringify(paraId);
          console.log(this.DataNull.Data);
          handlePost(this.DataNull).then(res => {
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
          this.DataNull.Code = this.bllCode.del;
          this.DataNull.Data = JSON.stringify(paraId);
          console.log(this.DataNull.Data);
          handlePost(this.DataNull).then(res => {
            if (res.IsSuccess == true) {
              this.getDataList();
              this.$message({
                      message: '删除成功！',
                      type: 'success'
                    })
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
      this.DataNull.Data = JSON.stringify(paert);
      this.DataNull.Code = this.bllCode.getList;
      handlePost(this.DataNull).then(res => {
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
      this.DataNull.Data = JSON.stringify(paert);
      this.DataNull.Code = this.bllCode.getList;
      console.log(this.DataNull);
      handlePost(this.DataNull).then(res => {
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
          })
            .then(() => {
              let paert = {
                shangjiid: -1
              };
              this.DataNull.Data = JSON.stringify(this.paert);
              this.DataNull.Code = this.bllCode.edit;
              this.DataNull.Data = JSON.stringify(this.editForm);
              handlePost(this.DataNull).then(res => {
                if (res.IsSuccess == true) {
                  this.$refs["editForm"].resetFields();//重置editForm
                    this.dialogFormVisibleEdit = false;
                    this.getDataList();
                    this.$message({
                      message: '修改成功！',
                      type: 'success'
                    })
                  } else {
                    this.$refs["editForm"].resetFields();
                    this.dialogFormVisibleEdit = false;
                  }
                  });
            })
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
              this.DataNull.Code = this.bllCode.add;
              this.DataNull.Data = JSON.stringify(this.editForm);
              handlePost(paraHelper).then(res => {
                if (res.IsSuccess == true) {
                 this.$refs["editForm"].resetFields();
                    this.dialogFormVisibleAdd = false;
                    this.getDataList();
                    this.$message({
                      message: '添加成功！',
                      type: 'success'
                    })
                }else {
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
      this.idData = this.sels.map(item => item.id)
      this.$confirm("确认删除选中记录吗？", "提示", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          const paraId = {
            ids: this.idData
          };
          this.DataNull.Code = this.bllCode.del;
          this.DataNull.Data = JSON.stringify(paraId);
          handlePost(this.DataNull).then(res => {
            this.getDataList();
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