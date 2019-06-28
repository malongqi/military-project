<template>
  <swiper
    :options="swiperOption"
    > 
    <swiper-slide v-for="slider in data">
      <img :src="slider.url" alt="">
    </swiper-slide>
    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
  </swiper>
</template>

<script type="text/ecmascript-6">
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'SwiperList',
  components: {
    swiper,
    swiperSlide
  },
  props: {
    swiperOption: Object,
    data: Array
  },
  data () {
    return {
      lists: [] 
    }
  },
  mounted () {
    debugger
    this.lists = this.$router.currentRoute.matched
  }
}
</script>

<style scoped lang="scss">
.bread-crumbs {
  padding: 25px 0;
  list-style: none;
  font-size: 16px;
  color: #808080;
  .bread-item {
    display: inline;
    &:last-child {
      i {
        display: none
      }
    }
  }
}

</style>
