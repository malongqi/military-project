<template>
  <div class="table-container">
    <div class="table-header">
      <span>完善资料</span>
    </div>
    <div class="table-content">
      <el-form class="form-list" :rules="rules" ref="form" :model="form" label-width="130px">
        <el-form-item label="头像" class="form-inner">
          <!-- <el-input v-model="form.avatar"></el-input> -->
          <el-input ref="avatar" v-model="pic"></el-input>
          
          <el-button class="upload-btn" size="small" type="primary">
            <!-- <el-input type="file"></el-input> -->
            <input class="upload" type="file" @change="getFile">
            点击上传
          </el-button>
          
        </el-form-item>
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="0">男</el-radio>
            <el-radio label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{mobile}}</span>
          <span>修改联系客服</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')" :loading="loading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {modifyUser, getUser} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      editState: false,
      loading: false,
      mobile: '',
      file: '',
      pic: '',
      form: {
        head_pic: '',
        nickname: '',
        email: '',
        sex: '',
      },
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { max: 5, message: '不可超过15个字符', trigger: 'blur' }
        ],
        email: [
          {
            validator: (rule, value, callback) => {
              if (!/^\w+@[a-z0-9]+\.[a-z]{2,4}$/.test(value)) {
                callback(new Error('请输入正确的邮箱!'));
              } else {
                callback();
              }
            },
            trigger: 'blur' 
          }
        ]
      }
    }
  },
  computed: {},
  mounted() {
    this.getUserInfor()
  },
  methods: {
    getUserInfor () {
      getUser().then(res => {
        if (res.data.code == 0) {
          let user = res.data.data
          this.form =  {
            head_pic: user.head_pic,
            nickname: user.nickname,
            email: user.email,
            sex: user.sex,
          }
          // this.$store.commit('setUser', res.data.data)
        }
      })
    },
    getFile (e) {
      this.file = e.target.files[0]
      this.pic = this.file.name
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {
            head_pic: this.file,
            nickname: this.form.nickname,
            email: this.form.email,
            sex: this.form.sex,
          }
          modifyUser(params).then(res => {
            if (res.data.code == 0) {
              this.getUserInfor()
              this.loading = false
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
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
.upload-btn {
  position: relative;
  .upload {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.form-list {
  .el-form-item {
    width: 600px;
  }
  .form-inner {
    /deep/ .el-form-item__content {
      display: flex;
    } 
    .upload-btn {
      margin-left: 20px;
    }
  }
}
</style>