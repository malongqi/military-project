import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AmazeVue from 'amaze-vue';
// import 'amaze-vue/dist/amaze-vue.css';
// import './assets/css/amazeui.css';
import * as ModalDialogs from 'vue-modal-dialogs'
import Toasted from 'vue-toasted';
import VueCookies from 'vue-cookies'
import Vuerify from 'vuerify'
import dhfPlayer from 'dhfplayer'
Vue.use(dhfPlayer)
import ElementUI from 'element-ui'
import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(AmazeVue);
Vue.use(ElementUI);
Vue.use(ModalDialogs)  
Vue.use(VueCookies) 
Vue.use(Vuerify)
Vue.use(Toasted, {
  position:'top-center',
  duration: 1000
})

Vue.config.productionTip = false
// 路由跳转拦截//test
store.commit('setUser', VueCookies.get('user'))
router.beforeEach((to, from, next) => {
  window.scrollTo(0,0)
  if (to.meta.needUser) {
    if (store.state.user) {
      next()
    } else {
      next({path: 'home'})
      store.commit('setLoginState', true)
    }
  } else {
    next()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
