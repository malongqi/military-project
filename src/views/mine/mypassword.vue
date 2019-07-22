<template>
  <div class="table-container">
    <div class="table-header">
      <span>修改密码</span>
    </div>
    <div class="table-content">
      <el-form class="form-list" :rules="rules" ref="form" :model="form" label-width="130px">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="form.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="form.newPwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwdConfirm">
          <el-input type="password" v-model="form.pwdConfirm"></el-input>
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
        oldPwd: '',
        newPwd: '',
        pwdConfirm: '',
      },
      rules: {
        oldPwd: [
          { required: true, message: '请填写旧密码', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '请填写新密码', trigger: 'blur' }
        ],
        pwdConfirm: [
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.form.newPwd) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          }, required: true, message: '请再次输入密码', trigger: 'change' }
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
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
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