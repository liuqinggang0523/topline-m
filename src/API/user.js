import request from '@/utils/request.js'
export const login = data => { // 用户登录
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
export const sendCode = mobile => { // 发送验证码
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
export const getUserInfo = data => { // 获取用户资料
  return request({
    method: 'get',
    url: '/app/v1_0/user'
  })
}
export const getUserChannels = () => { // 用户频道列表
  return request({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
/**
 * 关注用户
 */
export const addFollowing = (articleid) => {
  return request({
    method: 'post',
    url: '/app/v1_0/user/followings',
    data: {
      target: articleid
    }
  })
}
/**
 * 取消关注用户
 */
export const deleteFollowing = (articleid) => {
  return request({
    method: 'delete',
    url: `/app/v1_0/user/followings/${articleid}`
  })
}
/**
 * 获取用户个人资料
 */
export const getUserProfile = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user/profile'
  })
}
/**
 * 编辑用户个人资料
 */
export const editUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}
/**
 * 编辑用户个人资料
 */
export const editUserphoto = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data
  })
}
