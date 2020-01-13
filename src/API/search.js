/**
 * 搜索接口模块
 */
import request from '@/utils/request'

export const getSuggestion = q => { // 联想结果
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: { q }
  })
}

export const getSearchResults = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'get',
    params
  })
}
