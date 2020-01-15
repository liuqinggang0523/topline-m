import request from '@/utils/request'
export const getComments = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/comments',
    params
  })
}
