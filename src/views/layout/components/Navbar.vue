<template>
  <el-menu class="navbar" mode="horizontal">
    <nx-hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></nx-hamburger>

    <nx-breadcrumb class="breadcrumb-container"></nx-breadcrumb>
      <!-- <tags-view class="tags-view"></tags-view> -->


    <div class="right-menu">
     <!-- <error-log class="errLog-container right-menu-item"></error-log> -->

      <!-- <nx-github style="margin-top:2px" class="nx-help right-menu-item"></nx-github> -->
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
      <!-- <nx-help class="nx-help right-menu-item" /> -->
      <el-tooltip style="height:50px;line-height:50px" effect="dark" content="首页" placement="bottom">
      <router-link to="/" tag="span"><span data-v-bb4f6990="" class="nx-help" style="margin: 0 8px;cursor: pointer;">
        <i class="fa fa-home" style="margin-top: 1.25rem;font-size: 21px;color:#727272" aria-hidden="true"></i>
      </span></router-link>
      </el-tooltip>


      <nx-top-lock style="cursor:pointer;" class="nx-help"></nx-top-lock>
      <el-tooltip style="height:50px;line-height:50px" effect="dark" content="全屏" placement="bottom">
        <nx-full-screen class="screenfull right-menu-item"></nx-full-screen>
      </el-tooltip>

      <el-tooltip style="height:50px;line-height:50px" effect="dark" content="退出" placement="bottom">
      <span @click="logout" data-v-bb4f6990="" class="nx-help" style="margin: 0 8px; cursor: pointer;">
        <i class="fa fa-arrow-right" style="margin-top: 1.25rem;font-size: 21px;color:#727272" aria-hidden="true"></i>
      </span>
      </el-tooltip>

      

      <!-- <nx-top-lock style="cursor:pointer" class="nx-help"></nx-top-lock>
      <el-tooltip effect="dark" content="全屏" placement="bottom">
        <nx-full-screen class="screenfull right-menu-item"></nx-full-screen>
      </el-tooltip> -->

      <!-- <lang-select class="international right-menu-item"></lang-select>
      <nx-lang-select class="international right-menu-item"></nx-lang-select> -->

      <!-- <el-tooltip effect="dark" content="主题" placement="bottom">
        <theme-picker class="theme-switch right-menu-item"></theme-picker>
        <nx-skin class="theme-switch right-menu-item"></nx-skin>
      </el-tooltip> -->


    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import ErrorLog from '@/components/ErrorLog'
import nxTopLock from '@/components/nx-top-lock'
import nxBreadcrumb from '@/components/nx-breadcrumb'
import nxHamburger from '@/components/nx-hamburger'
import nxHelp from '@/components/nx-help/index'
import nxFullScreen from '@/components/nx-full-screen/index'
import nxLangSelect from '@/components/nx-lang-select/index'
import nxSkin from '@/components/nx-skin/index'
import nxGithub from '@/components/nx-github/index'
import TagsView from './TagsView'
export default {
  name: 'navBar',
  components: {
    nxBreadcrumb,
    nxHamburger,
    nxHelp,
    nxFullScreen,
    nxLangSelect,
    nxSkin,
    nxTopLock,
    nxGithub,
    ErrorLog,
    TagsView
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
              logout() {
      this.$confirm("确认退出吗?", "提示", {
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  background: #fff;
  color: #727272;
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .nx-help {
    display: inline-block;
    vertical-align: top;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    margin-right: 3rem;
    color: #fff;
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international {
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
// ...
.tags-view {
  background: yellowgreen;
}
.screenfull-svg {
  color: #fff !important;
}
.btn-text {
  color: #fff !important;
}
</style>
