import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from './auth'

let request = axios.create({
  baseURL: '/api'
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
    Message.error({message: error.response.data.message})
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

export const transformRequest = data => {
  let ret = '';
  for (let key in data) {
    if (data[key] && data[key] != 'null') {
      ret += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
    }
  }
  return ret;
}