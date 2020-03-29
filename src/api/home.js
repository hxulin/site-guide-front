import request from '@/utils/request'

/**
 * 查询用户列表信息
 */
export function fetchUserList() {
  return request({
    url: '/home/user_list',
    method: 'get'
  })
}

/**
 * 查询项目列表信息
 */
export function fetchProjectList() {
  return request({
    url: '/home/project_list',
    method: 'get'
  })
}
