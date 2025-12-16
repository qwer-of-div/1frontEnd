import vueMain from '@/main.js'

import { yesNo, locRemFlagCode, curtProdTpCd, specAccTpCd, 
    currCd, brieeditAccAttr, accAttrNo, safeProjBclsCd,
    intRatePackageTpCd, accnoOptionalFlag, trbouRmbSplaccType, unRsdntAccType,
    ccfFundsDedicateAccType, incldQrfraldeWhtlstTip, curtProdTpCdTip, noFrzDedaccCategCd,
    openAccUsageCd, fdsrcCd, basicaccOacBankRegnCdTip, oldBasicaccOpenaccApvnoTip,
    corpManagePersonCateg, oprtorInfoTpCd, numberOption, openbranch,
    psninfoMtpxTpCd, keyPerTpCd, companyAttr, naturalAttrType,
    lglerCertType, fundsRegulatiContentNo } from '@/assets/dictionary'

const lglerCertTypeOption = vueMain.$filterDic(lglerCertType, ['40'], 'non')

const dateLimit = () => {
    const nowDate = new Date()
    const year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1
    let day = nowDate.getDate()
    if(month < 10) month = '0' + month
    if(day < 10) day = '0' + day
    return `${year}-${month}-${day}`
}

// 账户基本信息
export const formList = [
    {label: '账户基本信息', id: 'title1', type: 'title'},
    {label: '预约开户机构选择', id: 'belongInstName', type: 'slot', required: true},
    {label: '开户地与注册地是否一致', id: 'locRemFlagCode', type: 'select', options: locRemFlagCode, required: true},
    {label: '活期产品类型', id: 'curtProdTpCd', type: 'selectTip', options: curtProdTpCd, tipContent: curtProdTpCdTip, required: true, disabled: false},
    {label: '特殊账户类型', id: 'specAccTpCd', type: 'select', options: specAccTpCd, required: true},
    {label: '自贸账户类型', id: 'ftaAreaAccTpCd', type: 'select', options: [], required: true},
    {label: '币种', id: 'currCd', type: 'select', options: currCd, required: true},
    {label: '', id: 'empty1', type: 'empty'},
    {label: '账户类型', id: 'brieeditAccAttr', type: 'select', options: brieeditAccAttr, required: true, disabled: false, hide: false},
    {label: '账户性质', id: 'accAttrNo', type: 'select', options: accAttrNo, required: true, hide: false},
    {label: '', id: 'dashed1', type: 'dashed'},

    {label: '外管项目大类', id: 'safeProjBclsCd', type: 'select', options: safeProjBclsCd, required: true, hide: false},
    {label: '外管项目小类', id: 'safeProjSclassCd', type: 'select', options: [], required: true, hide: false},
    {label: '客户存款大类', id: 'custDeptBclsCd', type: 'select', options: [], required: true},
    {label: '客户存款小类', id: 'custDeptSclassCd', type: 'select', options: [], required: true},
    {label: '存款用途', id: 'deptUsage', type: 'selectBtn', options: [], btnLabel: '查询存款用途', required: true, btnDisabled: false},
    {label: '存款类别', id: 'deptCategName', type: 'input', required: false, disabled: true},
    {label: '', id: 'dashed2', type: 'dashed'},

    {label: '是否计息', id: 'calIntFlag', type: 'select', options: yesNo, required: true},
    {label: '利率套餐', id: 'intRatePackageTpCd', type: 'select', options: intRatePackageTpCd, required: true},
    {label: '', id: 'dashed3', type: 'dashed'},

    {label: '账号选择方式', id: 'accnoOptionalFlag', type: 'select', options: accnoOptionalFlag, required: true},
    {label: '账号后4位（客户自选）', id: 'accnoBehind4bitNo', type: 'input', required: true, maxlength: 4},
    {label: '', id: 'empty50', type: 'empty'},
    {label: '预留账号', id: 'tdectAccno', type: 'input', required: false, maxlength: 18},
    {label: '预设账户名称', id: 'accName', type: 'inputTip', required: true, disabled: true, maxlength: 100, tipContent: ''},
    {label: '基本户开户行地区代码（人行）', id: 'basicaccOacBankRegnCdName', type: 'inputQuery', tipContent: basicaccOacBankRegnCdTip, searchData: '', options: [], required: false},
    {label: '', id: 'empty51', type: 'empty'},
    {label: '原基本存款账户核准号/编号', id: 'oldBasicaccOpenaccApvno', type: 'inputTip', tipContent: oldBasicaccOpenaccApvnoTip, required: false, maxlength: 14},
    {label: '基本存款账户核准号/编号', id: 'basicaccOpenaccApvno', type: 'input', required: false, maxlength: 14},
    {label: '', id: 'dashed4', type: 'dashed'},
    
    {label: '是否为资金监管账户', id: 'fundsRegulatiAccFlag', options: yesNo, type: 'select', required: true},
    {label: '是否同业', id: 'intbankCustFlag', type: 'select', options: yesNo, required: true, disabled: true},
    {label: '资金监管内容', id: 'fundsRegulatiContentNo', options: fundsRegulatiContentNo, type: 'select', required: true},
    {label: '其他监管内容', id: 'othFundsRegulatiContent', type: 'input', required: true, maxlength: 100},
    {label: '', id: 'empty60', type: 'empty'},
    {label: '是否涉及跨境人民币专户', id: 'invlvTrbouRmbSpcacc', type: 'select', options: yesNo, required: true},
    {label: '', id: 'empty61', type: 'empty'},
    {label: '跨境人民币专用账户类型', id: 'trbouRmbSplaccType', type: 'select', options: trbouRmbSplaccType, required: true},
    {label: '', id: 'empty62', type: 'empty'},
    {label: '非居民机构账户类型', id: 'unRsdntAccType', type: 'select', options: unRsdntAccType, required: true},
    {label: '非居民账户特殊机构代码', id: 'unRsdntAccSpecInstCd', type: 'input', required: true, maxlength: 9},
    {label: '涉外资金专用账户类型', id: 'ccfFundsDedicateAccType', type: 'select', options: ccfFundsDedicateAccType, required: true},
    {label: '是否维护冻结扣划白名单', id: 'incldQrfraldeWhtlst', type: 'selectTip', options: yesNo, tipContent: incldQrfraldeWhtlstTip, required: true},
    {label: '不得冻结/扣划账户类别', id: 'noFrzDedaccCategCd', type: 'select', options: noFrzDedaccCategCd, required: true},
    {label: '开户用途', id: 'openAccUsageCd', type: 'select', options: openAccUsageCd, required: true},
    {label: '其他开户用途', id: 'otherOpenAccUsage', type: 'input', required: true, maxlength: 100},
    {label: '开户资金来源', id: 'fdsrcCd', type: 'select', options: fdsrcCd, required: true},
    {label: '其他开户资金来源', id: 'otherFdsrc', type: 'input', required: true, maxlength: 100},
]

