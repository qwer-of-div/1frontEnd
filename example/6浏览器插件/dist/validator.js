import { Utils, CheckUtils } from '@/assets/js/common.js'

// 手机
export const telValidator = (item, form) => {
    const validator = (rule, value, callback) => {
      const re = new RegExp("^0[0-9]{2,3}$");
      let str = ''
      if (Utils.checkNull(form[item.inputId2])) {
        str = '请输入11位手机号 或 区号(3-4位)+电话(6-8位)'
      } else if (form[item.inputId1].length && !re.test(form[item.inputId1])) {
        str = '区号格式错误'
      } else if (!Utils.checkNull(form[item.inputId1])) {
        const reg = new RegExp(/^\d{6,8}$/);
        if (!reg.test(form[item.inputId2])) {
          str = '请输入11位手机号 或 区号(3-4位)+电话(6-8位)'
        }
      } else if (Utils.checkNull(form[item.inputId1]) && !CheckUtils.mobileCheck(form[item.inputId2])) {
        str = '请输入11位手机号 或 区号(3-4位)+电话(6-8位)'
      }

      if(str) {
        callback(new Error(str))
      } else {
        callback()
      }
    }
    return {
      validator,
      trigger: 'blur'
    }
  }

// 人员姓名
export const nameValidator = () => {
    const validator = (rule, value, callback) => {
      const re = new RegExp(/^\D*$/)
      if (Utils.checkNull(value)) {
        callback(new Error('不允许为空'))
      } else if (!re.test(value)) {
        callback(new Error('姓名不能包含数字！'))
      }else {
        callback()
      }
    }
    return {
      validator,
      trigger: 'blur'
    }
  }

