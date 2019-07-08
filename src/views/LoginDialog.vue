<template>
  <dialog-bar
    class="login-dialog"
    v-model="$store.state.showLogin"
    :width="720"
    type="danger"
    title="登录"
    v-on:cancel="clickCancel()"
    @danger="clickDanger()"
    @confirm="clickConfirm()"
    dangerText="Delete">
    <div>
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
    </div>
    <div slot="foot">
      <span class="login-btn" @click="submit">登录</span>
      <span class="login-btn" @click="register">立即注册</span>
    </div>
  </dialog-bar>
</template>

<script>
  
import dialogBar from './../components/DialogBar'
import FormItem from './../components/FormItem'
import { login } from './../api/login'
export default {
  name: 'LoginDialog',
  components: {
    dialogBar,
    FormItem
  },
  data () {
    return {
      visibile: false,
      showLogin: false,
      modalVisible: false,
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
          this.$cookies.set('user', data, '1d');
          // this.$cookies.set('token', data.token, '1d');
          this.$store.commit('setUser', data)
          this.$store.commit('setLoginState', false)
          this.$message({
            type: 'success',
            message: '登录成功'
          })
        }
      })
    },
    register () {
      this.$parent.$refs.login.visibile = false
      this.$parent.$refs.register.visibile = true
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
  line-height: 58px;
}
.login-dialog {
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
}

</style> 