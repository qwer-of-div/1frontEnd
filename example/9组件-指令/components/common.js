/**
 author: CHR
 data: 2019 / 01 / 17
 Description: 公共查询方法 */
import {
  Widget
} from './Utils.js'
import NativeData from '@/assets/bridge/NativeData'
import NativeFile from '../bridge/NativeFile'
import {PostUrl} from './postUrl'
const PccLogic = {
}
const CheckUtils = {
  // 身份证校验
  idCardCheck (idNo) {
    var checkisNo = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
    return checkisNo.test(idNo)
  },
  mobileCheck (mobileNo) {
    var mobilephone = /^1\d{10}$/
    return mobilephone.test(mobileNo)
  }
}
const smallEntVideoUtils = {
  /** Description: [小企业视频上传方法]
   * @author created by Hengrui Cao at 2021/8/23 15:00, v1.0
   * let msg = {
        signType: 'xqy-1-1', // signType音频   xqy-1-1：额度借款合同   xqy-1-2：担保合同   xqy-1-3：支用单借款合同借据
        videoPath: '/storage/emulated/0/creditVideo/vidio.mp4', // videoPath路径
        currIsFront: true, // 设置前后摄像头  true-前置   false-后置
        recordDuration: 120 // 设置录像时间  单位（秒）
        custNo:'' // 客户编号
        contractNo:'' // 合同编号
       }
   */
  videoUpload: function (msg, cvuSuccess) {
    // 设置贷种，上传到文件服务器时候需要贷种这个参数
    NativeData.set('fileBusiType', 'xqy')
    NativeData.set('busiType', '320502')
    let busiData = {
      'fileNo': '2437f526eab051f0059d6d963681e3dd', //
      'busiType': msg.businessType, // 业务类型
      'approveStatus': msg.approveStatus, // 审批状态
      'busiNo': msg.contractNo,
      'batchId': Utils.getMathUUid(),
      custNo: msg.custNo,
      uploadFiles: '',
      uploadPaths: '',
      tails: ['mp4'], // 数组
      // fileType: ['050204'], // 影像标签-> 120101 管理类-企业基本信息-主体资料类;  050204 要件类-签约类
      fileType: ['410507'], // 影像标签-> 120101 管理类-企业基本信息-主体资料类;  050204 要件类-签约类 410507 签约放款类-其他 10月26号上线更改标签
      creditFileNo: msg.contractNo + 'mp4' + '888',
      // opeOrg: NativeData.get('tranBranch'),
      opeOrg: NativeData.get('tellerInst'),
      opeUser: NativeData.get('tellerCode')
    }
    NativeFile.uploadBigFile(msg.videoPath, busiData).then(success => {
      cvuSuccess(success)
    }).catch(error => {
      this.$Modal.confirm({
        title: '提示',
        content: '<p>视频上传失败，是否续传？</p>',
        onOk: () => {
          this.videoUpload(msg, cvuSuccess)
        },
        onCancel: () => {
          File.doDelete('creditVideo')
        }
      })
    })
  }
}
const Utils = {
  // 判断贷种 跳转页面
  checkLoansNum: function (str) {
    var flag = '0'
    // 三农-额度
    var SnLListOne = [
      'L30101010001',
      'L30101010002',
      'L30101010003',
      'L30101010004',
      'L30101010005',
      'L30101030001',
      'L30101030002',
      'L30101030003',
      'L30101030004',
      'L30101020001', // 商贷通抵质押额度
      'L30101020002',
      'L30101020003',
      'L30101020005'
    ]
    // 三农-流水贷 发票贷
    var SnLListTwo = [
      'L30101040002',
      'L30101040003'
    ]
    // 三农-额度下支用
    var SnPListOne = [
      'P30101010002', //	农贷通-信用
      'P30101010005', //	农贷通-其他
      'P30101010001', //	农贷通-抵质押
      'P30101010003', //	农贷通-保证
      'P30101030002', //	政贷通-扶贫小额贷款
      'P30101030003', //	政贷通-其他扶贫贷款
      'P30101030004', //	政贷通-其他政府平台类贷款
      'P30101030001', //	政贷通-再就业担保
      'P30101020002', //	商贷通-信用
      'P30101020003', //	商贷通-保证
      'P30101020005', //	商贷通-其他
      'P30101020001'//	商贷通-抵质押
    ]
    // 消费-单笔单批
    var XfPListOne = [
      'P30102020001',
      'P30102020004',
      'P30102010003',
      'P30102010004'
    ]
    // 消费-额度
    var XfPListTwo = [
      'L30102030002', // 个人信用消费贷款额度
      'L30102030003', // 个人综合消费贷款额度 2021-5-31 10:20:13 by zhangjian 之前与后台不符修改
      'L30102030011', // 优享贷（信用消费）额度 2021-5-31 10:20:13 by zhangjian 之前与后台不符修改
      'L30102030021'// 公积金信用消费贷款额度
    ]
    if (SnLListOne.indexOf(str) != -1) {
      flag = '1'
    }
    if (SnLListTwo.indexOf(str) != -1) {
      flag = '2'
    }
    if (SnPListOne.indexOf(str) != -1) {
      flag = '3'
    }
    if (XfPListOne.indexOf(str) != -1) {
      flag = '4'
    }
    if (XfPListTwo.indexOf(str) != -1) {
      flag = '5'
    }
    return flag
  },
  // 获取流水号
  getMathUUid: function (str) {
    let date = new Date()
    let year = date.getFullYear().toString()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let milliseconds = date.getMilliseconds()

    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    if (milliseconds < 10) {
      milliseconds = '00' + milliseconds
    } else if (milliseconds < 100) {
      milliseconds = '0' + milliseconds
    }

    if (!str) {
      // return NativeData.get('cltSeqNo') + year + month + day + hour + minutes + seconds + milliseconds
      return '' + year + month + day + hour + minutes + seconds + milliseconds
    } else {
      return '' + year + month + day + hour + minutes + seconds + milliseconds
    }
  },
  // 判断字符串是否为空
  checkNull (msg) {
    return typeof msg === 'undefined' || String(msg) === 'null' || JSON.stringify(msg).replace(/\s+/g, '') === '' || msg.length === 0 || JSON.stringify(msg) == '{}'
  },
  // 校验正整数
  checkNum (input) {
    let number = /^[0-9]*[1-9][0-9]*$/
    return number.test(input)
  },
  /** Description: [校验手机号格式]
   * @author created by Hengrui Cao at 2021/7/22 17:01, v1.0
   * @return 手机号格式不对返TRUE   正确返回FALSE
   */
  checkPhone (value) {
    let reg = /^1(3|4|5|6|7|8|9)\d{9}$/
    let b = value.match(reg)
    return !b
  },

  /**
   * @param type 合同类型
   * @param name 签署人姓名
   * @param identity 签署人身份
   * @returns {string}
   */
  getVideoFilePath: function (fileName) {
    return `/storage/emulated/0/3205/${Date.parse(new Date())}_${fileName}.mp4`
  },

  // 获取随机数 lowerValue（数字）开始值，upperValue（数字）结束值
  randomFrom (lowerValue, upperValue) {
    return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue)
  },
  // 金额格式化：将数字转为金额格式，保存时候记得，去掉逗号‘,’

  formatNumber2: function (number) {
    var num = number.replace(/,/g, '')
    var nb1 = '' // 小数点前面的值
    var nb2 = '' // 小数点后面的值
    if (num.indexOf('.') > -1) {
      var n = num.split('.')
      if (n.length === 2) {
        nb1 = n[0]
        nb2 = '.' + n[1]
      }
    } else {
      nb1 = num
    }
    var nb = nb1.match(/./g)
    var nc = nb.slice(0)
    for (let index = nb.length; index > 0; index--) {
      var a = nb.length - index
      if (a > 0 && a % 3 === 0) {
        nc.splice(index, 0, ',')
      }
    }
    var nd = nc.join('')
    return nd + nb2
  },
  // 金额格式化：将数字转为金额格式，保存时候记得，去掉逗号‘,’
  formatNumber: function (number) {
    return number.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',')
  },
  // 小写数字转大写金额：如‘123’转换后是‘壹贰叁’
  minConvertMax: function (num) {
    if (typeof (num) === 'undefined' || JSON.stringify(num) == 'null' || num == '') {
      return ''
    }
    var n = num + ''
    n = n.replace(/,/g, '')
    if (n !== '') {
      var fraction = ['角', '分']
      var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      var unit = [
        ['元', '万', '亿', '兆'],
        ['', '拾', '佰', '仟']
      ]
      var head = n < 0 ? '(负数)' : ''
      n = Math.abs(n)
      var s = ''
      for (var i = 0; i < fraction.length; i++) {
        if (i === 0) {
          s += (
            digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
          ).replace(/零./, '')
        } else {
          s += (
            digit[Math.floor(n * 10 * Math.pow(10, i) + 0.5) % 10] + fraction[i]
          ).replace(/零./, '')
        }
      }
      s = s || '整'
      n = Math.floor(n)
      for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = ''
        for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p
          n = Math.floor(n / 10)
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
      }
      return (
        head +
        s
          .replace(/(零.)*零元/, '元')
          .replace(/(零.)+/g, '零')
          .replace(/^整$/, '零元整')
      )
    }
  },
  // 格式化小数位数 position：保留的小数位数
  toFixed (mValue, position) {
    mValue = '' + mValue
    var value = mValue
    value === ''
      ? (value = '')
      : (value = Number(
        value.replace(/-/g, '').match('^\\d+(?:\\.\\d{0,' + position + '})?')
      ).toFixed(position))
    if (mValue.indexOf('-') > -1) {
      return '-' + value
    }
    return value
  },
  // 格式化金额  position：保留的小数位数
  toFixedMony (mValue, position) {
    var value = mValue + ''
    value === ''
      ? (value = '')
      : (value = Number(
        value.replace(/,/g, '').match('^\\d+(?:\\.\\d{0,' + position + '})?')
      ).toFixed(position))
    return this.formatNumber(value)
  },
  /**
   * 主要是校验一个对象里面的字段是不是存在空的情况
   * @param param
   * @returns {boolean}
   */
  objParamAllNull (param) {
    if (!param || typeof param === 'undefined' || Object.keys(param).length < 1) {
      return false
    }

    var a = ''
    return Object.values(param).every(item => item)
  },
  /**
   * * 将一个对象中所有的空对象转换成空字符，防止有些东西不显示,如果存在对象或者数组为null或者undefined的情况，不要使用
   * @param param
   * @param objList 对象集合[{}..]..
   * @param arrList 数组集合[[],[{}]..]..
   * @returns {boolean}true:转换成功 false转换失败
   */
  objSetParamStr (param, objList = [], arrList = []) {
    if (param && Object.keys(param).length > 0) {
      for (let key in param) {
        if (param[key] !== 0 && !param[key]) {
          param[key] = ''
        } else {
          if (param[key] instanceof Object) {
            objList.push(param[key])
          } else if (Array.isArray(param[key])) {
            arrList.push(param[key])
          }
        }
      }
    }
    this.forAll(objList, arrList)
    return param
  },
  arraySetParamStr (param, objList = [], arrList = []) {
    if (Array.isArray(param)) {
      param.forEach(item => {
        if (item !== 0 && !item) {
          item = ''
        } else {
          if (item instanceof Object) {
            objList.push(item)
          } else if (Array.isArray(item)) {
            arrList.push(item)
          }
        }
      })
    }
    this.forAll(objList, arrList)
    return param
  },
  forAll (objList, arrList) {
    objList.forEach((item) => {
      this.objSetParamStr(item)
    })

    arrList.forEach((item) => {
      this.arraySetParamStr(item)
    })
  },
  formatDate: function (date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
    return fmt
  },
  padLeftZero: function (str) {
    return ('00' + str).substr(str.length)
  },
}
const HttpUtils = {
  timeId: null, // number
  timer () {
    if (this.timeId !== null) {
      clearTimeout(this.timeId)
    }
    this.timeId = setTimeout(() => Widget.loadingHide(), 90000)
  },
  getHead (busCode, businessName) {
    return {
    }
  },
  postHttp: function (url, busCode, businessName, param, func, func2, isEncrypt) {
  },
  postHttpImg: function (url, busCode, businessName, param, func, func2, isEncrypt) {
  },
  postHttpNoLock: function (url, param, func, func2) {
  },
  /**
   * 此接口类似postHttp，请求电子签名的盖章用到
   */
  postAllHttpUrlHttp: function (url, param, func, func2) {
  },
  /**
   * 此接口类似postHttp，请求电子签名的盖章用到
   */
  postFileHttp: function (url, param, func, func2) {
  }
}

/**
* 防抖
*/
const debounce = function (fn, delay = 500) {
  let timer = null
  return function() {
    if(timer) clearTimeout(timer)
    timer = setTimeout( () => {
      timer = null
      fn.apply(this, arguments)
    }, delay)
  }
}

export {
  PccLogic,
  Utils,
  HttpUtils,
  CheckUtils,
  smallEntVideoUtils,
  debounce
}
