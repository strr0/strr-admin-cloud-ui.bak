import { BasicLayout } from '../layouts'
import { userMenuTree } from '../apis/admin'
import { AdminMenu } from '../views'

export const initMenu = (router, store) => {
  if(store.state.menus.length > 0) {
    return  
  }
  userMenuTree().then(resp => {
    if(resp && resp.success) {
      let menus = resp.data
      let routes = []
      let menuTree = buildMenuTree(menus, routes)
      router.addRoutes(routes);
      store.commit('initMenu', menuTree);
    }
  })
}

export const buildMenuTree = (menus, routes) => {
  let tree = []
  menus.forEach(menu => {
    let curRoutes = []
    let node = buildMenuNode(menu, curRoutes)
    routes.push({
      path: node.path,
      name: node.name,
      component: BasicLayout,
      children: curRoutes
    })
    tree.push(node)
  })
  return tree
}

export const buildMenuNode = (menu, curRoutes) => {
  let children = []
  let meta = []
  if (menu.children && menu.children instanceof Array) {
    menu.children.forEach(child => {
      // 是否菜单
      if (child.type != '2') {
        children.push(buildMenuNode(child, curRoutes))
      } else {
        meta.push(child)
      }
    })
  }
  let node = {
    id: menu.id,
    path: menu.path,
    name: menu.name,
    title: menu.title,
    icon: menu.icon,
    type: menu.type,
    meta: meta,
    children: children
  }
  if (menu.type == '1' || menu.type == '3') {
    // 系统菜单
    if (menu.sys == '1') {
      node.component = AdminMenu[menu.name] || AdminMenu['404']
    // 用户菜单
    } else {
      node.component = resolve => {
        require(['@/views' + menu.url + '/index.vue'], resolve)
      }
    }
    if (menu.type == '1') {
      curRoutes.push(node)
    }
  }
  return node
}

export const getDefaultMenu = menu => {
  let children = menu.children
  if (children && children.length > 0) {
    for (let child of children) {
      return getDefaultMenu(child)
    }
  }
  return menu
}