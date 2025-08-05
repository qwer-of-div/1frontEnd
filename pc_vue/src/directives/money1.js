/*
 * @Author: your name
 * @Date: 2021-07-02 13:31:43
 * @LastEditTime: 2021-07-02 14:59:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hello-world\src\directives.js
 */
/**
 * @description:
 * @param {*} money
 * @param {*} len
 * @param {*} separator
 * @return {*}
 * 金额的自定义指令
 */
function moneyFormat (money, len, separator = ',') {
  len = len || 2
  if (!money && money !== 0) return ''
  if (isNaN(+money)) return ''
  if (money === 0 || money === '0') return '0.' + '0'.repeat(len)
  var arr = (money + '').split('.')
  var intStr = arr[0] ? arr[0] : 0
  var floatStr = arr[1] ? arr[1] : 0
  if (floatStr === 0) {
    floatStr = '0'.repeat(len)
  } else {
    floatStr = (+('0.' + floatStr)).toFixed(len).split('.')[1]
  }
  money = (intStr + '.' + floatStr).replace(/(\d{1,3})(?=(?:\d{3})+\.)/g, `$1${separator}`)
  return money
}

export default {
  bind (el, binding) {
    // 判断是否是input元素
    var els = el.tagName.toLocaleUpperCase() === 'INPUT' ? el : (el.querySelector('input') ? el.querySelector('input') : null)
    if (els) {
      el = els
    } else {
      throw new Error('v-money-format requires 1 input')
    }
    const opt = Object.assign({}, {
      thousands: ',',
      precision: 2
    }, binding.value ? binding.value : {})
    const regStr = '/^$*+?.|'
    const inRegStr = regStr.includes(opt.thousands) ? (`\\${opt.thousands}`) : opt.thousands
    const thousandsReg = new RegExp(inRegStr, 'g')
    if (!el.isFocus) {
      el.value = moneyFormat(el.value, opt.precision, opt.thousands)
    }
    el.onfocus = function () {
      el.isFocus = true
      console.log(el.value)
      el.value = el.value.replace(thousandsReg, '') / 100
    }
    el.onblur = function () {
      el.isFocus = false
      el.value = moneyFormat(el.value, opt.precision, opt.thousands)
    }
    el.oninput = function () {
      const reg = new RegExp('^\\D*(\\d*(?:\\.\\d{0,' + opt.precision + '})?).*$', 'g')
      el.value = el.value.replace(thousandsReg, '').replace(reg, '$1').replace(/^(0)[^.]/g, '$1')
    }
  }
}
