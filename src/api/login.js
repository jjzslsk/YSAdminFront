import request from '@/utils/request'
import {
  getToken,
  getId
} from '@/utils/auth'
//登录
export function login(username, password) {
  console.log (3)
  let para = {
    Code: 'YsAdminLogin',
    Data: JSON.stringify({
      Username: username,
      Password: password
    })
  }
  return request({
    url: '?rdn=' + Math.random(),
    method: 'post',
    data: para
  })
  // return request({
  //   url: '/user/login',
  //   method: 'post',
  //   data: {
  //     username,
  //     password
  //   }
  // })
}
//获取用户信息
export function getInfo(token) {
  console.log ('22',token)
  let para = {
    Code: 'YsAdminGetInfo',
    Data: '',
    User: {
      Id: getId(),
      Token: getToken(),
      Type: 'sys',
    }
  }
  return request({
    url: '?rdn=' + Math.random(),
    method: 'post',
    data: para
  })
  // return request({
  //   url: '/user/info',
  //   method: 'get',
  //   params: {
  //     token
  //   }
  // })
}

export function logout() {
  let para = {
    Code: 'LoginOut',
    Data: '',
    User: {
      Id: getId(),
      Token: getToken(),
      Type: 'sys',
    }
  }
  return request({
    url: '?rdn=' + Math.random(),
    method: 'post',
    data: para
  })
  // return request({
  //   url: '?rdn=' + Math.random(),
  //   method: 'post'
  // })
}
