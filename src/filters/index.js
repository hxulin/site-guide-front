import * as timeago from 'timeago.js'

/**
 * @Description: 刚刚、几分钟前、几小时前、几天前...
 *
 * @param dateStr   yyyy-MM-dd HH:mm:ss
 * @returns {string}
 */
export function timeAgo(dateStr) {
    if (dateStr) {
      return timeago.format(dateStr, 'zh_CN');
    }
    return '-';
}
