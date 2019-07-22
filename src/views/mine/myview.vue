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
          prop="title"
          width="500"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="visit_time"
          label="浏览时间"
          width="180">
          <!-- <template slot-scope="scope">
            {{timestampToTime(scope.row.visit_time)}}
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
import {getMyView} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      tableData: [],
      pagination: {
        pageIndex: 1,
        pageSize: 15,
        pageTotal: 0,
      }
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
      getMyView(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.tableData = data.items
          this.pagination.pageTotal = parseInt(data.total_num)
          this.$store.commit('handleLoad', false)
        }
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
    border-bottom: 1px solid #e6e6e6;
  }
  .table-content {
    padding-bottom: 30px; 
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
}
</style>