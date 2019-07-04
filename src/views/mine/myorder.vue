<template>
  <div class="table-container">
    <div class="table-header">
      我的课程
    </div>
    <div class="table-content">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="order_id"
          width="60"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="order_number"
          label="订单号">
        </el-table-column>
        <el-table-column
          prop="name"
          width="200"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="应付金额">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="订单产生时间">
        </el-table-column>
        <el-table-column
          prop="pay_status"
          width="80"
          label="订单状态">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          width="160"
          label="操作">
          <template slot-scope="scope">
            <router-link class="btn-text" :to="{path: 'detail', query:{courseId: scope.row.id}}">查看</router-link>
            <router-link class="btn-text" :to="{path: 'detail', query:{courseId: scope.row.id}}">删除</router-link>
            <router-link class="btn-text" :to="{path: 'detail', query:{courseId: scope.row.id}}">去付款</router-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getOrderList} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      tableData: [],
      pagination: {

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
        page_index: 1,
        page_size: 20
      }
      getOrderList(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.tableData = data.items
          this.$store.commit('handleLoad', false)
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
    line-height: 56px;
    border-bottom: 1px solid #2c2222;
  }
  a {
    color: #333;
  }
  .btn-text {
    padding: 0 5px;
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
</style>