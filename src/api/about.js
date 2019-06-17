import axios from './config'

export const getSortType = (params) => {
  return axios.post('Course/cat_sort', params)
}