
// 每个页面不同且会改变的值
export default {
  data () {
    return {
      mixPage: {
        verify: null, // 表单校验结果
        apiParams: null, // api请求数据
        type: '', // 弹出框标识
        judgeObj: null, // 判断对象
        test: null // 测试数据
      }
    }
  },
  methods: {
    /**
     * 保存至 localStorage、vuex
     * @param {String} key 属性
     * @param {String/Object} value 值
     * @param {String} module 模块
     */
    onMixStore (key, value, module = '') {
      const tempModule = module ? module + '/' : ''
      this.$store.commit(`${tempModule}${key}Set`, value)

      const tempValue = typeof value === 'string' ? value : JSON.stringify(value)
      localStorage.setItem(key, tempValue)
    },

    // 显示弹出框
    onMixShow (type) {
      this.mixPage.type = type
      this.flag[`${type}Show`] = true
    },
    // 隐藏弹出框
    onMixHide () {
      this.flag[`${this.mixPage.type}Show`] = false
    }
  }
}
