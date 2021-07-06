/**
 * 最多三个参数
 * 标识符使用字符串 具有含义的字符串
 * @return {randomNum} 一定范围内的随机整数
 * @return {resetObj} 递归清空对象
 * @return {arrTobj} 数组对象转换对象
 * @return {chooseDic} 字典转换 为空时
 * @return {chooseDic1} 字典转换 为空时
 * @return {dicList} 返回字典展示列表
 * @return {dateFormat} 日期格式互相转换
 * @return {prevNextDate} 之前多少 天 的日期，之后多少 天 的日期
 * @return {getBirth} 身份证获取生日
 * @return {debounce} 防抖
 * @return {throttle} 节流
 * @return {hiddenStr} 手机号、身份证 *展示
 * @return {spacePhone} 手机号 空格展示
 * @return {spaceBank} 银行卡 空格展示
 */

/**
 * 一定范围内的随机整数 包含min 不包含max
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export const randomNum = (min = 0, max = 10) => {
  return Math.floor(Math.random() * (max - min) + min)
}

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

/**
 * 之前多少 天 的日期，之后多少 天 的日期
 * @param {Date or DateStr} date 日期
 * @param {Number} delay 多少天
 */
export const prevNextDate = (date = '1997-12-29' || new Date(), delay = 7 || -7) => {
  const tempDate = typeof (date) === 'object' ? date : new Date(date.replace(/-/g, '/'))
  return new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate() + delay)
}

/**
 * 递归清空对象
 * @param {Object} obj 被清空对象
 */
export const resetObj = {
  func: function (obj) {
    const whiteList = ['type'] // 白名单
    for (const key in obj) {
      // 白名单不处理
      if (whiteList.includes(key)) continue
      if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
        obj[key] = []
        continue
      }
      if (Object.prototype.toString.call(obj[key]) === '[object Object]') {
        this.func(obj[key])
        continue
      }
      obj[key] = ''
    }
  }
}

/**
 * 数组对象转换对象
 * @param {Array} arr 数组
 */
export const arrTobj = (arr) => {
  const obj = {}
  arr.forEach((item, index) => {
    if (index === 0) {
      obj.item = item
      return
    }
    obj[`item${index}`] = item
  })
  return obj
}

/**
   * 字典获取
   * @param {Array} arr 字典数组
   * @param {string} status 需要获取的值
   */
export const chooseDic = (arr, status) => {
  let tempArr = []
  let index = -1
  for (const item of arr) {
    tempArr = Object.values(item) // item.value做成的数组
    index = tempArr.indexOf(status)
    if (index !== -1) {
      tempArr.splice(index, 1)
      return tempArr[0]
    }
  }
}

/**
   * 字典转换
   * @param {Array} arr 字典数组
   * @param {string} status 需要转换的值
   */
export const chooseDic1 = (arr, status) => {
  if (status === undefined) return
  for (const item of arr) {
    // if (item.id === status) return item.value || item.text
    // if (item.value === status || item.text === status) return item.id
    if (item.id === status) return item.value
    if (item.value === status) return item.id
  }
}

/**
 * 返回字典展示列表
 * @param {Array} arr 字典数组
 */
export const dicList = (arr) => {
  return arr.map(item => {
    return item.value
  })
}

/**
 * 身份证获取生日
 * @param {String} id
 */
export const getBirth = (id) => {
  const birth = id.substr(6, 8)
  return new Date(birth.substr(0, 4), birth.substr(4, 2) - 1, birth.substr(6))
}

/**
 * 获取年龄
 * @param {Date or DateStr} date 日期
 */
export const getAge = (date) => {
  const birth = typeof (date) === 'object' ? date : new Date(date.replace(/-/g, '/'))
  const dateNow = new Date()
  return dateNow.getFullYear() - birth.getFullYear() - ((dateNow.getMonth() < birth.getMonth() || (dateNow.getMonth() === birth.getMonth() && dateNow.getDate() < birth.getDate())) ? 1 : 0)
}

/**
 * 手机号、身份证 *展示
 * @param {String} str 手机号隐藏中间四位、身份证
 */
export const hiddenStr = (str) => {
  if (str.length === 11) return str.substr(0, 3) + '****' + str.substr(7)
  if (str.length === 18) return str.substr(0, 3) + '***********' + str.substr(14)
}

/**
 * 手机号 空格展示
 * @param {Element} el input框
 * @param {String} newVal watch 新值
 * @param {String} oldVal watch 旧值
 */
export const spacePhone = ({ el, newVal, oldVal }) => {
  let value = newVal.replace(/\D/g, '').substr(0, 11) // 不允许输入非数字字符，超过11位数字截取前11位
  const len = value.length
  if (len >= 8) {
    value = value.replace(/^(\d{3})(\d{4})/g, '$1 $2 ')
  } else if (len > 3 && len < 8) {
    value = value.replace(/^(\d{3})/g, '$1 ')
  }

  if (!el) return { value, cursorIndex: null }

  let cursorIndex = el.selectionStart
  const isAdd = newVal.length > oldVal.length
  if (cursorIndex === 4 || cursorIndex === 9) cursorIndex += isAdd ? 1 : -1
  return { value, cursorIndex }
}

/**
 * 银行卡 空格展示
 * @param {Element} el input框
 * @param {String} newVal watch 新值
 * @param {String} oldVal watch 旧值
 */
export const spaceBank = ({ el, newVal, oldVal }) => {
  // const value = newVal.replace(/\D/g, '').substr(0, 18) // 不允许输入非数字字符，超过18位数字截取前18位
  const value = newVal.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ') // 不允许输入非数字字符，超过11位数字截取前11位

  if (!el) return { value, cursorIndex: null }

  let cursorIndex = el.selectionStart
  console.log(cursorIndex, '银行卡号空格', oldVal, newVal)
  const isAdd = newVal.length > oldVal.length
  if (cursorIndex % 5 === 0 && cursorIndex !== 0) cursorIndex += isAdd ? 1 : -1
  return { value, cursorIndex }
}

/**
 * 防抖 最后一次
 * @param {Number} time
 * @param {Func} callBack
 */
export const debounce = (callBack, time = 500) => {
  let timer
  return function () {
    const args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      callBack.apply(this, args)
    }, time)
  }
}

/**
 * 节流 间隔多久一次
 * @param {Func} callBack
 * @param {Number} time
 */
export const throttle = (callBack, time = 500) => {
  let timer = null
  return function () { // 此函数参数arguments
    const args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        callBack.apply(this, args) // 传入callBack参数
        timer = null
      }, time)
    }
  }
}
