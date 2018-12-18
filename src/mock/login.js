import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    code: 0,
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    router: [
      {
        path: '/sys_manage',
        component: 'Layout',
        meta: {
          title: 'sys_manage',
          icon: 'component'
        },
        children: [{
            path: 'interface',
            name: 'interface',
            component: 'interface',
            meta: {
              title: 'interface',
              icon: 'tab'
            }
          },
          {
            path: 'YsdatabaseYsButton',
            name: 'YsdatabaseYsButton',
            component: 'YsdatabaseYsButton',
            meta: {
              title: 'YsdatabaseYsButton',
              icon: 'tab'
            }
          },
          {
            path: 'button',
            name: 'button',
            component: 'button',
            meta: {
              title: 'button',
              icon: 'tab'
            }
          },
          {
            path: 'myinfo',
            name: 'myinfo',
            component: 'myinfo',
            meta: {
              title: 'myinfo',
              icon: 'tab'
            }
          },
          {
            path: 'rolemanagement',
            name: 'rolemanagement',
            component: 'rolemanagement',
            meta: {
              title: 'rolemanagement',
              icon: 'tab'
            }
          },
          {
            path: 'usersmanage',
            name: 'usersmanage',
            component: 'usermanage',
            meta: {
              title: 'usersmanage',
              icon: 'tab'
            }
          },
          {
            path: 'datadictionary',
            name: 'datadictionary',
            component: 'datadictionary',
            meta: {
              title: 'datadictionary',
              icon: 'tab'
            }
          },
          {
            path: 'divisionmanage',
            name: 'divisionmanage',
            component: 'divisionmanage',
            meta: {
              title: 'divisionmanage',
              icon: 'tab'
            }
          }
        ]
      }
    ],
    //avatar: 'https://raw.githubusercontent.com/mgbq/Fast-Admin/master/src/assets/img/home/logo.png',
    name: 'Super Admin'
  },
  editor: {
    code: 0,
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    router: [
      //系统设置
      {
        path: '/sys_manage',
        component: 'Layout',
        meta: {
          title: 'sys_manage',
          icon: 'component'
        },
        children: [{
            path: 'interface',
            name: 'interface',
            component: 'interface',
            meta: {
              title: 'interface',
              icon: 'tab'
            }
          },
          {
            path: 'YsdatabaseYsButton',
            name: 'YsdatabaseYsButton',
            component: 'YsdatabaseYsButton',
            meta: {
              title: 'YsdatabaseYsButton',
              icon: 'tab'
            }
          },
          {
            path: 'button',
            name: 'button',
            component: 'button',
            meta: {
              title: 'button',
              icon: 'tab'
            }
          },
          {
            path: 'rolemanagement',
            name: 'rolemanagement',
            component: 'rolemanagement',
            meta: {
              title: 'rolemanagement',
              icon: 'tab'
            }
          },
          {
            path: 'usersmanage',
            name: 'usersmanage',
            component: 'usermanage',
            meta: {
              title: 'usersmanage',
              icon: 'tab'
            }
          },
          {
            path: 'datadictionary',
            name: 'datadictionary',
            component: 'datadictionary',
            meta: {
              title: 'datadictionary',
              icon: 'tab'
            }
          },
          {
            path: 'divisionmanage',
            name: 'divisionmanage',
            component: 'divisionmanage',
            meta: {
              title: 'divisionmanage',
              icon: 'tab'
            }
          }
        ]
      }
    ],
    //avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => {
    return {
      code: 0,
      Message: 'success'
    }
  }
}
