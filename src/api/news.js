import axios from './config'

export const getSortType = (params) => {
  return axios.post('News/cat_sort', params)
}
export const getNewsList = (params) => {
  return axios.post('News/lists', params)
}

export const getNewsDetail = (params) => {
  return axios.post('News/detail', params)
}
