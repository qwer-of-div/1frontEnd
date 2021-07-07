<template>
  <div class="page-container">
    <div class="page-content">
      <br>
      <el-button type="primary"
                 @click="onClick('confirm')">自定义confirm</el-button>
      <br>
      <br>
      <el-button type="primary"
                 @click="onClick('picker')">自定义picker</el-button>
      <br>
      <br>
      <el-button type="primary"
                 @click="onClick('date')">自定义date</el-button>
    </div>
  </div>

</template>

<script>

export default {
  data () {
    return {
      picker: {
        value: ''
      },
      date: {
        value: new Date(2025, 0, 1)
      }
    }
  },
  created () {
    console.log(window, document)
  },
  methods: {
    // 自定义confirm
    async onClick (type) {
      if (type === 'confirm') {
        this.$myConfirm({ title: '删除', message: '确认删除该文件吗？', show: true })
          .then((params) => {
            // 用户点击确认后执行
            console.log('点击了确定', params)
          })
          .catch(() => {
            console.log('点击了取消')
            // 取消或关闭
          })
        return
      }
      if (type === 'picker') {
        const columns = ['杭州', '宁波', '温州', '杭州', '宁波', '温州', '杭州', '宁波', '温州', '杭州', '宁波', '温州']
        let index = columns.indexOf(this.picker.value)
        if (index === -1) index = 0

        this.$myPicker({ columns, index, title: '城市' })
          .then((obj) => {
            // console.log('点击了确定1', obj.value, obj.index)
            if (obj.type === 'confirm') {
              // 用户点击确认后执行
              this.picker.value = obj.value
              console.log('点击了确定', obj.value, obj.index)
              return
            }
            if (obj.type === 'change') {
              console.log('选择切换', obj.value, obj.index)
            }
          })
          .catch(() => {
            console.log('点击了取消')
            // 取消或关闭
          })
        return
      }
      if (type === 'date') {
        const date = {
          title: '出生日期',
          currentDate: this.date.value,
          minDate: new Date(2000, 0, 1),
          maxDate: new Date()
        }
        try {
          const dateRes = await this.$myDate(date)
          this.date.value = dateRes.value
          console.log('点击了确定', dateRes)
        } catch (err) {
          console.log('取消', err)
        } finally {
          console.log('finally')
        }
        // 错误和成功都会执行
        console.log('try_catch后')
      }
    }
  }
}
</script>

<style>
</style>
