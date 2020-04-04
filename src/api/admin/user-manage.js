import request from '@/utils/request'

/**
 * 保存用户记录
 */
export function saveUser(data) {
  return request({
    url: '/auth/user/save',
    method: 'post',
    data
  })
}

/**
 * 查询用户列表记录
 */
export function listUser(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}
