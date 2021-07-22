<template>
  <div class="page-container">
    <div class="page-content formVerify">
      <h2>utils工具函数</h2>
      <hr />
      <h3>随机数</h3>
      {{page.randomNum}}
      <h3>数组对象</h3>
      <div>
        <div v-for="(val,key) in page.arrObj"
             :key="val.age">{{key}}:{{val.name}}+{{val.age}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// el-form-item prop属性对应验证
// import { mapState, mapMutations } from 'vuex'
import { mapState } from 'vuex'
import { randomNum, resetObj, arrTobj, chooseDic, chooseDic1, dicList, prevNextDate, getBirth } from '@/utils'
import { delRepeat, listRepeat } from '@/utils/index1'

const mockPage = {
  obj: {
    type: '对象置空',
    userInfo: {
      name: '李四',
      age: 18,
      sex: '男',
      birth: null,
      date: new Date(), // 无法判断日期类型
      like: [1, 2, 3, 4]
    }
  },
  arrObj: [
    {
      name: '张三',
      age: 18
    }, {
      name: '李四',
      age: 19
    }, {
      name: '王五',
      age: 20
    }
  ],
  repeatList: [
    {
      label: '张三',
      id: 18
    }, {
      label: '李四',
      id: 19
    }, {
      label: '王五',
      id: 20
    }, {
      label: '王五',
      id: 20
    }
  ],
  repeatList1: [1, 1, 3, 3, 4, 4, 6, 6, '7', '7']
}

export default {
  data () {
    return {
      page: {
        randomNum: '',
        arrObj: null,
        dic: ''
      },
      flag: {
      },
      init: {
      }
    }
  },
  computed: {
    ...mapState({ idTypeList: state => state.dic.idTypeList, addressList: state => state.dic.addressList })
    // ...mapState('dic',[ 'idTypeList', 'addressList'])
    // ...mapState(['avatarUrl', 'login', 'userName'])
  },
  created () {
    this.handleInit()
  },
  methods: {
    handleInit () {
      this.page.randomNum = randomNum()
      resetObj.func(mockPage.obj)
      console.log(mockPage.obj, '对象置空')
      this.page.arrObj = arrTobj(mockPage.arrObj)
      console.log(this.page.arrObj, '数组对象')
      const status = '0'
      // const status = '身份证' 无返回值 undefined
      this.page.dic = chooseDic(this.idTypeList, status)
      const dic = chooseDic1(this.idTypeList, status)
      this.onMixStore('addressList', this.idTypeList, 'dic')
      this.$store.commit('dic/addressListSet', this.idTypeList)
      console.log(this.page.dic, '字典转换', dic, this.addressList)
      console.log(dicList(this.idTypeList), '字典列表')
      console.log(prevNextDate(new Date('2020/3/16')), '日期前后多少天')
      console.log(getBirth('510824199712293610'), '出生日期')
      console.log(delRepeat(mockPage.repeatList1), '简单类型数组去重')
      console.log(listRepeat(mockPage.repeatList), '复杂类型数组去重')
      console.log(new Date('2021/02/29'), '错误日期')
    }
  }
}
</script>

<style lang="scss" scoped>
.formVerify {
  .form-wrap {
    width: 50%;
    margin: 0 auto;
  }
}
</style>
