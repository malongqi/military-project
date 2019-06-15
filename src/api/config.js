import axios from 'axios'
var md5 = require('md5')

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
  baseURL: '/',
});

instance.interceptors.request.use(config => {
  if(config.data) {
    let param = config.data
    config.data = {
      ...config.data,
      client: 'pc-h5',
      request_time: new Date().getTime(),
      api_sign: paramsEdit(param)
    }
  }
  return config
})
export default instance