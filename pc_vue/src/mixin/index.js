
export default {
  data () {
    return {
      mixVerify: null, // 表单校验结果
      mixApiParams: null, // api请求数据
      mixType: '', // 弹出框标识
      mixJudgeObj: null, // 判断对象
      mixTest: null // 测试数据
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
      this.mixType = type
      this.flag[`${type}Show`] = true
    },
    // 隐藏弹出框
    onMixHide () {
      this.flag[`${this.mixType}Show`] = false
    }
  }
}
