<template>
  <div>
    <el-row>
      <el-col :span="5">
        <div class="order-btn" style="padding: 10px;">
          <el-button size="mini" v-if="buttons.addshow==true" type="success" @click="dicTypeAdd">新增</el-button>
          <el-button size="mini" v-if="buttons.updateshow==true" type="primary" @click="dicTypeEdit">编辑</el-button>
          <el-button size="mini" v-if="buttons.delshow==true" type="danger" @click="handleDelDicsType">删除</el-button>
        </div>
        <div>
          <ul>
            <li style="padding-top: 10px; font-size:15px;" v-for='(item,index) in items' :key="item.id">
              <a :class='item.color? "red" : "blue" ' @click='toggle(index)'>{{item.mingcheng}}[{{item.code}}]</a>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="19">
        <div>
          <section class="app-container">
            <!--工具条-->
            <el-col :span="19" class="toolbar" style="padding-bottom: 0px;">
              <el-form :inline="true" :model="filters" @submit.native.prevent>
                <el-form-item>
                  <el-input size="mini" v-if="buttons.selectshow==true" v-model="dicPare.mingcheng" placeholder="字典名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" v-if="buttons.selectshow==true" type="primary" v-on:click="getKeyList">查询</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" v-if="buttons.addshow==true" type="success" @click="handleAdd">新增</el-button>
                </el-form-item>
              </el-form>
            </el-col>

            <!--列表-->
            <el-table @row-dblclick='Rowdblclick' :data="dics" highlight-current-row @selection-change="selsChange" style="width: 100%;">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column type="index" label="#" width="60">
              </el-table-column>
              <el-table-column prop="id" label="ID" width="60">
              </el-table-column>
              <el-table-column prop="mingcheng" label="名称" width="120">
              </el-table-column>
              <el-table-column prop="code" label="编码" width="120">
              </el-table-column>
              <el-table-column prop="SecondParameter" label="第二参数" width="120">
              </el-table-column>
              <el-table-column prop="paixu" label="排序" width="120">
              </el-table-column>
              <el-table-column prop="shifouqiyong" label="状态" min-width="160" :formatter="formatStatus">
                <el-checkbox v-model="editForm.shifouqiyong"></el-checkbox>
              </el-table-column>
              <el-table-column prop="beizhu" label="备注" min-width="160">
              </el-table-column>
              <el-table-column v-if="buttons.updateshow==true||buttons.delshow==true" label="操作" width="150">
                <template slot-scope="scope">
                  <el-button size="mini" v-if="buttons.updateshow==true" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button type="danger" v-if="buttons.delshow==true" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>

            <!--工具条-->
            <el-col :span="19" class="toolbar">
              <!-- <el-button type="danger" :disabled="this.sels.length===0">批量删除</el-button> -->
              <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total"
                style="float:right;">
              </el-pagination>
            </el-col>

            <!--编辑界面-->
            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
              <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
                <el-form-item label="名称:" prop="mingcheng">
                  <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="编码:" prop="code">
                  <el-input v-model="editForm.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="第二参数:" prop="SecondParameter">
                  <el-input v-model="editForm.SecondParameter" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别:" prop="second">
                  <el-select v-if="this.dialogStatus == 'update'" v-model="editForm.shangjiid" placeholder="请选择">
                    <el-option v-for="item in items" :key="item.id" :label="item.mingcheng+[item.code]" :value="item.id">
                    </el-option>
                  </el-select>
                  <el-select v-else v-model="editForm.shangjiid" placeholder="请选择">
                    <el-option v-for="item in items" :key="item.id" :label="item.mingcheng+[item.code]" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="上级:" prop="parent">
                  <el-select v-model="value" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                <el-form-item label="排序:" prop="paixu">
                  <el-input-number v-model="editForm.paixu" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="状态:">
                  <el-radio-group v-model="editForm.shifouqiyong">
                    <el-radio class="radio" :label=true>启用</el-radio>
                    <el-radio class="radio" :label=false>禁用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="备注:">
                  <el-input type="textarea" v-model="editForm.beizhu"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible=false">取消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">添加</el-button>
                <el-button v-else type="primary" @click="updateData">修改</el-button>
              </div>
            </el-dialog>
            <!--字典类别编辑界面-->
            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisibleDicType" :close-on-click-modal="false">
              <el-form :model="editTypeForm" label-width="100px">
                <el-form-item label="类别名称:" prop="mingcheng">
                  <el-input v-model="editTypeForm.mingcheng" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类别编码:" prop="code">
                  <el-input v-model="editTypeForm.code" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序:" prop="paixu">
                  <el-input-number v-model="editTypeForm.paixu" :min="0" label="描述文字"></el-input-number>
                </el-form-item>
                <el-form-item label="备注:" prop="=beizhu">
                  <el-input type="textarea" v-model="editTypeForm.beizhu"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisibleDicType=false">取消</el-button>
                <el-button v-if="dialogStatus=='dicTypeCreate'" type="primary" @click="createDicsTypeData">添加</el-button>
                <el-button v-else type="primary" @click="updateDicsTypeData">修改</el-button>
              </div>
            </el-dialog>
          </section>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style>
  .red {
    color: red;
  }

  .blue {
    color: blue;
  }

