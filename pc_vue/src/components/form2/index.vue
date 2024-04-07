<template>
  <div class="page-container"
       @click="onPage">
    <div class="page-content">
      <div>
        <form-self :formList="formList"
                   :form="form"
                   :rules="rules"
                   ref="formWrap"
                   @formChangeListen="formChangeListen"
                   @btnListen="btnListen"
                   @inputListen="inputListen"
                   @inputQueryClick="inputQueryClick">
          <template #belongInstName="slotProps">
            <li>
              <label><em>*</em>{{slotProps.item.label}}：</label>
              <FormItem :prop="slotProps.item.id"
                        :key="slotProps.item.id"
                        :rules="rules[slotProps.item.id]">
                <div class="pr">
                  <input readonly
                         type="text"
                         class="txt flex1"
                         v-model="form[slotProps.item.id]"
                         :disabled="slotProps.item.disabled"
                         @change="formChangeListen(slotProps.item)">
                  <span class="belongInstName-icon">
                    <img src="@/assets/images/close.png"
                         @click="onClose(slotProps.item)"
                         class="belongInstName-img">
                    <span style="font-weight:bold"
                          @click="onBelongInstShow(slotProps.item)">. . .</span>
                  </span>
                </div>
              </FormItem>
            </li>
          </template>
        </form-self>
      </div>
      <div class="btngroup">
        <a href="javascript:;" class="sqlbtn" @click="onSave" v-if="toPublicInfo.busiStatus === '10'">暂存</a>
      </div>
      <div>
        <belongInst-dialog v-if="belongInst.show"
                           @fromChild="fromChild"
                           @closeListen="belongInst.show=false"></belongInst-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import formSelf from '../components/form'
import belongInstDialog from './belongInstDialog'

import NativeMarketingDB from '@/assets/bridge/NativeMarketingDB'
import NativeData from '@/assets/bridge/NativeData.js'

import { formList } from '../staticData'
import {
  brieeditAccAttr as brieeditAccAttrOption, accAttrNo as accAttrNoOption, specAccTpCd as specAccTpCdOption,
  currCd as currCdOption, ftaAreaAccTpCd as ftaAreaAccTpCdOption, custDeptBclsCd as custDeptBclsCdOption,
  safeProjSclassCd as safeProjSclassCdOption
} from '@/assets/dictionary'
import {
  accnoBehind4bitNoValidator, basicaccOpenaccApvnoValidator, deptUsageValidator,
  emptyValidator, basicaccValidator
} from '../validator'
import { PostUrl } from '@/assets/js/postUrl.js'
import { debounce } from '@/assets/js/common.js'

