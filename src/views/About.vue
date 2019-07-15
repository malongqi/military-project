<template>
  <div class="about">
    <div class="banner">
      <img :src="oursDetail.img_url" alt="">
    </div>
    <div class="about-content container">
      <div class="tabbar clearfix">
        <ul class="tabbar-nav">
          <li
            class="tabbar-nav-item"
            v-for="(navItem, index) in oursDetail.category"
            :key="'nav' + index"
            :class="{'active': navItem.checked}"
            @click="handleClickNav(navItem)">
            {{navItem.name}}
          </li>
        </ul>
        <div class="tabbar-content" v-html="content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCompany } from './../api/mine'
export default {
  components: {},
  data () {
    return {
      oursDetail: '',
      content: '',
      tab: ''
    };
  },
  computed: {},
  mounted() {
    this.tab = this.$route.query.tab || ''
    this.$store.commit('handleLoad', false)
    this.getAboutMe()
  },
  watch: {
    '$route.query' (to) {
      this.tab = this.$route.query.tab || 0
      this.getAboutMe()
    }
  },
  methods: {
    handleClickNav (item) {
      this.oursDetail.category.map((item,index) => {
        item.checked = false
        this.$route.query.tab = index
      })
      item.checked = true
      this.content = item.content
    },
    getAboutMe() {
      getCompany().then(res => {
        if (res.data.code == 0) {
          this.oursDetail = res.data.data
          let detail = this.oursDetail.category
          detail.map((item,index) => {
            if (this.tab === '') {
              if (index == 0) {
                item.checked = true
                this.content = item.content
              } else {
                item.checked = false
              }
            } else {
              if (index == this.tab) {
                item.checked = true
                this.content = item.content
              } else {
                item.checked = false
              }
            }
            
          })
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.banner {
  height: 320px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.about-content {
  padding: 20px;
}
.tabbar {
  display: flex;
  .tabbar-nav {
    float: left;
    margin-right: 40px;
    list-style: none;
  }
  .tabbar-nav-item {
    width: 198px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 24px;
    color: #333333;
    &.active {
      color: #ffffff;
      background: #2b93c6;
    }
  }
  .tabbar-content {
    padding: 50px 0 30px;
    float: left;
    line-height: 1.5;
  }
}
</style>