// 账户基本信息-预约开户机构选择
export const belongInstFormList = [
    {label: '请选择所查询的机构：', id: 'instLvl01', type: 'input'},
    {label: '', id: 'instLvl02', type: 'input', defaultLabel: '请选择一分机构'},
    {label: '', id: 'instLvl03', type: 'input', defaultLabel: '请选择二分机构'},
    {label: '', id: 'instLvl04', type: 'input', defaultLabel: '请选择一支机构'},
    {label: '', id: 'instLvl05', type: 'input', defaultLabel: '请选择网点机构'},
]

// 企业主及相关人员
export const enterpreneurFormList = [
    {label: '管理人员信息', id: 'title1', type: 'title'},
    {label: '管理人类型', id: 'corpManagePersonCateg', type: 'select', options: corpManagePersonCateg, required: true},
    {label: '管理人姓名', id: 'lglPersName', type: 'input', required: true, maxlength: 60},
    {label: '管理人证件类型', id: 'lglerCertType', type: 'select', options: lglerCertTypeOption, required: true},
    {label: '管理人证件号码', id: 'lglPersCertNo', type: 'cardCodeInput', required: true, rulePre: 'lglerCertType', rulePre1: 'lglPersName', maxlength: 30},
    {label: '管理人证件生效日', id: 'lgrpsCertEffDt', type: 'date', required: true, max: dateLimit()},
    {label: '管理人证件到期日', id: 'lglerCertDueDate', type: 'date1', required: true, rulePre: 'lgrpsCertEffDt', min: dateLimit()},
    {label: '管理人联系电话（区号+号码）', id: 'thlglerContTel', inputId1: 'dmstTelAreaNo', inputId2: 'lglerContTel', type: 'telInput', required: true, maxlength1: 4, maxlength2: 11 },
    {label: '管理人联系地址', id: 'lglerSpecificAddr', type: 'input', required: true, maxlength: 100},
    {label: '管理人国籍', id: 'lglerNationCode', type: 'select', options: [], required: true},
    {label: '管理人省', id: 'lglerProvName', type: 'select', options: [], rulePre: 'lglerNationCode'},
    {label: '管理人市', id: 'lglerCityName', type: 'select', options: [], rulePre: 'lglerNationCode'},
    {label: '管理人县/区', id: 'lglerAreaCountyAddr', type: 'select', options: [], rulePre: 'lglerNationCode'},

    {label: '是否存在单位授权人', id: 'ifAuthorizedPerson', type: 'select', options: yesNo, required: true},
    {label: '单位授权人姓名', id: 'agentPersName', type: 'input', required: true, maxlength: 60},
    {label: '单位授权人证件类型', id: 'agentPersCertType', type: 'select', options: lglerCertTypeOption, required: true},
    {label: '单位授权人证件号码', id: 'agentPersCertNo', type: 'cardCodeInput', required: true, rulePre: 'agentPersCertType', rulePre1: 'agentPersName', maxlength: 30},
    {label: '单位授权人证件生效日', id: 'authorCertEffDt', type: 'date', required: true, max: dateLimit()},
    {label: '单位授权人证件到期日', id: 'agtPersCertDueDate', type: 'date1', required: true, rulePre: 'authorCertEffDt', min: dateLimit()},
    {label: '单位授权人联系电话（区号+号码）', id: 'thagentPersContTel', inputId1: 'agtPersTelAreaNo', inputId2: 'agentPersContTel', type: 'telInput', required: true, maxlength1: 4, maxlength2: 11 },
    {label: '单位授权人联系地址', id: 'agentPersSpecificAddr', type: 'input', required: true, maxlength: 100},
    {label: '单位授权人国籍', id: 'agentPersNationCode', type: 'select', options: [], required: true},
    {label: '单位授权人省', id: 'agentPersProvName', type: 'select', options: [], rulePre: 'agentPersNationCode'},
    {label: '单位授权人市', id: 'agentPersCityName', type: 'select', options: [], rulePre: 'agentPersNationCode'},
    {label: '单位授权人县/区', id: 'agentPersAreaCountyAddr', type: 'select', options: [], rulePre: 'agentPersNationCode'},

    {label: '财务负责人员信息', id: 'title2', type: 'title'},
    {label: '财务负责人与管理人是否一致', id: 'finoffWLgrpsFitFlag', type: 'select', options: yesNo, required: true},
    {label: '财务负责人姓名', id: 'finRepPersName', type: 'input', required: true, maxlength: 60},
    {label: '财务负责人证件类型', id: 'finRepPersCertType', type: 'select', options: lglerCertTypeOption, required: true},
    {label: '财务负责人证件号码', id: 'finRepPersCertNo', type: 'cardCodeInput', required: true, rulePre: 'finRepPersCertType', rulePre1: 'finRepPersName', maxlength: 30},
    {label: '财务负责人证件生效日', id: 'finoffCertEffDt', type: 'date', required: true, max: dateLimit()},
    {label: '财务负责人证件到期日', id: 'finRepPersCertDueDate', type: 'date1', required: true, rulePre: 'finoffCertEffDt', min: dateLimit()},
    {label: '财务负责人联系电话（区号+号码）', id: 'thfinRepPersContTel', inputId1: 'finRepPersTelAreaNo', inputId2: 'finRepPersContTel', type: 'telInput', required: true, maxlength1: 4, maxlength2: 11 },
    {label: '财务负责人联系地址', id: 'finRepPersSpecificAddr', type: 'input', required: true, maxlength: 100},
    {label: '财务负责人国籍', id: 'finRepPersNationCode', type: 'select', options: [], required: true},
    {label: '财务负责人省', id: 'finRepPersProvName', type: 'select', options: [], rulePre: 'finRepPersNationCode'},
    {label: '财务负责人市', id: 'finRepPersCityName', type: 'select', options: [], rulePre: 'finRepPersNationCode'},
    {label: '财务负责人县/区', id: 'finRepPersAreaCountyName', type: 'select', options: [], rulePre: 'finRepPersNationCode'},

    {label: '是否管理人办理', id: 'agentFlag', type: 'select', options: yesNo, required: true},
    {label: '', id: 'empty1', type: 'empty'},
    {label: '经办人信息复用', id: 'oprtorInfoTpCd', type: 'select', options: oprtorInfoTpCd, required: true},
    {label: '经办人姓名', id: 'oprtorName', type: 'input', required: true, maxlength: 60},
    {label: '经办人证件类型', id: 'oprtorCertType', type: 'select', options: lglerCertTypeOption, required: true},
    {label: '经办人证件号码', id: 'oprtorCertNo', type: 'cardCodeInput', required: true, rulePre: 'oprtorCertType', rulePre1: 'oprtorName', maxlength: 30},
    {label: '经办人证件生效日', id: 'oprtorCertEffDt', type: 'date', required: true, max: dateLimit()},
    {label: '经办人证件到期日', id: 'oprtorCertDueDate', type: 'date1', required: true, rulePre: 'oprtorCertEffDt', min: dateLimit()},
    {label: '经办人联系电话（区号+号码）', id: 'thoprtorMobile', inputId1: 'oprtorTelAreaNo', inputId2: 'oprtorMobile', type: 'telInput', required: true, maxlength1: 4, maxlength2: 11 },
    {label: '经办人联系地址', id: 'oprtorContAddr', type: 'input', required: true, maxlength: 100},
    {label: '经办人国籍', id: 'oprtorNationCode', type: 'select', options: [], required: true},
    {label: '经办人省', id: 'oprtorProvCd', type: 'select', options: [], rulePre: 'oprtorNationCode'},
    {label: '经办人市', id: 'oprtorCityCd', type: 'select', options: [], rulePre: 'oprtorNationCode'},
    {label: '经办人县/区', id: 'oprtorAreaCountyName', type: 'select', options: [], rulePre: 'oprtorNationCode'},

    {label: '控股股东/实际控制人员信息', id: 'title3', type: 'title'},
    {label: '控股股东/实际控制人数量', id: 'holdingsCount', type: 'select' , options: numberOption, required: true},
    {label: '控股股东', id: 'holdingInfos', type: 'slot', value: []},

    {label: '客户识别', id: 'title4', type: 'title'},
    {label: '是否需要受益人识别', id: 'needRecognBfcyFlag', type: 'select', options: yesNo, required: true},
    {label: '单位性质-客户识别', id: 'companyAttr', type: 'select', options: companyAttr, required: true},
    {label: '受益所有人信息与关联自然人信息是否一致', id: 'bfcyWRelNatuerFitFlag', type: 'select', options: yesNo, required: true},
    
    {label: '关联自然人数量', id: 'naturalPerNum', type: 'select', options: numberOption, required: true},
    {label: '受益所有人数量', id: 'btnPerNum', type: 'select', options: numberOption, required: true},
    {label: '关联自然人', id: 'personInfoArray', type: 'slot', value: []},
    {label: '受益所有人', id: 'earningsInfoArray', type: 'slot', value: []},
    // 联网核查
    {label: '管理人', id: 'lglerCertType1', type: 'hide', hide: true},
    {label: '单位授权人', id: 'agentPersCertType1', type: 'hide', hide: true},
    {label: '财务负责人', id: 'finRepPersCertType1', type: 'hide', hide: true},
    {label: '经办人', id: 'oprtorCertType1', type: 'hide', hide: true},
]

