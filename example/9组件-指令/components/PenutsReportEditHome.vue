<template xmlns="">
  <div>
    <div class="padding_all">
      <div class="left">
        <ul>
          <li v-for="(item,index) in refValuesStatic" :key="index">
            <a @click="toggleTabs(item)"
               v-bind:class="{current:currTab===item}">{{refNamesStatic[index]}}</a>
          </li>
        </ul>
      </div>
      <div class="right">
        <v-MarketSubsidiary :ref=refValuesStatic[0] v-show="currTab===refValuesStatic[0]"></v-MarketSubsidiary>
        <v-BasicInfo :ref=refValuesStatic[1] v-show="currTab===refValuesStatic[1]"></v-BasicInfo>
        <v-EnterpreneurInfo :ref=refValuesStatic[2] v-show="currTab===refValuesStatic[2]"></v-EnterpreneurInfo>
        <v-DataAnalysis :ref=refValuesStatic[3] v-show="currTab===refValuesStatic[3]"></v-DataAnalysis>
        <v-CertificationInfo :ref=refValuesStatic[4] v-show="currTab===refValuesStatic[4]"></v-CertificationInfo>
        <v-NegativeInfo :ref=refValuesStatic[5] v-show="currTab===refValuesStatic[5]"></v-NegativeInfo>
        <CheckingOnline :ref=refValuesStatic[6] v-show="currTab===refValuesStatic[6]"></CheckingOnline>
        <v-CreditInfo :ref=refValuesStatic[7] v-show="currTab===refValuesStatic[7]"></v-CreditInfo>
        <v-PledgeInfo :ref=refValuesStatic[8] v-show="currTab===refValuesStatic[8]"></v-PledgeInfo>
        <v-CustomerEvalution :ref=refValuesStatic[9] v-show="currTab===refValuesStatic[9]"></v-CustomerEvalution>
        <v-GenerateReport :ref=refValuesStatic[10] v-show="currTab===refValuesStatic[10]"></v-GenerateReport>
        <v-ServiceProduct :ref=refValuesStatic[11] v-show="currTab===refValuesStatic[11]"></v-ServiceProduct>
        <v-AccountInfo :ref=refValuesStatic[12] v-show="currTab===refValuesStatic[12]"></v-AccountInfo>
      </div>
    </div>
  </div>

</template>

<script>
    import MarketSubsidiary from './MarketSubsidiary'
    import BasicInfo from './BasicInfo'
    import EnterpreneurInfo from './EnterpreneurInfo'
    import DataAnalysis from './DataAnalysis'
    import CertificationInfo from './CertificationInfo'
    import NegativeInfo from './NegativeInfo'
    import CreditInfo from './CreditInfo'
    import PledgeInfo from './PledgeInfo'
    import CustomerEvalution from './CustomerEvalution'
    import GenerateReport from './GenerateReport'
    import CheckingOnline from './CheckingOnline.vue'
    import ServiceProduct from './tabs/serviceProduct'
    import AccountInfo from './tabs/AccountInfo'

    export default {
        components: {
            'v-MarketSubsidiary': MarketSubsidiary,
            'v-BasicInfo': BasicInfo,
            'v-EnterpreneurInfo': EnterpreneurInfo,
            'v-DataAnalysis': DataAnalysis,
            'v-CertificationInfo': CertificationInfo,
            'v-NegativeInfo': NegativeInfo,
            'v-CreditInfo': CreditInfo,
            'v-PledgeInfo': PledgeInfo,
            'v-CustomerEvalution': CustomerEvalution,
            'v-GenerateReport': GenerateReport,
            CheckingOnline,
            'v-ServiceProduct': ServiceProduct,
            'v-AccountInfo': AccountInfo,
        },
        name: "PenutsReportEditHome",
        data() {
            return {
                currTab: 'MarketSubsidiary',
                refNamesStatic: [
                  '综合营销明细', 
                  '企业基本信息', 
                  '企业主及相关人员信息', 
                  '授权数据分析', 
                  '资质信息', 
                  '负面信息',
                  '联网核查',
                  '征信信息', 
                  '抵质押保证信息', 
                  '客户评价', 
                  '生成报告',
                  '服务开通/产品签约',
                  '账户基本信息'
                ],
                refValuesStatic: [
                  'MarketSubsidiary', 
                  'BasicInfo', 
                  'EnterpreneurInfo', 
                  'DataAnalysis', 
                  'CertificationInfo', 
                  'NegativeInfo',
                  'CheckingOnline',
                  'CreditInfo', 
                  'PledgeInfo', 
                  'CustomerEvalution', 
                  'GenerateReport',
                  'ServiceProduct',
                  'AccountInfo'
                ]
            }
        },
        mounted() {
            this.$store.state.pushThat(this)
            this.$refs['MarketSubsidiary'].initData()
        },
        methods: {
            toggleTabs(tab) {
                this.currTab = tab // 当前页面
                this.$refs[this.currTab].initData()
            }
        }
    }
</script>

<style scoped>
  .padding_all {
    padding: 15px;
  }

  .left {
    overflow-y: auto;
    width: 137px;
    height: 88vh;
    position: fixed;
  }

  .right {
    float: none;
    position: relative;
    overflow-y: auto;
    background: #fff;
    border-radius: 6px;
    border: 1px solid #eee;
    height: 88vh;
    margin-left: 140px;
  }

  .left ul li {
    text-align: left;
    overflow: hidden;
  }

</style>
