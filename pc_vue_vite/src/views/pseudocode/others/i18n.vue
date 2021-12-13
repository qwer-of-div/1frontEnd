<template>
  <div class="page-container">
    <div class="page-content">
      <el-button @click="onChange">切换语言</el-button>
      <hr />
      {{ $t("language.current") }}：{{ $t("language.name") }}
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, getCurrentInstance } from "vue";
import { useI18n } from 'vue-i18n'// 要在js中使用国际化

const list = [
  { label: '变量定义', path: '/vue3/variate' },
]

export default {
  setup (props, context) {
    const { proxy } = getCurrentInstance();
    const page = reactive({
      name: "金毛111",
      age: 4,
      list
    })
    const form = reactive({
      name: "金毛",
      age: 4
    })
    const { t } = useI18n()
    function onChange () {
      proxy.$i18n.locale = proxy.$i18n.locale === 'zh' ? 'en' : 'zh';
      localStorage.setItem('lang', proxy.$i18n.locale)
      console.log(t('language.name'))
    }

    return {
      form, // 这样写那么外面就要都基于page来调取, 类型{{form.age}}
      ...toRefs(page), // 必须是reactive生成的对象, 普通对象不可以, 他把每一项都拿出来包了一下, 我们可以这样用了 {{age}}, 放心咱们多深的page也可以响应
      onChange
    }
  }
}
</script>