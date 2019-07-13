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
          prop="title"
          width="500"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="购买时间"
          width="180">
          <template slot-scope="scope">
            {{timestampToTime(scope.row.update_time)}}
          </template>
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
  </div>
</template>

<script>
import {getMyCourse} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      user: '',
      tableData: [],
      pagination: {

      }
    }
  },
  computed: {},
  mounted() {
    this.user = this.$cookies.get('user');
    this.getData()
  },
  methods: {
    getData () {
      let params = {
        page_index: 1,
        page_size: 20
      }
      getMyCourse(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.tableData = data.items
          this.$store.commit('handleLoad', false)
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
    border-bottom: 1px solid #2c2222;
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