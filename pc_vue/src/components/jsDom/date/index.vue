<template>
  <van-popup v-model="show"
             position="bottom">
    <!-- v-model改为value -->
    <van-datetime-picker :value="currentDate"
                         type="date"
                         :title="title"
                         :min-date="minDate"
                         :max-date="maxDate"
                         @confirm="onConfirm"
                         @cancel="onCancel" />
  </van-popup>
</template>
<script>
// 带有记忆的picker

export default {
  data () {
    return {
      // 默认值
      show: true,
      title: '',
      currentDate: new Date(2008, 0, 1),
      minDate: new Date(2000, 0, 1),
      maxDate: new Date()
    }
  },
  methods: {
    onConfirm () {
    },
    onCancel () {
    }
  }
}
</script>
