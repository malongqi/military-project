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
          meta: {name: 'home', needUser: false},
          component: () => import(/* webpackChunkName: "index" */ './views/Home.vue')
        },
        {
          path: '/course',
          name: '课程',
          meta: {name: 'course', needUser: false},
          component: () => import(/* webpackChunkName: "index" */ './views/Course.vue')
        },
        {
          path: '/detail',
          name: '详情',
          meta: {name: 'course', needUser: false},
          component: () => import(/* webpackChunkName: "index" */ './views/Detail.vue')
        },
        {
          path: '/book',
          name: '教材',
          meta: {name: 'book', needUser: false},
          component: () => import(/* webpackChunkName: "index" */ './views/Book.vue')
        },
        {
          path: '/news',
          name: '资讯',
          meta: {name: 'book', needUser: false},
          component: () => import(/* webpackChunkName: "index" */ './views/News.vue')
        },
        {
          path: '/about',
          name: '关于我们',
          meta: {name: 'about', needUser: false},
          component: () => import(/* webpackChunkName: "index" */ './views/About.vue')
        },
        {
          path: '/order',
          name: '订单',
          meta: {name: 'order', needUser: true},
          component: () => import(/* webpackChunkName: "index" */ './views/Order.vue')
        },
        {
          path: '/mine',
          name: '',
          meta: {name: '', needUser: false},
          component: () => import(/* webpackChunkName: "index" */ './views/mine/Mine.vue'),
          children: [
            {
              path: '/',
              name: '会员中心',
              redirect: '/mycourse',
              meta: {name: '', needUser: true},
              component: () => import(/* webpackChunkName: "index" */ './views/mine/Mine.vue')
            },
            {
              path: '/mycourse',
              name: '我的课程',
              meta: {name: '', needUser: true},
              component: () => import(/* webpackChunkName: "index" */ './views/mine/mycourse.vue')
            },
            {
              path: '/myview',
              name: '我的浏览',
              meta: {name: '', needUser: true},
              component: () => import(/* webpackChunkName: "index" */ './views/mine/myview.vue')
            },
            {
              path: '/myorder',
              name: '我的订单',
              meta: {name: '', needUser: true},
              component: () => import(/* webpackChunkName: "index" */ './views/mine/myorder.vue')
            },
            {
              path: '/myaddress',
              name: '我的地址',
              meta: {name: '', needUser: true},
              component: () => import(/* webpackChunkName: "index" */ './views/mine/myaddress.vue')
            },
            {
              path: '/mypassword',
              name: '修改密码',
              meta: {name: '', needUser: true},
              component: () => import(/* webpackChunkName: "index" */ './views/mine/mypassword.vue')
            },
            {
              path: '/myinfor',
              name: '完善资料',
              meta: {name: '', needUser: true},
              component: () => import(/* webpackChunkName: "index" */ './views/mine/myinfor.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      meta: {name: 'home', needUser: false},
      component: () => import(/* webpackChunkName: "index" */ './views/404.vue')
    },
  ]
})
