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
    let node = buildMenuNode(menu, [], curRoutes)
    routes.push({
      path: node.path,
      name: node.name,
      component: BasicLayout,
      meta: {id: '0'},
      children: curRoutes
    })
    tree.push(node)
  })
  return tree
}

export const buildMenuNode = (menu, paths, curRoutes) => {
  let children = []
  let buttons = []
  if (menu.children && menu.children instanceof Array) {
    menu.children.forEach(child => {
      switch (child.type) {
        // 按钮
        case '2':
          buttons.push({
            ...child,
            func: child.name
          })
          break
        // 子路由
        case '3':
          buttons.push(buildMenuComponent({
            ...child,
            name: menu.name + child.name,
            func: child.name,
            meta: {
              id: menu.id + '',
              paths: [
                ...paths,
                {
                  path: child.path,
                  title: child.title
                }
              ]
            }
          }, curRoutes))
          break
        // 菜单树
        default:
          children.push(buildMenuNode(child, [
            ...paths,
            {
              path: child.path,
              title: child.title
            }
          ], curRoutes))
          break
      }
    })
  }
  return buildMenuComponent({
    ...menu,
    meta: {
      id: menu.id + '',
      buttons: buttons,
      paths: paths
    },
    children: children
  }, curRoutes)
}

export const buildMenuComponent = (menu, curRoutes) => {
  switch (menu.type) {
    case '1':
      if (menu.sys == '1') {
        menu.component = AdminMenu[menu.name] || AdminMenu['404']
      } else {
        menu.component = resolve => {
          require(['@/views' + menu.url + '/index.vue'], resolve)
        }
      }
      curRoutes.push(menu)
      break
    case '3':
      if (menu.sys == '1') {
        menu.component = AdminMenu[menu.name] || AdminMenu['404']
      } else {
        menu.component = resolve => {
          require(['@/views' + menu.url + '.vue'], resolve)
        }
      }
      curRoutes.push(menu)
      break
    default:
      break
  }
  return menu
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