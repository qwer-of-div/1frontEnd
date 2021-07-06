<template>
  <div class="page-container">
    <div class="page-content">
      <div>父级</div>
      <div>
        <my-child></my-child>
      </div>
    </div>
  </div>
</template>

<script>
// 路由钩子函数
import myChild from './components/child'

export default {
  components: { myChild },
  data () {
    return {
      page: {
      },
      form: {
      },
      parentForm: {
      },
      eg: 'egParents',
      init: {
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // created之前
    console.log('beforeRouteEnter')
    next(vm => {
      vm.eg = 'egParents beforeRouteEnter'
      // created之后 mounted获取
      console.log(vm.eg, from)
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log('beforeRouteUpdate', this.eg)
    next()
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    console.log('beforeRouteLeave', this.eg)
    next()
  },
  // beforeCreate () {
  //   console.log('beforeCreate父级')
  // },
  created () {
    console.log('created父级', this.eg)
  },
  beforeMount () {
    console.log('beforeMount父级', this.eg)
  },
  mounted () {
    console.log('mounted父级', this.eg)
  },
  // beforeUpdate () {
  //   console.log('beforeUpdate父级')
  // },
  // updated () {
  //   console.log('updated父级')
  // },
  beforeDestroy () {
    console.log('beforeDestroy父级', this.eg)
  },
  destroyed () {
    console.log('destroyed父级', this.eg)
  }
}
</script>
