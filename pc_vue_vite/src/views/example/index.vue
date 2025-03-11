<template>
  <div class="page-container">
    <div class="page-content">
      <div v-show="!page.componentName" class="example">
        <h3>example</h3>
        <div class="btn-wrap">
          <el-button v-for="item in init.navList" :key="item.name" type="primary"
            @click="onItem(item)">{{ item.label }}</el-button>
        </div>
      </div>
      <div v-show="page.componentName" class="component-wrap">
        <component :is="page.componentName" @fromChild="handleChild"></component>
      </div>
    </div>
  </div>
</template>

<script>
import myCommon from './components/common.vue'
import myAsyncAwait from './components/asyncAwait.vue'
import { onMounted, reactive } from 'vue'

const navList = [
  { label: '公共部分', name: 'myCommon' },
  { label: 'asyncAwait', name: 'myAsyncAwait' }
]

export default {
  components: { myCommon, myAsyncAwait },
  setup () {
    // 注意事项: reactive的对象不可以结构返回或导入, 会导致失去响应式
    const page = reactive({
      componentName: ''
    })
    const form = reactive({
      name: "金毛",
      age: 4
    })
    // 隐藏或被被改变form
    const formAccident = reactive({
      name: "金毛1",
      age: 41,
      high: 170,
      sex: '1'
    })
    const flag = reactive({
      isShow: false,
      popupShow: false
    })
    const init = reactive({
      navList
    })

    onMounted(() => {
      console.log('onMounted')
    })

    const onItem = (item) => {
      page.componentName = item.name
      console.log(page.componentName)
    }

    const handleChild = () => {
      page.componentName = ''
    }

    return {
      page, // 这样写那么外面就要都基于page来调取, 类型{{page.age}}
      flag,
      form,
      formAccident,
      init,
      onItem,
      handleChild
    }
  }
}
</script>
