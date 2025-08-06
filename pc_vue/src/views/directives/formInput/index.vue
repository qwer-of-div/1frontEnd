<template>
  <div class="page-container">
    <div class="page-content">
      <h2>表单输入</h2>
      <hr />
      <div class="longPress-wrap">
        <el-input v-input.num="2" placeholder="只能输入数字" v-model="numVal" />
        <br><br>
        <el-input v-input.float="2" placeholder="浮点数（2位小数）" v-model="floatVal" />
        <br><br>
        <el-input v-money.float="2" placeholder="金额" v-model="moneyVal" />
        {{ moneyVal }}
        <br><br>
        <el-input v-thounsandsMoney.float="2" placeholder="千分位" v-model="thounsandsMoneyVal" />
        {{ thounsandsMoneyVal }}
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      numVal: '',
      floatVal: '',
      moneyVal: '',
      thounsandsMoneyVal: '',
      args: '表单输入'
    }
  },
  created () {
  },
  methods: {
    handleThrottle (args) {
      console.log(args)
    }
  }
}
</script>
