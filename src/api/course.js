import axios from './config'

export const getSortType = (params) => {
  return axios.post('Course/cat_sort', params)
}
export const getCourses = (params) => {
  return axios.post('Course/lists', params)
}
export const getDetail = (params) => {
  return axios.post('Course/detail', params)
}

