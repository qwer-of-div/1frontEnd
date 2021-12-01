<template>
  <li>
    <span @click="toggle">
      <em v-if="hasGrandson && hasChild"
          class="icon">{{
        open ? "-" : "+"
      }}</em>
      <em v-if="hasGrandson && !hasChild"
          class="icon file-text"></em>
      {{ data.name }}
    </span>
    <ul v-show="open"
        v-if="hasChild"
        style="padding-left: 15px">
      <tree-item v-for="(item, index) in data.children"
                 :data="item"
                 :hasGrandson="grandson"
                 :key="index"></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    data: { // 对象item
      type: [Object, Array],
      required: true
    },
    hasGrandson: { // 孩子是否有孩子
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      open: false
    }
  },
  computed: {
    hasChild () {
      return this.data.children && this.data.children.length
    },
    grandson () { // 所有的孩子都没有孩子
      let flag = false
      if (this.data.children) {
        for (const item of this.data.children) {
          if (item.children) {
            flag = true
            break
          }
        }
      }
      return flag
    },
  },
  created () {
    console.log(this.hasGrandson, 777)
  },
  methods: {
    toggle () {
      if (this.hasChild) {
        this.open = !this.open
      }
    }
  }
}
</script>

<style>
ul {
  list-style: none;
  margin: 10px 0;
  text-align: left;
}
li {
  padding: 3px 0;
}
li > span {
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
}
li > span:visited {
  background: #fff;
}
em.icon {
  display: inline-block;
  width: 10px;
  height: 20px;
  background-repeat: no-repeat;
  vertical-align: middle;
}
.tree-menu li {
  line-height: 1.5;
}
</style>