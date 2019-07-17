<template>
  <div class="table-container">
    <div class="table-header">
      <span>修改手机号</span>
    </div>
    <div class="table-content">
      <el-form class="form-list" :rules="rules" ref="form" :model="form" label-width="130px">
        <el-form-item label="旧手机号" prop="oldMobile">
          <div class="inner-block">
            <el-input type="password" v-model="form.oldMobile"></el-input>
            <el-button v-if="!showTime" @click.prevent="getVerifyCode">获取验证码</el-button>
            <span v-else class="time yzm-btn" slot="iconRight">{{cutdown}}S</span>
          </div>
        </el-form-item>
        <el-form-item label="新手机号" prop="newMobile">
          <el-input type="password" v-model="form.newMobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {modifyPwd} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      editState: false,
      form: {
        oldMobile: '',
        newMobile: '',
        pwdConfirm: '',
      },
      rules: {
        oldMobile: [
          { required: true, message: '请填写旧密码', trigger: 'blur' }
        ],
        newMobile: [
          { required: true, message: '请填写新密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            old_password: this.form.oldPwd,
            password: this.form.newPwd
          }
          modifyPwd(params).then(res => {
            if (res.data.code == 0){
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    getVerifyCode () {
      if (!this.$vuerify.check(['form.oldMobile'])) {
        return
      }
      let params = {
        mobile: this.form.oldMobile
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
    border-bottom: 1px solid #2c2222;
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