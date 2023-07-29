import { BasicLayout } from '../layouts'
import { userMenuTree } from '../apis/admin'
import { AdminMenu } from '../views'

export const initMenu = (router, store) => {
  if(store.state.routes.length > 0) {
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
    let curTree = []
    menu.children.forEach(child => {
      let curRoutes = []
      let node = buildMenuNode(child, curRoutes)
      routes.push({
        path: node.path,
        name: node.name,
        component: BasicLayout,
        children: curRoutes
      })
      curTree.push(node)
    })
    tree.push({
      path: menu.path,
      name: menu.name,
      title: menu.title,
      children: curTree
    })
  })
  return tree
}

export const buildMenuNode = (menu, curRoutes) => {
  let children = []
  let others = []
  if (menu.children && menu.children instanceof Array) {
    menu.children.forEach(child => {
      // 是否菜单
      if (child.isMenu) {
        children.push(buildMenuNode(child, curRoutes))
      } else {
        others.push(child)
      }
    })
  }
  let node = {
    path: menu.path,
    name: menu.name,
    title: menu.title,
    iconCls: menu.icon,
    others: others,
    children: children
  }
  if (children.length == 0) {
    // 路由
    if (menu.type == 'admin') {
      node.component = AdminMenu[menu.name] || AdminMenu['404']
    } else if (menu.url) {
      node.component = resolve => {
        require(['../views' + menu.url + '/index.vue'], resolve)
      }
    }
    curRoutes.push(node)
  }
  
  return node
}