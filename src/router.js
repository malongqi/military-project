import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页 ',
      redirect: '/home',
      component: () => import(/* webpackChunkName: "index" */ './views/Layout.vue'),
      children: [
        {
          path: '/home',
          name: '首页',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          meta: {name: 'home'},
          component: () => import(/* webpackChunkName: "index" */ './views/Home.vue')
        },
        {
          path: '/course',
          name: '课程',
          meta: {name: 'course'},
          component: () => import(/* webpackChunkName: "index" */ './views/Course.vue')
        },
        {
          path: '/detail',
          name: '详情',
          meta: {name: 'course'},
          component: () => import(/* webpackChunkName: "index" */ './views/Detail.vue')
        },
        {
          path: '/book',
          name: '课程',
          meta: {name: 'book'},
          component: () => import(/* webpackChunkName: "index" */ './views/Book.vue')
        }
      ]
    },
    
  ]
})
