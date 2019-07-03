import store from './../store.js'
import axios from 'axios'
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
// let token = getCookie('user')
// debugger
const instance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  transformRequest:[function(data){
    let Params = {
      ...data,
      client: 'pc-h5',
      request_time: new Date().getTime(),
      api_sign: paramsEdit(Params)
    }

    let formData = new FormData()
    if (data) {
      for (let key in Params) {
        formData.append(key, Params[key])
      }
    }
    return formData
  }]
})
// instance.interceptors.request.use(config => {
  
// })
export default instance