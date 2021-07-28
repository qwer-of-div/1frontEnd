<template>
  <div class="page-container">
    <div class="page-content page-pseudoCode">
      <h2>伪代码</h2>
    </div>
  </div>
</template>

<script>
// code封装计算属性 code、name
// 监听计算属性code，赋值this.page.idTypeName
export default {
  data () {
    return {
      page: {
        newVal: '',
        oldVal: '',
        idTypeCode: '',
        idTypeName: '',
        idTypeCodeName: '',
        sexCode: '',
        sexName: '',
        sexCodeName: ''
      },
      page2: {
        idTypeCode: '',
        idTypeName: ''
      },
      flag: {
      },
      init: {
        popupList: [],
        birthDate: new Date(2000, 0, 1),
        startDate: new Date()
      }
    }
  },
  computed: {
    // 取值 计算属性 多变量影响其值时使用 同一对象多值改变引发操作computed-->watch 带出数据无效处理
    // code list 转 name
    // code 转 name 转 code-name
    codeNew () { // code转name
      const code = {
        idTypeCode: this.page.idTypeCode,
        sexCode: this.page.sexCode
      }
      return code
    },
    nameNew1 () { // code list 转 name
      const label = {
        idTypeLabel: this.page.idTypeCode,
        sexLabel: this.page.sexCode
      }
      return label
    },
    // nameNew () { // code name转code-name
    //   const name = {
    //     idTypeName: this.page.idTypeName,
    //     sexName: this.page.sexName
    //   }
    //   return name
    // },
    flagNew () {
      const flag = {}
      return flag
    }
  },
  watch: {
    codeNew: { // code list转name
      handler (newVal) {
        if (newVal.sexCode) this.page.sexName = newVal.sexCode // code list转name
        if (newVal.idTypeCode) this.page.idTypeName = newVal.idTypeCode // code list转name
      },
      deep: true
    },
    // nameNew: { // code name转code-name
    //   handler (newVal) {
    //     if (newVal.sexName) this.page.sexCodeName = this.page.sexCode + '-' + newVal.sexName
    //     if (newVal.idTypeCodeName) this.page.idTypeCodeName = this.page.idTypeCode + '-' + newVal.idTypeName
    //   }
    // }
  },
  created () {
    this.handleInit()
  },
  methods: {
    // 初始化
    handleInit () {
      // 赋值：获取值为空、有值覆盖、空值赋值
      // 新增覆盖，修改不覆盖
    },
    // 提交
    onSubmit () {
      // 纯code 即时转换 后端无法判断code、name是否正确 最正确

      // 使用name判断 统一转换 最简单

      // 校验 toast
      // 列表提交：列表操作不要写死、列表数据添加、删除 修改唯一标识可改变传index 是否提示某项未填。
      // 校验列表有值，列表源头code 无值，输入 组件详情页 点击选择赋值code、name列表提交判断循环判断对象
    },
    onInput (val, type) { // code name转code-name
      if (type === '1') this.page.idTypeCode = ''
      if (type === '2') this.page.sexCode = ''
    },
    // api
    query () {

    },
    // 校验 最后
    handleVerify () {
      // 校验：是否必填 默认值=空 长度=200 类型=字符串 范围=前后十年 开始日期不能大于结束日期
      // 证件号校验 验证规则 是否验证是否存于库=不验证 弹出框 红字
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
