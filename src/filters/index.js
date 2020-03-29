/**
 * @Description: 刚刚、几分钟前、几小时前、几天前...
 *
 * @param dateStr   yyyy-MM-dd HH:mm:ss
 * @returns {string}
 */
export function timeAgo(dateStr) {
  let result = '-';
  if (arguments.length === 0 || !dateStr) {
    return result;
  }
  dateStr = dateStr.replace(/-/g, '/');
  const timestamp = new Date(dateStr).getTime();
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const now = new Date().getTime();
  const diffValue = now - timestamp;

  if (diffValue < 0) {
    return result;
  }
  const minC = diffValue / minute;
  const hourC = diffValue / hour;
  const dayC = diffValue / day;
  const weekC = diffValue / week;
  const monthC = diffValue / month;
  if (monthC >= 1 && monthC <= 3) {
    result = parseInt(monthC) + "月前"
  } else if (weekC >= 1 && weekC <= 3) {
    result = parseInt(weekC) + "周前"
  } else if (dayC >= 1 && dayC <= 6) {
    result = parseInt(dayC) + "天前"
  } else if (hourC >= 1 && hourC <= 23) {
    result = parseInt(hourC) + "小时前"
  } else if (minC >= 1 && minC <= 59) {
    result = parseInt(minC) + "分钟前"
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = "刚刚"
  } else {
    const datetime = new Date();
    datetime.setTime(timestamp);
    const Nyear = datetime.getFullYear();
    const Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    const Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    result = Nyear + "-" + Nmonth + "-" + Ndate
  }
  return result;
}
