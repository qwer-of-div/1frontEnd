<template>
  <div>
    <h3>components</h3>
    <my-nav-list :parentValue="init.navList" />
    <div class="router-wrap">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component v-if="$route.meta && $route.meta.keepAlive" :is="Component" :key="$route.name" />
        </keep-alive>

        <component v-if="!($route.meta && $route.meta.keepAlive)" :is="Component" :key="$route.name" />
      </router-view>

    </div>
  </div>
</template>

<script>
const navList = [
  { label: "keepAlive", name: 'keepAlive' },
]

export default {
  data () {
    return {
      page: {
      },
      init: {
        navList
      }
    }
  },
  created () {
    console.log(this.$route, this.$route.query)
  }
}
</script>