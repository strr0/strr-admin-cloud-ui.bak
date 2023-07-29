import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './src/router'
import store from './src/store'
import { getCookie } from './src/utils/auth'
import { initMenu } from './src/utils/menu'

Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.path == '/') {
    next()
  }
  else {
    if(getCookie('user')) {
      initMenu(router, store)
    }
    next()
  }
})

export function setupApp(app) {
  new Vue({
    router,
    store,
    render: h => h(app)
  }).$mount('#app')
}