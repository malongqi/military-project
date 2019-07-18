<template>
  <div class="table-container">
    <div class="table-header">
      <span>订单详情</span>
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="title"
          width="500"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="buy_time"
          label="购买时间"
          width="180">
          <!-- <template slot-scope="scope">
            {{timestampToTime(scope.row.update_time)}}
          </template> -->
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="课程详情">
          <template slot-scope="scope">
            <router-link :to="{path: 'detail', query:{courseId: scope.row.id}}">查看</router-link>
          </template>
        </el-table-column>
      </el-table>
      <div>
        <el-steps finish-status="success">
          <el-step v-for="item in steps" :key="item.name" :title="item.name" :description="item.time" :icon="item.finished ? 'finished': 'waiting'"></el-step>
        </el-steps>
      </div>
      <div>
        订单状态: 带出库
      </div>
      <div class="bottom-lists">
        <div class="list">
          <h4>收货信息   <span>【修改】</span></h4>
          <ul>
            <li class="list-item"><label for="">姓名</label> <div>孙小静</div></li>
          </ul>
        </div>
        <div class="list">
          <h4>发票信息   <span>【修改】</span></h4>
          <ul>
            <li class="list-item"><label for="">姓名</label> <div>孙小静</div></li>
          </ul>
        </div>
      </div>
      <div class="align-right">
        <span class="return">返回</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getOrderDetail} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      id: '',
      tableData: [],
      steps: [
        {
          name: '下单',
          finished: true,
          time:121221
        },
        {
          name: '付款',
          finished: true,
          time:121221
        },
        {
          name: '配货',
          finished: false,
          time:121221
        }
      ],
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
  mounted() {
    this.id = this.$route.query.id
    this.getDatail()
  },
  methods: {
    getDatail () {
      let params = {
        order_id: this.id
      }
      getOrderDetail(params).then(res => {
        if (res.data.code == 0){
          this.tableData = res.data.data.items
        }
      })
    },
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
  /deep/ .finished {
    width: 20px;
    height: 20px;
    border-radius: 30px;
    background: #8fc31c
  }
  /deep/ .waiting {
    width: 20px;
    height: 20px;
    border-radius: 30px;
    background: #cccccc
  }
  .bottom-lists {
    display: flex;
    .list {
      width: 50%;
      margin: 0;
    }
    .list-item {
      display: flex;
      padding-left: 20px;
      label{
        display: inline-block;
        width: 70px;
        margin-right: 20px;
        text-align: justify;
        &::after {
            display: inline-block;
            width: 100%;
            content: '';
            height: 0;
        }
      }
    }
  }
  .inner-block {
    display: flex;
  }
  .align-right {
    text-align: right;
  }
  .return {
    display: inline-block;
    width: 80px;
    height: 32px;
    line-height: 32px;
    border-radius: 5px;
    background: #2b93c6;
    color: #fff;
    text-align: center;
    font-size:16px;
  }
}
</style>