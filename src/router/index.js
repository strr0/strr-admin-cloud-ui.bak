import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/other/404')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
