export function setCookie(key, val) {
  let time = new Date(new Date().toLocaleDateString()).getTime() + 86399999
  let expire = new Date(time)
  document.cookie = key + '=' + val + ";path=/;expires=" + expire.toGMTString()
}

export function getCookie(key) {
  let match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
  if (match) {
    return match[2]
  }
  return null
}