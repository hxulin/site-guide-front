import request from '@/utils/request'

/**
 * 热点页面, 查询最大排序号
 */
export function queryMaxSequence() {
  return request({
    url: '/hot_pages/max_sequence',
    method: 'get'
  })
}

/**
 * 保存热点页面记录
 */
export function saveHotPages(data) {
  return request({
    url: '/hot_pages/save',
    method: 'post',
    data
  })
}

/**
 * 查询热点页面列表记录
 */
export function listHotPages(data) {
  return request({
    url: '/hot_pages/list',
    method: 'post',
    data
  })
}

/**
 * 删除热点页面记录
 */
export function delHotPages(data) {
  return request({
    url: '/hot_pages/del',
    method: 'post',
    data
  })
}
