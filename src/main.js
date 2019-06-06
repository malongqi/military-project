import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AmazeVue from 'amaze-vue';
import 'amaze-vue/dist/amaze-vue.css';
import 'amazeui-swiper/dist/amazeui.swiper.css';

Vue.use(AmazeVue);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
