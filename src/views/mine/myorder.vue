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
          width="200" 
          show-overflow-tooltip
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="price"
          width="90"
          label="应付金额">
        </el-table-column>
        <el-table-column
          prop="order_time"
          label="订单产生时间"
          width="170">
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
              <span class="blue" v-if="scope.row.pay_status == 1">已支付</span>
              <span class="red" v-if="scope.row.pay_status == 0">未支付</span>
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
            <router-link v-if="scope.row.pay_status == 0" class="btn-text red" :to="{path: 'detail', query:{courseId: scope.row.id}}">去付款</router-link>
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
  </div>
</template>

<script>
import {getOrderList,deleteOrder} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      tableData: [],
      pagination: {
        pageIndex: 1,
        pageSize: 15,
        pageTotal: 100,
      },
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
    border-bottom: 1px solid #2c2222;
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
  .btn-text {
    padding: 0 5px;
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
}
.red {
  color: #e26262;
}
.blue {
  color: #2b93c6;
}
</style>