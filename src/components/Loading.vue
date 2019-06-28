<template>
  <div class="loading-spinner" :class="{'full-page':fullPage}">
    <img src="./../assets/images/loading.gif" alt="">
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    fullPage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    };
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.loading-spinner {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.full-page {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9;
  background: #ffffff;
}
</style>