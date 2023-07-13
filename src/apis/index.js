import axios from 'axios'
import { Message } from 'element-ui'
import { getToken, removeToken } from '../utils/auth'

const request = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [data => {
    let ret = ''
    for (let key in data) {
      if (data[key] && data[key] != 'null') {
        ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
      }
    }
    return ret
  }]
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

export default request