<template>
  <div class="container">
    <!-- <transition-group enter-active-class="animated bounceInleft" leave-active-class="animated bounceOutRight">
    <router-view key="0"></router-view>
    </transition-group> -->
    <router-view></router-view>
    <mz-footer v-show="isShow"></mz-footer>
  </div>
</template>
<script>
import MzFooter from '@/components/Footer'
export default {
  
  data () {
    return {
      isShow: true
    }
  },
  mounted () {

  },
  updated () {
this.$toast.loading({
  mask: true,
  duration: 200,
  message: '加载中...'
});
  },
  watch: {
    '$route.name': {
      handler (value) {
        this.isShow = true
        if (value === 'filmDetail' || value === 'news' || value === 'city') {
          this.isShow = false
        }
      },
      immediate: true
    }
  },
  components: {
    MzFooter
  }
}
</script>
