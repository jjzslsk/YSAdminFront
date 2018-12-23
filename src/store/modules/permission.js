import {
  constantRouterMap
} from '@/router'
/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}
//系统菜单
import layout from '@/views/layout/Layout' //Layout 是架构组件，不在后台返回，在文件里单独引入
import interfacemanagement from '@/views/interface/index'
import navigationmenu from '@/views/navigationmenu/index'
import operationlog from '@/views/operationlog/index'
import configure from '@/views/configure/index'
// import YsdatabaseYsButton from '@/views/navigationmenu/index'
import button from '@/views/button/index'
import rolemanagement from '@/views/rolemanagement/index'
// import usermanage from '@/views/usermanage/index'
import usermanagement from '@/views/usermanagement/index'
import datadictionary from '@/views/datadictionary/index'
import divisionmanage from '@/views/divisionmanage/index'
import myinfo from '@/views/myinfo/index'
import joinsource from '@/views/joinsource/index'
import systableconfig from '@/views/systableconfig/index'
import systemsetup from '@/views/systemsetup/index'
import errorPage from '@/views/errorPage/404'

//财务管理
import bonusdetailed from '@/views/errorPage/404'
import recharge from '@/views/recharge/index'
import withdrawmoney from '@/views/errorPage/404'
import transferaccounts from '@/views/transferaccounts/index'
import miner from '@/views/miner/index'
import integral from '@/views/errorPage/404'
//业务管理
import membermanagement from '@/views/membermanagement/index'
import purchaseofminemachine from '@/views/purchaseofminemachine/index'
import upgrademinemachine from '@/views/upgrademinemachine/index'
import recommendedmembers from '@/views/errorPage/404'
import proxysetting from '@/views/errorPage/404'


//页面标识转换组件对象
function loadLayout(name) {
  if (name == 'Layout') {
    return layout
  } else if (name == 'rolemanagement') {
    return rolemanagement
  } else if (name == 'navigationmenu') {
    return navigationmenu
  }else if (name == 'operationlog') {
    return operationlog
  }else if (name == 'configure') {
    return configure
  }else if (name == 'button') {
    return button
  } else if (name == 'interface') {
    return interfacemanagement
  } else if (name == 'usermanagement') {
    return usermanagement
  } else if (name == 'datadictionary') {
    return datadictionary
  } else if (name == 'divisionmanage') {
    return divisionmanage
  } else if (name == 'myinfo') {
    return myinfo
  } else if (name == 'joinsource') {
    return joinsource
  } else if (name == 'systableconfig') {
    return systableconfig
  } else if (name == 'systemsetup') {
    return systemsetup
  } else if (name == 'bonusdetailed') {
    return bonusdetailed
  } else if (name == 'recharge') {
    return recharge
  } else if (name == 'withdrawmoney') {
    return withdrawmoney
  } else if (name == 'transferaccounts') {
    return transferaccounts
  } else if (name == 'miner') {
    return miner  
  } else if (name == 'membermanagement') {
    return membermanagement
  }  else if (name == 'integral') {
    return integral
  } else if (name == 'purchaseofminemachine') {
    return purchaseofminemachine
  } else if (name == 'upgrademinemachine') {
    return upgrademinemachine
  } else if (name == 'recommendedmembers') {
    return recommendedmembers
  } else if (name == 'proxysetting') {
    return proxysetting
  } else {
    return errorPage
  }
}

//遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) { 
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) { 
        route.component = loadLayout(route.component)
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      // console.log('state.addRouters', state.addRouters)
      // console.log('路由合并前constantRouterMap', constantRouterMap)
      state.routers = constantRouterMap.concat(routers)
      // console.log('合并后state.routers', state.routers)
    }
  },
  actions: {
    GenerateRoutes({
      commit
    }, data) {
      console.log ('55GenerateRoutes路由表',data)
      return new Promise(resolve => {
        //let accessedRouters =data

        let accessedRouters = data.data
        
        accessedRouters = filterAsyncRouter(accessedRouters)

        // if (roles.indexOf('admin') >= 0) {
        //   console.log('admin>=0')
        //   accessedRouters = asyncRouterMap
        // } else {
        //   console.log('admin<0')
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        //   // accessedRouters = ''
        //   // accessedRouters = asyncRouterMap
        // }
        //console.log('accessedRouters', accessedRouters)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
