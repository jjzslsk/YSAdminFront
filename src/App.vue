<template>
  <div id="app">
        <!--登入动画-->
    <!-- <transition name="rotate-fall">
    <router-view  class="app-router-view"></router-view>
    </transition> -->
      
  <body class="hold-transition skin-blue sidebar-mini">
     <div class="wrapper">
       <header></header>
        <main-sidebar></main-sidebar>
        <header-top></header-top>
        <content-wrapper></content-wrapper>
        <main-footer></main-footer>
        <control-sidebar></control-sidebar>
        <div class="control-sidebar-bg"></div>
      </div>
  </body>
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

</style>
