import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueBus from 'vue-bus'; //中央事件总线

Vue.use(ElementUI);
Vue.use(VueBus);

import 'bootstrap/dist/css/bootstrap.min.css'

import 'font-awesome/css/font-awesome.min.css'

import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'bootstrap/dist/js/bootstrap.min.js'

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (to.path == '/login' || to.path == '/register')
    return next();
  const tokenStr = sessionStorage.getItem("token")

  if (!tokenStr) return next('/login')
  next()
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')