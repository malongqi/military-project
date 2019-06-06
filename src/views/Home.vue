<template>
  <div class="home">
    <div class="container">
      <am-topbar>
        <am-topbar-brand><a href="#">Amaze UI</a></am-topbar-brand>
        <am-topbar-toggle></am-topbar-toggle>
        <am-topbar-collapse>
          <am-nav :pill="true" :topbar="true">
            <am-nav-item :active="true" :to="'/'">home</am-nav-item>
            <am-nav-item :to="'/list'">list</am-nav-item>
            <am-nav-item :to="'/article'">article</am-nav-item>
          </am-nav>
          <am-topbar-form>
            <am-form-group size="sm">
              <am-input placement="请输入要查询的内容"></am-input>
            </am-form-group>
          </am-topbar-form>
          <am-topbar-slot>
            <am-button color="secondary" custom-class="am-topbar-btn">注册</am-button>
          </am-topbar-slot>
          <am-topbar-slot>
            <am-button color="primary" custom-class="am-topbar-btn">登录</am-button>
          </am-topbar-slot>
        </am-topbar-collapse>
      </am-topbar>
    </div>
    
    <div class="swiper-container">
      <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>...</div>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>
        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <!-- If we need scrollbar -->
        <div class="swiper-scrollbar"></div>
    </div>
    <div data-am-widget="titlebar" class="am-titlebar am-titlebar-default" >
        <h2 class="am-titlebar-title ">
            栏目标题
        </h2>

        <nav class="am-titlebar-nav">
            <a href="#more" class="">more &raquo;</a>
        </nav>
    </div>
  </div>
</template>

<script>
import Swiper from 'amazeui-swiper'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
  },
  data () {
    return {
      mySwiper: null
    }
  },
  mounted () {
    let swiperContainer = document.querySelector('.swiper-container')
    this.mySwiper = new Swiper(swiperContainer)
  },
  methods: {

  }
}
</script>

<style  scoped>
.swiper-container { width: 600px; height: 300px; }
</style>

