import qs from 'qs'
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getInfo(token) {
  return request({
    url: `/user/info?token=${encodeURIComponent(token)}`,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
