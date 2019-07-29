<template>
  <div class="table-container">
    <div class="table-header">
      <span>修改手机号</span>
    </div>
    <div class="table-content">
      <el-form class="form-list" :rules="rules" ref="form" :model="form" label-width="130px">
        <el-form-item label="旧手机号" prop="oldMobile">
          <el-input v-model="form.oldMobile"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="新手机号" prop="newMobile">
          <div class="inner-block">
            <el-input v-model="form.newMobile"></el-input>
            <el-button v-if="!showTime" @click.prevent="getVerifyCode" class="btn-code">获取验证码</el-button>
            <el-button class="btn-code" v-else>{{cutdown}}S</el-button>
          </div>
        </el-form-item>
        <el-form-item label="验证码" prop="yzm">
          <el-input v-model="form.yzm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :loading="loading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getCode, modifyMobile} from './../../api/login'
// import {modifyMobile} from './../../api/mine'
export default {
  components: {},
  data () {
    var validatemobile = (rule, value, callback) => {
      let reg = /^1[3456789]\d{9}$/
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号'));
      } else {
        callback();
      }
    }
    return {
      showTime: false,
      cutdown: 60,
      loading: false,
      form: {
        oldMobile: '',
        password: '',
        yzm: '',
        newMobile: ''
      },
      rules: {
        oldMobile: [
          { required: true, validator: validatemobile, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' }
        ],
        yzm: [
          { required: true, message: '请填入验证码', trigger: 'blur' }
        ],
        newMobile: [
          { required: true,validator: validatemobile, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit (formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            old_mobile: this.form.oldMobile,
            old_password: this.form.password,
            mobile: this.form.newMobile,
            verify_code: this.form.yzm
          }
          modifyMobile(params).then(res => {
            this.loading = false
            if (res.data.code == 0){
              this.loading = false
              this.$router.push({path: 'login'})
              this.$cookies.remove('token')
              this.$cookies.remove('user')
              this.$store.commit('setUser', {})
              this.$message({
                type: 'success',
                message: '修改成功，重新登录'
              })
            } else {
              this.loading = false
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          this.loading = false
          console.log('error submit!!');
          return false;
        }
      })
    },
    getVerifyCode () {
      this.$refs.form.validateField('newMobile', (phoneError) => {
        return
      })
      let params = {
        mobile: this.form.newMobile
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
        } else {
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
.table-container {
  padding: 0 20px;
  margin-bottom: 40px;
  border: 1px solid #e6e6e6;
  .table-header {
    display: flex;
    line-height: 56px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;
    .list-edit {
      background: #2b93c6;
      color: #fff;
      width: 96px;
      height: 30px;
      line-height: 30px;
      text-align: center;
    }
  }
  .table-content {
    padding: 30px 0;
  }
  .btn-code {
    width: 120px;
    margin-left: 10px;
  }
  a {
    color: #333;
  }
  /deep/ .el-table {
    th {
      background: #2b93c6;
      color: #fff;
    }
    .cell {
      white-space: nowrap;
    }
  }
  .list {
    position: relative;
    padding-left: 120px;
    color: #e6e6e6;
    label {
      position: absolute;
      left: 0;
      line-height: 40px;
    }
  }
  .inner-block {
    display: flex;
  }
  .address-list {
    .list-item {
      display: flex;
      color: #2c2222;
      line-height: 40px;
      justify-content: space-between;
      >div {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .list-tit, .list-sub {
        width: 20%;
      }
      .list-edit {
        width: 10%;
        text-align: center;
        color: #e62626;
      }
      .list-adress {
        width: 40%;
      }
    }
  }
}
.form-list {
  .el-form-item {
    width: 600px;
  }
  .form-inner {
    width: auto;
    .el-select {
      margin-right: 30px;
    }
  }
}
</style>