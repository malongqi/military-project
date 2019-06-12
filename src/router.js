import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/home',
      component: () => import(/* webpackChunkName: "index" */ './views/Layout.vue'),
      children: [
        {
          path: '/home',
          name: '首页',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "index" */ './views/Home.vue')
        },
        {
          path: '/course',
          name: '课程',
          component: () => import(/* webpackChunkName: "index" */ './views/Course.vue')
        }
      ]
    },
    
  ]
})
