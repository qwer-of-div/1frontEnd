<template>
  <van-popup v-model="show"
             @click-overlay="onOverlay"
             position="bottom">
    <van-picker :title="title"
                show-toolbar
                :default-index="index"
                :columns="columns"
                @confirm="onConfirm"
                @cancel="onCancel"
                @change="onChange" />
  </van-popup>
</template>
<script>
// 带有记忆的picker

export default {
  data () {
    return {
      show: true,
      index: 0,
      title: '',
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州']
    }
  },
  methods: {
    onConfirm () {
    },
    onChange () {
    },
    onCancel () {
    },
    onOverlay () {
      this.onCancel()
    }
  }
}
</script>
