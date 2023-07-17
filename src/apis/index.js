import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
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
      return response.data
    }
    else {
      Message.error({message: response.data.message})
      return
    }
  },
  error => {
    let response = error.response
    Message.error({message: response.data.message})
    return
  }
)

export default request