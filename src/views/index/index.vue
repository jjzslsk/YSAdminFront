<template>
  <body class="hold-transition skin-blue sidebar-mini">
     <div class="wrapper">
        <main-sidebar></main-sidebar>
        <header-top></header-top>
        <content-wrapper></content-wrapper>
        <main-footer></main-footer>
        <control-sidebar></control-sidebar>
        <div class="control-sidebar-bg"></div>
      </div>
  </body>

</template>
<script>
import { mainSidebar,contentWrapper,mainFooter,controlSidebar,headerTop } from '../../components/Modular/'
export default {
  name: 'index',
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
