<template>
  <div class="tree-menu">
    <ul v-for="item in data"
        :key="item">
      <c-tree-item :data="item"></c-tree-item>
    </ul>
  </div>
</template>

<script>


import cTreeItem from './tree.vue'
export default {
  props: {
    data: {
      type: [Object, Array],
      required: true
    }
  },
  components: {
    cTreeItem
  }
}
</script>
