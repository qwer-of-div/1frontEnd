<template>
  <div>
    <Form ref="formValidateA" :model="queryInfo" :rules="ruleValidate">
      <div class="formlist">
        <ul>
          <li>
            <label>客户编号：</label>
            <div class="formright">
              <input type="text" value="" class="txt" v-model="queryInfo.custNo" disabled>
            </div>
          </li>
          <li>
            <label>客户名称：</label>
            <div class="formright">
              <input type="text" value="" class="txt" v-model="queryInfo.custName" disabled>
            </div>
          </li>
          <li>
            <label>授信方法：</label>
            <FormItem prop="crtExtdMth">
              <div class="formright">
                <select
                        v-model="queryInfo.crtExtdMth"
                        placeholder="请选择"
                        class="sel"
                        disabled
                >
                  <option
                          v-for="item in selectData.CRT_EXTD_MTH"
                          :value="item.key"
                  >{{item.value}}
                  </option>
                </select>
              </div>
            </FormItem>
          </li>
          <li>
            <label>报告适用类型：</label>
            <FormItem prop="rptfSuitType">
              <div class="formright">
                <select
                        v-model="queryInfo.rptfSuitType"
                        placeholder="请选择"
                        class="sel"
                        disabled
                >
                  <option
                          v-for="item in selectData.RPTF_SUIT_TYPE"
                          :value="item.key"
                  >{{item.value}}
                  </option>
                </select>
              </div>
            </FormItem>
          </li>
          <li>
            <label>是否使用小微易贷非现场调查报告：</label>
            <FormItem prop="useXwydUnSivstgRptf">
              <div class="formright">
                <select class="sel" v-model="queryInfo.useXwydUnSivstgRptf">
                  <option value="">请选择</option>
                  <option value="1">是</option>
                  <option value="0">否</option>
                </select>
              </div>
            </FormItem>
          </li>
        </ul>
      </div>
    </Form>
    <div class="btngroup">
      <button class="sqlbtn" @click="submit" style="border: none">提交</button>
    </div>
  </div>
</template>

<script>
    import NativeLoanDB from '@/assets/bridge/NativeLoanDB'
    import {PostUrl} from '@/assets/js/postUrl'
    import {getDisc} from '@/assets/js/dictionarie.js'

    export default {
        name: "WriteReport",
        data() {
            return {
                queryInfo: {
                    custNo: '',	//客户编号	32	String
                    custName: '', //客户名称  100  String
                    crtExtdMth: '', //授信方法
                    rptfSuitType: '', //报告适用类型
                    useXwydUnSivstgRptf: '',  //是否使用小微易贷非现场调查报告
                },
                selectData: {},
                ruleValidate: {
                    crtExtdMth: this.$store.state.RULES_NOT_EMPTY, //	授信方法
                    rptfSuitType: this.$store.state.RULES_NOT_EMPTY, //	报告适用类型
                    useXwydUnSivstgRptf: this.$store.state.RULES_NOT_EMPTY, //	是否使用小微易贷非现场调查报告
                }
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initDBData()
                this.initData()
            })
        },
        methods: {
            initDBData() {
                let str = ['CRT_EXTD_MTH','RPTF_SUIT_TYPE']
                this.selectData = getDisc(str)
            },
            initData() {
                let params = {
                    custNo: this.$store.state.peanuts.custNo
                }
                this._$post(PostUrl.redactInvstgRptfPageInfoQry, params).then(successResponce => {
                    // {"msg":"交易成功","custNo":"","newCoreFlag":"","code":"0000","seqNo":"","reserve4":"",
                    // "dataMap":{"rptfSuitType":"02","custNo":"10000012161721","crtExtdMth":"02","custName":"桂林力源******有限公司"},"showType":"0","reserve3":"","globalBusiTrackNo":""}
                    if (successResponce.code === '0000') {
                        this.queryInfo = successResponce.dataMap
                    } else {
                        this._$showInfo(successResponce.msg) // undefined
                    }
                }).catch(failResponce => {
                    this._$showInfo(failResponce)
                })
            },
            submit () {
              this.$refs['formValidateA'].validate( valid => {
                if (valid) {
                  this.allApi()
                }
              })
            },
            async allApi () {
              this._$Widget.loadingShow()
              const res = await Promise.all([this.T04000157(this.queryInfo), this.T0500094(this.$store.state.company.query)])
              if(res[0].code === '0000' && res[1].code === '0000') {
                this.$store.state.peanuts.useXwydUnSivstgRptf = this.queryInfo.useXwydUnSivstgRptf
                // 账户信息一组数据
                let accTypeInfos = [{
                  calIntFlag: '',
                  currCd: '',
                  intRatePackageTpCd: '',
                  safeProjBclsCd: '',
                  safeProjSclassCd: ''
                }]
                if(res[1].accTypeInfos && res[1].accTypeInfos[0]) {
                  accTypeInfos = [res[1].accTypeInfos[0]]
                }
                
                // 控股股东/实际控制人数量
                let holdingsCount = ''
                if(res[1].holdingInfos && res[1].holdingInfos.length) {
                  holdingsCount = res[1].holdingInfos.length + ''
                }
                
                this.$store.commit('toPublicInfoSet', {
                  type: 'init',
                  form: {
                    ...res[1],
                    calIntFlag: accTypeInfos[0].calIntFlag,
                    currCd: accTypeInfos[0].currCd,
                    intRatePackageTpCd: accTypeInfos[0].intRatePackageTpCd,
                    safeProjBclsCd: accTypeInfos[0].safeProjBclsCd,
                    safeProjSclassCd: accTypeInfos[0].safeProjSclassCd,
                    holdingsCount
                  }
                })
                console.log(res[1], '查询对公开户尽调信息')
                this.$router.push({name: 'companyTabList'})
              } else if (res[0].code !== '0000') {
                this._$Widget.loadingHide()
                this._$showInfo(res[0].msg)
              } else {
                this._$Widget.loadingHide()
                this._$showInfo(res[1].msg)
              }
            },
            // api
            async T04000157 (params) {
              let resCopy = {}
              try {
                const res = await this._$post(PostUrl.t04000157, params, {showMask: false})
                  resCopy = this.$clone(res)
              } catch (error) {
                  resCopy = {
                    code: 'error',
                    msg: error
                  }
              }
              return resCopy
            },
            // api 查询对公开户尽调信息
            async T0500094 (params) {
              let resCopy = {}
              try {
                const res = await this._$post(PostUrl.T0500094, params, {showMask: false})
                  resCopy = this.$clone(res)
              } catch (error) {
                  resCopy = {
                    code: 'error',
                    msg: error
                  }
              }
              return resCopy
            },
        }
    }
</script>

<style scoped>

</style>
