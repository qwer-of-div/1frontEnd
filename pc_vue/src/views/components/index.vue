<template>
  <div class="page-container">
    <div class="page-content code flex-col">
      <h2>组件</h2>
      <hr />
      <div class="navList-wrap">
        <my-navList :parentValue="navList"></my-navList>
      </div>
      <div class="flex1">
        <transition leave-active-class="animate__animated animate__rotateOut">
          <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>

        <transition leave-active-class="animate__animated animate__rotateOut">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
const mockNavList = [
  { label: '表格', path: '/components/table' },
  { label: '按钮切换', path: '/components/btnChange' },
  { label: 'echarts', path: '/components/echarts' },
  { label: '动画', path: '/components/animate' },
  { label: '百度地图', path: '/components/map' },
  { label: 'pdf', path: '/components/pdf' },
  { label: 'webview', path: '/components/webview' },
  { label: 'keepAlive', path: '/components/keepAlive' },
  { label: 'virtalList', path: '/components/virtalList' },
  { label: 'jsDom', path: '/components/jsDom' },
  { label: '请求', path: '/components/request' },
  { label: '钩子函数和路由守卫', path: '/components/hookRouter' },
  { label: '表单分离', path: '/components/formLeave' }
]

export default {
  data () {
    return {
      navList: []
    }
  },
  created () {
    this.handleMock()
  },
  methods: {
    // mock数据
    handleMock () {
      this.navList = mockNavList
    }
  }
}
</script>
