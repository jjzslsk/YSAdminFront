<template>
  <div id="app">
        <!--登入动画-->
    <transition name="rotate-fall">
    <router-view  class="app-router-view"></router-view>
    </transition>

  <!-- <body class="hold-transition skin-blue sidebar-mini">
     <div class="wrapper">
        <main-sidebar></main-sidebar>
        <header-top></header-top>
        <content-wrapper></content-wrapper>
        <main-footer></main-footer>
        <control-sidebar></control-sidebar>
        <div class="control-sidebar-bg"></div>
      </div>
  </body> -->
  </div>
</template>
<script>
import { mainSidebar,contentWrapper,mainFooter,controlSidebar,headerTop } from './components/Modular/'
export default {
  name: 'App',
    components: {
      headerTop,
    mainSidebar,
    contentWrapper,
    mainFooter,
    controlSidebar
  },
}
  // $.widget.bridge('uibutton', $.ui.button);

</script>
<style>
.tree-row .el-tree-node{
  background: #f5f7fa;
}
.tree-row .el-tree-node__children .el-tree-node{
  float: left;
}
.tree-row .el-tree-node__content {
  /* background: beige; */
}
#app .sidebar-container .svg-icon {
    margin-right: 0px;
}
.el-submenu .el-menu-item {
    padding: 0 0px;

}.el-submenu .el-menu-item .pull-right-container{
    height: 50px;
    display: flex;
    float: right;
    align-items: center;
    margin-right: 2rem;
}
.roleBox .el-dialog__body {
    padding: 0;

}
</style>
