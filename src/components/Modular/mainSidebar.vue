<template >
<div>

        <!-- <template v-for="item in routes" v-if="!item.hidden&&item.children">
          111

        </template> -->
    
        <aside class="main-sidebar">
          <section class="sidebar">
            <div class="user-panel">
              <div class="pull-left image">
                <img src="/src/assets/img/user2-160x160.jpg" class="img-circle" alt="User Image">
              </div>
              <div class="pull-left info">
                <p>Alexander Pierce</p>
                <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
              </div>
            </div>
            <form action="#" method="get" class="sidebar-form">
              <div class="input-group">
                <input type="text" name="q" class="form-control" placeholder="Search...">
                <span class="input-group-btn">
                      <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                      </button>
                    </span>
              </div>
            </form>

            <ul class="sidebar-menu" data-widget="tree">

              <li class="header">MAIN NAVIGATION</li>

              <li class="active treeview">
                <!-- 一级 -->
                <a href="#">
                  <i class="fa fa-dashboard"></i> <span>系统设置</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>

                <!-- 二级 -->
                <ul class="treeview-menu" v-for="item in routes" :key="item.name">
                  <li class="active"><a><i class="fa fa-circle-o"></i> {{item.name}}</a></li>
                  <!-- <li><a href="index2.html"><i class="fa fa-circle-o"></i> Dashboard v2</a></li> -->
                </ul>
              </li>

              <li class="treeview">
                <a href="#">
                  <i class="fa fa-files-o"></i>
                  <span>Layout Options</span>
                  <span class="pull-right-container">
                    <span class="label label-primary pull-right">4</span>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/layout/top-nav.html"><i class="fa fa-circle-o"></i> Top Navigation</a></li>
                  <li><a href="pages/layout/boxed.html"><i class="fa fa-circle-o"></i> Boxed</a></li>
                  <li><a href="pages/layout/fixed.html"><i class="fa fa-circle-o"></i> Fixed</a></li>
                  <li><a href="pages/layout/collapsed-sidebar.html"><i class="fa fa-circle-o"></i> Collapsed Sidebar</a></li>
                </ul>
              </li>
              <li>
                <a href="pages/widgets.html">
                  <i class="fa fa-th"></i> <span>Widgets</span>
                  <span class="pull-right-container">
                    <small class="label pull-right bg-green">new</small>
                  </span>
                </a>
              </li>
              <!-- <li class="treeview">
                <a href="#">
                  <i class="fa fa-pie-chart"></i>
                  <span>Charts</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/charts/chartjs.html"><i class="fa fa-circle-o"></i> ChartJS</a></li>
                  <li><a href="pages/charts/morris.html"><i class="fa fa-circle-o"></i> Morris</a></li>
                  <li><a href="pages/charts/flot.html"><i class="fa fa-circle-o"></i> Flot</a></li>
                  <li><a href="pages/charts/inline.html"><i class="fa fa-circle-o"></i> Inline charts</a></li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-laptop"></i>
                  <span>UI Elements</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/UI/general.html"><i class="fa fa-circle-o"></i> General</a></li>
                  <li><a href="pages/UI/icons.html"><i class="fa fa-circle-o"></i> Icons</a></li>
                  <li><a href="pages/UI/buttons.html"><i class="fa fa-circle-o"></i> Buttons</a></li>
                  <li><a href="pages/UI/sliders.html"><i class="fa fa-circle-o"></i> Sliders</a></li>
                  <li><a href="pages/UI/timeline.html"><i class="fa fa-circle-o"></i> Timeline</a></li>
                  <li><a href="pages/UI/modals.html"><i class="fa fa-circle-o"></i> Modals</a></li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-edit"></i> <span>Forms</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/forms/general.html"><i class="fa fa-circle-o"></i> General Elements</a></li>
                  <li><a href="pages/forms/advanced.html"><i class="fa fa-circle-o"></i> Advanced Elements</a></li>
                  <li><a href="pages/forms/editors.html"><i class="fa fa-circle-o"></i> Editors</a></li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-table"></i> <span>Tables</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/tables/simple.html"><i class="fa fa-circle-o"></i> Simple tables</a></li>
                  <li><a href="pages/tables/data.html"><i class="fa fa-circle-o"></i> Data tables</a></li>
                </ul>
              </li>
              <li>
                <a href="pages/calendar.html">
                  <i class="fa fa-calendar"></i> <span>Calendar</span>
                  <span class="pull-right-container">
                    <small class="label pull-right bg-red">3</small>
                    <small class="label pull-right bg-blue">17</small>
                  </span>
                </a>
              </li>
              <li>
                <a href="pages/mailbox/mailbox.html">
                  <i class="fa fa-envelope"></i> <span>Mailbox</span>
                  <span class="pull-right-container">
                    <small class="label pull-right bg-yellow">12</small>
                    <small class="label pull-right bg-green">16</small>
                    <small class="label pull-right bg-red">5</small>
                  </span>
                </a>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-folder"></i> <span>Examples</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="pages/examples/invoice.html"><i class="fa fa-circle-o"></i> Invoice</a></li>
                  <li><a href="pages/examples/profile.html"><i class="fa fa-circle-o"></i> Profile</a></li>
                  <li><a href="pages/examples/login.html"><i class="fa fa-circle-o"></i> Login</a></li>
                  <li><a href="pages/examples/register.html"><i class="fa fa-circle-o"></i> Register</a></li>
                  <li><a href="pages/examples/lockscreen.html"><i class="fa fa-circle-o"></i> Lockscreen</a></li>
                  <li><a href="pages/examples/404.html"><i class="fa fa-circle-o"></i> 404 Error</a></li>
                  <li><a href="pages/examples/500.html"><i class="fa fa-circle-o"></i> 500 Error</a></li>
                  <li><a href="pages/examples/blank.html"><i class="fa fa-circle-o"></i> Blank Page</a></li>
                  <li><a href="pages/examples/pace.html"><i class="fa fa-circle-o"></i> Pace Page</a></li>
                </ul>
              </li>
              <li class="treeview">
                <a href="#">
                  <i class="fa fa-share"></i> <span>Multilevel</span>
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
                  <li class="treeview">
                    <a href="#"><i class="fa fa-circle-o"></i> Level One
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">
                      <li><a href="#"><i class="fa fa-circle-o"></i> Level Two</a></li>
                      <li class="treeview">
                        <a href="#"><i class="fa fa-circle-o"></i> Level Two
                          <span class="pull-right-container">
                            <i class="fa fa-angle-left pull-right"></i>
                          </span>
                        </a>
                        <ul class="treeview-menu">
                          <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                          <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><a href="#"><i class="fa fa-circle-o"></i> Level One</a></li>
                </ul>
              </li>
              <li><a href="https://adminlte.io/docs"><i class="fa fa-book"></i> <span>Documentation</span></a></li>
              <li class="header">LABELS</li>
              <li><a href="#"><i class="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
              <li><a href="#"><i class="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
              <li><a href="#"><i class="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li> -->
            </ul>
          </section>
          <!-- /.sidebar -->
        </aside>

  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
// import SidebarItem from './../../views/layout/components/Sidebar/SidebarItem'
// import logo from './../../views/layout/components/Sidebar/logo'
// export default {
//   name:'mainSidebar',
//   components: { SidebarItem, logo },
//   computed: {
//     ...mapGetters([
//       'sidebar',
//       'permission_routers'
//     ]),
//     isCollapse() {
//       return !this.sidebar.opened
//     }
//   }
// }

import { generateTitle } from '@/utils/i18n'
import { mapGetters } from 'vuex'
export default {
  name: 'SidebarItem',
    computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers'
    ])
  },
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle,
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  },
  created() {
    // console.log ('permission_routers::1',permission_routers)

    for (const o in this.routes) {
      const obj = this.routes[o]
      if (obj.path.indexOf('myiframe') >= 0) {
        obj.children[0].path = 'urlPath?src=https://www.baidu.com'
      }
    }
  },
  mounted() {
    // console.log ('123123llOO',this.routes)
    // console.log ('permission_routers::2',this.permission_routers)
  }
}
</script>
