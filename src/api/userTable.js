import request from '@/utils/request'

export function getUserListPage(params) {
  return request({
    url: '/user/listpage',
    method: 'post',
    params: params
  })
}
//用户管理获取用户信息列表
export function getUserManageListPage(params) {
  return request({
    url: '/user/listpage',
    method: 'post',
    params: params
  })
}
export function removeUser(params) {
  return request({
    url: '/user/remove',
    method: 'post',
    params: params
  })
}
export function batchRemoveUser(params) {
  return request({
    url: '/user/batchremove',
    method: 'post',
    params: params
  })
}
export function editUser(params) {
  return request({
    url: '/user/edit',
    method: 'post',
    params: params
  })
}
export function addUser(params) {
  return request({
    url: '/user/add',
    method: 'post',
    params: params
  })
}
