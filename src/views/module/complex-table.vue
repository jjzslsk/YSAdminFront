<template>
  <section class="app-container">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item>
          <el-input size="mini" v-model="searchData.keyword" placeholder="模块名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" v-on:click="getData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="myData" highlight-current-row @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <!-- <el-table-column prop="KeyId" label="ID"  width="60">
      </el-table-column> -->
      <el-table-column prop="ButtonText" label="模块名称" width="120">
      </el-table-column>
      <el-table-column prop="ButtonTag" label="模块标识" width="120">
      </el-table-column>
      <el-table-column prop="Sortnum" label="排序" width="120">
      </el-table-column>
      <el-table-column prop="Remark" label="备注" min-width="160">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemoveData" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentPageChange" :page-size="10" :total="total"
        style="float:right;">
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :model="editData" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="模块名称" prop="ButtonText">
          <el-input v-model="editData.ButtonText" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="模块标识">
          <el-input v-model="editData.ButtonTag" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="editData.Sortnum"></el-input-number>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="editData.Remark"></el-input>
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
  import axios from 'axios'
  import util from '@/utils/table.js'

  export default {
    data() {
      return {
        dialogStatus: '',
        textMap: {
          update: '编辑模块',
          create: '新增模块'
        },
        requestURL: 'http://192.168.0.150:668/api',
        dialogFormVisible: false,
        filters: {
          name: ''
        },
        myData: [],
        total: 0,
        page: 1,
        size: 10,
        // 列表选中列
        sels: [],
        //编辑数据
        editData: {
          KeyId: 0,
          ButtonText: '',
          ButtonTag: '',
          Sortnum: 1,
          Remark: ''
        },
        //查询数据
        searchData: {
          keyword: null,
          Page: 1,
          Size: 10
        },
        //删除数据
        deleteData: {
          Id: 0
        },
        //获取数据请求
        getRequest: {
          Data: "",
          Code: "GetModuleList",
          UserToken: null,
          ClientToken: null,
          ClientPass: null
        },
        //编辑数据请求
        updateRequest: {
          Data: "",
          Code: "UpdateModule",
          UserToken: null,
          ClientToken: null,
          ClientPass: null
        },
        //新增数据请求
        addRequest: {
          Data: "",
          Code: "AddModule",
          UserToken: null,
          ClientToken: null,
          ClientPass: null
        },
        //删除数据请求
        delRequest: {
          Data: "",
          Code: "DelModule",
          UserToken: null,
          ClientToken: null,
          ClientPass: null
        },
        // 新增界面
        addFormVisible: false, 
        addFormRules: {
          ButtonText: [{
            required: true,
            message: '请输入模块名称',
            trigger: 'blur'
          }]
        },
        // 编辑界面
        editFormRules: {
          ButtonText: [{
            required: true,
            message: '请输入模块名称',
            trigger: 'blur'
          }],
          ButtonTag: [{
            required: true,
            message: '请输入模块标识',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      // 分页事件
      handleCurrentPageChange(val) {
        this.searchData.Page = val
        this.getData()
      },
      // 删除事件
      handleDel(index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
          .then(() => {
            this.deleteData.Id = row.KeyId
            this.delRequest.Data = JSON.stringify(this.deleteData)
            axios.post(this.requestURL + '?rnd=' + Math.random(), this.delRequest)
              .then(res => {
                if (res.data.IsSuccess == true) {
                  this.$message({
                    message: '删除成功',
                    type: 'success'
                  })
                  this.getData()
                } else {
                  this.$message({
                    message: '删除失败，请联系管理员',
                    type: 'error'
                  })
                }
              }).catch(err => {
                console.log(err)
              })
          })
          .catch(() => {})
      },
      // 编辑事件
      handleEdit(index, row) {
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.editData = Object.assign({}, row)
      },
      // 新增事件
      handleAdd() {
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        //this.editData = {}
        this.$refs.editForm.resetFields()
      },


      // 获取数据
      getData() {
        this.getRequest.Data = JSON.stringify(this.searchData)
        console.log(this.getRequest)
        axios.post(this.requestURL + '?rnd=' + Math.random(), this.getRequest)
          .then(res => {
            if (res.data.IsSuccess == true) {
              this.myData = res.data.Data.List;
              this.total = res.data.Data.Count;
            }
            console.log(this.myData)
          }).catch(err => {
            console.log(err)
          })
      },
      // 编辑数据
      updateData() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              })
              .then(() => {
                // const para = Object.assign({}, this.editData)
                var data = {
                  formData: this.editData
                }
                this.updateRequest.Data = JSON.stringify(data)
                axios.post(this.requestURL + '?rnd=' + Math.random(), this.updateRequest)
                  .then(res => {
                    if (res.data.IsSuccess == true) {
                      this.$message({
                        message: '提交成功',
                        type: 'success'
                      })
                      this.getData()
                    } else {
                      this.$message({
                        message: '提交失败，请联系管理员',
                        type: 'error'
                      })
                    }
                  }).catch(err => {
                    console.log(err)
                  })
                this.$refs.editForm.resetFields()
                this.dialogFormVisible = false
              })
              .catch(e => {
                // 打印一下错误
                console.log(e)
              })
          }
        })
      },
      // 新增数据
      createData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
              })
              .then(() => {
                var data = {
                  formData: this.editData
                }
                this.addRequest.Data = JSON.stringify(data)
                axios.post(this.requestURL + '?rnd=' + Math.random(), this.addRequest)
                  .then(res => {
                    if (res.data.IsSuccess == true) {
                      this.$message({
                        message: '提交成功',
                        type: 'success'
                      })
                      this.getData()
                    } else {
                      this.$message({
                        message: '提交失败，请联系管理员',
                        type: 'error'
                      })
                    }
                  }).catch(err => {
                    console.log(err)
                  })
                this.$refs.editForm.resetFields()
                this.dialogFormVisible = false
              })
              .catch(e => {
                // 打印一下错误
                console.log(e)
              })
          }
        })
      },
      // 全选单选多选
      selsChange(sels) {
        this.sels = sels
      },
      // 批量删除
      batchRemoveData() {
        var ids = this.sels.map(item => item.id).toString()
        this.$confirm('确认删除选中记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              })
          .then(() => {
            const data = {
              IdList: ids
            }
            batchRemoveDataModule(data)
            .then(res => {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getData()
            })
          })
          .catch(() => {})
      }
    },
    mounted() {
      this.getData()
    }
  }

</script>

<style scoped>

</style>
