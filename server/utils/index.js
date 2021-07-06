const utils = {
  /**
   * 日期格式互相转换(时间格式eg:2010-01-10)
   * @param {Date or String} date
   */
  dateFormat: (date) => {
    const year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    let millisecond = date.getMilliseconds()
    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    if (millisecond < 10) {
      millisecond = '00' + millisecond
    } else if (millisecond < 100) {
      millisecond = '0' + millisecond
    }
    return `${year}${month}${day}_${hour}${minute}${second}_${millisecond}`
  }
}

exports = module.exports = utils
