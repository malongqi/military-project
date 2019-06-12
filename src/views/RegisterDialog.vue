<template>
  <am-modal custom-class="login-dialog" :is-show.sync="modalVisible" :width="760">
    <am-modal-header>
      <p class="title">注册</p>
      <span class="showLogin" @click="showLogin = true;">已有账号去登陆</span>
    </am-modal-header>
    <am-modal-body>
        <am-form custom-class="loginform">
          <am-input-group block>
            <am-input-label transparent slot="prepend">
                <am-icon type="user" placeholder="请输入昵称"></am-icon>
            </am-input-label>
            <am-input></am-input>
          </am-input-group>
          <am-input-group block>
            <am-input-label transparent slot="prepend">
                <am-icon type="lock"></am-icon>
            </am-input-label>
            <am-input type="number" placeholder="请输入手机号"></am-input>
          </am-input-group>
          <am-input-group block>
            <am-input-label transparent slot="prepend">
                <am-icon type="lock"></am-icon>
            </am-input-label>
            <am-input type="password" placeholder="请输入密码"></am-input>
          </am-input-group>
          <am-input-group block>
            <am-input-label transparent slot="prepend">
                <am-icon type="lock"></am-icon>
            </am-input-label>
            <am-input type="password" placeholder="请再次输入密码"></am-input>
          </am-input-group>
          <am-input-group block>
            <am-input-label transparent slot="prepend">
                <am-icon type="lock"></am-icon>
            </am-input-label>
            <am-input type="password" placeholder="请输入手机验证码"></am-input>
            <am-button color="primary" size="xl" custom-class="login-btn">获取验证码</am-button>
          </am-input-group>
      </am-form>
    </am-modal-body>
    <am-modal-footer>
        <am-button color="primary" size="xl" custom-class="login-btn">注册</am-button>
        <am-button color="primary" size="xl" custom-class="login-btn">取消</am-button>
    </am-modal-footer>
  </am-modal>
</template>

<script>
export default {
  name: 'LoginDialog',
  data () {
    return {
      showRegister: false,
      modalVisible: false
    };
  },
  computed: {},
  methods: {}
}
</script>
<style lang='scss' scoped>
.showLogin {
  position: absolute;
  top:10px;
  right:10px;
  z-index: 2;
  background: #2b93c6;
}
</style>