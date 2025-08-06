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
      el.value = el.value.replace(thousandsReg, '')
    }
    el.onblur = function () {
      el.isFocus = false
      el.value = moneyFormat(el.value, opt.precision, opt.thousands)
    }

    let lock = false // 标记是否需要锁定输入框
    el.oninput = function () {
      if (lock) return // 如果当前为锁定状态，则不进行处理
      let value = el.value
      const reg = new RegExp('^\\D*(\\d*(?:\\.\\d{0,' + opt.precision + '})?).*$', 'g')
      value = value.replace(thousandsReg, '').replace(reg, '$1').replace(/^(0)[^.]/g, '$1')

      // if (value) {
      //   // 整数、小数
      //   const arr = value.split('.')
      //   // const regex = /\.!$/ // 注意 $ 表示字符串的结尾
      //   // console.log(regex.test(value)) // 输出: true
      //   const int = Number(arr[0]).toString() // 去掉开头多个0
      //   value = arr.length > 1 ? int + '.' + arr[1] : int
      // }
      el.value = value
    }
    el.addEventListener('compositionstart', () => {
      lock = true
    })
    el.addEventListener('compositionend', () => {
      lock = false
      el.dispatchEvent(new Event('input'))
    })
  }
}
