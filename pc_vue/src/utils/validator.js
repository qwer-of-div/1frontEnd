/**
 * 校验
 *
 * 是否必输、字段长度、数字、汉字、英文、特殊字符
 * 合理性：数据来源正确、数据写入正确、数据进出范围一致（员工—>如何确定为员工）
 *
 * @return {isEmpty} 字符串为空验证
 * @return {isNotEmpty} 字符串非空验证 validator1
 * @return {isId} 身份证校验、生日、性别提取
 * @return {isPhone} 手机号验证
 * @return {isEmail} 邮箱验证
 * @return {isAdult} 是成年人
 * @return {isIndate} 证件有效期内
 * @return {isChinese} 是否中、英文 validator1
 * @return {isAddress} 详细地址验证
 * @return {pwdStrength} 密码强度
 */

export default {
  /**
   * trim修饰符对后端传过来的值无效
   * 字符串非空验证 后台返的值前后不能有空格
   * @param {String} str 字符串
   */
  isEmpty (str) {
    if (str == null || str.trim() === '') return true
  },
  /**
   * trim修饰符对后端传过来的值无效
   * 字符串非空验证 后台返的值前后不能有空格
   * @param {String} str 字符串
   */
  isNotEmpty: (str) => {
    if (!str.trim().length) return { flag: false, label: '不能为空' }
    if (str.trim() !== str) return { flag: false, label: '首尾不能为空' }
    return { flag: true }
  },
  /**
   * 身份证校验
   * @param {String} id 身份证号
   */
  isId: function (id) {
    const emptyFlag = this.isNotEmpty(id)
    if (!emptyFlag.flag) return { flag: emptyFlag.flag, label: `身份证${emptyFlag.label}` }
    if (![15, 18].includes(id.length)) return { flag: false, label: '身份证位数不符合' }
    const city = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北 ', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏 ', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }
    const birth = id.substr(6, 4) + '/' + Number(id.substr(10, 2)) + '/' + Number(id.substr(12, 2))
    // const birthdayFormat = birth.replace(/\//g, '-0000').replace(/-[\d]+([\d]{2})/g, '-$1') // new YYYY-MM-DD
    // const birthdayFormat = birth.replace(/\//g, '-0000').replace(/-[\d]+([\d]{2})/g, '+$1') // new YYYY-MM-DD
    const birthday = birth.replace(/\//g, '++')
    const d = new Date(birth)
    const currentTime = new Date().getTime()
    const time = d.getTime()
    const arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 加权因子
    const arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验位
    const arrCh2 = ['1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2'] // 校验位
    let sum = 0
    const sex = (Number(id.substr(16, 1)) % 2) === 0 ? 1 : 0
    const sexName = ['男', '女'][sex] // 0.男，1.女
    if (!/^\d{17}(\d|x|X)$/.test(id)) return { flag: false, label: '身份证格式有误' }
    if (city[id.substr(0, 2)] === undefined) return { flag: false, label: '身份证地址编码有误' }
    if (time >= currentTime) return { flag: false, label: '身份证出生日期有误' }
    for (let i = 0; i < 17; i++) {
      sum += id.substr(i, 1) * arrInt[i]
    }
    const residue = arrCh[sum % 11]
    const residue2 = arrCh2[sum % 11]
    if (residue === id.substr(17, 1) || residue2 === id.substr(17, 1)) {
      return {
        flag: true,
        sex: sex + '',
        sexName,
        birth,
        birthday
      }
    }
    return { flag: false, label: '身份证格式有误' }
  },
  /**
   * 手机号验证
   * @param {String} phone
   */
  isPhone: function (phone) {
    const emptyFlag = this.isNotEmpty(phone)
    if (!emptyFlag.flag) return { flag: emptyFlag.flag, label: `手机号${emptyFlag.label}` }
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (!reg.test(phone)) return { flag: false, label: '手机号格式有误' }
    return { flag: true }
  },
  /**
   * 邮箱验证
   * @param {String} email
   */
  isEmail: function (email) {
    const emptyFlag = this.isNotEmpty(email)
    if (!emptyFlag.flag) return { flag: emptyFlag.flag, label: `邮箱${emptyFlag.label}` }
    const regx = /^([a-zA-Z\d])((\w|-)+\.?)+@([a-zA-Z\d]+\.)+[a-zA-Z]{2,6}$/
    if (!regx.test(email)) return { flag: false, label: '邮箱格式有误' }
    return { flag: true }
  },
  /**
 *  是成年人
 * @param {DateStr} birth 出生日期
 */
  isAdult: function (birth) {
    const emptyFlag = this.isNotEmpty(birth)
    if (!emptyFlag.flag) return { flag: emptyFlag.flag, label: `出生日期${emptyFlag.label}` }
    const birthday = new Date(birth.replace(/-/g, '/'))
    // const birthday = new Date(birth)
    const today = new Date()
    const age = today.getFullYear() - birthday.getFullYear() - ((today.getMonth() < birthday.getMonth() || (today.getMonth() === birthday.getMonth() && today.getDate() < birthday.getDate())) ? 1 : 0)
    if (age < 18) return { flag: false, label: '未成年' }
    return { flag: true }
  },
  /**
 *  证件有效期内
 * @param {DateStr} date 证件有效期止
 */
  isIndate: function (date) {
    if (!date) return { flag: false, label: '不能为空' }
    if (new Date(date.replace(/-/g, '/')) < new Date()) return { flag: false, label: '未在有效期内' }
    return { flag: true }
  },
  /**
   * 是否中、英文
   * @param {String} type english英文 chinese中文 engChinese中文和英文
   * @param {String} str 被验证字符串
   */
  isChinese: function (str, type = 'chinese') {
    const emptyFlag = this.isNotEmpty(str)
    if (!emptyFlag.flag) return { flag: emptyFlag.flag, label: `${emptyFlag.label}` }
    let regx = /^[\u4e00-\u9fa5]+$/ // 以什么开头、个数、以什么结尾
    let label = '只能为中文'
    if (type === 'english') {
      regx = /^[a-zA-Z]+$/
      label = '只能为英文'
    } else if (type === 'engChinese') {
      regx = /^[a-zA-Z\u4e00-\u9fa5]+$/
      label = '只能为中文和英文'
    }
    if (!regx.test(str)) return { flag: false, label }
    return { flag: true }
  },
  /**
   * 校验 详细地址
   * 1.详细地址不能为空
   * 2.详细地址不能小于3个字符
   * 3.详细地址长度超出40
   * 4.详细地址格式不正确，请重新输入
   * 5.通讯地址不能为特殊字符
   * @param {String} address
   */
  isAddress: function (address) {
    const emptyFlag = this.isNotEmpty(address)
    if (!emptyFlag.flag) return { flag: emptyFlag.flag, label: `详细地址${emptyFlag.label}` }
    // 通讯地址长度小于3个字符!
    if (address.length < 3) return { flag: false, label: '详细地址不能小于3个字符' }
    // 通讯地址长度超出40!
    if (address.length > 40) return { flag: false, label: '详细地址不能超出40个字符' }
    // 通讯地址不能为特殊字符
    var regx = /^[a-zA-Z0-9\u4e00-\u9fa5-]+$/ // 特殊字符
    if (!regx.test(address)) return { flag: false, label: '详细地址格式有误' }
    return { flag: true }
  },
  /**
* 密码强度
* @param {Array} arr 数组
* @return {Number} 0无效 1弱 2中 3强 4更强
*/
  pwdStrength: function (password) {
    const emptyFlag = this.isNotEmpty(password)
    if (!emptyFlag.flag) return { flag: emptyFlag.flag, label: `密码${emptyFlag.label}` }
    let mode = 0
    if (password.length < 6 || password.length > 20) return { flag: false, strength: 0, label: '密码格式有误' } // 密码太短、太长
    for (let i = 0; i < password.length; i++) {
      const pwdCode = password.charCodeAt(i)
      // 测试每一个字符的类别并统计一共有多少种模式.
      if (pwdCode >= 48 && pwdCode <= 57) { // 数字
        mode |= 1
      } else if (pwdCode >= 65 && pwdCode <= 90) { // 大写字母
        mode |= 2
      } else if (pwdCode >= 97 && pwdCode <= 122) { // 小写
        mode |= 4
      } else { mode |= 8 } // 特殊字符
    }

    let strength = 0
    for (let j = 0; j < 4; j++) {
      if (mode & 1) strength++
      mode >>>= 1
    }
    return { flag: true, strength }
  }
}
