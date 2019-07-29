<template>
  <div class="forget">
    <div>
      <form-item
      class="log-form-item"
      type="icon-user"
      v-model= "form.mobile"
      icon-left="icon-user"
      :error-tips="errors['mobile']"
      placeholder="请输入手机号">
      </form-item>
      <form-item
      class="log-form-item"
      type="password"
      v-model= "form.verify_code"
      icon-left="icon-lock"
      :error-tips="errors['verify_code']"
      placeholder="短信验证码">
      <span v-if="!showTime" class="yzm-btn" slot="iconRight" @click="getVerifyCode">获取验证码</span>
      <span v-else class="time yzm-btn" slot="iconRight">{{cutdown}}S</span>
      </form-item>
      <form-item
      class="log-form-item"
      type="password"
      v-model= "form.password"
      icon-left="icon-lock"
      :error-tips="errors['password']"
      placeholder="请输入密码">
      </form-item>
      <form-item
      class="log-form-item"
      type="password"
      v-model= "form.confirm"
      icon-left="icon-lock"
      :error-tips="errors['confirm']"
      placeholder="请再次输入密码">
      </form-item>
    </div>
    <div slot="foot">
      <span class="login-btn" @click="submit">保存</span>
      <span class="login-btn" @click="cansel">取消</span>
    </div>
  </div>
</template>

<script>
  
import dialogBar from './../components/DialogBar'
import FormItem from './../components/FormItem'
import {getCode } from './../api/login'
import { forgetPwd } from './../api/mine'
import {getLocalStorage} from './../assets/js/storage.js'
export default {
  name: 'RegisterDialog',
  components: {
    dialogBar,
    FormItem
  },
  data () {
    return {
      visibile: false,
      showLogin: false,
      modalVisible: false,
      cutdown: 60,
      showTime: false,
      timmer: null,
      channel: '',
      form: {
        mobile: '',
        password: '',
        confirm: '',
        verify_code: ''
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
    },
    'form.confirm': {
      test (val) {
        return val === this.form.password
      },
      message: '密码输入不一致'
    },
    'form.verify_code': {
       test (val) {
        return val !== ''
      },
      message: '请输入验证码'
    },
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
  watch: {
    'visibile' (val) {
      if (!val) {
        this.channel = getLocalStorage('channel')
        this.showTime = false
        window.clearInterval(this.timmer)
        this.timmer = null
      }
    }
  },
  methods: {
    submit () {
      if (!this.$vuerify.check()) {
        return
      }
      let params = {
        mobile: this.form.mobile,
        password: this.form.password,
        verify_code: this.form.verify_code
      }
      forgetPwd(params).then(res => {
        if(res.data.code == 0) {
          let data = res.data.data
          this.$cookies.set('user', data, '1d');
          this.$store.commit('setUser', data)
          this.visibile = false
          this.$message({
            type: 'success',
            message: '修改成功, 去登录'
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    cansel(){
     this.$router.push({path: 'home'})
    },
    getVerifyCode () {
      if (!this.$vuerify.check(['form.mobile'])) {
        return
      }
      let params = {
        mobile: this.form.mobile
      }
      getCode(params).then(res => {
        if (res.data.code == 0) {
          this.showTime = true
          this.timmer = setInterval(() => {
            if (this.cutdown === 0) {
              this.showTime = false
              this.cutdown = 60
              window.clearInterval(this.timmer)
              this.timmer = null
            } else {
              this.cutdown--
            }
          },1000)
          this.$message({
            type: 'success',
            message: '已发送'
          })
        }  else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
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
.forget{
  width: 500px;
  margin: 50px auto;
  text-align: center;
  /deep/ .content {
    height: 440px;
    padding: 40px 0 30px;
    width: 420px;
    margin: auto;
  }
  /deep/ .log-form-item {
     &:not(:last-of-type) {
       border-bottom: 0;
       }
    .input-inner {
      line-height: 30px;
    }
    .yzm-btn {
      display: inline-block;
      width: 210px;
      line-height: 50px;
      margin-right: -11px;
      text-align: center;
      font-size: 20px;
      color: #ffffff;
      background: #2b93c6;
    }
  }
}

</style> 