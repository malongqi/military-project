<template>
  <div class="login">
    <div class="form">
      <form-item
      class="log-form-item"
      icon-left="icon-user"
      v-model="form.mobile"
      :error-tips="errors['mobile']"
      placeholder="请输入手机号">
      </form-item>
      <form-item
      class="log-form-item"
      type="password"
      v-model="form.password"
      :error-tips="errors['password']"
      icon-left="icon-lock"
      placeholder="请输入密码">
      </form-item>
      <div class="password">
        <span @click="forget">忘记密码</span>
      </div>
    </div>
    <div slot="foot">
      <span class="login-btn" @click="submit">登录</span>
      <span class="login-btn" @click="register">立即注册</span>
    </div>
  </div>
</template>

<script>

import FormItem from './../components/FormItem'
import { login } from './../api/login'
export default {
  name: 'LoginDialog',
  components: {
    FormItem
  },
  data () {
    return {
      visibile: false,
      showLogin: false,
      modalVisible: false,
      formPath: '',
      form: {
        mobile: '',
        password: ''
      }
    };
  },
   vuerify: {
    'form.mobile': {
      test: /^1[3456789]\d{9}$/,
      message: '请输入正确的手机号'
    },
    'form.password': {
      test (val) {
        return val !== ''
      },
      message: '请输入密码'
    }
  },
  computed: {
    errors () {
      let errorsMsg = {}
      for (let key in this.$vuerify.$errors) {
        errorsMsg[key.split('.')[1]] = this.$vuerify.$errors[key]
      }
      return errorsMsg
    }
  },
  mounted() {
    this.formPath = this.$route.query.path || ''
    this.$store.commit('handleLoad', false)
  },
  methods: {
    submit () {
      if (!this.$vuerify.check()) {
        return
      }
      let params = {
        mobile: this.form.mobile,
        password: this.form.password
      }
      login(params).then(res => {
        if(res.data.code == 0) {
          let data = res.data.data
          if (this.formPath) {
            this.$router.push({path: JSON.parse(this.formPath)})
          } else {
            this.$router.push({path: 'home'})
          }
          this.$cookies.set('user', data, '1d');
          this.$cookies.set('token', data.token, '1d');
          this.$message({
            type: 'success',
            message: '登录成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    forget () {
      this.$router.push({path: 'forget'})
    },
    register () {
      this.$router.push({path: 'register'})
    }
  }
}
</script>
<style lang='scss' scoped>
.showLogin {
  position: absolute;
  top:15px;
  right:10px;
  padding-right: 10px;
  z-index: 2;
  background: #2b93c6;
}
.right-btn {
  position: absolute;
  bottom: -26px;
  right: 0;
  font-size: 14px;
  color: #808080;
}
.login-btn {
  display: inline-block;
  width: 190px;
  margin: 20px;
  background: #2b93c6;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  line-height: 58px;
}
.login {
  width: 500px;
  margin: 50px auto;
  .form {
    position: relative;
  }
  &.dialog {
    z-index: 999;
  }
  /deep/ .content {
    height: 320px;
    padding: 40px 0 30px;
    width: 420px;
    margin: auto;
  }
  /deep/ .log-form-item {
    margin-bottom: 30px;
    .input-inner {
      line-height: 30px;
    }
  }
  .password {
    position: absolute;
    right: 0;
    bottom: -30px;
    z-index: 9
  }
}

</style> 