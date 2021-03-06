import store from './../store.js'
import axios from 'axios'
import router from './..//router'
import { Message } from 'element-ui';
var md5 = require('md5')
import VueCookies from 'vue-cookies'
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
    store.commit('setUser', VueCookies.get('user'))
    let Params = {
      ...data,
      token: VueCookies.get('token'),
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
  // console.log(store.state.user)
  res.config.url = res.config.url + '?t=' + new Date().getTime()
  if (res.data.code == 1001) {
    router.push({path: 'login'})
    VueCookies.remove('token')
    VueCookies.remove('user')
    store.commit('setUser', {})
    Message({
      message: '登录信息已失效请登录',
      type: 'error'
    })
  } 
  if (res.data.code == 1002) {
    store.commit('handleLoad', false)
  } 
  // else if (res.data.code != 0 && res.data.msg !== '订单未支付成功'){
  //   Message({
  //     message: res.data.msg,
  //     type: 'error'
  //   })
  // }
  return res
})
export default instance