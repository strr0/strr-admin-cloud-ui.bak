const AdminMenu = {
  'User': resolve => require(['./admin/user/index.vue'], resolve),
  'Role': resolve => require(['./admin/role/index.vue'], resolve),
  'Authority': resolve => require(['./admin/authority/index.vue'], resolve),
  '404': resolve => require(['./other/404.vue'], resolve)
}

export { AdminMenu }