// 控股股东/实际控制人员信息
export const holdingFormList = [
    {label: '控股股东/实际控制人num分类', id: 'openbranch', type: 'select', options: openbranch, required: true},
    {label: '控股股东/实际控制人num信息复用', id: 'psninfoMtpxTpCd', options: psninfoMtpxTpCd, type: 'select', required: true},
    {label: '关键人员num类型', id: 'keyPerTpCd', type: 'select', options: keyPerTpCd, required: true},
    {label: '控股股东/实际控制人num名称', id: 'studyCollge', type: 'input', required: true, maxlength: 200},
    {label: '控股股东/实际控制人num证件类型', id: 'selSerChanlNo', type: 'select', options: lglerCertTypeOption, required: true},
    {label: '控股股东/实际控制人num证件号码', id: 'addTxFlag', type: 'cardCodeInput', required: true, rulePre: 'selSerChanlNo', rulePre1: 'studyCollge', maxlength: 30},
    {label: '控股股东/实际控制人num证件生效日', id: 'certEffDt', type: 'date', required: true, max: dateLimit()},
    {label: '控股股东/实际控制人num证件到期日', id: 'updateInsts', type: 'date1', required: true, rulePre: 'certEffDt', min: dateLimit()},
    {label: '控股股东/实际控制人num联系电话（区号+电话）', id: 'thhappSerTellerNo', inputId1: 'telAreaNo', inputId2: 'appSerTellerNo', type: 'telInput', required: true, maxlength1: 4, maxlength2: 11 },
    {label: '控股股东/实际控制人num国籍', id: 'nationCode', type: 'select', options: [], required: true},
    {label: '控股股东/实际控制人num联系地址', id: 'acctChara', type: 'input', required: true, maxlength: 200},
    {label: '控股股东/实际控制人', id: 'selSerChanlNo1', type: 'hide', hide: true},
]

