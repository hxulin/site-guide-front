import request from '@/utils/request'

/**
 * 保存项目记录
 */
export function saveUser(data) {
  return request({
    url: '/auth/user/save',
    method: 'post',
    data
  })
}

/**
 * 查询项目列表记录
 */
export function listUser(data) {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

/**
 * 删除项目记录
 */
export function delUser(data) {
  return request({
    url: '/auth/user/del',
    method: 'post',
    data
  })
}
