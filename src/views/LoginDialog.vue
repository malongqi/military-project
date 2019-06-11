<template>
  <am-modal :is-show.sync="modalVisible" :width="760">
    <am-modal-header>
      <p class="title">{{showLogin? '登陆': '注册'}}</p>
      <span class="showLogin" @click="showLogin = true">已有账号去登陆</span>
    </am-modal-header>
    <am-modal-body>
        <am-form custom-class="loginform">
            <am-input-group block>
                <am-input-label transparent slot="prepend">
                    <am-icon type="user" placeholder="请输入您的帐号"></am-icon>
                </am-input-label>
                <am-input></am-input>
            </am-input-group>
            <am-input-group block>
                <am-input-label transparent slot="prepend">
                    <am-icon type="lock"></am-icon>
                </am-input-label>
                <am-input type="password" placeholder="请输入您的密码"></am-input>
            </am-input-group>
            <am-input-group block>
                <am-input-label transparent slot="prepend">
                    <am-icon type="lock"></am-icon>
                </am-input-label>
                <am-input type="password" placeholder="请确认您的密码"></am-input>
            </am-input-group>
            <am-input-group>
                <am-checkbox>男</am-checkbox>
                <am-checkbox>女</am-checkbox>
            </am-input-group>
            <am-input-group>
                <am-select :options="sections"></am-select>
            </am-input-group>
        </am-form>
    </am-modal-body>
    <am-modal-footer>
        <am-button color="primary">注册</am-button>
        <am-button>取消</am-button>
    </am-modal-footer>
  </am-modal>
</template>

<script>
export default {
  name: 'LoginDialog',
  data () {
    return {
      showLogin: false,
      sections: [{
          value: 1,
          label: '安全部',
          guesser: 'anquan'
        }, {
          value: 2,
          label: 'IT部',
          guesser: 'it'
        }, {
          value: 3,
          label: '人事部',
          guesser: 'renshi'
        }],
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
.loginform {
  width: 420px;
  margin: 40px auto;
  /deep/ .am-form-field {
    padding: 12px;
  }
}
</style>