export const holdingInfo = {
    openbranch: '', // 控股股东/实际控制人分类
    psninfoMtpxTpCd: '', // 控股股东/实际控制人信息复用
    keyPerTpCd: '1', // 关键人员类型
    studyCollge: '', // 控股股东/实际控制人姓名
    selSerChanlNo: '', // 控股股东/实际控制人证件类型
    addTxFlag: '', // 控股股东/实际控制人证件号码
    certEffDt: '', // 控股股东/实际控制人证件生效日
    updateInsts: '', // 控股股东/实际控制人证件到期日
    telAreaNo: '', // 控股股东/实际控制人联系电话（区号）
    appSerTellerNo: '', // 控股股东/实际控制人联系电话（电话）
    nationCode: '', // 控股股东/实际控制人国籍
    acctChara: '', // 控股股东/实际控制人联系地址
    selSerChanlNo1: '' // 联网核查
}

// 关联自然人
export const personFormList = [
    {label: '关联自然人num性质', id: 'naturalAttrType', type: 'select', options: naturalAttrType, required: true},
    {label: '关联自然人num信息复用', id: 'rnboerInfoMtpxTpCd', options: [], type: 'select'},
    {label: '关联自然人num持股比例（%）', id: 'shrHoldRatio', type: 'input3to2', required: true, hide: true},
    {label: '', id: 'empty1', type: 'empty'},
    {label: '关联自然人num证件类型', id: 'naturalCertType', type: 'select', options: lglerCertType, required: true},
    {label: '关联自然人num证件号码', id: 'naturalCertNo', type: 'cardCodeInput', required: true, rulePre: 'naturalCertType', rulePre1: 'naturalName', maxlength: 30},
    {label: '关联自然人num姓名', id: 'naturalName', type: 'input', required: true, maxlength: 100},
    {label: '关联自然人num联系地址', id: 'naturalAddress', type: 'input', required: true, maxlength: 200},
    {label: '关联自然人num证件生效日', id: 'certEffDt', type: 'date', required: true, max: dateLimit(), dateValue: ''},
    {label: '关联自然人num证件到期日', id: 'naturalLastDate', type: 'date1', required: true, rulePre: 'certEffDt', min: dateLimit()},
    {label: '关联自然人num国籍', id: 'nationCode', type: 'select', options: [], required: true},
    {label: '关联自然人num联系电话（区号+号码）', id: 'thhappSerTellerNo', inputId1: 'telAreaNo', inputId2: 'appSerTellerNo', type: 'telInput', required: true, maxlength1: 4, maxlength2: 11 },
    {label: '关联自然人', id: 'naturalCertType1', type: 'hide', hide: true},
]

