<template>
  <dialog-bar
    class="register-dialog"
    v-model="visibile"
    :width="720"
    type="danger"
    title="注册"
    v-on:cancel="clickCancel()"
    @danger="clickDanger()"
    @confirm="clickConfirm()"
    dangerText="Delete">
    <div>
      <form-item
      class="log-form-item"
      icon-left="icon-user"
      v-model= "form.nickname"
      :error-tips="errors['nickname']"
      placeholder="请输入昵称">
      </form-item>
      <form-item
      class="log-form-item"
      type="icon-user"
      v-model= "form.mobile"
      icon-left="icon-lock"
      :error-tips="errors['mobile']"
      placeholder="请输入手机号">
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
      <form-item
      class="log-form-item"
      type="password"
      v-model= "form.verify_code"
      icon-left="icon-lock"
      :error-tips="errors['verify_code']"
      placeholder="短信验证码">
      <span class="yzm-btn" slot="iconRight" @click="getVerifyCode">获取验证码</span>
      </form-item>
    </div>
    <div slot="foot">
      <span class="login-btn" @click="submit">注册</span>
      <span class="login-btn" @click="cansel">取消</span>
    </div>
  </dialog-bar>
</template>

<script>
  
import dialogBar from './../components/DialogBar'
import FormItem from './../components/FormItem'
import { register, getCode } from './../api/login'
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
      form: {
        nickname: '',
        mobile: '',
        password: '',
        confirm: '',
        verify_code: ''
      }
    };
  },
  vuerify: {
    'form.nickname': {
        test (val) {
          return val !== ''
        },
        message: '请输入用户名'
    },
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
        debugger

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
  methods: {
    submit () {
      if (!this.$vuerify.check()) {
        return
      }
      let formData = new FormData()
      formData.append('nickname', this.form.nickname)
      formData.append('mobile', this.form.mobile)
      formData.append('password', this.form.password)
      formData.append('verify_code', this.form.verify_code)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      register(formData, config).then(res => {
        if(res.data.code == 0) {
          this.$toasted.show('注册成功', {
            type : 'success',
          })
        } else {
          this.$toasted.show(res.data.msg, {
            type : 'error',
          })
        }
      })
    },
    cansel(){
     this.visibile = false
    },
    getVerifyCode () {
      let formData = new FormData()
      formData.append('mobile', this.form.mobile)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      getCode(formData, config).then(res => {

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
.register-dialog {
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