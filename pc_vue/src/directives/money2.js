/**
 * v-money 金额千分位转换
 */

export default {
  inserted: inputFormatter({
    // 格式化函数
    formatter (num, util) {
      if (num === null || num === '' || num === 'undefined' || typeof (num) === 'undefined') {
        return ''
      }
      if (util === '万元' || util === '万') {
        return formatMoney(num, 'wan')
      } else if (util === '元') {
        return formatMoney(num)
      }
      // num = num.toString()
      // let num1 = num.split(".")[0], num2 = num.split(".")[1];
      // let c = num1.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      // return num.toString().indexOf(".") !=== -1 ? c + "." + num2 : c;
    },
    // 解析函数
    parser (val) {
      val = val.toString().replace(/,/g, '')
      console.log(val, 'val')
      return parseFloat(val) // .replace(/0+$/,"");
    },
    isNumber: true
  })
}

/**
 * 监听输入框 数值千位符
 * @param {*} param0
 * @returns
 */
function inputFormatter ({ formatter = (e) => e, parser = (e) => e, limit = (e) => e, watchInput = true, isNumber = false }) {
  return (el, binding, vnode) => {
    console.log(vnode.elm.innerText, 'vnode.elm.innerText')
    if (vnode.elm.innerText != '元' && vnode.elm.innerText != '万元' && vnode.elm.innerText != '万') {
      return
    }
    let watchVal = true
    const input = el.getElementsByClassName('el-input__inner')[0] // $(el).find(".el-input__inner")[0]
    // 获取记录光标位置
    let selectionSite
    const getSelectionSite = (event) => {
      const oldVal = event.target.value || ''
      const selectionStart = event.target.selectionStart
      selectionSite = oldVal.length - selectionStart
    }
    // 点击、键盘事件更新光标位置
    el.addEventListener('click', getSelectionSite)
    el.addEventListener('keyup', getSelectionSite)
    // 为input绑定值赋值
    const assignment = (val) => {
      vnode.componentInstance.$emit('input', parser(val))
    }
    // 更改显示的值
    const upShow = (val) => {
      console.log(val, 'valvalval')
      vnode.context.$nextTick(() => {
        input.value = val
      })
    }
    // 监听绑定值变化
    vnode.componentInstance.$watch('value', val => {
      if (watchVal) { upShow(formatter(val, vnode.elm.innerText)) }
    }, { deep: true, immediate: true })
    // 数字格式化
    const toNumber = (val) => {
      val = val.toString().replace(/[^\d^\.^\-]+/g, '') // 第二步：把不是数字，不是小数点、-的过滤掉
        .replace(/^0+(\d)/, '$1') // 第三步：第一位0开头，0后面为数字，则过滤掉，取后面的数字
        .replace(/^\./, '0.') // 第四步：如果输入的第一位为小数点，则替换成 0. 实现自动补全
        .replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 只保留第一个".", 清除多余的"."
      // .match(/^\d*(\.?\d{0,9})/g)[0] || ""; // 第五步：最终匹配得到结果 以数字开头，只有一个小数点，而且小数点后面只能有1到9位小数
      return val
    }
    // 处理最后一位非法字符
    const handlerIllegalStr = (str) => {
      while (!(/^[0-9]+.?[0-9]*/.test(str.charAt(str.length - 1))) && str) {
        str = str.substr(0, str.length - 1)
      }
      return str || ''
    }
    // 监听input事件，可添加操作
    el.addEventListener('input', (event) => {
      const selectionStart = input.selectionStart
      let val = event.target.value
      if (binding.modifiers.number || isNumber) {
        val = toNumber(val)
      }
      const inp = limit(val)
      console.log(inp, 'inp')
      event.target.value = inp
      // if (binding.modifiers.watchInput || watchInput) {
      //     assignment(inp)
      //     upShow(formatter(parser(val)))
      // }
      // setTimeout(() => {
      //     if (selectionSite && input.value.length != selectionStart) {
      //         input.selectionStart = input.selectionEnd = input.value.length - selectionSite
      //     }
      // }, 0)
    })
    if (input) {
      // 失去焦点
      input.addEventListener('blur', (event) => {
        watchVal = true
        let val = event.target.value
        console.log(val, '失去焦点111')
        if (val === null || val === '' || val === 'undefined' || typeof (val) === 'undefined') {
          return ''
        }
        if (binding.modifiers.number || isNumber) {
          val = handlerIllegalStr(val)
        }
        // assignment(val)
        upShow(formatter(val, vnode.elm.innerText))
        console.log(val, '失去焦点22')
      })
      // 获取焦点
      input.addEventListener('focus', (event) => {
        watchVal = false
        const val = event.target.value
        if (val === null || val === '' || val === 'undefined' || typeof (val) === 'undefined') {
          return ''
        }
        // val = delcommafy(val);
        // assignment(val)
        upShow(parser(val))
        console.log(parser(val), '获取焦点')
      })
    }
  }
}

// 去除千分位中的‘，’
function delcommafy (num) {
  if (num) {
    num = num.toString()
    num = num.replace(/,/gi, '')
    num = num.replace(/[ ]/g, '') // 去除空格
    return num
  }
  return num
}

/**
 * 金额千位符转换
 * @param {*}} val //金额
 * @param {*}} util //单位
 * @returns
 */
function formatMoney (val, util) {
  if (!val) return val
  // 保留小时位数
  var count = util === 'wan' ? 6 : 2
  const str = val.toString().split('.')
  const re = /\d{1,3}(?=(\d{3})+$)/g
  const n1 = str[0].replace(re, '$&,')
  var zeroCount = str.length > 1 && str[1] ? str[1] : ''
  // 小数点后面金额位置
  var strLength = str.length > 1 && str[1] ? str[1].length : 0
  for (let i = 0; i < (count - strLength); i++) {
    zeroCount += '0'
  }
  return str.length > 1 && str[1] ? `${n1}.${zeroCount}` : `${n1}.${zeroCount}`
}
