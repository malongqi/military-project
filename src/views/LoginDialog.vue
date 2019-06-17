<template>
  <dialog-bar
    class="login-dialog"
    v-model="visibile"
    :width="720"
    type="danger"
    title="我是标题"
    content="我是内容"
    v-on:cancel="clickCancel()"
    @danger="clickDanger()"
    @confirm="clickConfirm()"
    dangerText="Delete">
    <div>
      <form-item
      class="log-form-item"
      icon-left="icon-user"
      placeholder="请输入用户名">
      </form-item>
      <form-item
      class="log-form-item"
      type="password"
      icon-left="icon-lock"
      placeholder="请输入密码">
      </form-item>
    </div>
    <div slot="foot">
      <span class="login-btn">注册</span>
      <span class="login-btn">取消</span>
    </div>
  </dialog-bar>
</template>

<script>
  
import dialogBar from './../components/DialogBar'
import FormItem from './../components/FormItem'
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
      modalVisible: false
    };
  },
  methods: {
    openMask(index){
      this.visibile = true;
    },
    clickCancel(){
      console.log('点击了取消');
    },
    clickDanger(){
      console.log('这里是danger回调')
    },
    clickConfirm(){
      console.log('点击了confirm');
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
  /deep/ .content {
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