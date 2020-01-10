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
