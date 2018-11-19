<template>
            <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper" style="min-height:916px">
          <!-- Content Header (Page header) -->
          <section class="content-header">
            <h1>
              Dashboard
              <small>Control panel</small>
            </h1>
            <ol class="breadcrumb">
              <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
              <li class="active">Dashboard</li>
            </ol>
          </section>

          <!-- Main content -->
          <section class="content">
            <!-- Small boxes (Stat box) -->
            <app-main></app-main>
            <!-- /.row (main row) -->

          </section>
          <!-- /.content -->
        </div>
</template>
<script>
// import { Navbar, Sidebar, AppMain, TagsView } from './components'
// import { Navbar, Sidebar, AppMain, TagsView } from '/src/views/layout/components/'
import { Navbar, Sidebar, AppMain, TagsView } from './../../views/layout/components/'
// import ResizeMixin from './mixin/ResizeHandler'
import ResizeMixin from './../../views/layout/mixin/ResizeHandler'
// import ResizeMixin from '/src/views/layout/mixin/ResizeHandler'
export default {
    name:'contentWrapper',
      components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>


