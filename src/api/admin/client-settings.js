import request from '@/utils/request'

/**
 * 查询客户端配置信息
 */
export function fetchClientConf() {
  return request({
    url: '/client_conf/get',
    method: 'get'
  })
}

/**
 * 查询客户端配置信息
 */
export function saveClientConf(data) {
  return request({
    url: '/auth/client_conf/upd',
    method: 'post',
    data
  })
}
