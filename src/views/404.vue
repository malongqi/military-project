<template>
  <div class="container">
    <h4 class="title">对不起！当前页面发生错误</h4>
    <p class="text">soory guys the page donot exist for some reason</p>
    <div class="block">
      <div> 
        <router-link class="btn" :to="{path: 'home'}">返回首页</router-link>
        <span class="btn" @click="reLoad">刷新</span>
      </div>
      <div>
        <img src="./../assets/images/lost.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
    };
  },
  computed: {},
  mounted () {
    this.$store.commit('handleLoad', false)
  },
  methods: {
    reLoad() {
      location.reload()
    }
  }
}
</script>
<style lang='scss' scoped>
.title {
  font-size: 36px;
  color: #333333;
}
.text {
  margin-bottom: 44px;
  font-size: 30px;
  color: #333333;
}
.btn {
  margin-right: 44px;
  padding: 10px 20px;
  background-color: #2b93c6;
  font-size: 20px;
  color: #fff;
  border-radius: 2px;
}
.block {
  display: flex;
  justify-content: space-between;
}
</style>