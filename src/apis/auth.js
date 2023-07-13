import request from './index'

const BASE = '/authservice'

// 登录
export const securityLogin = (params) => {
  return request.post(BASE + '/login', params)
}

// 授权
export const securityConsent = (params) => {
  return request.post(BASE + '/oauth2/authorize', params)
}

// 获取授权信息
export const securityAuthorize = () => {
  return request.get(BASE + '/oauth2/authorize', {
    params: {
      response_type: 'code',
      client_id: 'STRR_CLIENT',
      scope: 'web'
    }
  })
}

// 获取token
export const securityToken = (params) => {
  return request.post(BASE + '/oauth2/token', params)
}

// 注销
export const securityLogout = () => {
  return request.get(BASE + '/logout')
}