<template>
<div>
  <section  class="app-container">
      <!--编辑界面-->
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 信息修改</span>
           <h4 style="font-size: 16px;color: #606266;">信息修改:</h4>
      <el-form :model="editForm" label-width="100px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称:">
          <el-input v-model="editForm.mingcheng" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名:">
          <el-input v-model="editForm.zhenshixingming" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" :rules="[{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }]">
          <el-input v-model="editForm.youxiang"></el-input>
        </el-form-item>
        <el-form-item label="手机:" :rules="[{ type: 'number', message: '手机号码格式不正确'}]">
          <el-input v-model="editForm.shoujihaoma"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button @click.native="dialogFormVisible=false">取消</el-button>
        <el-button type="primary" @click="updateData">确认</el-button>
        </el-form-item>
      </el-form>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label"><i class="el-icon-edit"></i> 密码修改</span>
          <el-row>
            <el-col :span="12" class="toolbar" style="padding-bottom: 0px;">
            <h4 style="font-size: 16px;color: #606266;">密码修改:</h4>
            <!--工具条-->
              <!-- <el-form :inline="true" label-width="100px" :model="filters" @submit.native.prevent> -->
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="新密码:" prop="xinmima">
                    <el-input type="password" v-model="ruleForm2.xinmima" autocomplete="off"></el-input>
                </el-form-item><br>
                <el-form-item label="确认新密码:" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item><br>
                <el-form-item label="旧密码:" prop="mima">
                    <el-input type="password" v-model="ruleForm2.mima" autocomplete="off"></el-input>
                </el-form-item><br>
                <el-form-item label="">
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm2')">确认</el-button>
                </el-form-item><br>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="联系客服"></el-tab-pane>
      </el-tabs>
  </section>

    
  </div>
</template>

<script>
import { getToken, getId } from "@/utils/auth";
import util from "@/utils/table.js";
import { handlePost, handleGet } from "@/api/apihelper.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { Message, MessageBox } from "element-ui";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm2.xinmima) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      bllCode: {
        //接口标识，由后端提供
        add: "AddAdmin", //新增
        edit: "UpdateMySelf", //修改
        del: "DelAdmin", //删除
        getList: "GetListAdmin", //获取列表
        getObj: "GetSource", //获取对象（单个）
        getRolesList: "GetListRole", //获取角色
        getListDepartment: "GetListDepartment" //获取角色
      },
      roles: [],
      departments: [],
      editForm: {},
      editFormRules: {
        UserName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ]
      },

      ruleForm2: {
        mima: "",
        xinmima: "",
        // pass: '',
        checkPass: ""
        // age: ''
      },
      rules2: {
        xinmima: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },

      activeNames: [""],
      disabledZhangHao: false,
      para: paraHelper,

      filters: {
        // keyword: "123"
      },

      users: [],
      form: {
        desc: ""
      },
      usersSysDBList: [],
      usersSysCacheList: [],
      SysDB: [],
      SysCache: []
    };
  },
  methods: {
    //行点击事件
    Rowdblclick() {
      this.handleAdd();
    },
    //提交个人信息
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("确认个人信息?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
          }).then(() => {
            // console.log (this.ruleForm2)
            const passData = {
              mima: this.ruleForm2.mima,
              xinmima: this.ruleForm2.xinmima
            };
            this.para.Data = JSON.stringify(passData);
            this.para.Code = "ChangePassWordAdmin";
            console.log(this.para);
            handlePost(this.para).then(res => {
              if (res.IsSuccess == true) {
                // console.log ("成功")
                Message({
                  message: "修改成功",
                  type: "success",
                  duration: 5 * 1000
                });
              }
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const paraId = {
            id: row.id
          };
          this.para.Data = JSON.stringify(paraId);
          this.para.Code = "DelAdmin";
          handlePost(this.para)
            .then(res => {
              if (res.IsSuccess == true) {
                this.getUsers(); //刷新列表
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取用户列表
    getUsers() {
      let myGetId = {
        id: getId()
      };
      this.para.Data = JSON.stringify(myGetId);
      this.para.Code = "GetAdmin";
      handlePost(this.para).then(res => {
        this.editForm = res.Data;
        console.log("editForm::!", this.editForm);
        if (res.IsSuccess == true) {
          this.para.Data = "";
          this.para.Code = "GetListDepartment";
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.departments = res.Data.List;
              this.para.Code = "GetListRole";
              handlePost(this.para).then(res => {
                if (res.IsSuccess == true) {
                  this.roles = res.Data.List;
                }
              });
            }
          });
        }
      });
    },

    // 显示编辑界面
    handleEdit(index, row) {
      // this.dialogFormVisible = true;
      this.editForm = Object.assign({}, row);
      // console.log(this.editForm);
      this.para.Data = "";
      this.para.Code = "GetListDepartment";
      console.log(this.para);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.departments = res.Data.List;
          this.para.Code = "GetListRole";
          handlePost(this.para).then(res => {
            if (res.IsSuccess == true) {
              this.roles = res.Data.List;
            }
          });
        }
      });
    },

    //编辑提交
    updateData() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认删除选中记录吗？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              // Vue.delete(this.editForm,'zhanghao')
              // const IsSelf = {
              //     IsSelf: true
              // }
              const paraObj = {
                mingcheng: this.editForm.mingcheng,
                zhenshixingming: this.editForm.zhenshixingming,
                youxiang: this.editForm.youxiang,
                shoujihaoma: this.editForm.shoujihaoma
              };
              // Object.assign(paraObj,IsSelf)
              this.para.Data = JSON.stringify(paraObj);
              this.para.Code = this.bllCode.edit;
              console.log("para:!!!", this.para.Data);
              handlePost(this.para)
                .then(res => {
                  if (res.IsSuccess == true) {
                    console.log("res!::", res);
                    //   this.$refs["editForm"].resetFields();
                    //   this.dialogFormVisible = false;
                    //   this.getUsers(); //刷新列表
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(e => {
              // 打印一下错误
              console.log(e);
            });
        }
      });
    },

    //提交表单
    SubmissionForm() {
      this.users.SysDB = this.SysDB;
      this.users.SysCache = this.SysCache;

      const sysData = {
        IsCheck: this.users.IsCheck,
        SysCache: this.users.SysCache,
        SysDB: this.users.SysDB,
        UpFilePath: this.users.UpFilePath,
        TimeOut: this.users.TimeOut
      };
      this.para.Code = "SetSysConfig";
      this.para.Data = JSON.stringify(sysData);
      console.log(this.para);
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          Message({
            message: "提交成功！",
            type: "success",
            duration: 5 * 1000
          });
        }
      });
    },
    //确认修改

    //清除缓存
    RemoveCache() {
      this.para.Data = "";
      this.para.Code = "RemoveCache";
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          Message({
            message: "清除成功！",
            type: "success",
            duration: 5 * 1000
          });
        }
      });
    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          const paraId = {
            id: row.id
          };
          this.para.Data = JSON.stringify(paraId);
          this.para.Code = "DelAdmin";
          handlePost(this.para)
            .then(res => {
              if (res.IsSuccess == true) {
                this.getUsers(); //刷新列表
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>
<style scoped>
</style>
