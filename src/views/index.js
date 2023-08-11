const AdminMenu = {
  'Properties': resolve => require(['./admin/properties/index.vue'], resolve),
  'PropertiesShow': resolve => require(['./admin/properties/components/show.vue'], resolve), 
  'User': resolve => require(['./admin/user/index.vue'], resolve),
  'Role': resolve => require(['./admin/role/index.vue'], resolve),
  'Authority': resolve => require(['./admin/authority/index.vue'], resolve),
  '404': resolve => require(['./other/404.vue'], resolve)
}

export { AdminMenu }