export const personInfo = {
    naturalAttrType: '',
    rnboerInfoMtpxTpCd: '',
    shrHoldRatio: '',
    naturalName: '',
    naturalCertType: '',
    naturalCertNo: '',
    certEffDt: '',
    naturalLastDate: '',
    telAreaNo: '',
    appSerTellerNo: '',
    nationCode: '',
    naturalAddress: '',
    naturalCertType1: '' // 联网核查
}

// 受益所有人
export const earningsFormList = [
    {label: '受益所有人num性质', id: 'nature', type: 'select', options: naturalAttrType, required: true},
    {label: '受益所有人num信息复用', id: 'rnboerInfoMtpxTpCd', options: [], type: 'select'},
    {label: '受益所有人num证件类型', id: 'selSerChanlNo', type: 'select', options: lglerCertType, required: true},
    {label: '受益所有人num证件号码', id: 'appSerTellerNo', type: 'cardCodeInput', required: true, rulePre: 'selSerChanlNo', rulePre1: 'studyCollge', maxlength: 30},
    {label: '受益所有人num姓名', id: 'studyCollge', type: 'input', required: true, maxlength: 100},
    {label: '受益所有人num证件生效日', id: 'certEffDt', type: 'date', required: true, max: dateLimit()},
    {label: '受益所有人num证件到期日', id: 'updateInsts', type: 'date1', required: true, rulePre: 'certEffDt', min: dateLimit()},
    {label: '受益所有人num联系电话（区号+号码）', id: 'thhappSerTellerNo', inputId1: 'telAreaNo', inputId2: 'earningCertNo', type: 'telInput', required: true, maxlength1: 4, maxlength2: 11 },
    {label: '受益所有人num国籍', id: 'nationCode', type: 'select', options: [], required: true},
    {label: '受益所有人num联系地址', id: 'acctChara', type: 'input', required: true, maxlength: 200},
    {label: '受益所有人', id: 'selSerChanlNo1', type: 'hide', hide: true},
]

