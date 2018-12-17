import Vue from 'vue'

import VCharts from 'v-charts'

// //bootstrap
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.min.js'
// //jquery
// import 'jquery/dist/jquery.js'
// //font-awesome
// import 'font-awesome/css/font-awesome.css'
// //AdminLTE
// import 'admin-lte'
// import 'admin-lte/dist/css/skins/_all-skins.min.css'
// import 'admin-lte/dist/css/AdminLTE.min.css'
// import './assets/css/skins/_all-skins.min.css'
// import './assets/css/AdminLTE.min.css'
// //bower
// // import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js'


// import 'admin-lte/bower_components/Ionicons/css/ionicons.min.css'
// import 'admin-lte/bower_components/morris.js/morris.css'
// import 'admin-lte/bower_components/jvectormap/jquery-jvectormap.css'
// import 'admin-lte/bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'
// import 'admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.css'
// //plugins
// import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css'
// import 'admin-lte/bower_components/raphael/raphael.min.js'
// import 'admin-lte/bower_components/morris.js/morris.min.js'
// import 'admin-lte/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js'
// import 'admin-lte/bower_components/jquery-knob/dist/jquery.knob.min.js'
// // import 'admin-lte/bower_components/moment/min/moment.min.js'
// import 'admin-lte/bower_components/bootstrap-daterangepicker/daterangepicker.js'
// import 'admin-lte/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
// import 'admin-lte/bower_components/jquery-slimscroll/jquery.slimscroll.min.js'
// import 'admin-lte/bower_components/fastclick/lib/fastclick.js'

// import 'admin-lte/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js'
// import 'admin-lte/plugins/jvectormap/jquery-jvectormap-world-mill-en.js'
// // import './assets/js/bootstrap3-wysihtml5.all.min.js'
// // import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js'
// // import 'admin-lte/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js'

// import 'admin-lte/dist/js/adminlte.min.js'
// // import 'admin-lte/dist/js/pages/dashboard.js'
// //主题
// import 'admin-lte/dist/js/demo.js'//

//BootstrapVue
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
// Vue.use(BootstrapVue);

// -----------------------------------------
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.config.productionTip = false
Vue.use(Antd)

// 地图
import BaiduMap from 'vue-baidu-map'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import '../static/css/iconfont/1.0.0/index.css' /* icofont*/

// css
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import '@/styles/index.scss' // global css
// 右键菜单
import contentmenu from 'v-contextmenu'
// import 'v-contextmenu/dist/index.css'
import './mock' // simulation data

import './errorLog'// error log
// font-awesome
import '@/assets/library/font-awesome-4.7.0/css/font-awesome.min.css'

import App from './App'

import router from './router'

import store from './store'

// Internationalization
import i18n from './lang'
import { global } from '@/global/global'
import {
  loadStyle
} from './utils/util'
import {
  iconfontUrl,
  iconfontVersion
} from '@/config/env'

import '@/icons' // icon

import '@/permission' // permission control

import * as filters from './filters' // global filters
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.use(VCharts)
Vue.use(contentmenu)
Vue.use(ElementUI, { locale })
iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
  console.log ('replace',ele)
})
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
// 地图
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'oW2UEhdth2tRbEE4FUpF9E5YVDCIPYih'
})
// 加载用户主题
if (localStorage.getItem('themeValue')) {
  global.changeTheme(localStorage.getItem('themeValue'))
} else {
  global.changeTheme('default')
}
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  // template: '<App/>',
  // components: { App }
  render: h => h(App)
})

