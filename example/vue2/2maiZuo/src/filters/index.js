export const operateActors = (arr) => {
  if (!arr) return ''
  let str = ''
  arr.forEach(item => {
    str += item.name + ' '
  })
  return str
}
export const dateFormat = (originVal) => { // 创建一个过滤器，把时间戳改为年月日
  const dt = new Date(originVal * 1000)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  // const hh = (dt.getHours() + '').padStart(2, '0')
  // const mm = (dt.getMinutes() + '').padStart(2, '0')
  // const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d}`
}

export const filmsTime = (num) => {
  let date = new Date(num * 1000)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  date = hours + ':' + minutes
  return date
}
