<template>
  <div class="table-container">
    <div class="table-header">
      我的课程
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          width="60"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="order_number"
          width="280"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150" 
          show-overflow-tooltip
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="price"
          width="80"
          label="支付金额">
        </el-table-column>
        <el-table-column
          prop="pay_time"
          label="订单产生时间"
          show-overflow-tooltip
          width="150">
          <!-- <template slot-scope="scope">
            {{timestampToTime(scope.row.create_time)}}
          </template> -->
        </el-table-column>
        <el-table-column
          prop="pay_status"
          width="80"
          align="center"
          label="订单状态">
           <template slot-scope="scope">
              <span class="red" v-if="scope.row.pay_status == 0">待支付</span>
              <span class="green" v-if="scope.row.pay_status == 1">支付成功</span>
              <span class="blue" v-if="scope.row.pay_status == 2">支付失败</span>
              <span class="red" v-if="scope.row.pay_status == 3">支付过期</span>
              <span class="red" v-if="scope.row.pay_status == 4">课程已过期</span>
           </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="left"
          width="160"
          label="操作">
          <template slot-scope="scope">
            <router-link class="btn-text" :to="{path: 'mydetail', query:{id: scope.row.order_id}}">查看</router-link>
            <span class="btn-text" @click="deleteOrderItem(scope.row)">删除</span>
            <span v-if="scope.row.pay_status == 0" class="btn-text red" @click="goPay(scope.row)">去付款</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-box" v-if="Math.floor(pagination.pageTotal/pagination.pageSize) > 0">
      <el-pagination
        prev-text="上一页"
        next-text="下一页"
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        :total="pagination.pageTotal"
        @current-change="handleChange">
      </el-pagination>
    </div>
     <el-dialog
      title="请选择支付方式"
      :visible.sync="shouPayType"
      width="400px">
      <div class="radio-group">
        <el-radio v-model="radioValue" :label="check.type" v-for="(check, index) in checkList" :key="'check' + index">
          <img width="100" v-if="check.type == '1'" src="./../../assets/images/zfb.jpg" alt="">
          <img width="100" v-if="check.type == '2'" src="./../../assets/images/wx.png" alt="">
        </el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shouPayType = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="payVisible"
      width="800px">
      <div class="dialog-content">
        <div>
          <div>订单号：{{payParam.order_id}}</div>
          <img :src="payParam.code_url" alt="">
        </div>
        <div>
          <img src="./../../assets/images/weixin-qrcode.jpg" alt="">
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getOrderList,deleteOrder,goToPay,checkWxPay} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      tableData: [],
      shouPayType: false,
      payVisible: false,
      radioValue: '1',
      checkList: [
        {
          type: '1',
        },
        {
          type: '2'
        }
      ],
      pagination: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal: 0,
      },
      toPayRow: '',
      payParam: '',
      timer: null,
      user: ''
    }
  },
  computed: {},
  mounted() {
    this.user = this.$cookies.get('user')
    this.getData()
  },
  methods: {
    getData () {
      let params = {
        page_index: this.pagination.pageIndex,
        page_size: this.pagination.pageSize
      }
      getOrderList(params).then(res => {
        // pay_status 0:未支付 1:已支付
        if (res.data.code == 0) {
          let data = res.data.data
          this.tableData = data.items
          this.pagination.pageTotal = parseInt(data.total_num)
          this.$store.commit('handleLoad', false)
        }
      })
    },
    deleteOrderItem (item) {
      this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            order_id: item.order_id
          }
          deleteOrder(params).then(res => {
            if (res.data.code == 0) {
              this.getData()
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            }
          })
        })
    },
    handleChange (val) {
      this.pagination.pageIndex = val
      this.getData()
    },
    goPay(row) {
      this.toPayRow = row
      this.shouPayType = true
    },
    checkPay () {
      let params = {
        order_id: this.payParam.order_id
      }
      checkWxPay(params).then(res => {
        if (res.data.code == 2000) {
          this.payVisible = false
          window.clearInterval(this.timer)
          this.timer = null;
          this.$router.push({path:'/mycourse'})
        } else if(res.data.code == 2002){
          this.payVisible = false
          window.clearInterval(this.timer)
          this.timer = null;
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    submit () {
      let params = {
        order_id: this.toPayRow.order_id,
        pay_type: this.radioValue
      }
      goToPay(params).then(res => {
          if (res.data.code == 0) {
            if (this.radioValue == 1) {
              let data = res.data.data
              window.open(data.confirm_url + '?order_id=' + data.order_id + '&token=' + this.$cookies.get('token'))
            }

            if (this.radioValue == 2) {
              this.shouPayType = false
              this.payVisible = true
              this.payParam = res.data.data
              this.timer = setInterval(() => {
                this.checkPay()
              },2000)
            }
            
          } else {
            this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
        })
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = date.getDate() + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      return Y+M+D+h+m+s;
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
    line-height: 56px;
    border-bottom: 1px solid #e6e6e6;
  }
  .table-content {
    padding-bottom: 30px;
  }
  a {
    color: #333;
    &.red {
      color: #e26262;
    }
  }
  span {
    &.red {
      color: #e26262;
    }
  }
  .radio-group {
    display: flex;
    .el-radio {
      display: flex;
      align-items: center;
    }
  }
  .btn-text {
    padding: 0 5px;
    color: #333;
    cursor: pointer;
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
}
.dialog-content {
  display: flex;
  justify-content: space-between;
  .code {
    margin-top: 40px;
    width: 300px;
    img{
      width: 100%;
    }
  }
}
.red {
  color: #e26262;
}
.blue {
  color: #2b93c6;
}
</style>