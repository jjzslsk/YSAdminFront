import request from '@/utils/request'
import {
  getToken,
  getId
} from '@/utils/auth'
//统一操作api
export function handlePost(params) { //post请求方式
  params.User = {
    Id: getId(),
    Token: getToken(),
    Type: 'sys',
  }
  return request({
    url: '?rdn=' + Math.random(),
    method: 'post',
    data: params
  })
}
export function handleGet(params) { //get请求方式
  params.User = {
    Id: getId(),
    Token: getToken(),
    Type: 'sys',
  }
  return request({
    url: '?rdn=' + Math.random(),
    method: 'get',
    params: params
  })
}