export default {
  components: {
    formSelf,
    belongInstDialog
  },
  data () {
    return {
      formListCopy: this.$clone(formList),
      formList: [],
      form: {},
      rules: {},
      belongInst: {
        show: false
      },
      selectData: null
    }
  },
  computed: {
    toPublicInfo () {
      return this.$clone(this.$store.state.company.toPublicInfo)
    },
    formComputed () {
      return this.$clone(this.form)
    }
  },
  watch: {
    // 处理结构
    formComputed: {
      handler (newVal, oldVal) {
        this.formListListen()
      }
    },
    toPublicInfo: {
      handler (newVal, oldVal) {
        this.formListListen()
        this.formList.forEach(item => {
          // 设置form的值
          const value = (item.value === 0 || item.value) ? item.value : ''
          const formValue = newVal[item.id] ? newVal[item.id] : value
          this.$set(this.form, [item.id], formValue)
        })
        this.form.belongInstNo = newVal.belongInstNo || ''
        this.form.basicaccOacBankRegnCd = newVal.basicaccOacBankRegnCd || ''
        if (this.form.basicaccOacBankRegnCd) {
          this.T0500099({ item: { searchData: this.form.basicaccOacBankRegnCd }, type: 'init' })
        }
        // 0客户所属地 1存款人类别 2特殊经济区内企业类型 5同业客户
        const keyList = ['ovseaCustFlag', 'corpAttrType', 'speEconInstFlag', 'specEconAreaCorpFlag', 'ectAccno', 'tocorpCustAttrbCd', 'custAccRiskLvlCd', 'custName', 'tocorpCustClsCd']
        keyList.forEach(item => {
          if (newVal[item] !== oldVal[item]) {
            this.formChangeListen({ id: item })
          }
        })
      }
    }
  },
  mounted () {
    // 客户存款小类 存款用途
    NativeMarketingDB.getDics(['CUST_DEPT_SCLASS_CD', 'OPENACC_FUNDS_USAGE_TP_CD']).then(map => {
      console.log(map, 'NativeMarketingDB')
      this.selectData = map
      this.handleInitData()
    })
  },
  methods: {
    handleInitData () {
      this.formList = this.$clone(this.formListCopy)
      this.formList.forEach(item => {
        // 设置form的值
        const value = (item.value === 0 || item.value) ? item.value : ''
        const formValue = this.toPublicInfo[item.id] ? this.toPublicInfo[item.id] : value
        this.$set(this.form, [item.id], formValue)

        if (item.id === 'accnoBehind4bitNo') {
          this.$set(this.rules, [item.id], accnoBehind4bitNoValidator())
        } else if (['basicaccOpenaccApvno', 'oldBasicaccOpenaccApvno'].includes(item.id)) {
          this.$set(this.rules, [item.id], basicaccOpenaccApvnoValidator)
        } else if (['deptUsage'].includes(item.id)) {
          this.$set(this.rules, [item.id], deptUsageValidator)
        } else if (['basicaccOacBankRegnCdName'].includes(item.id)) {
          this.$set(this.rules, [item.id], basicaccValidator)
        } else if (item.required) {
          this.$set(this.rules, [item.id], emptyValidator())
        }
      })

      this.form.belongInstNo = this.toPublicInfo.belongInstNo || ''
      this.form.basicaccOacBankRegnCd = this.toPublicInfo.basicaccOacBankRegnCd || ''

      if (this.form.basicaccOacBankRegnCd) {
        this.T0500099({ item: { searchData: this.form.basicaccOacBankRegnCd }, type: 'init' })
      }
      if (this.toPublicInfo.ovseaCustFlag && this.toPublicInfo.tocorpCustAttrbCd && this.form.custDeptBclsCd &&
        this.form.custDeptSclassCd && this.form.currCd && this.form.specAccTpCd) {
        this.T0500096('init')
      }
    },
    initData () {
    },
    onSave () {
      const form = this.$clone(this.form)
      delete form.basicaccOacBankRegnCdName

      this.$store.commit('toPublicInfoSet', { form })
      this.$emit('saveListen')
    },
    // 监听结构
    formListListen () {
      this.formList.forEach(item => {
        let disabled = false
        let options = []
        if (item.id === 'curtProdTpCd') { // 活期产品类型
          item.disabled = this.toPublicInfo.ovseaCustFlag === '1' || this.toPublicInfo.ectAccno ||
            this.toPublicInfo.specEconAreaCorpFlag === '1' || ['18', '19', '20', '21'].includes(this.toPublicInfo.corpAttrType)
        } else if (item.id === 'specAccTpCd') { // 特殊账户类型
          options = this.$clone(specAccTpCdOption)
          if (this.form.curtProdTpCd === '0') {
            if (['03'].includes(this.toPublicInfo.corpAttrType)) {
              options = this.$filterDic(specAccTpCdOption, ['00', '02', '04', '09'])
            } else if (['04', '06', '07'].includes(this.toPublicInfo.corpAttrType)) {
              options = this.$filterDic(specAccTpCdOption, ['00', '02', '09'])
            } else if (['19'].includes(this.toPublicInfo.corpAttrType)) {
              disabled = true
            } else if (['01', '02'].includes(this.toPublicInfo.corpAttrType)) {
              options = this.$filterDic(specAccTpCdOption, ['00', '01', '03'])
            } else if (['05'].includes(this.toPublicInfo.corpAttrType)) {
              options = this.$filterDic(specAccTpCdOption, ['00', '03'])
            } else if (['08', '09', '10', '11', '12', '13', '14', '15', '16', '17'].includes(this.toPublicInfo.corpAttrType)) {
              options = this.$filterDic(specAccTpCdOption, ['00'])
            }
          } else if (this.form.curtProdTpCd === '1') {
            if (['18'].includes(this.toPublicInfo.corpAttrType)) {
              if (this.toPublicInfo.specEconAreaCorpFlag === '0') {
                if (this.toPublicInfo.speEconInstFlag === 'Z00') { // 1.1
                  options = this.$filterDic(specAccTpCdOption, ['05', '07'])
                } else if (this.toPublicInfo.speEconInstFlag === 'Z13') { // 1.2
                  options = this.$filterDic(specAccTpCdOption, ['05', '06', '07', '08'])
                }
              } else if (this.toPublicInfo.specEconAreaCorpFlag === '1') {
                if (this.toPublicInfo.speEconInstFlag !== 'Z12') { // 1.3
                  options = this.$filterDic(specAccTpCdOption, ['05', '07'])
                } else if (this.toPublicInfo.speEconInstFlag === 'Z12') { // 1.4
                  options = this.$filterDic(specAccTpCdOption, ['05', '06', '07', '08'])
                }
              }
            } else if (['03', '04', '06', '07'].includes(this.toPublicInfo.corpAttrType)) {
              if (this.toPublicInfo.specEconAreaCorpFlag === '0') {
                if (this.toPublicInfo.speEconInstFlag === 'Z00') { // 2.1
                  disabled = true
                } else if (this.toPublicInfo.speEconInstFlag === 'Z13') { // 2.2
                  options = this.$filterDic(specAccTpCdOption, ['00', '06'])
                }
              } else if (this.toPublicInfo.specEconAreaCorpFlag === '1') {
                if (this.toPublicInfo.speEconInstFlag !== 'Z12') { // 2.3
                  disabled = true
                } else if (this.toPublicInfo.speEconInstFlag === 'Z12') { // 2.4
                  options = this.$filterDic(specAccTpCdOption, ['00', '06'])
                }
              }
            } else if (['19'].includes(this.toPublicInfo.corpAttrType)) { // 3
              disabled = true
            } else if (['20', '21', '22'].includes(this.toPublicInfo.corpAttrType)) {
              if (this.toPublicInfo.specEconAreaCorpFlag === '0') {
                if (this.toPublicInfo.speEconInstFlag === 'Z00') { // 4.1
                  options = this.$filterDic(specAccTpCdOption, ['00', '01'])
                } else if (this.toPublicInfo.speEconInstFlag === 'Z13') { // 4.2
                  options = this.$filterDic(specAccTpCdOption, ['00', '01', '06', '08'])
                }
              } else if (this.toPublicInfo.specEconAreaCorpFlag === '1') {
                if (this.toPublicInfo.speEconInstFlag !== 'Z12') { // 4.3
                  options = this.$filterDic(specAccTpCdOption, ['00', '01'])
                } else { // 4.4
                  options = this.$filterDic(specAccTpCdOption, ['00', '01', '06', '08'])
                }
              }
            } else if (['01', '02'].includes(this.toPublicInfo.corpAttrType)) {
              if (this.toPublicInfo.specEconAreaCorpFlag === '0') {
                if (this.toPublicInfo.speEconInstFlag === 'Z00') { // 5.1
                  options = this.$filterDic(specAccTpCdOption, ['00', '01'])
                } else if (this.toPublicInfo.speEconInstFlag === 'Z13') { // 5.2
                  options = this.$filterDic(specAccTpCdOption, ['00', '01', '06', '08'])
                }
              } else if (this.toPublicInfo.specEconAreaCorpFlag === '1') {
                if (this.toPublicInfo.speEconInstFlag !== 'Z12') { // 5.3
                  options = this.$filterDic(specAccTpCdOption, ['00', '01'])
                } else { // 5.4
                  options = this.$filterDic(specAccTpCdOption, ['00', '01', '06', '08'])
                }
              }
            } else if (['05', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'].includes(this.toPublicInfo.corpAttrType)) {
              if (this.toPublicInfo.specEconAreaCorpFlag === '0') {
                if (this.toPublicInfo.speEconInstFlag === 'Z00') {
                  disabled = true // 6.1
                } else if (this.toPublicInfo.speEconInstFlag === 'Z13') { // 6.2
                  options = this.$filterDic(specAccTpCdOption, ['00', '06'])
                }
              } else if (this.toPublicInfo.specEconAreaCorpFlag === '1') {
                if (this.toPublicInfo.speEconInstFlag !== 'Z12') { // 6.3
                  disabled = true
                } else if (this.toPublicInfo.speEconInstFlag === 'Z12') { // 6.4
                  options = this.$filterDic(specAccTpCdOption, ['00', '06'])
                }
              }
            }
          }

          item.options = options
          item.disabled = disabled
        } else if (item.id === 'currCd') { // 币种
          item.disabled = this.form.curtProdTpCd === '0' || ['06', '08'].includes(this.form.specAccTpCd)
          options = this.$clone(currCdOption)
          if (this.toPublicInfo.tocorpCustAttrbCd === '1') {
            options = this.$filterDic(currCdOption, ['643'], 'non')
          }
          item.options = options
        } else if (item.id === 'brieeditAccAttr') { // 账户类型
          options = this.$clone(brieeditAccAttrOption)

          if (this.form.curtProdTpCd === '0') {
            if (['02', '09'].includes(this.form.specAccTpCd)) {
              options = this.$filterDic(brieeditAccAttrOption, ['0', '3'])
            }

            if (['C1'].includes(this.toPublicInfo.tocorpCustClsCd) && this.toPublicInfo.tocorpCustAttrbCd === '1') { // 134
              if (this.form.custDeptSclassCd === '102') {
                options = this.$filterDic(brieeditAccAttrOption, ['0', '1', '3'])
              } else {
                options = this.$filterDic(brieeditAccAttrOption, ['0', '3'])
              }
            } else if (['C2', 'C3', 'C4'].includes(this.toPublicInfo.tocorpCustClsCd) && this.toPublicInfo.tocorpCustAttrbCd === '1') {
              options = this.$filterDic(brieeditAccAttrOption, ['0', '1', '3'])
            }

            disabled = ['01', '03', '04'].includes(this.form.specAccTpCd)
          } else if (this.form.curtProdTpCd === '1') {
            if (this.form.currCd === '156' && ['20', '21', '22'].includes(this.toPublicInfo.corpAttrType)) { // 5.2
              disabled = true
            } else if (this.form.currCd === '156' && ['18'].includes(this.toPublicInfo.corpAttrType)) { // 5.3
              options = this.$filterDic(brieeditAccAttrOption, ['0', '1', '3'])
            }

            if (['01', '07', '08'].includes(this.form.specAccTpCd)) { // 5.5
              disabled = true
            } else if (['06'].includes(this.form.specAccTpCd)) { // 5.6
              options = this.$filterDic(brieeditAccAttrOption, ['0', '3'])
            }

            if (['C1'].includes(this.toPublicInfo.tocorpCustClsCd) && this.toPublicInfo.tocorpCustAttrbCd === '1') { // 5.5)
              if (this.form.custDeptSclassCd === '102') {
                options = this.$filterDic(brieeditAccAttrOption, ['0', '1', '3'])
              } else {
                options = this.$filterDic(brieeditAccAttrOption, ['0', '3'])
              }
            } else if (['C2', 'C3', 'C4'].includes(this.toPublicInfo.tocorpCustClsCd) && this.toPublicInfo.tocorpCustAttrbCd === '1') { // 5.6)
              options = this.$filterDic(brieeditAccAttrOption, ['0', '3'])
            }
          }

          if (this.form.currCd === '156' &&
            (['19'].includes(this.toPublicInfo.corpAttrType) || this.form.specAccTpCd === '01')) {
            disabled = true
          }

          item.options = options
          item.disabled = disabled
          item.hide = this.form.currCd !== '156'
        } else if (item.id === 'accAttrNo') { // 账户性质
          options = this.$clone(accAttrNoOption)
          if (this.form.curtProdTpCd === '0') { // 4.1
            if (['03', '04', '06', '07'].includes(this.toPublicInfo.corpAttrType)) {
              if (this.form.currCd === '156') {
                disabled = this.form.brieeditAccAttr === '0' || this.form.brieeditAccAttr === '3'
                if (this.form.brieeditAccAttr === '1') {
                  options = this.$filterDic(accAttrNoOption, ['06', '07', '08'])
                } else if (this.form.brieeditAccAttr === '2') {
                  options = this.$filterDic(accAttrNoOption, ['05', '10'])
                }
              }
            } else if (!['03', '04', '06', '07', '19'].includes(this.toPublicInfo.corpAttrType)) { // 4.2
              if (this.form.currCd === '156') {
                disabled = this.form.brieeditAccAttr === '0' || this.form.brieeditAccAttr === '3'
                if (this.form.brieeditAccAttr === '1') {
                  options = this.$filterDic(accAttrNoOption, ['06', '07', '08'])
                } else if (this.form.brieeditAccAttr === '2') {
                  options = this.$filterDic(accAttrNoOption, ['05', '10'])
                }
              }
            }
          } else if (this.form.curtProdTpCd === '1') {
            if (['03', '04', '06', '07'].includes(this.toPublicInfo.corpAttrType)) { // 5.1
              if (this.form.currCd === '156') {
                disabled = this.form.brieeditAccAttr === '0' || this.form.brieeditAccAttr === '3'
                if (this.form.brieeditAccAttr === '1') {
                  options = this.$filterDic(accAttrNoOption, ['06', '07', '08'])
                } else if (this.form.brieeditAccAttr === '2') {
                  options = this.$filterDic(accAttrNoOption, ['05'])
                }
              }
            } else if (['20', '21', '22'].includes(this.toPublicInfo.corpAttrType)) { // 5.2
              disabled = this.form.currCd === '156'
            } else if (['18'].includes(this.toPublicInfo.corpAttrType)) { // 5.3
              if (this.form.currCd === '156') {
                disabled = this.form.brieeditAccAttr === '0' || this.form.brieeditAccAttr === '3'
                if (this.form.brieeditAccAttr === '1') {
                  options = this.$filterDic(accAttrNoOption, ['06', '07', '08'])
                }
              }
            } else if (['01', '02', '05', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'].includes(this.toPublicInfo.corpAttrType)) { // 5.4
              if (this.form.currCd === '156') {
                disabled = this.form.brieeditAccAttr === '0' || this.form.brieeditAccAttr === '3'
                if (this.form.brieeditAccAttr === '1') {
                  options = this.$filterDic(accAttrNoOption, ['06', '07', '08'])
                } else if (this.form.brieeditAccAttr === '2') {
                  options = this.$filterDic(accAttrNoOption, ['05'])
                }
              }
            }
          }

          item.disabled = disabled
          item.options = options
          item.hide = this.form.currCd !== '156'
        } else if (item.id === 'safeProjBclsCd') { // 外管项目大类
          item.hide = this.form.curtProdTpCd !== '1'
          if (this.form.curtProdTpCd === '1') {
            item.disabled = ['FTE', 'FTN', 'FTU'].includes(this.form.ftaAreaAccTpCd) || ['05', '07'].includes(this.form.specAccTpCd)
          }
        } else if (item.id === 'safeProjSclassCd') { // 外管项目小类
          options = this.$clone(safeProjSclassCdOption)
          if (this.form.safeProjBclsCd === '0') {
            options = this.$filterDic(safeProjSclassCdOption, ['1000', '1101', '1104', '1202', '1602', '1603'])
          } else if (this.form.safeProjBclsCd === '2') {
            options = this.$filterDic(safeProjSclassCdOption, ['3300', '3400', '3601', '4200', '4600', '4603', '3603', '3604'])
          } else if (this.form.safeProjBclsCd === '1') {
            options = this.$filterDic(safeProjSclassCdOption, ['1000', '1101', '1104', '1202', '1602', '1603', '3300', '3400', '3601', '4200', '4600', '4603', '3603', '3604'], 'non')
          }

          if (this.form.curtProdTpCd === '1') {
            item.disabled = ['FTE', 'FTN', 'FTU'].includes(this.form.ftaAreaAccTpCd) || ['05', '07'].includes(this.form.specAccTpCd)
            if (['00', '01'].includes(this.form.specAccTpCd) && this.form.safeProjBclsCd === '2') {
              options = this.$filterDic(safeProjSclassCdOption, ['3300', '3601', '4200', '4600'])
            }
          }

          item.options = options
          item.hide = this.form.curtProdTpCd !== '1'
        } else if (item.id === 'invlvTrbouRmbSpcacc') { // 是否涉及跨境人民币专户
          item.hide = !(this.form.curtProdTpCd === '1' && this.form.currCd === '156')
        } else if (item.id === 'trbouRmbSplaccType') { // 跨境人民币专用账户类型
          item.hide = this.form.invlvTrbouRmbSpcacc !== '1'
        } else if (item.id === 'unRsdntAccType') { // 非居民机构账户类型
          item.hide = this.form.trbouRmbSplaccType !== '1'
        } else if (item.id === 'ccfFundsDedicateAccType') { // 涉外资金专用账户类型
          item.hide = this.form.trbouRmbSplaccType !== '2'
        } else if (item.id === 'deptUsage') { // 存款用途
          let btnDisabled = true
          if (this.toPublicInfo.ovseaCustFlag && this.toPublicInfo.tocorpCustAttrbCd && this.form.custDeptBclsCd &&
            this.form.custDeptSclassCd && this.form.currCd && this.form.specAccTpCd) {
            btnDisabled = false
          }
          item.btnDisabled = btnDisabled || this.toPublicInfo.busiStatus !== '10'
        } else if (item.id === 'tdectAccno') { // 预留账号
          item.disabled = !!this.toPublicInfo.ectAccno
        } else if (item.id === 'fundsRegulatiAccFlag') { // 是否为资金监管账户 87
          item.hide = this.form.brieeditAccAttr !== '3'
          item.disabled = (this.form.curtProdTpCd === '1' && this.form.currCd === '156' && this.form.brieeditAccAttr === '3')
        } else if (['basicaccOacBankRegnCdName'].includes(item.id)) { // 基本户开户行地区代码（人行）
          let required = true
          item.hide = ['01', '03', '04'].includes(this.form.accAttrNo)
          if (this.form.accAttrNo === '10') {
            required = false
          }
          item.options = []
          item.required = required
        } else if (['basicaccOpenaccApvno'].includes(item.id)) { // 基本存款账户核准号/编号
          let required = true
          item.hide = ['01', '03', '04'].includes(this.form.accAttrNo)
          if (this.form.accAttrNo === '10') {
            required = false
          }
          item.required = required
        } else if (['oldBasicaccOpenaccApvno'].includes(item.id)) { // 原基本存款账户核准号/编号
          item.hide = !['0'].includes(this.form.brieeditAccAttr)
        } else if (item.id === 'ftaAreaAccTpCd') { // 自贸账户类型
          if (this.toPublicInfo.ovseaCustFlag === '1') {
            options = this.$filterDic(ftaAreaAccTpCdOption, ['FTN', 'FTU'])
          } else {
            options = this.$filterDic(ftaAreaAccTpCdOption, ['FTE', 'FTU'])
          }
          item.options = options
          item.hide = !['06', '08'].includes(this.form.specAccTpCd)
        } else if (item.id === 'accName') { // 账户名称
          let tipContent = ''
          if (this.form.brieeditAccAttr === '3' && this.form.specAccTpCd !== '01') {
            tipContent = '账户名称可以是存款人名称加内设部门或存款人名称加资金性质'
          } else if (this.form.brieeditAccAttr === '3' && this.form.specAccTpCd === '01') {
            tipContent = '账户名称可自定义录入'
          }

          if (this.form.brieeditAccAttr === '2') {
            tipContent = '账户名称可以是存款人名称加内设部门、存款人名称加资金性质或存款人名称加项目部名称'
          }

          item.tipContent = tipContent
          item.disabled = ['0', '1'].includes(this.form.brieeditAccAttr)
        } else if (item.id === 'openAccUsageCd') { // 开户用途
          item.hide = !['2', '3'].includes(this.toPublicInfo.custAccRiskLvlCd)
        } else if (item.id === 'otherOpenAccUsage') { // 其他开户用途
          item.hide = this.form.openAccUsageCd !== '9'
        } else if (item.id === 'fdsrcCd') { // 开户资金来源
          item.hide = !['2', '3'].includes(this.toPublicInfo.custAccRiskLvlCd)
        } else if (item.id === 'otherFdsrc') { // 其他开户资金来源
          item.hide = this.form.fdsrcCd !== '9'
        } else if (item.id === 'calIntFlag') { // 是否计息
          item.disabled = this.form.specAccTpCd === '02'
        } else if (item.id === 'intRatePackageTpCd') { // 利率套餐
          item.hide = this.form.calIntFlag !== '1'
        } else if (item.id === 'noFrzDedaccCategCd') { // 不得冻结/扣划账户类别
          item.hide = this.form.incldQrfraldeWhtlst !== '1'
        } else if (item.id === 'accnoOptionalFlag') { // 账号选择方式
          item.disabled = !!this.toPublicInfo.ectAccno
        } else if (item.id === 'accnoBehind4bitNo') { // 账号后4位（客户自选）
          item.hide = this.form.accnoOptionalFlag !== '1'
        } else if (item.id === 'fundsRegulatiContentNo') { // 资金监管内容
          item.hide = this.form.fundsRegulatiAccFlag !== '1'
        } else if (item.id === 'othFundsRegulatiContent') { // 其他监管内容
          item.hide = this.form.fundsRegulatiContentNo !== '5'
        } else if (item.id === 'intbankCustFlag') { // 是否同业
          item.hide = this.form.brieeditAccAttr !== '3'
        } else if (item.id === 'unRsdntAccSpecInstCd') { // 非居民账户特殊机构代码
          item.hide = this.form.trbouRmbSplaccType !== '1'
        } else if (item.id === 'custDeptBclsCd') { // 客户存款大类
          if (this.toPublicInfo.ovseaCustFlag === '0') {
            if (this.toPublicInfo.tocorpCustAttrbCd === '1') {
              options = this.$filterDic(custDeptBclsCdOption, ['1', '2', '3', '4', '5', '6', '7'])
            } else {
              options = this.$filterDic(custDeptBclsCdOption, ['8', '9', '10', '11', '12', '13', '14'])
            }
          } else {
            if (this.toPublicInfo.tocorpCustAttrbCd === '1') {
              options = this.$filterDic(custDeptBclsCdOption, ['15'])
            } else {
              options = this.$filterDic(custDeptBclsCdOption, ['16'])
            }
          }
          item.options = options
        } else if (item.id === 'custDeptSclassCd') { // 客户存款小类
          options = this.selectData.CUST_DEPT_SCLASS_CD.filter(it => {
            if (this.form.custDeptBclsCd > 9) {
              if (it.key.length === 4) {
                return it.key.startsWith(this.form.custDeptBclsCd)
              }
            } else {
              return (it.key.length < 4) && it.key.startsWith(this.form.custDeptBclsCd)
            }
          })
          if (!this.form.custDeptBclsCd) options = []
          item.options = options
        }
        item.disabled = item.disabled || this.toPublicInfo.busiStatus !== '10'
      })
    },
    // 监听数据
    formChangeListen (item) {
      console.log(this.form, 'formChangeListen')
      // 客户类型
      if (item.id === 'tocorpCustClsCd') {
        this.brieeditAccAttrListen()
        return
      }
      // 预设账户名称
      if (item.id === 'accName') {
        this.form.accName = this.toDBC(this.form.accName)
        return
      }
      // 客户名称
      if (item.id === 'custName') {
        this.accNameListen()
        return
      }
      // 预留账号
      if (item.id === 'ectAccno') {
        this.tdectAccnoListen()
        return
      }
      // 客户所属地
      if (item.id === 'ovseaCustFlag') {
        this.curtProdTpCdListen()
        this.ftaAreaAccTpCdListen()
        this.custDeptBclsCdListen()
        return
      }
      // 同业客户
      if (item.id === 'tocorpCustAttrbCd') {
        this.currCdListen()
        this.custDeptBclsCdListen()
        return
      }
      // 存款人类别
      if (item.id === 'corpAttrType') {
        this.curtProdTpCdListen()
        return
      }
      // 是否特殊经济区内企业标志
      if (item.id === 'specEconAreaCorpFlag') {
        this.curtProdTpCdListen()
        return
      }
      // 特殊经济区内企业类型代码
      if (item.id === 'speEconInstFlag') {
        this.specAccTpCdListen()
        return
      }
      // 账户风险等级
      if (item.id === 'custAccRiskLvlCd') {
        this.openAccUsageCdListen()
        this.fdsrcCdListen()
        return
      }
      // 活期产品类型
      if (item.id === 'curtProdTpCd') {
        this.specAccTpCdListen()
        this.safeProjBclsCdListen()
        return
      }
      // 特殊账户类型
      if (item.id === 'specAccTpCd') {
        this.currCdListen()
        this.ftaAreaAccTpCdListen()
        this.calIntFlagListen()
        return
      }
      // 币种
      if (item.id === 'currCd') {
        this.brieeditAccAttrListen()
        this.invlvTrbouRmbSpcaccListen()
        this.deptUsageListen()
        return
      }
      // 账户类型
      if (item.id === 'brieeditAccAttr') {
        this.accAttrNoListen()
        this.fundsRegulatiAccFlagListen()
        this.intbankCustFlagListen()
        this.accNameListen()
        this.oldBasicaccOpenaccApvnoListen()
        return
      }
      // 是否涉及跨境人民币专户
      if (item.id === 'invlvTrbouRmbSpcacc') {
        this.trbouRmbSplaccTypeListen()
        return
      }
      // 跨境人民币专用账户类型
      if (item.id === 'trbouRmbSplaccType') {
        this.unRsdntAccTypeListen()
        this.ccfFundsDedicateAccTypeListen()
        this.unRsdntAccSpecInstCdListen()
        return
      }
      // 账户性质
      if (item.id === 'accAttrNo') {
        this.basicaccOpenaccApvnoListen()
        return
      }
      // 自贸账户类型
      if (item.id === 'ftaAreaAccTpCd') {
        this.safeProjBclsCdListen()
        return
      }
      // 开户用途
      if (item.id === 'openAccUsageCd') {
        this.otherOpenAccUsageListen()
        return
      }
      // 开户资金来源
      if (item.id === 'fdsrcCd') {
        this.otherFdsrcListen()
        return
      }
      // 是否计息
      if (item.id === 'calIntFlag') {
        this.intRatePackageTpCdListen()
        return
      }
      // 是否维护冻结扣划白名单
      if (item.id === 'incldQrfraldeWhtlst') {
        this.noFrzDedaccCategCdListen()
        return
      }
      // 账号选择方式
      if (item.id === 'accnoOptionalFlag') {
        this.accnoBehind4bitNoListen()
        return
      }
      // 是否为资金监管账户
      if (item.id === 'fundsRegulatiAccFlag') {
        this.fundsRegulatiContentNoListen()
        return
      }
      // 资金监管内容
      if (item.id === 'fundsRegulatiContentNo') {
        this.othFundsRegulatiContentListen()
        return
      }
      // 客户存款大类
      if (item.id === 'custDeptBclsCd') {
        this.custDeptSclassCdListen()
        return
      }
      // 客户存款小类
      if (item.id === 'custDeptSclassCd') {
        this.brieeditAccAttrListen()
        this.deptUsageListen()
        return
      }
      // 外管项目大类
      if (item.id === 'safeProjBclsCd') {
        this.safeProjSclassCdListen()
        return
      }

      // 存款用途
      if (item.id === 'deptUsage') {
        for (const it of item.options) {
          if (it.key === this.form.deptUsage) {
            this.form.deptCategName = it.deptCategName
            break
          }
        }
      }
    },
    btnListen (item) {
      // 存款用途
      if (item.id === 'deptUsage') {
        this.T0500096()
      }
    },
    // api 存款用途
    async T0500096 (type) {
      const params = {
        currCode: this.form.currCd,
        custDeptBclsCd: this.form.custDeptBclsCd,
        custDeptSclassCd: this.form.custDeptSclassCd,
        depKind: '20101',
        dmstOvseaFlagCode: this.toPublicInfo.ovseaCustFlag,
        intbankCustFlag: this.toPublicInfo.tocorpCustAttrbCd === '1' ? '1' : '0',
        trusteeAccFlag: ['01', '07', '08'].includes(this.form.specAccTpCd) ? '1' : '0',
        oprTellerNo: NativeData.get('tellerCode'),
        txInstNo: NativeData.get('tellerInst')
      }
      this.formListProp('deptUsage', 'options', [])
      try {
        const res = await this._$post(PostUrl.T0500096, params)
        this.form.deptUsage = ''
        this.form.deptCategName = ''
        if (res.code === '0000') {
          if (res.data && res.data.length) {
            if (type !== 'init') {
              this._$showInfo('查询【存款用途】成功')
            } else {
              this.form.deptUsage = this.toPublicInfo.deptUsage || ''
              this.form.deptCategName = this.toPublicInfo.deptCategName || ''
            }
            const options = res.data
            options.forEach(item => {
              for (const it of this.selectData.OPENACC_FUNDS_USAGE_TP_CD) {
                if (it.key === item.openaccFundsUsageTpCd) {
                  item.key = it.key
                  item.value = it.value
                  break
                }
              }
            })
            this.formListProp('deptUsage', 'required', true)
            this.formListProp('deptUsage', 'disabled', false)
            this.formListProp('deptUsage', 'options', options)
          } else {
            this._$showInfo('查询【存款用途】结果为空')
            this.formListProp('deptUsage', 'required', false)
            this.formListProp('deptUsage', 'disabled', true)
          }
        } else {
          this._$showInfo(res.msg)
        }
      } catch (error) {
        this._$showInfo(error)
      }
    },
    onPage () {
      for (const item of this.formList) {
        if (item.type === 'inputQuery') {
          item.options = []
          if (item.searchData) {
            item.searchData = ''
            this.form[item.id] = ''
            this.form.basicaccOacBankRegnCd = ''
          }
          break
        }
      }
    },
    inputListen ({ e, item }) {
      if (item.id === 'basicaccOacBankRegnCdName') {
        item.searchData = e.target.value
        if (item.searchData.length > 1) {
          this.handleDebounce({ item })
        }
        return
      }
      if (item.id === 'accnoBehind4bitNo') {
        this.form[item.id] = this.form[item.id].replace(/[^0-9.]+/g, '')
        return
      }
      if (['tdectAccno', 'oldBasicaccOpenaccApvno', 'basicaccOpenaccApvno'].includes(item.id)) {
        this.form[item.id] = this.form[item.id].replace(/[^\a-\z\A-\Z0-9]/g, '')
      }
    },
    handleDebounce: debounce(function (val) {
      this.T0500099(val)
    }),
    // api 查询对公开户地区代码
    async T0500099 ({ item, type }) {
      const params = {
        paraNo: 'PBC_REGN_CD',
        paraValFuzzy: item.searchData
      }
      item.options = []
      if (!item.searchData) return
      try {
        const res = await this._$post(PostUrl.T0500099, params)
        if (res.code === '0000') {
          // 初始化
          if (type === 'init') {
            let value = ''
            if (res.data && res.data[0]) {
              value = res.data[0].paraValNoAndName
            }
            this.form.basicaccOacBankRegnCdName = value
            return
          }

          if (res.data) {
            item.options = res.data.map(it => {
              return {
                key: it.paraValNo,
                value: it.paraValNoAndName
              }
            })
          }
        } else {
          this._$showInfo(res.msg)
        }
      } catch (error) {
        this._$showInfo(error)
      }
    },
    inputQueryClick ({ item, optionItem }) {
      this.form[item.id] = optionItem.value
      this.form.basicaccOacBankRegnCd = optionItem.key
      item.searchData = ''
      item.options = []
    },
    // 被控制字段
    // 涉外资金专用账户类型
    ccfFundsDedicateAccTypeListen () {
      this.form.ccfFundsDedicateAccType = ''
      this.formChangeListen({ id: 'ccfFundsDedicateAccType' })
    },
    // 非居民机构账户类型
    unRsdntAccTypeListen () {
      this.form.unRsdntAccType = ''
      this.formChangeListen({ id: 'unRsdntAccType' })
    },
    // 跨境人民币专用账户类型
    trbouRmbSplaccTypeListen () {
      let value = ''
      if (this.toPublicInfo.ovseaCustFlag === '1' && this.form.brieeditAccAttr === '1' && this.form.accAttrNo === '96') {
        value = '0'
      }
      this.form.trbouRmbSplaccType = value
      this.formChangeListen({ id: 'trbouRmbSplaccType' })
    },
    // 是否涉及跨境人民币专户
    invlvTrbouRmbSpcaccListen () {
      let value = ''
      if (this.toPublicInfo.ovseaCustFlag === '1' && this.form.brieeditAccAttr === '1' && this.form.accAttrNo === '96') {
        value = '1'
      }
      this.form.invlvTrbouRmbSpcacc = ''
      this.formChangeListen({ id: 'invlvTrbouRmbSpcacc' })
    },
    // 外管项目小类
    safeProjSclassCdListen () {
      let value = ''
      const valueObj = {
        FTU: '4603',
        FTE: '3603',
        FTN: '3604'
      }
      if (this.form.curtProdTpCd === '1') {
        value = valueObj[this.form.ftaAreaAccTpCd] || ''
        if (['05', '07'].includes(this.form.specAccTpCd)) {
          value = '3400'
        }
      }
      this.form.safeProjSclassCd = value
      this.formChangeListen({ id: 'safeProjSclassCd' })
    },
    // 外管项目大类
    safeProjBclsCdListen () {
      let value = ''
      if (this.form.curtProdTpCd === '1') {
        if (['FTE', 'FTN', 'FTU'].includes(this.form.ftaAreaAccTpCd) ||
          ['05', '07'].includes(this.form.specAccTpCd)) {
          value = '2'
        }
      }
      this.form.safeProjBclsCd = value
      this.formChangeListen({ id: 'safeProjBclsCd' })
    },
    // 活期产品类型
    curtProdTpCdListen () {
      let value = ''
      if (this.toPublicInfo.ovseaCustFlag === '1' || this.toPublicInfo.specEconAreaCorpFlag === '1' || ['18', '19', '20', '21'].includes(this.toPublicInfo.corpAttrType)) {
        value = '1'
      }
      this.form.curtProdTpCd = value
      this.formChangeListen({ id: 'curtProdTpCd' })
    },
    // 币种
    currCdListen () {
      let value = ''
      if (this.form.curtProdTpCd === '0' || ['06', '08'].includes(this.form.specAccTpCd)) {
        value = '156'
      }
      this.form.currCd = value
      this.formChangeListen({ id: 'currCd' })
    },
    // 账户类型
    brieeditAccAttrListen () {
      let value = ''
      if (this.form.curtProdTpCd === '0') {
        if (['01', '03', '04'].includes(this.form.specAccTpCd)) { // 4.4
          value = '3'
        }
      } else if (this.form.curtProdTpCd === '1') {
        if (this.form.currCd === '156') {
          if (['20', '21', '22'].includes(this.toPublicInfo.corpAttrType)) {
            value = '3'
          }
        }

        if (['01', '07', '08'].includes(this.form.specAccTpCd)) { // 5.5
          value = '3'
        }
      }

      if (this.form.currCd === '156') {
        if (this.form.specAccTpCd === '01') {
          value = '3'
        } else if (['19'].includes(this.toPublicInfo.corpAttrType)) {
          value = '2'
        }
      }

      this.form.brieeditAccAttr = value
      this.formChangeListen({ id: 'brieeditAccAttr' })
    },
    // 账户性质
    accAttrNoListen () {
      let value = ''
      if (this.form.curtProdTpCd === '0') {
        if (['03', '04', '06', '07'].includes(this.toPublicInfo.corpAttrType)) {
          if (this.form.currCd === '156') {
            if (this.form.brieeditAccAttr === '0') {
              value = '01'
            } else if (this.form.brieeditAccAttr === '3') {
              value = '02'
            }
          }
        } else if (!['03', '04', '06', '07', '19'].includes(this.toPublicInfo.corpAttrType)) {
          if (this.form.currCd === '156') {
            if (this.form.brieeditAccAttr === '0') {
              value = '01'
            } else if (this.form.brieeditAccAttr === '3') {
              value = '09'
            }
          }
        }
      } else if (this.form.curtProdTpCd === '1') {
        if (['03', '04', '06', '07'].includes(this.toPublicInfo.corpAttrType)) { // 5.1
          if (this.form.currCd === '156') {
            if (this.form.brieeditAccAttr === '0') {
              value = '01'
            } else if (this.form.brieeditAccAttr === '3') {
              value = '02'
            }
          }
        } else if (['20', '21', '22'].includes(this.toPublicInfo.corpAttrType)) { // 5.2
          if (this.form.currCd === '156') value = '03'
        } else if (['18'].includes(this.toPublicInfo.corpAttrType)) { // 5.3
          if (this.form.currCd === '156') {
            if (this.form.brieeditAccAttr === '0') {
              value = '01'
            } else if (this.form.brieeditAccAttr === '3') {
              value = '09'
            }
          }
        } else if (['01', '02', '05', '08', '09', '10', '12', '13', '14', '15', '16', '17'].includes(this.toPublicInfo.corpAttrType)) { // 5.4
          if (this.form.currCd === '156') {
            if (this.form.brieeditAccAttr === '0') {
              value = '01'
            } else if (this.form.brieeditAccAttr === '3') {
              value = '09'
            }
          }
        }
      }

      if (['19'].includes(this.toPublicInfo.corpAttrType)) {
        if (this.form.currCd === '156') value = '04'
      }

      this.form.accAttrNo = value
      this.formChangeListen({ id: 'accAttrNo' })
    },
    // 特殊账户类型
    specAccTpCdListen () {
      let value = ''

      if (this.form.curtProdTpCd === '0') {
        if (['19'].includes(this.toPublicInfo.corpAttrType)) {
          value = '00'
        }
      } else if (this.form.curtProdTpCd === '1') {
        if (['03', '04', '06', '07'].includes(this.toPublicInfo.corpAttrType)) {
          if (this.toPublicInfo.specEconAreaCorpFlag === '0') {
            if (this.toPublicInfo.speEconInstFlag === 'Z00') { // 2.1
              value = '00'
            }
          } else if (this.toPublicInfo.specEconAreaCorpFlag === '1') {
            if (this.toPublicInfo.speEconInstFlag !== 'Z12') { // 2.3
              value = '00'
            }
          }
        } else if (['19'].includes(this.toPublicInfo.corpAttrType)) { // 3
          value = '00'
        } if (['05', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'].includes(this.toPublicInfo.corpAttrType)) {
          if (this.toPublicInfo.specEconAreaCorpFlag === '0') {
            if (this.toPublicInfo.speEconInstFlag === 'Z00') { // 6.1
              value = '00'
            }
          } else if (this.toPublicInfo.specEconAreaCorpFlag === '1') {
            if (this.toPublicInfo.speEconInstFlag !== 'Z12') { // 6.3
              value = '00'
            }
          }
        }
      }

      this.form.specAccTpCd = value
      this.formChangeListen({ id: 'specAccTpCd' })
    },
    // 预留账号
    tdectAccnoListen () {
      this.form.tdectAccno = this.toPublicInfo.ectAccno ? this.toPublicInfo.ectAccno : ''
    },
    // 是否为资金监管账户
    fundsRegulatiAccFlagListen () {
      if (this.form.curtProdTpCd === '1' && this.form.currCd === '156' && this.form.brieeditAccAttr === '3') {
        this.form.fundsRegulatiAccFlag = '0'
      } else {
        this.form.fundsRegulatiAccFlag = ''
      }
      this.formChangeListen({ id: 'fundsRegulatiAccFlag' })
    },
    // 基本存款账户核准号/编号
    basicaccOpenaccApvnoListen () {
      this.form.basicaccOpenaccApvno = ''
      this.form.basicaccOacBankRegnCd = ''
      this.form.basicaccOacBankRegnCdName = ''
    },
    // 原基本存款账户核准号/编号
    oldBasicaccOpenaccApvnoListen () {
      this.form.oldBasicaccOpenaccApvno = ''
    },
    // 自贸账户类型
    ftaAreaAccTpCdListen () {
      this.form.ftaAreaAccTpCd = ''
      this.formChangeListen({ id: 'ftaAreaAccTpCd' })
    },
    // 账户名称
    accNameListen () {
      this.form.accName = this.toPublicInfo.custName
      this.formChangeListen({ id: 'accName' })
    },
    // 开户用途
    openAccUsageCdListen () {
      this.form.openAccUsageCd = ''
      this.formChangeListen({ id: 'openAccUsageCd' })
    },
    // 其他开户用途
    otherOpenAccUsageListen () {
      this.form.otherOpenAccUsage = ''
    },
    // 开户资金来源
    fdsrcCdListen () {
      this.form.fdsrcCd = ''
      this.formChangeListen({ id: 'fdsrcCd' })
    },
    // 其他开户资金来源
    otherFdsrcListen () {
      this.form.otherFdsrc = ''
    },
    // 是否计息
    calIntFlagListen () {
      let value = ''
      if (['02', '09'].includes(this.form.specAccTpCd)) value = '0'
      this.form.calIntFlag = value
      this.formChangeListen({ id: 'calIntFlag' })
    },
    // 利率套餐
    intRatePackageTpCdListen () {
      this.form.intRatePackageTpCd = ''
    },
    // 不得冻结/扣划账户类别
    noFrzDedaccCategCdListen () {
      this.form.noFrzDedaccCategCd = ''
    },
    // 账号后4位（客户自选）
    accnoBehind4bitNoListen () {
      this.form.accnoBehind4bitNo = ''
    },
    // 资金监管内容
    fundsRegulatiContentNoListen () {
      this.form.fundsRegulatiContentNo = ''
      this.formChangeListen({ id: 'fundsRegulatiContentNo' })
    },
    // 其他监管内容
    othFundsRegulatiContentListen () {
      this.form.othFundsRegulatiContent = ''
    },
    // 是否同业
    intbankCustFlagListen () {
      let value = ''
      if (this.form.brieeditAccAttr === '3') {
        value = this.toPublicInfo.tocorpCustAttrbCd === '1' ? '1' : '0'
      }
      this.form.intbankCustFlag = value
    },
    // 非居民账户特殊机构代码
    unRsdntAccSpecInstCdListen () {
      this.form.unRsdntAccSpecInstCd = ''
    },
    // 客户存款大类
    custDeptBclsCdListen () {
      this.form.custDeptBclsCd = ''
      this.formChangeListen({ id: 'custDeptBclsCd' })
    },
    // 客户存款小类
    custDeptSclassCdListen () {
      this.form.custDeptSclassCd = ''
      this.formChangeListen({ id: 'custDeptSclassCd' })
    },
    // 存款用途
    deptUsageListen () {
      this.form.deptUsage = ''
      this.form.deptCategName = ''
      this.formListProp('deptUsage', 'options', [])
      this.formListProp('deptUsage', 'required', true)
      this.formListProp('deptUsage', 'disabled', false)
    },
    onBelongInstShow (item) {
      if (item.disabled) return
      this.belongInst.show = true
    },
    onClose (item) {
      if (item.disabled) return
      this.form.belongInstName = ''
      this.form.belongInstNo = ''
    },
    fromChild (param) {
      this.form.belongInstName = param.belongInstName
      this.form.belongInstNo = param.belongInstNo
      this.belongInst.show = false
    },

    // 半角转全角
    toDBC (str) {
      let tmp = ''
      for (let i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) === 32) {
          tmp += String.fromCharCode(str.charCodeAt(i) - 32 + 12288)
        } else if ((str.charCodeAt(i) > 32 && str.charCodeAt(i) < 48) || (str.charCodeAt(i) > 57 && str.charCodeAt(i) < 127)) {
          tmp += String.fromCharCode(str.charCodeAt(i) + 65248)
        } else {
          tmp += str.charAt(i)
        }
      }
      return tmp
    },
    // formListProp
    formListProp (id, type, value) {
      for (const item of this.formList) {
        if (item.id === id) {
          item[type] = value
          break
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-content {
  .belongInstName-icon {
    position: absolute;
    top: 50%;
    right: 12%;
    .belongInstName-img {
      width: 10px;
      height: 11px;
      margin-right: 10px;
      transform: translateY(4px);
    }
  }
  .btngroup {
    padding: 50px 0;
  }
}
</style>
