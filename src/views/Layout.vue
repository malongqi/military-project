<template>
  <div class="home">
    <div class="header">
      <div class="container">
        <am-topbar>
          <am-topbar-brand><a href="#">Amaze UI</a></am-topbar-brand>
          <am-topbar-toggle></am-topbar-toggle>
          <am-topbar-collapse>
            <am-nav :pill="true" :topbar="true">
              <am-nav-item :active="true" :to="'/'">首页</am-nav-item>
              <am-nav-item :to="'/list'">课程</am-nav-item>
              <am-nav-item :to="'/article'">教材</am-nav-item>
              <am-nav-item :to="'/article'">关于我们</am-nav-item>
            </am-nav>
            <am-topbar-slot>
              <span class="login-btn" @click="register">注册</span>
            </am-topbar-slot>
            <am-topbar-slot>
              <span class="login-btn">登录</span>
            </am-topbar-slot>
          </am-topbar-collapse>
        </am-topbar>
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
    <login-dialog ref="register"></login-dialog>
  </div>
</template>
<script>
import LoginDialog from './LoginDialog'
export default {
  name: 'Layout',
  components: {
    LoginDialog
  },
  data () {
    return {
    }
  },
  mounted () {
    // this.getBannerData()
    // this.getHomeListData()
  
  },
  methods: {
    register () {
      this.$refs.register.modalVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  line-height: 90px;
  background: #fff;
  /deep/ .am-topbar {
    background: #fff;
    border-bottom: 0;
    .am-topbar-nav li {
      margin-right:70px;
      &.am-active { 
        a {
          color: #ef2020;
        }
      }
    }
    a {
      line-height: 90px;
      font-size: 24px;
      color: #333;
      &:after {
        display: none !important;
      }
    }
  }
  .am-topbar-brand {
    margin-right: 300px;
  }
  .login-btn {
    color: #ef2020;
    font-size: 18px;
  }
}
.footer {
  margin-top:50px;
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

