import axios from './config'

export const getBanner = (params) => {
  return axios.post('Home/banner', params)
}

export const getHomeList = (params) => {
  return axios.post('Home/lists', params)
}

export const getHomeLinks = (params) => {
  return axios.post('Home/links', params)
}
