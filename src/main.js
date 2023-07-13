import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import App from './App.vue'
import { getToken } from './utils/auth'
import { initMenu } from './utils/menu'

Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.path == '/') {
    next()
  }
  else {
    if(getToken()) {
      initMenu(router, store)
    }
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
