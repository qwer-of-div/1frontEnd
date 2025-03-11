/**
 * 最多三个参数
 * 标识符使用字符串 具有含义的字符串
 * @return {objAssign} 对象赋值
 * @return {myAlert} 单个确认框
 * @return {myDoubleAlert} 双确认框
 */

// import others from "@/router/modules/others.js"

const menu = {
  // others: others[0].children
}

export default {

  getMenuList (key) {
    return menu[key].map(item => {
      if (item.path.indexOf(":") !== -1) {
        const id = item.path.replace(/:/g, "")
        return { label: item.meta.label, id }
      } else {
        return {
          label: item.meta.label,
          id: `/${key}/${item.path}`
        }
      }
    })
  },
  /**
 * 对象赋值
 * @param {Object} newObj 目标对象
 * @param {Object} oldObj 原始对象
 */
  objAssign: (newObj, oldObj) => {
    // const whiteList = [] // 白名单
    for (const key in newObj) {
      newObj[key] = oldObj[key]
    }
  },
  /**
 * 单个确认框
 * @param {String} title 标题
 * @param {String} message 信息
 * @param {String} okLabel 确定label
 * @param {Func} callback 回调函数
 */
  myAlert: ({ title = '温馨提示', message = '提示信息展示', okLabel = '确定', okColor = '#69f', callback } = {}) => {
    return alert({ title, message, okLabel, okColor }).then(callback)
  },
  /**
* 双确认框
* @param {String} title 标题
* @param {String} message 信息
* @param {String} okLabel 确定label
* @param {Func} callback 回调函数
* @param {String} cancelLabel 取消Label
* @param {Func} cancelCallback cancelCallback
*/
  myDoubleAlert: ({ title = '温馨提示', message = '提示信息展示', okLabel = '确定', okColor = '#69f', cancelLabel = '取消', cancelColor = '#fff', callback, cancelCallback } = {}) => {
    return alert({ title, message, okLabel, okColor, cancelLabel, cancelColor }).then(callback).catch(cancelCallback)
  }
}