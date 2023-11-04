export const nameOptions = [
  { id: '', label: '请选择' }
]

export const formList = [
  { id: 'name', label: '姓名', type: 'input', options: nameOptions, required: true, hide: true, disabled: true }
]

// type non取反
export const filterDic = (list, filterList, type) => {
  let res = []
  if (type === 'non') {
    res = list.filter(item => !filterList.includes(item.id))
  } else {
    res = list.filter(item => filterList.includes(item.id))
  }
  return JSON.parse(JSON.stringify(res))
}


