import qs from 'qs'
import request from '@/utils/request'

/**
 * 客户端下载
 */
export function download(data) {
  return request({
    url: '/client/download',
    method: 'post',
    data: qs.stringify(data),
    responseType: 'blob'
  })
}
