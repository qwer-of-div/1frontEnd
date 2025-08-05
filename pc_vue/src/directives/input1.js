
export default {
  inserted (el, binding, vnode) {
    // 查找输入元素（支持 input 和 textarea）
    const input =
      el.querySelector('.el-input__inner') ||
      el.querySelector('.el-textarea__inner') ||
      el

    // 处理中文输入法的 compositionstart 和 compositionend 事件
    input.addEventListener('compositionstart', () => {
      vnode.locking = true // 锁定输入，避免中文输入导致双向绑定失效
    })
    input.addEventListener('compositionend', () => {
      vnode.locking = false // 解除锁定
      input.dispatchEvent(new Event('input')) // 触发 input 事件，以更新数据
    })

    // 处理键盘输入事件
    input.onkeyup = () => {
      let newModifiers = vnode.key // 获取指令参数（例如 'num' 或 'intp'）
      console.log(vnode)

      let newRules

      // 如果指令参数包含 ':'
      if (newModifiers && newModifiers.includes(':')) {
        const info = newModifiers.split(':')
        newModifiers = info[0] // 指令类型（例如 'intRange'）
        newRules = info[1]?.split('-') // 规则（例如范围 [0-100]）
      }

      if (vnode.locking) {
        return // 如果输入被锁定，则不处理
      }

      // 根据指令参数选择不同的输入处理函数
      switch (newModifiers) {
        case 'double':
          onlyDouble(input, newRules) // 处理双精度浮点数
          break
        case 'intRange':
          onlyIntRange(input, newRules) // 处理整数范围
          break
        case 'num':
          onlyNum(input) // 处理数字
          break
        case 'num_point':
          onlyNumPoint(input) // 处理数字和小数点
          break
        case 'float':
          onlyFloat(input, binding.value) // 处理浮点数（限制小数位数）
          break
        case 'int':
          onlyInt(input) // 处理整数（无前导零）
          break
        case 'intp':
          onlyIntp(input) // 处理正整数
          break
        case 'alp':
          onlyAlp(input) // 处理字母
          break
        case 'num_alp':
          onlyNumAlp(input) // 处理数字和字母
          break
        case 'arith':
          onlyArith(input) // 处理算术运算符和数字
          break
        default:
          break
      }

      input.dispatchEvent(new Event('input')) // 触发 input 事件，以更新数据
    }

    // 处理双精度浮点数输入
    function onlyDouble (input, rules) {
      onlyFloat(input, 1) // 先确保输入符合浮点数格式
      if (input.value < Number(rules[0])) {
        input.value = Number(rules[0]) // 处理范围下限
      } else if (input.value > Number(rules[1])) {
        input.value = Number(rules[1]) // 处理范围上限
      }
    }
    let timer = null
    // 处理整数范围输入
    function onlyIntRange (input, rules) {
      onlyIntp(input) // 处理正整数输入
      if (input.value) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        handleRangeValue(input, rules)
      }, 2000)
    }

    function handleRangeValue (input, rules) {
      if (input.value < Number(rules[0])) {
        input.value = Number(rules[0]) // 处理范围下限
      } else if (input.value > Number(rules[1])) {
        input.value = Number(rules[1]) // 处理范围上限
      }
    }

    // 处理仅数字输入
    function onlyNum (input) {
      input.value = input.value.replace(/\D+/g, '') // 去掉非数字字符
    }

    // 处理整数输入（无前导零）
    function onlyInt (input) {
      const value = input.value.replace(/\D+/g, '') // 去掉非数字字符
      input.value = value ? Number(value).toString() : value // 去掉开头多个0
    }

    // 处理正整数输入（去掉前导零）
    function onlyIntp (input) {
      const value = input.value.replace(/\D+/g, '') // 去掉非数字字符
      input.value = /^[1-9][0-9]*$/.test(value)
        ? value
        : value.replace(/^0+/, '') // 确保为正整数，去掉前导零
    }

    // 处理数字和小数点输入
    function onlyNumPoint (input) {
      input.value = input.value.replace(/[^\d.]/g, '') // 允许数字和小数点
    }

    // 处理浮点数输入（限制小数位数）
    function onlyFloat (input, n) {
      let value = input.value
      value = value.replace(/[^\d.]/g, '') // 允许数字和小数点
      value = value.replace(/^\./g, '') // 去掉开头的点
      value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.') // 处理多个点的情况
      if (n && Number(n) > 0) {
        const d = new Array(Number(n)).fill('\\d').join('') // 构建正则表达式
        const reg = new RegExp(`^(\\-)*(\\d+)\\.(${d}).*$`, 'ig')
        value = value.replace(reg, '$1$2.$3') // 限制小数位数
      }
      if (value && !value.includes('.')) {
        value = Number(value).toString() // 去掉开头多个0
      }
      input.value = value
    }

    // 处理字母输入
    function onlyAlp (input) {
      input.value = input.value.replace(/[^A-Za-z]/g, '') // 只允许字母
    }

    // 处理数字和字母输入
    function onlyNumAlp (input) {
      input.value = input.value.replace(/[^A-Za-z0-9]/g, '') // 只允许数字和字母
    }

    // 处理算术运算符和数字输入
    function onlyArith (input) {
      const value = input.value
      if (value) {
        input.value = value.split('').reduce((prev, cur) => {
          const reg = /^[\d|\-|+|*|/|.|(|)]+$/
          if (reg.test(cur)) {
            return prev + cur // 只允许数字和算术运算符
          }
          return prev
        }, '')
      }
    }
  }
}
