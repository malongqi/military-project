import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AmazeVue from 'amaze-vue';
// import 'amaze-vue/dist/amaze-vue.css';
// import './assets/css/amazeui.css';
import * as ModalDialogs from 'vue-modal-dialogs'

import 'swiper/dist/css/swiper.css'

// Vue.use(AmazeVue);
Vue.use(ModalDialogs)   
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
