import axios from './config'

// 支付接口
// 微信支付
export const postWxpay = (params) => {
  return axios.post('WxPay/pay', params)
}
// 支付宝支付
export const postAlipay = (params) => {
  return axios.post('Alipay/pay', params)
}
export const checkWxPay = (params) => {
  return axios.post('WxPay/check_order', params)
}
// 会员相关接口 如下
export const getOrderList = (params) => {
  return axios.post('Mine/order_list', params)
}
export const deleteOrder = (params) => {
  return axios.post('Order/detail', params)
}
export const getOrderDetail = (params) => {
  return axios.post('Order/detail', params)
}
export const getCompany = (params) => {
  return axios.post('Company/info', params)
}
export const getDetail = (params) => {
  return axios.post('Company/detail', params)
}

export const getMyCourse = (params) => {
  return axios.post('Mine/course_lists', params)
}
export const getMyView = (params) => {
  return axios.post('Mine/course_visit', params)
}
export const getMyAddress = (params) => {
  return axios.post('Addr/addr_list', params)
}
export const addMyAddress = (params) => {
  return axios.post('Addr/add_Addr', params)
}
export const editMyAddress = (params) => {
  return axios.post('Addr/modify_Addr', params)
}
export const deletMyAddress = (params) => {
  return axios.post('Addr/delete_Addr', params)
}
export const getDefaultAddr = () => {
  return axios.post('Addr/default_addr')
}
export const getUser = (params) => {
  return axios.post('User/info', params)
}
export const modifyUser = (params) => {
  return axios.post('User/modify', params)
}
export const modifyPwd = (params) => {
  return axios.post('User/modify_pwd', params)
}
export const forgetPwd = (params) => {
  return axios.post('User/forget_pwd', params)
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
export const buyInfor = (params) => {
  return axios.post('Buy/info', params)
}

export const goToPay = (params) => {
  return axios.post('Pay/rebuy', params)
}
