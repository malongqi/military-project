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

import ElementUI from 'element-ui'
import 'swiper/dist/css/swiper.css'
import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(AmazeVue);
Vue.use(ElementUI);
Vue.use(ModalDialogs)  
Vue.use(VueCookies) 
Vue.use(Vuerify)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)
// Vue.use(Table)
// Vue.use(Select)
// Vue.use(TableColumn)
Vue.use(Toasted, {
  position:'top-center',
  duration: 1000
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
