<template>
  <div class="page-container">
    <div class="page-content page-home">
      <h2>首页</h2>
      <hr />
      <img :src="imgSrc" alt="" class="img-content">
      <el-button type="primary" @click="$router.push('/login')">登录</el-button>
      <div class="sass-scoped">sass局部变量</div>
      <div class="sass-common">sass全局变量</div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      imgSrc: require('@/assets/img/图片压缩.jpg')
    }
  },
  created () {
    localStorage.clear()
    this.$store.commit('resetState')
    this.$store.commit('dic/resetState')
    console.log(this.$store.state, '清空vuex')
  },
  mounted () {
    window.addEventListener('beforeunload', () => {
      console.log('1111111111111111', this)
      // this.mixApiParams = { username: '管理员1', password: this.$md5('794621839'), role: '1' }
      // this.$api.localLogin(this.mixApiParams)
      this.beforeunloadHandler()
    })
    // window.addEventListener('unload', () => this.unloadHandler())
    // window.addEventListener('unload', () => {
    //   console.log('999')
    // })
  },
  beforeunloadHandler () {
    this.mixApiParams = { username: '管理员1', password: this.$md5('794621839'), role: '1' }
    this.$api.localLogin(this.mixApiParams)
  },
  unloadHandler () {
    console.log('2')
    this.mixApiParams = { username: '管理员2', password: this.$md5('794621839'), role: '1' }
    this.$api.localLogin(this.mixApiParams)
  },
  destroyed () {
    // window.removeEventListener('beforeunload', () => this.beforeunloadHandler())
    // window.removeEventListener('unload', () => this.unloadHandler())
  }
}
</script>

<style lang="scss" scoped>
$scopedColor: #096;

.page-home {
  .img-content {
    margin: 0 auto;
    width: 200px;
    height: 200px;
  }

  .sass-common {
    background-color: $myColor;
  }

  .sass-scoped {
    background-color: $scopedColor;
  }
}
</style>
