import axios from './config'

export const getSortType = (params) => {
  return axios.post('Course/cat_sort', params)
}
export const getbooks = (params) => {
  return axios.post('Book/lists', params)
}
export const getBookDetail = (params) => {
  return axios.post('Book/detail', params)
}

