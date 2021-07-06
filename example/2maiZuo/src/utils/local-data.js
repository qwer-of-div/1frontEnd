export const getCityId = () => {
  let cityId = localStorage.getItem('cityId')
  return cityId || ''
}

export const setCityId = (val) => {
  return localStorage.setItem('cityId', val)
}

export const getCityName = () => {
  let cityName = localStorage.getItem('cityName')
  return cityName || ''
}

export const setCityName = (val) => {
  return localStorage.setItem('cityName', val)
}

export const setToken = (val) => {
  return localStorage.setItem('userToken', val)
}

export const getToken = () => {
  let userToken = localStorage.getItem('userToken')
  return userToken || ''
}
