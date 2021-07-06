<template>
  <div class="page-container">
    <div class="page-content my-animate">
      <div class="btn-change-wrap">
        <my-btn-change :parentValue="btnChange.parentValue"
                       @fromChild="handlemyBtnChange"></my-btn-change>
      </div>
      <div :class="{'animate-wrap':true,'animate__animated':true,'animate__bounceInDown':flag.animateShow,'animate__bounceOutDown':!flag.animateShow}"></div>
    </div>
  </div>
</template>

<script>

const parentValue = [
  { value: 'show', label: '出现', path: '/components/btnChange' },
  { value: 'hide', label: '消失', path: '/components/btnChange1' }
]

export default {
  data () {
    return {
      btnChange: {
        parentValue
      },
      flag: {
        animateShow: true
      }
    }
  },
  methods: {
    // 子传父
    handlemyBtnChange (childObj) {
      this.flag.animateShow = !childObj.index
    }
  }
}
</script>

<style lang="scss" scoped>
.my-animate {
  .animate-wrap {
    width: 150px;
    height: 150px;
    margin: 50px auto;
    background-color: #096;
  }
}
</style>