// 人员证件
export const cardTypeValidator = (item, form) => {
    const validator = (rule, value, callback) => {
      let str = ''
      if (Utils.checkNull(value)) {
        str = '不允许为空'
      } else if(["10", "11", "40", "20", "30"].includes(form[item.rulePre])) {
        const re = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if(value.length < 15 || value.length > 18 || !re.test(value)) {
          str = '证件号码不合法，请重新输入！'
        } else {
          let cardNum = "";
          cardNum = value.substring(6, 14);
          const nowDate = new Date();
          const month = nowDate.getMonth() + 1;
          const day = nowDate.getDate();
          let age = nowDate.getFullYear() - parseInt(cardNum.substring(0, 4)) - 1;
          if (parseInt(cardNum.substring(4,6)) < month || (parseInt(cardNum.substring(4,6)) === month && parseInt(cardNum.substring(6,8)) <= day)) {
            age++;
          }
          if (age < 16) {
            const replaceStr = item.label.includes('num证件号码') ? 'num证件号码' : '证件号码'
            str = item.label.replace(replaceStr, '需年满16周岁!')
          }
        }
      } else if(form[item.rulePre] === "60") {
        const re = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
        if(!re.test(value)) {
          str = '港澳通行证不合法，请重新输入！'
        }
      } else if (form[item.rulePre] === "61") {
        const re = new RegExp(/^[0-9]{8}$/);
        if (!re.test(value)) {
          str = '台湾居民来往大陆通行证必须为8位数字！'
        }
      } else if(form[item.rulePre] === "63") {
        const re = /^(^(810000|820000)[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if(value.length > 18 || !re.test(value)) {
          str = '港澳居民居住证不合法，请重新输入！'
        }
      } else if(form[item.rulePre] == "64") {
        const re = /^(^830000[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if(value.length > 18 || !re.test(value)) {
          str = '台湾居民居住证不合法，请重新输入！'
        }
      } else if(form[item.rulePre] == "70") {
        const re = new RegExp(/^[A-Z]{3}([0-9]{3}|[0-9]{15})$/);
        if(!re.test(value)) {
          str = '外国人永久居留证不合法，请重新输入！'
        }
      } else if( ["21", "22", "23", "24", "25", "31", "32", "33", "34", "35"].includes(form[item.rulePre])) {
        const re = new RegExp(/^[\u4E00-\u9FA5][\u4E00-\u9FA5A-Za-z0-9]{2,}$/);
        if(!re.test(value)) {
          str = '证件号码不合法，请重新输入！'
        }
      }
      
      if(str) {
        callback(new Error(str))
      } else {
        callback()
      }
    }
    return {
      validator,
      trigger: 'blur'
    }
  }

// 证件生效日
export const startDateValidator = () => {
    const validator = (rule, value, callback) => {
      let str = ''
      const re = new RegExp(/^[0-9]{8}$/)
      const nowDate = new Date()
      const year = nowDate.getFullYear()
      const month = nowDate.getMonth() + 1
      const day = nowDate.getDate()
      const nowDay = '' + year + month + day
      if (Utils.checkNull(value)) {
        str = '不允许为空'
      } else if (!re.test(value)) {
        str = '证件生效日应为8位数字'
      } else if (value !== '99991231' && value > nowDay) {
        str = "证件生效日不得晚于当前日期"
      }

      if(str) {
        callback(new Error(str))
      } else {
        callback()
      }
    }
    return {
      validator,
      trigger: 'blur'
    }
  }

// 证件到期日
export const endDateValidator = (item, form) => {
  const validator = (rule, value, callback) => {
    let str = ''
    const re = new RegExp(/^[0-9]{8}$/)
    const nowDate = new Date()
    const year = nowDate.getFullYear()
    let month = nowDate.getMonth() + 1
    let day = nowDate.getDate()
    if(month < 10) month = '0' + month
    if(day < 10) day = '0' + day
    const nowDay = '' + year + month + day
    if (Utils.checkNull(value)) {
      str = '不允许为空'
    } else if (!re.test(value)) {
      str = '证件到期日应为8位数字'
    } else if (value !== '00000000' && value < nowDay) {
      str = "证件到期日不得早于当前日期"
    } else if (!["99991231", '00000000'].includes(value) && re.test(form[item.rulePre]) && Number(value) < Number(form[item.rulePre])) {
      str = "证件到期日不得早于证件生效日"
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}

// 百分比
export const percentValidator = (item, form) => {
  const validator = (rule, value, callback) => {
    let str = ''
    const re = /(^[0-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/
    if (Utils.checkNull(value)) {
      str = '不允许为空'
    } else if (!re.test(value)) {
      str = '栏位的小数部分必须在 2位之内，整数部分必须在 3 位之内'
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}

// 账号后4位（客户自选）
export const accnoBehind4bitNoValidator = () => {
  const validator = (rule, value, callback) => {
    let str = ''
    const re = new RegExp(/^[0-9]{4}$/);
    if (Utils.checkNull(value)) {
      str = '不允许为空'
    } else if (!re.test(value)) {
      str = '请输入账号后4位，且全为数字'
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}

// 基本存款账户核准号/编号
export const basicaccOpenaccApvnoValidator = (item, form) => {
  const validator = (rule, value, callback) => {
    let str = ''
    const re = new RegExp(/^J[0-9]{13}$/);
    if(value) {
      if (Utils.checkNull(value)) {
        str = '不允许为空'
      } else if (!re.test(value)) {
        str = `${item.label}必须为14位，且由J+13位数字组成！`
      }
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}

// 存款用途
export const deptUsageValidator = (item, form) => {
  const validator = (rule, value, callback) => {
    let str = ''
    if (item.required && Utils.checkNull(value)) {
      str = '不允许为空'
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}

// 基本户开户行地区代码（人行）
export const basicaccValidator = (item, form) => {
  const validator = (rule, value, callback) => {
    let str = ''
    if (item.required && Utils.checkNull(value)) {
      str = '不允许为空'
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}

// 其他（尽职调查结论若有选择“否”的字段，请输入原因）
export const otherOpenSurveyValidator = (list, form) => {
  const validator = (rule, value, callback) => {
    let res = false
    for(const item of list) {
      if(form[item] === '0') {
        res = true
        break
      }
    }

    let str = ''
    if (res && Utils.checkNull(value)) {
      str = '不允许为空'
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}

// 国家 省市区
export const nationValidator = (item, form) => {
  const validator = (rule, value, callback) => {
    let str = ''
    if (form[item.rulePre] === 'CHN' && Utils.checkNull(value)) {
      str = '不允许为空'
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}

// 空 校验
export const emptyValidator = () => {
  const validator = (rule, value, callback) => {
    let str = ''
    if (!value || !(value && value.trim())) {
      str = '不允许为空'
    }

    if(str) {
      callback(new Error(str))
    } else {
      callback()
    }
  }
  return {
    validator,
    trigger: 'blur'
  }
}