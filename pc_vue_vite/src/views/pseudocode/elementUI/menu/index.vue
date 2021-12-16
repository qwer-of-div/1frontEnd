<template>
  <div class="page-container">
    <div class="page-content">
      <h3>menu</h3>
      <div class="menu-wrap"
           style="width:15%">
        <menu-self :menuList="init.menuList"></menu-self>
      </div>
      <div class="tabs-wrap"></div>
    </div>
  </div>
</template>

<script>
import menuSelf from './menu.vue'

const menuList = [
  {
    path: "menu1",
    name: "menu1",
    children: [
      {
        path: "menu1-1",
        name: "menu1-1",
      },
      {
        path: "menu1-2",
        name: "menu1-2",
        children: [
          {
            path: "menu1-2-1",
            name: "menu1-2-1",
          }
        ]
      },
    ]
  },
  {
    path: "menu2",
    name: "menu2",
    children: [
      {
        path: "menu2-1",
        name: "menu2-1",
      },
      {
        path: "menu2-2",
        name: "menu2-2",
      }
    ]
  },
  {
    path: "menu3",
    name: "menu3",
  }
]

export default {
  components: { menuSelf },
  data () {
    return {
      init: {
        menuList
      }
    }
  }
}
</script>