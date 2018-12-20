import Vue from 'vue'
import Router from 'vue-router'

// const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import { endianness } from 'os';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard/dashboard'
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: '/index/index'
  // },
  // 错误日志
  {
    path: '/errorLog',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'errorLog',
        name: 'errorLog',
        component: () => import('@/views/errorLog/errorLog'),
        meta: { title: 'Errorlog', icon: 'errorLog' }
      }
    ]
  },

  { path: '/login', component: () => import('@/views/login'), name: '登录', hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  { path: '/index', component: () => import('@/views/index'), hidden: true },
  { path: '/dashboard/sys/rolemanagement', component: () => import('@/views/rolemanagement'), hidden: true },
  { path: '/dashboard/sys/navigationmenu', component: () => import('@/views/navigationmenu'), hidden: true },
  { path: '/divisionmanage', component: () => import('@/views/divisionmanage'), hidden: true },
  { path: '/usermanagement', component: () => import('@/views/usermanagement'), hidden: true },
  { path: '/datadictionary', component: () => import('@/views/datadictionary'), hidden: true },
  { path: '/operationlog', component: () => import('@/views/operationlog'), hidden: true },
  // 锁屏
  {
    path: '/lock',
    hidden: true,
    name: '锁屏页',
    component: () => import('@/views/common/lock')
  },
  // 报表
  {
    path: '/dashboard',
    component: Layout,
    meta: {
      title: 'dashboard',
      icon: 'dashboard'
    },
    children: [
      {
        path: 'dashboard',
        name: '首页',
        component: () => import('@/views/dashboard/dashboard'),
        meta: {
          title: '首页',
          icon: 'dashboard'
        }
      }
    ]
  },

]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
export const asyncRouterMap = []
