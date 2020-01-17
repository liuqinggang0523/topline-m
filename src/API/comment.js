import request from '@/utils/request'
/**
 * 获取评论列表或者回复评论列表
 */
export const getComments = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/comments',
    params
  })
}
/**
 * 发布评论
 */
export const addComment = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/comments',
    data
  })
}
/**
 * 对评论或评论回复点赞
 */
export const addCommentLiking = (commentID) => {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data: { target: commentID }
  })
}
/**
 * 取消对评论或评论回复点赞
 */
export const deleteCommentLiking = commentID => {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${commentID}`
  })
}
