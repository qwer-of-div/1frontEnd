<template>
    <Input type="text" :disabled="disabled" @on-blur="blur" :maxlength="Number(maxlength)" :placeholder="placeholder" v-model="inputValue" @on-change="change($event)"></Input>
</template>
<script>
export default {
  name: 'CustomNumberInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    // 整数位数
    int: {
      type: [String, Number],
      default: Infinity
    },
    // 小数位数
    deci: {
      type: [String, Number],
      default: '0'
    },
    maxlength: {
      type: [String, Number],
      default: Infinity
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    inputValue: {
      get () {
        return this.value.toString() || ''
      },
      set (val) {
        //去除非数字和非小数点
        let newVal = val.replace(/[^\d.]/g, '')
        if (!newVal && newVal !== '0') {
          this.$emit('input', '')
          return
        }
        if (Number(this.deci) === 0) {
          //不允许输入小数, 处理所有小数点和第一位为零后跟数字的情况
          this.$emit('input', newVal.replace(/\./, '').substring(0, Number(this.int)))
        } else {
          //允许输入小数, 处理第一位为小数点和第一位为零后跟数字的情况
          newVal = newVal.replace(/^\./, '0.').replace(/^0+(?=\d)/, '')
          //格式化
          let firstIndex = newVal.indexOf('.')
          if (firstIndex === -1) {
            //没有输入小数点
            this.$emit('input', newVal.substring(0, Number(this.int)))
          } else {
            let intStr = newVal.slice(0, firstIndex).substring(0, Number(this.int))
            let deciStr = newVal.slice(firstIndex + 1).replace(/\./g, '').substring(0, Number(this.deci))
            this.$emit('input', intStr + '.' + deciStr)
          }
        }
      }
    }
  },
  watch: {
    'value': {
      handler (newVal) {
        // 初始化值类型为number时转换为字符串便于非空校验
        if (typeof newVal === 'number') {
          this.$emit('input', newVal.toString())
        }
      },
      immediate: true
    }
  },
  methods: {
    change (e) {
      this.$nextTick(() => {
        e.target._value = e.target.value = this.value
      })
    },
    blur () {
      if (/\.$/.test(this.inputValue)) {
        this.$emit('input', this.inputValue.replace(/\.$/, ''))
      }
      this.$emit('on-blur')
    }
  }
}
</script>
<style scoped></style>
