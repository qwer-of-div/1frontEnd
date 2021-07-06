/**
 * @return {delRepeat} 数组去重
 * @return {listRepeat} 数组对象的去重、获取重复name
 * @return {pwdStrength} 密码强度
 */

/**
* 数组去重 数组对象无法去重
* @param {Array} arr 数组
* @return {Array} 去重后的数组
*/
export const delRepeat = (arr) => {
  return Array.from(new Set(arr))
}

/**
 * 数组对象的去重、获取重复name
 * @param {Array} list // 筛选的数组
 */
export const listRepeat = (list) => {
  const obj = {}
  const tempList = []
  for (const item of list) {
    if (obj[item.id] !== item.label) {
      tempList.push(item)
      obj[item.id] = item.label
    }
  }
  return tempList
}
