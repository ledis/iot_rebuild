// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import config from './utils/config.js'
import router from './router'
import store from './store'
import resource from 'vue-resource'
import storage from '@/utils/storage.js'
import VueForm from 'vue-form'
Vue.config.productionTip = false
import '@/assets/css/common.css'
import '@/assets/css/_objects_icons.scss'
import particles from 'particles.js'
Vue.use(particles)
Vue.use(resource)
Vue.use(VueForm)

//将常用工具方法扩展成实例
Vue.prototype.config=config


Vue.prototype.$storage=storage

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
