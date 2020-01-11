/**
 * 频道模块
 */
import request from '@/utils/request'
export const getChannelsList = () => {
  return request({
    url: '/app/v1_0/channels',
    type: 'get'
  })
}
