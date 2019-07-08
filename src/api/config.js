import store from './../store.js'
import axios from 'axios'
import { Message } from 'element-ui';
var md5 = require('md5')
// import cookies from 'vue-cookies'
const paramsEdit = (params) => {
  let paramList = ''
  for (let key in params) {
    if ( params[key] !== '') {
      paramList += `&${key}=${encodeURI(params[key])}`
    }
  }
  let msg =  paramList.substring(1) + '_1Ftjv0bfpVmqbE38'
  return md5(msg)
}
const instance = axios.create({
  baseURL: '/Api',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  transformRequest:[function(data){
    let Params = {
      ...data,
      token: store.state.user ? store.state.user.token : '',
      client: 'pc-h5',
      request_time: new Date().getTime(),
      api_sign: paramsEdit(Params)
    }

    let formData = new FormData()
    for (let key in Params) {
      formData.append(key, Params[key])
    }
    return formData
  }]
})
instance.interceptors.response.use(res => {
  // 对响应数据做些什么
  //  1000 需要登录
  // 1001 token失效
  res.config.url = res.config.url + '?t=' + new Date().getTime()
  if (res.data.code == 1001) {
    store.commit('setLoginState', true)
    Message({
      message: '登录信息已失效请登录',
      type: 'error'
    })
  } else if (res.data.code != 0 && res.data.code != -1){
    Message({
      message: res.data.msg,
      type: 'error'
    })
  }
  return res
})
export default instance