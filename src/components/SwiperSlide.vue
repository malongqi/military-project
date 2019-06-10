<template>
  <am-slider>
    <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-1.jpg" /></am-slider-item>
    <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-2.jpg" /></am-slider-item>
    <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-3.jpg" /></am-slider-item>
    <am-slider-item><img src="http://s.amazeui.org/media/i/demos/bing-4.jpg" /></am-slider-item>
      <!-- <am-slider-item v-for="(item,index) in data" :key="'banner'+index">
        <a :href="item.target_url">
          <img :src="item.img_url" alt="">
        </a>
      </am-slider-item> -->
  </am-slider>
</template>

<script>
import AmazeSlide from 'amazeui-swiper' 
export default {
  name: 'SwiperSlide',
  components: {
    AmazeSlide
  },
  props: {
    data: Array
  },
  data () {
    return {

    }
  },
  mounted () {
  
  }
}
</script>

<style scoped>

</style>
