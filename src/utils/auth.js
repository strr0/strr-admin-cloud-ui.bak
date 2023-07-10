const tokenKey = 'authToken'
const hour = 60 * 60 * 1000

export function setToken(token) {
    let expire = new Date()
    expire.setTime(expire.getTime() + hour)
    window.document.cookie = tokenKey + "=" + token + ";path=/;expires=" + expire.toGMTString();
    // localStorage.setItem(tokenKey, token)
}

export function getToken() {
    return localStorage.getItem(tokenKey)
}

export function removeToken() {
    localStorage.removeItem(tokenKey)
}