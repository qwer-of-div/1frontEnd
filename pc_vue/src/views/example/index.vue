<template>
  <div class="virtualListView">
    <virtualList :listData="data"
                 v-slot="slotProps">
      <Item :item="slotProps.item" />
    </virtualList>
  </div>
</template>

<script>
import virtualList from './list'
import Item from './item'
export default {
  name: 'virtualListView',
  components: {
    virtualList,
    Item
  },
  data () {
    return {
      data: Array.from({ length: 3000 }, (k, v) => ({
        date: '2016-05-02' + v,
        name: '王小虎' + v,
        value: '上海市普陀区金沙江路 1518 弄' + v,
        id: v
      })),
      page: {
      },
      form: {
      },
      flag: {
      },
      init: {
      }
    }
  },
  computed: {
    pageNew () {
      const page = {}
      return page
    },
    flagNew () {
      const flag = {}
      return flag
    }
  }
}
</script>

<style>
.virtualListView {
  padding: 10px;
  height: 100%;
}
</style>
