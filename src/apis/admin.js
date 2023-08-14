import request from './index'

const BASE = '/api/adminservice'

// 权限
export const listAuthority = (params) => {
  return request.get(BASE + '/admin/sysAuthority/menuTree', {
    params: params
  })
}

export const userMenuTree = () => {
  return request.get(BASE + '/admin/sysAuthority/userMenuTree')
}

export const saveAuthority = params => {
  return request.post(BASE + '/admin/sysAuthority/save', params)
}

export const updateAuthority = params => {
  return request.put(BASE + '/admin/sysAuthority/update', params)
}

export const deleteAuthority = id => {
  return request.delete(BASE + '/admin/sysAuthority/removeInfo?id=' + id)
}

// 角色
export const pageRole = params => {
  return request.get(BASE + '/admin/sysRole/page', {
    params: params
  })
}

export const listRole = () => {
  return request.get(BASE + '/admin/sysRole/list')
}

export const saveRole = params => {
  return request.post(BASE + '/admin/sysRole/save', params)
}

export const updateRole = params => {
  return request.put(BASE + '/admin/sysRole/update', params)
}

export const listRelByRid = id => {
  return request.get(BASE + '/admin/sysRole/listRelByRid?rid=' + id)
}

export const removeRole = id => {
  return request.delete(BASE + '/admin/sysRole/removeInfo?id=' + id)
}

export const updateRel = params => {
  return request.post(BASE + '/admin/sysRole/updateRel', params)
}

// 用户
export const pageUser = params => {
  return request.get(BASE + '/admin/sysUser/page', {
    params: params
  })
}

export const saveUser = params => {
  return request.post(BASE + '/admin/sysUser/saveInfo', params)
}

export const listRelByUid = id => {
  return request.get(BASE + '/admin/sysUser/listRelByUid?uid=' + id)
}

export const removeUser = id => {
  return request.delete(BASE + '/admin/sysUser/removeInfo?id=' + id)
}

// 属性
export const saveProperties = params => {
  return request.post(BASE + '/admin/sysProperties/save', params)
}

export const batchSaveProperties = params => {
  return request.post(BASE + '/admin/sysProperties/batchSave', params, {
    headers: {
      'Content-Type': 'application/json'
    },
    transformRequest: [data => JSON.stringify(data)]
  })
}

export const updateProperties = params => {
  return request.put(BASE + '/admin/sysProperties/update', params)
}

export const removeProperties = id => {
  return request.delete(BASE + '/admin/sysProperties/remove?id=' + id)
}

export const batchRemoveProperties = application => {
  return request.delete(BASE + '/admin/sysProperties/batchRemove?application=' + application)
}

export const listApplication = params => {
  return request.get(BASE + '/admin/sysProperties/listApplication', {
    params: params
  })
}

export const listProperties = params => {
  return request.get(BASE + '/admin/sysProperties/listProperties', {
    params: params
  })
}

// 服务
export const listServer = () => {
  return request.get('/api/actuator/gateway/routes')
}