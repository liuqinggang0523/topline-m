import axios from 'axios'

import jsonBigint from 'json-bigint'
const request = axios.created({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 处理失真大数字
request.defaults.transformResponse = [function (data) {
  return data ? jsonBigint.parse(data) : {}
}]
export default request
