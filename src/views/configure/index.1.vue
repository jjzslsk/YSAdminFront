<template>
  <section class="app-container">
    <el-col :span="18">
    <el-card class="box-card">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form label-width="130px" :inline="true" :model="filters" @submit.native.prevent>
        <el-form-item label="是否校验权限:">
          <el-switch
            v-model="users.IsCheck"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </el-form-item><br>
        <el-form-item label="缓存设置:">
          <el-select
            v-model="SysCache"
            filterable
            allow-create
            default-first-option
            placeholder="请选择">
            <el-option
              v-for="item in usersSysCacheList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item><br>

        <!-- <el-form-item label="系统数据库:">
          <el-select
            v-model="SysDB"
            filterable
            allow-create
            default-first-option
            placeholder="请选择">
            <el-option
              v-for="item in usersSysDBList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item><br> -->
        <el-form-item label="系统数据库:">
          <el-select
            v-model="SysDB"
            filterable
            allow-create
            default-first-option
            placeholder="请选择">
            <el-option
              v-for="item in usersSysDBList"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="数据库类型:">
          <el-select
            v-model="SysDB"
            filterable
            allow-create
            default-first-option
            placeholder="请选择">
            <el-option
              v-for="item in usersSysDBType"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item><br>
        <el-form-item label="文件上传路径:">
           <el-input style="width:30rem" type="input" rows="5" v-model="users.UpFilePath"></el-input>
        </el-form-item><br>
          <a-button class="SubmissionForm" type="primary" v-on:click="SubmissionForm">提交</a-button>
        <hr>
        <el-form-item label="其他功能:">
          <!-- <span>其他功能：</span> -->
          <a-button type="primary" v-on:click="RemoveCache">清除缓存</a-button>
        </el-form-item>
      </el-form>
    </el-col>
    </el-card>
  </el-col>
  </section>
</template>

<script>
import util from "@/utils/table.js";
import { handlePost, handleGet } from "@/api/apihelper.js";
import { paraHelper } from "@/utils/para.js"; //请求参数格式
import { Message, MessageBox } from "element-ui";
export default {
  data() {
    return {
      activeNames: [""],
      disabledZhangHao: false,
      para: paraHelper,
      dialogStatus: "",

      // dialogVisible: false, //角色分配
      filters: {
        // keyword: "123"
      },

      users: [],
      form: {
        desc: ""
      },

      usersSysDBList: [],
      usersSysCacheList: [],
      usersSysDBType: [],

      SysDB: [],
      SysCache: [],
      SysDBType:[],

    };
  },
  methods: {
    // 获取用户列表
    getUsers() {
      this.para.Data = "";
      this.para.Code = "GetYsdatabaseYsConfig";
      handlePost(this.para).then(res => {
        if (res.IsSuccess == true) {
          this.users = res.Data;
          this.usersSysDBList = this.users.SysDBList;
          this.usersSysCacheList = this.users.SysCacheList;
          this.usersSysDBType = this.users.SysDBType;

        }
      });
    },
    //提交表单
    SubmissionForm() {
      this.$confirm("确认修改该系统配置?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
        this.users.SysDB = this.SysDB;
        this.users.SysCache = this.SysCache;

        const sysData = {
          IsCheck: this.users.IsCheck,
          SysCache: this.users.SysCache,
          SysDBType: this.users.SysDBType,

          SysDB: this.users.SysDB,
          UpFilePath: this.users.UpFilePath,
        };
        this.para.Code = "AddYsdatabaseYsConfig";
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
      });
    },
    //清除缓存
    RemoveCache() {
      this.$confirm("确认清除缓存?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: "warning"
      }).then(() => {
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
      });
    },
    // 删除
    handleDel(index, row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
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
.SubmissionForm {
  margin: 1rem 0rem 2rem 20rem;
}
</style>
