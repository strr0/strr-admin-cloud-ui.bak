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
      if (child.type != '3') {
        children.push(buildMenuNode(child, curRoutes))
      } else {
        meta.push(child)
      }
    })
  }
  let node = {
    path: menu.path,
    name: menu.name,
    title: menu.title,
    iconCls: menu.icon,
    meta: meta,
    children: children
  }
  switch (menu.type) {
    // 系统菜单
    case '0':
      node.component = AdminMenu[menu.name] || AdminMenu['404']
      curRoutes.push(node)
      break
    // 用户菜单
    case '2':
      node.component = resolve => {
        require(['@/views' + menu.url + '/index.vue'], resolve)
      }
      curRoutes.push(node)
      break
    default:
      break
  }
  return node
}