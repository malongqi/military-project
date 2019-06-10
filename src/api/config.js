import axios from 'axios'
const instance = axios.create({
  baseURL: '/',
  client: 'pc-h5',
  token: ''
});

export default instance