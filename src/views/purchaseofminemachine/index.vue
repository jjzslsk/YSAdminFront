<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input v-if="buttons.selectshow==true" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-if="buttons.selectshow==true" type="primary" >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="buttons.addshow==true" type="primary" >新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="list" highlight-current-row @selection-change="selsChange()" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="key1" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="key2" label="账号" width="150">
      </el-table-column>
      <el-table-column prop="key3 " label="类型" width="150">
      </el-table-column>
      <el-table-column prop="key4" label="矿机级别" width="150">
      </el-table-column>
      <el-table-column prop="key7" label="金额" width="150">
      </el-table-column>
      <el-table-column prop="key16" label="UTMT" width="150">
      </el-table-column>
      <el-table-column prop="key15" label="宝石" width="150">
      </el-table-column>
      <el-table-column prop="key8" label="提交时间" width="180">
      </el-table-column>
      <el-table-column prop="key9" label="说明" width="150">
      </el-table-column>
      <!-- <el-table-column prop="shifouqiyong" label="是否启用" width="150" :formatter="function(row,colum){return row.shifouqiyong==true?'是':'否'}">
      </el-table-column>
      <el-table-column prop="beizhu" label="备注" min-width="160">
      </el-table-column> -->
      <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" v-if="buttons.updateshow==true" >编辑</el-button>
          <el-button type="danger" v-if="buttons.delshow==true" size="small" >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <!-- <el-button type="danger" :disabled="this.sels.length===0">批量删除</el-button> -->
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称" prop="mingcheng">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="zhanghao">
          <el-input v-model="editForm.zhanghao" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="mima">
          <el-input v-model="editForm.mima" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型编码" prop="code">
          <el-input v-model="editForm.code" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="editForm.shifouqiyong">
            <el-radio class="radio" :label=true>是</el-radio>
            <el-radio class="radio" :label=false>否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="角色关联">
          <el-select v-model="editForm.juese" placeholder="请选择角色">
            <el-option v-for="item in rolesList" :key="item.id" :label="item.juesemingcheng" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editForm.beizhu"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
        <el-button v-else type="primary" @click="updateData">修改</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<script>
import store from '@/store/index.js'//引入本地存储
  import {
    paraHelper
  } from "@/utils/para.js"; //请求参数格式
  import {
    handlePost,
    handleGet
  } from '@/api/apihelper.js' //请求接口实现
  export default {
    data() {
      //数据
      return {
        bllCode: { //接口标识，由后端提供 
          add: '', //新增
          edit: '', //修改
          del: '', //删除
          getList: 'GetListReplenishment', //获取列表
          getObj: '', //获取对象（单个）
          getRolesList: '' //获取角色
        },
        buttons:{//按钮去权限控制
          selectshow:false,
          addshow:false,
          updateshow:false,
          delshow:false
        },
        listPara: paraHelper, //获取列表参数
        roleList: paraHelper, //获取角色列表参数
        addPara: paraHelper, //新增参数
        updatePara: paraHelper, //编辑参数
        delPara: paraHelper, //删除参数
        list: [], //列表
        rolesList: [], //角色列表
        editForm: { //编辑界面数据
          id: 0,
          mingcheng: "",
          zhanghao: "",
          mima: "",
          code: "",
          juese: '',
          shifouqiyong: true,
          beizhu: ""
        },
        textMap: { //文本地图
          create: '新增',
          update: '编辑'
        },
        filters: { //查询关键词
          mingcheng: ''
        },
        page: 1, //页码，用于分页
        pageSize: 10,
        total: 0, //数据总条数，用于分页
        dialogFormVisible: false, //弹窗的显示控制
        dialogStatus: '', //弹窗类型控制
        editFormRules: { //表单验证
          mingcheng: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }]
        },
        sels: [], //多选全选
        interfaces:[],//接口权限
      };
    },
    methods: {
      //加载按钮
      loadButton(data){
        if(data&&data.length>0)
        {
          this.interfaces=data.map(item=>item.bllcode)
          this.buttons.addshow =this.interfaces.indexOf(this.bllCode.add)>0?true:true
          this.buttons.selectshow =this.interfaces.indexOf(this.bllCode.getList)>0?true:true
          this.buttons.updateshow =this.interfaces.indexOf(this.bllCode.edit)>0?true:true
          this.buttons.delshow =this.interfaces.indexOf(this.bllCode.del)>0?true:true
        }
      },
      //查询
      getKeyList() {
        this.list = [] //清空列表
        let selectPara = { //构造查询条件
          page: this.page,
          mingcheng: this.filters.mingcheng,
          Size: this.pageSize
        }
        this.listPara.Data = JSON.stringify(selectPara)
        this.listPara.Code = this.bllCode.getList
        handlePost(this.listPara).then(res => {
          if (res.IsSuccess == true) {
            this.list = res.Data.List
            this.total=res.Data.Count
          }
        })
      },
      //新增
      handleAdd() {
        this.getRoles()

        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.clearEditForm()
      },
      //编辑
      handleEdit(index, row) {
        this.getRoles()
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.editForm = Object.assign({}, row)
      },
      //删除
      handleDel(index, row) {
        this.$confirm('确认删除该记录吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let paraId = {
            id: row.id
          }
          this.delPara.Data = JSON.stringify(paraId)
          this.delPara.Code = this.bllCode.del
          handlePost(this.delPara).then(res => {
            if (res.IsSuccess == true) {
              this.getKeyList()
            }
          }).catch(err => {
            console.log(err)
          })
        })
      },
      //分页
      handleCurrentChange(val) {
        this.page = val
        this.getKeyList()
      },
      //新增提交
      createData: function () {
        this.addPara.Data = JSON.stringify(this.editForm)
        this.addPara.Code = this.bllCode.add
        handlePost(this.addPara).then(res => {
          if (res.IsSuccess == true) {
            this.dialogFormVisible = false
             this.getKeyList()
          }
        })
      },
      //编辑提交
      updateData: function () {
        this.updatePara.Data = JSON.stringify(this.editForm)
        this.updatePara.Code = this.bllCode.edit
        handlePost(this.updatePara).then(res => {
          if (res.IsSuccess == true) {
            this.dialogFormVisible = false
            this.getKeyList()
          }
        })
      },
      //获取角色
      getRoles() {
        this.roleList.Code = this.bllCode.getRolesList
        handlePost(this.roleList).then(res => {
          if (res.IsSuccess == true) {
            this.rolesList = res.Data.List
          }
        })
      },
      clearEditForm: function () { //重置editForm
        this.editForm = {
          id: 0,
          mingcheng: "",
          zhanghao: "",
          mima: "",
          code: "",
          juese: '',
          shifouqiyong: true,
          beizhu: ""
        }
      }
    },
    // 全选单选多选
    selsChange(sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove() {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          const paraId = {
            id: ids
          }
          this.delPara.Code = this.bllCode.del
          this.delPara.Data = JSON.stringify(paraId)
          handlePost(this.delPara).then(res => {
            this.getKeyList()
          })
        })
        .catch(() => {})
    },
    //加载完成操作
    mounted() {
      this.loadButton(store.getters.interfaces)//按权限加载按钮
      this.getKeyList()
    }
  };

</script>
<style scoped>

</style>
