import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
  getId,
  setId,
  removeId
} from '@/utils/auth'
import {
  setStore,
  getStore,
  removeStore
} from '@/utils/store'
import {
  Message,
  MessageBox
} from 'element-ui'
const user = {
  state: {
    token: getToken(),
    id: getId(),
    name: '',
    avatar: '',
    roles: [],
    isLock: getStore({
      name: 'isLock'
    }) || false,
    lockPasswd: getStore({
      name: 'lockPasswd'
    }) || '',
    browserHeaderTitle: getStore({
      name: 'browserHeaderTitle'
    }) || '',
    interfaces: [],//权限接口
  },

  mutations: {
    SET_ROUTERMAP: (state, routerMap) => {
      state.routerMap = routerMap
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOCK_PASSWD: (state, lockPasswd) => {
      state.lockPasswd = lockPasswd
      setStore({
        name: 'lockPasswd',
        content: state.lockPasswd,
        type: 'session'
      })
    },
    SET_LOCK: (state, action) => {
      state.isLock = true
      setStore({
        name: 'isLock',
        content: state.isLock,
        type: 'session'
      })
    },
    CLEAR_LOCK: (state, action) => {
      state.isLock = false
      state.lockPasswd = ''
      removeStore({
        name: 'lockPasswd'
      })
      removeStore({
        name: 'isLock'
      })
    },
    SET_BROWSERHEADERTITLE: (state, action) => {
      state.browserHeaderTitle = action.browserHeaderTitle
    },
    SET_INTERFACE: (state, interfaces) => {
      state.interfaces = interfaces
    },
    CLEAR_INTERFACE: (state, action) => {
      state.interfaces = []
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      console.log (2)
      console.log ('username::::::1',userInfo)
      const username = userInfo.username.trim()//去除两端空格
      return new Promise((resolve, reject) => {
        // console.log("addrss in user.login")
        login(username, userInfo.password).then(response => {
          console.log (6)
          console.log ('response::::::4',response)
          if (response.IsSuccess == true) {
          console.log ('response::::::3',response)

            setId(response.Data.MId)
            setToken(response.Data.Token)
            commit('SET_ID', response.Data.Id)
            commit('SET_TOKEN', response.Data.Token)
            // setToken("admin")//设置token
            // commit('SET_TOKEN', "admin")//设置token
            resolve()
          }
          else {
            Message({
              message: response.Code + ':' + response.Message,
              type: "warning"
            })
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      console.log ('11',state.token)
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          console.log ('33返回数据',response)
          console.log('getInfo=>res', response)
          const data = response.Data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
           if (data.MenuButtons && data.MenuButtons.length > 0) { // 验证返回的接口是否是一个非空数组
             commit('SET_INTERFACE', data.MenuButtons)//
             console.log('SET_INTERFACE', state.interface)
           } else {
             reject('getInfo: MenuButtons must be a non-null array !')
           }
          commit('SET_NAME', data.name)
          commit('SET_ROUTERMAP', [{
            P: 1,
            L: 2
          }])
          console.log('state.routerMap=', state.routerMap)
          //commit('SET_AVATAR', data.avatar)
          resolve(response.Data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout().then(res => {
          console.log('loginout_res',res)
          commit('SET_TOKEN', '')
          commit('SET_ID', '')
          commit('SET_ROLES', [])
          commit('CLEAR_LOCK')
          commit('CLEAR_INTERFACE')
          removeId()
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        console.log('FedLogOut')
        commit('SET_TOKEN', '')
        commit('SET_ID', '')
        commit('CLEAR_INTERFACE')
        removeId()
        removeToken()
        resolve()
      })
    },
    // 动态修改权限
    ChangeRoles({
      commit
    }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getInfo(role).then(response => {
          const data = response
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          //commit('SET_AVATAR', data.avatar)
          resolve()
        })
      })
    }
  }
}

export default user
