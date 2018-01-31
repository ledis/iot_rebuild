import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
Vue.use(Router)

export default new Router({
	scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: resolve=>{require(['@/components/login/login.vue'],resolve);}
    },
    {
      path: '/',
      component: Main,
      children:[
        {
          path: 'home',
          name: 'home_index',
          component: resolve=>{require(['@/components/home/home.vue'],resolve);}
        }
      ]
    }
    
  ]
})