</style>

<script>
  import store from '@/store/index.js' //引入本地存储
  import util from "@/utils/table.js";
  import {
    paraHelper
  } from '@/utils/para.js' //请求参数格式
  import {
    handlePost,
    handleGet
  } from '@/api/apihelper.js'
  export default {
    data() {
      return {
        bllCode: { //接口标识，由后端提供 
          add: 'AddDictionary', //新增
          edit: 'UpdateDictionary', //修改
          del: 'DelDictionary', //删除
          getList: 'GetListDictionary', //获取列表
          getObj: 'GetDictionary', //获取对象（单个）
        },
        buttons: { //按钮的权限控制
          selectshow: false,
          addshow: false,
          updateshow: false,
          delshow: false,
          // addtypeshow:false,
          // updatetypeshow:false,
          // deltypeshow:false
        },
        dialogStatus: "",
        textMap: {
          update: "编辑字典",
          create: "新增字典",
          dicTypeCreate: '新增字典类别',
          dicTypeUpdate: '编辑字典类别'
        },
        items: [], //字典类别
        dialogFormVisible: false,
        dialogFormVisibleDicType: false,
        filters: {
          mingcheng: ""
        },
        dics: [], //字典
        total: 0,
        page: 1,
        sels: [], // 列表选中列
        editFormRules: {
          name: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }]
        },
        //字典代码
        dicPare: {
          shangjiid: 0,
          mingcheng: '',
          Page: 1,
          Size: 10
        },
        //请求参数
        para: paraHelper,
        // 编辑字典界面数据
        editForm: {
          id: 0,
          shangjiid: 0,
          mingcheng: '',
          code: '',
          SecondParameter: '',
          paixu: 1,
          beizhu: '',
          shifouqiyong: true
        },
        // 编辑字典类别界面数据
        editTypeForm: {
          id: 0,
          shangjiid: 0,
          mingcheng: '',
          code: '',
          SecondParameter: '',
          paixu: 1,
          beizhu: '',
          shifouqiyong: true
        },
        // 编辑字典类别界面数据
        selectTypeForm: {
          id: 0,
          shangjiid: 0,
          mingcheng: '',
          code: '',
          SecondParameter: '',
          paixu: 1,
          beizhu: '',
          shifouqiyong: true
        },
        selectDicsType: false, //选中字典类别标识
        addFormVisible: false, // 新增界面是否显示
        addFormRules: {
          name: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
          }]
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
          this.interfaces=data.map(item=>item.bllcode)
          this.buttons.addshow =this.interfaces.indexOf(this.bllCode.add)>0?true:false
          this.buttons.selectshow =this.interfaces.indexOf(this.bllCode.getList)>0?true:false
          this.buttons.updateshow =this.interfaces.indexOf(this.bllCode.edit)>0?true:false
          this.buttons.delshow =this.interfaces.indexOf(this.bllCode.del)>0?true:false
          //console.log('this.interfaces.show', this.interfaces)
          //console.log('this.bllCode.add',this.bllCode.add)
        }
      },
      //查询
      getKeyList() {
        this.dicPare.Page = 1
        this.getDics()
      },
      toggle: function (dex) {
        var _this = this
        var tran = 0
        this.items.forEach((item, index) => {
          this.$set(item, 'color');
          if (index == dex) {
            this.items[index].color = !this.items[index].color;
            tran = item.id //赋值类别代码
            _this.selectTypeForm.code = item.code
            _this.selectTypeForm.id = item.id
            _this.selectTypeForm.beizhu = item.beizhu
            _this.selectTypeForm.paixu = item.paixu
            _this.selectTypeForm.mingcheng = item.mingcheng
            _this.selectDicsType = true
            //console.log('item', item)
           //console.log('_this.selectTypeForm', _this.selectTypeForm)
          }
        })
        this.editForm.shangjiid = this.dicPare.shangjiid = tran
        this.getDics()
      },
      getDics() { //获取字典
        this.para.Data = JSON.stringify(this.dicPare)
        this.para.Code = this.bllCode.getList
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.dics = res.Data.List;
            this.total = res.Data.Count;
          } else {
            this.dics = []
            console.log(res)
          }
        }).catch(err => {
          console.log(err)
        })
      },

      // 默认显示转换
      formatStatus: function (row, column) {
        return row.shifouqiyong === true ? "启用" : "禁用";
      },
      handleCurrentChange(val) {
        this.dicPare.Page = val
        this.getDics()
      },
      //获取字典类别
      getDiccategory() {
        const shortPare = {
          shangjiid: -1,
        }
        this.para.Data = JSON.stringify(shortPare)
        this.para.Code = this.bllCode.getList
        handlePost(this.para).then(res => {
          if (res.IsSuccess == true) {
            this.items = res.Data.List;
          } else {
            this.items = []
          }
        }).catch(err => {
          console.log(err)
        })

      },
      // 删除字典
      handleDel(index, row) {
        this.$confirm("确认删除该记录吗?", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "warning"
          })
          .then(() => {
            const shortPare = {
              id: row.id
            };
            this.para.Code = this.bllCode.del
            this.para.Data = JSON.stringify(shortPare)
            console.log(this.para)
            handlePost(this.para).then(res => {
              if (res.IsSuccess == true) {
                this.getDics()
              } else {}
            }).catch(err => {
              console.log(err)
            })
          }).catch(() => {});
      },
      // 删除字典类别
      handleDelDicsType() {
        if (!this.selectDicsType) {
          this.$message({
            message: '请选择字典类别',
            type: 'info'
          })
        } else {
          this.$confirm("确认删除该记录吗?", "提示", {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: "warning"
            })
            .then(() => {
              const shortPare = {
                id: this.selectTypeForm.id
              };
              this.para.Code = this.bllCode.del
              this.para.Data = JSON.stringify(shortPare)
              console.log(this.para)
              handlePost(this.para).then(res => {
                if (res.IsSuccess == true) {
                  this.getDiccategory()
                } else {}
              }).catch(err => {
                console.log(err)
              })
            }).catch(err => {
              console.log(err)
            });
        }
      },
      // 显示字典类别编辑界面
      dicTypeEdit() {
        if (!this.selectDicsType) {
          this.$message({
            message: '请选择字典类别',
            type: 'info'
          })
        } else {
          this.dialogStatus = "dicTypeUpdate";
          this.dialogFormVisibleDicType = true;
          this.editTypeForm = this.selectTypeForm
        }
      },
      // 显示字典类别新增界面
      dicTypeAdd() {
        this.dialogStatus = "dicTypeCreate";
        this.dialogFormVisibleDicType = true;
        this.editTypeForm = {
          id: 0,
          shangjiid: 0,
          mingcheng: '',
          code: '',
          SecondParameter: '',
          paixu: 1,
          beizhu: '',
          shifouqiyong: true
        };
      },
      // 显示编辑界面
      handleEdit(index, row) {
        this.dialogStatus = "update";
        this.dialogFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      // 显示新增界面
      handleAdd() {
        if (!this.selectDicsType) {
          this.$message({
            message: '请选择字典类别',
            type: 'info'
          })
        } else {
          this.dialogStatus = "create";
          this.dialogFormVisible = true;
          this.editForm = {
            id: 0,
            shangjiid: this.selectTypeForm.id,
            mingcheng: '',
            code: '',
            SecondParameter: '',
            paixu: 1,
            beizhu: '',
            shifouqiyong: true
          };
        }
      },
      // 编辑字典
      updateData() {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              })
              .then(() => {
                this.para.Code = this.bllCode.edit
                this.para.Data = JSON.stringify(this.editForm)
                handlePost(this.para).then(res => {
                  if (res.IsSuccess == true) {
                    this.getDics()
                    this.$refs['editForm'].resetFields()
                    this.dialogFormVisible = false
                  } else {}
                }).catch(err => {
                  console.log(err)
                })

              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      // 新增字典
      createData: function () {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              })
              .then(() => {
                this.para.Code = this.bllCode.add
                this.para.Data = JSON.stringify(this.editForm)
                handlePost(this.para).then(res => {
                  if (res.IsSuccess == true) {
                    this.$refs['editForm'].resetFields()
                    this.dialogFormVisible = false
                    this.getDics()
                  } else {}
                }).catch(err => {
                  console.log(err)
                })

              })
              .catch(e => {
                // 打印一下错误
                console.log(e);
              });
          }
        });
      },
      // 编辑字典类别
      updateDicsTypeData() {
        this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(() => {
            this.para.Code = this.bllCode.edit
            console.log(this.editTypeForm)
            this.para.Data = JSON.stringify(this.editTypeForm)
            handlePost(this.para).then(res => {
              if (res.IsSuccess == true) {
                this.dialogFormVisibleDicType = false;
                this.getDiccategory()
              } else {}
            }).catch(err => {
              console.log(err)
            })

          })
          .catch(e => {
            // 打印一下错误
            console.log(e);
          });
      },
      // 新增字典类别
      createDicsTypeData: function () {
        this.$confirm("确认提交吗？", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(() => {
            this.para.Code = this.bllCode.add
            console.log(this.editTypeForm)
            this.para.Data = JSON.stringify(this.editTypeForm)
            handlePost(this.para).then(res => {
              if (res.IsSuccess == true) {
                this.dialogFormVisibleDicType = false;
                this.getDiccategory()
              } else {}
            }).catch(err => {
              console.log(err)
            })

          })
          .catch(e => {
            // 打印一下错误
            console.log(e);
          });
      },
      // 全选单选多选
      selsChange(sels) {
        this.sels = sels;
        console.log(this.sels)
      },
      // 批量删除
      batchRemove() {
        var ids = this.sels.map(item => item.id).toString();
        this.$confirm("确认删除选中记录吗？", "提示", {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: "warning"
          })
          .then(() => {
            const shortPare = {
              id: ids
            };
            this.para.Data = JSON.stringify(shortPare)
            this.para.Code = this.bllCode.del
            handlePost(this.para).then(res => {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.getDics()
            });
          })
          .catch(() => {});
      }
    },
    mounted() {
      this.loadButton(store.getters.interfaces) //按钮显示
      this.getDiccategory();
    }
  };

</script>

<style scoped>
</style>
