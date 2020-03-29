import request from '@/utils/request'

/**
 * 项目管理页面, 查询最大排序号
 */
export function queryMaxSequence() {
  return request({
    url: '/project/max_sequence',
    method: 'get'
  })
}

/**
 * 保存项目记录
 */
export function saveProject(data) {
  return request({
    url: '/auth/project/save',
    method: 'post',
    data
  })
}

/**
 * 查询项目列表记录
 */
export function listProject(data) {
  return request({
    url: '/project/list',
    method: 'post',
    data
  })
}

/**
 * 删除项目记录
 */
export function delProject(data) {
  return request({
    url: '/auth/project/del',
    method: 'post',
    data
  })
}
