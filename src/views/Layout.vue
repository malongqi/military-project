<template>
  <div class="layout">
    <div class="header">
      <div class="header-inner">
        <div class="topbar">
          <div class="topbar-brand">
            <a href="#">
              <img src="./../assets/images/logo.png" alt="">
            </a>
          </div>
          <ul class="topbar-nav">
            <li
              class="tapbar-nav-item"
              :class="{'topbar-nav-active': item.page==currentRoute.name}"
              v-for="(item, index) in routers"
              :key="'menu' + index">
              <router-link :to="item.path">
                {{item.name}}
              </router-link>
            </li>
          </ul>
          <div class="navbar-right"  v-if="nickname">
            <router-link :to="{path: 'mine'}" class="item">【{{nickname}}】</router-link>
            <span class="item" @click="quite">退出</span>
          </div>
          <div class="navbar-right" v-else>
            <span class="login-btn" @click="handleUser('register')">注册</span>
            <span class="login-btn" @click="handleUser('login')">登录</span>
          </div>
        </div>
      </div>
    </div>
    <router-view/>
    <div class="footer">
      <div class="container clearfix">
        <ul class="footer-list first">
          <li class="title">关于我们</li>
          <li><router-link to="/about">星军联合（北京）教育科技有限公司</router-link></li>
          <li><router-link to="/about?tab=1">企业文化</router-link></li>
          <li><router-link to="/about?tab=2">公司简介</router-link></li>
        </ul>
        <ul class="footer-list">
          <li class="title">联系我们</li>
          <li>公司地址：{{company.address}}</li>
          <li>联系电话：{{company.contact}}</li>
        </ul>
        <ul class="footer-list last" v-for="(item, index) in company.qrcodes" :key="'qrcode' + index">
          <li class="center">{{item.title}}</li>
          <li><img :src="item.url" alt=""></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetail } from './../api/mine'
export default {
  name: 'Layout',
  components: {
  },
  data () {
    return {
      currentRoute: '',
      company: '',
      routers: [
        {
          path: '/',
          page: 'home',
          name: '首页'
        },
        {
          path: '/course',
          page: 'course',
          name: '课程'
        },
        {
          path: '/book',
          page: 'book',
          name: '教材'
        },
        {
          path: '/about',
          page: 'about',
          name: '关于我们'
        }
      ]
    }
  },
  mounted () {
    this.currentRoute = this.$route.meta
    this._getCompany()
    // this.getHomeListData()
  
  },
  computed: {
    nickname () {
      return this.$store.state.user.nickname
    }
  },
  
  watch: {
    '$route' (to) {
      this.currentRoute = to.meta
    }
  },
  methods: {
    _getCompany() {
      getDetail().then(res => {
        if (res.data.code ==0) {
          let data = res.data.data
          this.company = data
        }
      })
    },
    handleUser (val) {
      if (val == 'login') {
        this.$router.push({path: 'login'})
      } else {
        this.$router.push({path: 'register'})
      }
    },
    quite () {
      this.$store.commit('setUser', '' )
      this.$cookies.remove("user")
      this.$cookies.remove("token")
      this.$router.push({path: 'home'})
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  width: 100%;
  min-width: 1100px;
  padding-top:90px;
}
.header {
  min-width: 1100px;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
  line-height: 90px;
  background: #fff;
  box-shadow: 0px 3px 5px rgba(0,0,0,0.1);
  .header-inner {
    width: 80%;
    margin: 0 auto;
  }
  .topbar{
    position: relative;
    display: flex;
    background: #fff;
    border-bottom: 0;
    .topbar-nav {
      width: 52%;
      display: flex;
      list-style: none;
      justify-content: space-around;
      .tapbar-nav-item {
        float: left;
        &.topbar-nav-active { 
          a {
            color: #ef2020;
          }
        }
      }
    }
    a {
      line-height: 90px;
      font-size: 24px;
      text-decoration: none;
      color: #333;
      &:after {
        display: none !important;
      }
    }
  }
  .topbar-brand {
    margin-right: 8%;
    img {
      vertical-align: middle;
    }
  }
  .login-btn {
    margin: 0 20px;
    color: #ef2020;
    font-size: 18px;
    cursor: pointer;
  }
  .navbar-right {
    position: absolute;
    right: 0;
    .item {
      cursor: pointer;
      color: #ef2020;
      font-size: 18px;
    }
  }
}
.footer {
  padding-top:30px;
  background: #4d4d4d;
  .footer-list {
    list-style: none;
    float: left;
    color:#b0b0b0;
    font-size: 14px;
    max-width: 300px;
    .center {
      text-align: center;
    }
    &.first {
      margin-right: 180px;
    }
    &.last {
      float: right;
      margin-right: 0;
      margin-left: 18px;
      text-align: right;
      img {
        width: 112px;
        height: 112px;
      }
    }
    a {
      color:#b0b0b0;
    }
    .title {
      margin-bottom: 30px;
      color: #fffefe;
      font-size: 18px;
    }
    li {
      margin-bottom: 20px;
    }
  }
}
</style>

