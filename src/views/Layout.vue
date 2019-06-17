<template>
  <div>
    <div class="header">
      <div class="container">
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
          <div class="navbar-right">
            <span class="login-btn" @click="handleUser('register')">注册</span>
            <span class="login-btn" @click="handleUser('login')">登录</span>
          </div>
        </div>
      </div>
    </div>
    
    <router-view/>
    <div class="footer">
      <div class="container clearfix">
        <ul class="footer-list">
          <li class="title">关于我们</li>
          <li><router-link to="">星军联合（北京）教育科技有限公司</router-link></li>
          <li><router-link to="">企业文化</router-link></li>
          <li><router-link to="">公司简介</router-link></li>
        </ul>
        <ul class="footer-list">
          <li class="title">联系我们</li>
          <li>公司地址：北京市石景山古城金融城</li>
          <li>联系电话：010-88710220</li>
        </ul>
        <ul class="footer-list last">
          <li>微信公众号</li>
          <li><img src="" alt=""></li>
        </ul>
      </div>
    </div>
    <login-dialog ref="login"></login-dialog>
    <!-- <register-dialog ref="register"></register-dialog> -->
  </div>
</template>
<script>
import LoginDialog from './LoginDialog'
// import RegisterDialog from './RegisterDialog'
export default {
  name: 'Layout',
  components: {
    LoginDialog,
    // RegisterDialog
  },
  data () {
    return {
      currentRoute: '',
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
    // this.getBannerData()
    // this.getHomeListData()
  
  },
  watch: {
    '$route' (to) {
      this.currentRoute = to.meta
    }
  },
  methods: {
    handleUser (val) {
      this.$refs[val].visibile = true
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  line-height: 90px;
  background: #fff;
  .topbar{
    display: flex;
    background: #fff;
    border-bottom: 0;
    .topbar-nav {
      display: flex;
      list-style: none;
      .tapbar-nav-item {
        float: left;
        margin-right:70px;
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
    margin-right: 300px;
    img {
      vertical-align: middle;
    }
  }
  .login-btn {
    margin: 0 20px;
    color: #ef2020;
    font-size: 18px;
  }
}
.footer {
  padding-top:30px;
  background: #4d4d4d;
  .footer-list {
    list-style: none;
    float: left;
    margin-right: 180px;
    color:#b0b0b0;
    font-size: 14px;
    &.last {
      float: right;
      margin-right: 0
    }
    a {
      color:#b0b0b0;
    }
    .title {
      margin-bottom: 40px;
      color: #fffefe;
      font-size: 18px;
    }
    li {
      margin-bottom: 30px;
    }
  }
}
</style>

