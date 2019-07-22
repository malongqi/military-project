import axios from './config'

export const register = (params, config) => {
  return axios.post('User/register_mobile', params, config)
}

export const login = (params, config) => {
  return axios.post('User/login_mobile', params, config)
}

export const getCode = (params, config) => {
  return axios.post('User/verifyCode', params, config)
}
export const modifyMobile = (params, config) => {
  return axios.post('User/modify_mobile', params, config)
}
