import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from './auth'

let request = axios.create({
  baseURL: '/api'
})

let security = axios.create({
  baseURL: '/security'
})

// request拦截器
request.interceptors.request.use(
  config => {
    let token = getToken()
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
request.interceptors.response.use(
  response => {
    if(response.status && response.status == 200) {
      //Message.success({message: response.data.message})
      return response.data
    }
    else {
      Message.error({message: response.data.message})
      return
    }
  },
  error => {
    let response = error.response
    if (response.status && response.status == 401) {
      removeToken()
    }
    Message.error({message: response.data.message})
    return
  }
)

export const getRequest = url => {
  return request.get(url)
}

export const postRequest = (url, params) => {
  return request.post(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [ transformRequest ]
  })
}

export const putRequest = (url, params) => {
  return request.put(url, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [ transformRequest ]
  })
}

export const deleteRequest = url => {
  return request.delete(url)
}

// 登录
export const securityLogin = (params) => {
  return security.post('/login', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [ transformRequest ]
  })
}

// 授权
export const securityConsent = (params) => {
  return security.post('/oauth2/authorize', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [ transformRequest ]
  })
}

// 获取授权信息
export const securityAuthorize = () => {
  return security.get('/oauth2/authorize?response_type=code&client_id=STRR_CLIENT&scope=web')
}

// 获取token
export const securityToken = (params) => {
  return security.post('/oauth2/token', params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [ transformRequest ]
  })
}

// 注销
export const securityLogout = () => {
  return security.get('/logout')
}

export const transformRequest = data => {
  let ret = '';
  for (let key in data) {
    if (data[key] && data[key] != 'null') {
      ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
    }
  }
  return ret;
}