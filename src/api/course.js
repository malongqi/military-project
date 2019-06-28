import axios from './config'

export const getSortType = (params) => {
  return axios.post('Course/cat_sort', params)
}
export const getCourses = (params) => {
  return axios.post('Course/lists', params)
}
export const getCourseDetail = (params) => {
  return axios.post('Course/detail', params)
}
export const getCourseRecommend = (params) => {
  return axios.post('Course/recommend', params)
}

