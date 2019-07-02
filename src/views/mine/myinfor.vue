<template>
  <div class="table-container">
    <div class="table-header">
      <span>修改秘密</span>
    </div>
    <div class="table-content">
      <el-form class="form-list" ref="form" :model="form" label-width="130px">
        <el-form-item label="头像" class="form-inner">
          <el-input v-model="form.avatar"></el-input>
          <el-upload
            class="upload-btn"
            action="https://jsonplaceholder.typicode.com/posts/"
            >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nikename"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{mobile}}</span>
          <span>修改联系客服</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getMyAddress,getProvinceList,getCityList,getCountyList} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      editState: false,
      mobile: '',
      form: {
        oldPassword: '',
        newPassword: '',
        passwordConfirm: '',
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    onSubmit () {},
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
    /deep/ .el-form-item__content {
      display: flex;
    } 
    .upload-btn {
      margin-left: 20px;
    }
  }
}
</style>