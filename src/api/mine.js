import axios from './config'

// 支付接口
export const postpayConfirm = (params) => {
  return axios.post('Buy/confirm', params)
}

// 会员相关接口 如下
export const getOrderList = (params) => {
  return axios.post('Mine/order_list', params)
}
export const getCompany = (params) => {
  return axios.post('Company/info', params)
}
export const getAbout = (params) => {
  return axios.post('Company/about', params)
}

export const getMyCourse = (params) => {
  return axios.post('Mine/course_lists', params)
}
export const getMyView = (params) => {
  return axios.post('Mine/course_visit', params)
}
export const getMyAddress = (params) => {
  return axios.post('Mine/addr_list', params)
}
export const getProvinceList = (params) => {
  return axios.post('District/provinceList', params)
}
export const getCityList = (params) => {
  return axios.post('District/cityList', params)
}
export const getCountyList = (params) => {
  return axios.post('District/countyList', params)
}
// 地址新增
export const addMyAddress = (params) => {
  return axios.post('Mine/add_Addr', params)
}
