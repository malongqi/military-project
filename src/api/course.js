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
export const getCourseDown = (params) => {
  return axios.post('Down/down_url', params)
}
export const getPlay = (params) => {
  return axios.post('Play/url', params)
}
// 评论
export const getComments= (params) => {
  return axios.post('Comment/lists', params)
}

