/**
 * 最多三个参数
 * 标识符使用字符串 具有含义的字符串
 * @return {dateFormat} 日期格式互相转换
 */

/**
   * 日期格式互相转换
   * @param {Date or DateStr} date 日期
   */
export const dateFormat = (date = '1997-12-29' || new Date()) => {
  if (typeof (date) === 'string') return new Date(date.replace(/-/g, '/'))
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  month = month < 10 ? '0' + month : month
  day = day < 10 ? '0' + day : day
  return year + '-' + month + '-' + day
}