export const earningsInfo = {
    nature: '',
    rnboerInfoMtpxTpCd: '',
    studyCollge: '',
    selSerChanlNo: '',
    appSerTellerNo: '',
    certEffDt: '',
    updateInsts: '',
    telAreaNo: '',
    earningCertNo: '',
    nationCode: '',
    acctChara: '',
    selSerChanlNo1: '' // 联网核查
}

export const dateObj = {
    long: '99991231',
    infinite: '00000000'
}

export const personChooseCol = [
    {
        title: "序号",
        slot: "serial",
    },{
        title: "用户编号",
        key: "tellerNo"
    },{
        title: "用户姓名",
        key: "tellerName"
    },{
        title: "用户角色",
        key: "roleName"
    },{
        title: "机构名称",
        key: "instSname"
    },{
        title: "操作",
        slot: "action",
    },
]
//附件信息中验证企业主及相关人员信息中的字段
export const EnterpreneurInfoValidObj = [
    {
      key:"corpManagePersonCateg",
      value:"管理人类型"
    },
    {
      key:"lglPersName",
      value:"管理人姓名"
    },
    {
      key:"lglPersCertNo",
      value:"管理人证件号码"
    },
    {
      key:"lglerCertDueDate",
      value:"管理人证件到期日"
    },
    {
      key:"dmstTelAreaNo",
      value:"管理人联系电话（区号）"
    },
    {
      key:"lglerContTel",
      value:"管理人联系电话（号码）"
    },
    {
      key:"lglerAreaCountyAddr",
      value:"管理人县/区"
    },
    {
      key:"lglerSpecificAddr",
      value:"管理人联系地址"
    },
    {
      key:"finRepPersName",
      value:"财务负责人姓名"
    },
    {
      key:"finRepPersCertType",
      value:"财务负责人证件类型"
    },
    {
      key:"finRepPersCertNo",
      value:"财务负责人证件号码"
    },
    {
      key:"finRepPersCertDueDate",
      value:"财务负责人证件到期日"
    },
    {
      key:"agtPersTelAreaNo",
      value:"财务负责人联系电话（区号）"
    },
    {
      key:"finRepPersContTel",
      value:"财务负责人联系电话（号码）"
    },
    {
      key:"finRepPersNationCode",
      value:"财务负责人国籍"
    },
    {
      key:"finRepPersAreaCountyName",
      value:"财务负责人县/区"
    },
    {
      key:"finRepPersSpecificAddr",
      value:"财务负责人联系地址"
    },
    {
      key:"companyAttr",
      value:"单位性质"
    },
  ];

  export const EasyLoan = [
    { name: '综合营销明细', value: 'MarketSubsidiary', isShow: true },
    { name: '企业基本信息', value: 'BasicInfo', isShow: true },
    { name: '企业主及相关人员信息', value: 'EnterpreneurInfo', isShow: true },
    { name: '授权数据分析', value: 'DataAnalysis', isShow: true },
    { name: '资质信息', value: 'CertificationInfo', isShow: true },
    { name: '负面信息', value: 'NegativeInfo', isShow: true },
    { name: '联网核查', value: 'CheckingOnline', isShow: true },
    { name: '征信信息', value: 'CreditInfo', isShow: true },
    { name: '抵质押保证信息', value: 'PledgeInfo', isShow: true },
    { name: '客户评价', value: 'CustomerEvalution', isShow: true },
    { name: '生成报告', value: 'GenerateReport', isShow: true },
    // {name: '免填单', value: 'NoPaperWork'},
  ];
  export const EasyLoanWithCRM = [
    { name: '企业基本信息', value: 'BasicInfo', isShow: true },
    { name: '账户基本信息', value: 'AccountInfo', isShow: true },
    { name: '企业主及相关人员信息', value: 'EnterpreneurInfo', isShow: true },
    { name: '账户服务开通/产品签约', value: 'AccountServiceActivation', isShow: true },
    { name: '综合营销明细', value: 'MarketSubsidiary', isShow: true },
    { name: '授权数据分析', value: 'DataAnalysis', isShow: true },
    { name: '资质信息', value: 'CertificationInfo', isShow: true },
    { name: '负面信息', value: 'NegativeInfo', isShow: true },
    { name: '风险特征识别', value: 'RiskFeatureIdentification', isShow: true },
    { name: '联网核查', value: 'CheckingOnline', isShow: true },
    { name: '征信信息', value: 'CreditInfo', isShow: true },
    { name: '抵质押保证信息', value: 'PledgeInfo', isShow: true },
    { name: '客户评价', value: 'CustomerEvalution', isShow: true },
    { name: '对公开户尽职调查结论', value: 'DueDiligenceConclusion', isShow: true },
    { name: '附件信息', value: 'AttachmentInformation', isShow: true },
    { name: '生成报告', value: 'GenerateReport', isShow: true },
  ];
  export const Normal = [
    { name: '综合营销明细', value: 'MarketSubsidiary', isShow: true },
    { name: '企业基本信息', value: 'BasicInfo', isShow: true },
    { name: '企业主及相关人员信息', value: 'EnterpreneurInfo', isShow: true },
    { name: '授权数据分析', value: 'DataAnalysis', isShow: true },
    { name: '无还本续贷', value: 'NonRepayPrinAndReneLoan', isShow: true },
    { name: '资质信息', value: 'CertificationInfo', isShow: true },
    { name: '负面信息', value: 'NegativeInfo', isShow: true },
    { name: '行内数据引入', value: 'BankDataImport', isShow: true },
    { name: '征信信息', value: 'CreditInfo', isShow: true },
    { name: '经营及财务信息', value: 'BusinessInfo', isShow: true },
    { name: '抵质押保证信息', value: 'PledgeInfo', isShow: true },
    { name: '授信用途', value: 'CreditPurpose', isShow: true },
    { name: '其他信息', value: 'OtherInfo', isShow: true },
    { name: '生成报告', value: 'GenerateReport', isShow: true },
    // {name: '免填单', value: 'NoPaperWork'},
  ];
  export const NormalWithCRM = [
    { name: '企业基本信息', value: 'BasicInfo', isShow: true },
    { name: '账户基本信息', value: 'AccountInfo', isShow: true },
    { name: '企业主及相关人员信息', value: 'EnterpreneurInfo', isShow: true },
    { name: '账户服务开通/产品签约', value: 'AccountServiceActivation', isShow: true },
    { name: '综合营销明细', value: 'MarketSubsidiary', isShow: true },
    { name: '授权数据分析', value: 'DataAnalysis', isShow: true },
    { name: '无还本续贷', value: 'NonRepayPrinAndReneLoan', isShow: true },
    { name: '资质信息', value: 'CertificationInfo', isShow: true },
    { name: '负面信息', value: 'NegativeInfo', isShow: true },
    { name: '风险特征识别', value: 'RiskFeatureIdentification', isShow: true },
    { name: '联网核查', value: 'CheckingOnline', isShow: true },
    { name: '行内数据引入', value: 'BankDataImport', isShow: true },
    { name: '征信信息', value: 'CreditInfo', isShow: true },
    { name: '经营及财务信息', value: 'BusinessInfo', isShow: true },
    { name: '抵质押保证信息', value: 'PledgeInfo', isShow: true },
    { name: '对公开户尽职调查结论', value: 'DueDiligenceConclusion', isShow: true },
    { name: '附件信息', value: 'AttachmentInformation', isShow: true },
    { name: '授信用途', value: 'CreditPurpose', isShow: true },
    { name: '其他信息', value: 'OtherInfo', isShow: true },
    { name: '生成报告', value: 'GenerateReport', isShow: true },

    // {name: '免填单', value: 'NoPaperWork'},
  ]