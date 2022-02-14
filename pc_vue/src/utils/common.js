/**
 * 最多三个参数
 * 标识符使用字符串 具有含义的字符串
 * @return {myPopup} 自定义提示框
 * @return {myStorage} 数据持久化
 */

/**
 * 确认框
 * @param {String} title 标题
 * @param {String} message 信息
 * @param {String} confirmLabel 确定label
 * @param {Func} callback 回调函数
 */
export const myPopup = ({ title = '温馨提示', message = '请确认', confirmLabel = '确定', confirmColor = '#69f', callback }) => {
  return alert({ title, message, confirmLabel, confirmColor }).then(callback)
}

// 菜单列表
import others from "@/router/modules/others.js"

const menu = {
  others: others[0].children
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
  }
}
