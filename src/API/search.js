/**
 * 搜索接口模块
 */
import request from '@/utils/request'
export const getSuggestion = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: { q }
  })
}
