/**
 * 校验
 *
 * 隐藏的数据全部清空
 * 默认值 数据改变影响
 * 是否必输、字段长度、数字、汉字、英文、特殊字符
 * 合理性：数据来源正确、数据写入正确、数据进出范围一致（员工—>如何确定为员工）
 * 监听return
 * 必传放最前
 *
 * @return {isEmpty} 字符串空验证
 */

export default {
  /**
   * trim修饰符对后端传过来的值无效
   * 字符串空验证 后台返的值前后不能有空格
   * @param {String} str 字符串
   */
  isEmpty: (str) => {
    if (!str.trim().length) return { flag: true, label: '不能为空' }
    return { flag: str.trim() !== str, label: '首尾不能为空' }
  },
  /**
  * trim修饰符对后端传过来的值无效
  * 字符串类型
  * @param {String} str 字符串
  * @param {String} msg 提示信息
  * @param {String} type 类型 chiese中文 english英文 num数字 engChinese中英文 specChar特殊字符
  */
  isStrType (str = '你好世界', msg = '纯中文', type = 'chinese') {
    const emptyFlag = this.isEmpty(str)
    if (emptyFlag.flag) return { flag: !emptyFlag.flag, label: `${msg}${emptyFlag.label}` }
    let regx = /^[\u4e00-\u9fa5]+$/ // 以什么开头、个数、以什么结尾 + 1-n * 0-n
    let label = '只能为中文'
    if (type === 'num') {
      regx = /^[\d]+$/
      label = '只能为数字'
    } else if (type === 'english') {
      regx = /^[a-zA-Z]+$/
      label = '只能为英文'
    } else if (type === 'engChinese') {
      regx = /^[a-zA-Z\u4e00-\u9fa5]+$/
      label = '只能为中英文'
    } else if (type === 'specChar') {
      regx = /^[([a-zA-Z\u4e00-\u9fa5_\\-]+$/ // 特殊字符放前
      label = '只能为中英文特殊字符'
    }
    return { flag: regx.test(str), label: `${msg}${label}` }
  }
}
