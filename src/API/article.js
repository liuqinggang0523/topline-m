/**
 * 文章接口模块
 */
import request from '@/utils/request'
/**
 * 获取频道的文章列表
 */
export const getArticleList = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
/**
 * 获取文章详情
 */
export const getArticle = (articleid) => {
  return request({
    method: 'get',
    url: `/app/v1_0/articles/${articleid}`
  })
}
/**
 * 收藏文章
 */
export const addCollect = (articleid) => {
  return request({
    method: 'post',
    url: `/app/v1_0/article/collections`,
    data: { target: articleid }
  })
}
/**
 * 取消收藏文章
 */
export const deleteCollect = (articleid) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleid}`
  })
}
/**
 * 点赞文章
 */
export const addLiking = (articleid) => {
  return request({
    method: 'post',
    url: '/app/v1_0/article/likings',
    data: { target: articleid }
  })
}
/**
 * 取消文章点赞
 */
export const deleteLiking = (articleid) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleid}`
  })
}
