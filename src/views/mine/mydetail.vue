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
          type="index"
          width="60"
          align="center"
          label="序号">
        </el-table-column>
        <el-table-column
          prop="product_name"
          width="300"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="pay_time"
          label="付款时间"
          width="180">
          <!-- <template slot-scope="scope">
            {{timestampToTime(scope.row.update_time)}}
          </template> -->
        </el-table-column>
        <el-table-column
          prop="product_num"
          label="商品数量">
        </el-table-column>
        <el-table-column
          prop="pay_fee"
          label="订单金额">
        </el-table-column>
        <!-- <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <router-link :to="{path: 'detail', query:{courseId: scope.row.id}}">申请退款</router-link>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="wrapper" v-if="product_type == 2">
        <el-steps finish-status="success">
          <el-step v-for="item in steps" :key="item.name" :title="item.name" :description="item.time" :icon="item.status==1 ? 'finished': 'waiting'"></el-step>
        </el-steps>
      </div>
      <div class="status" v-if="product_type == 2">
        订单状态: 待出库
      </div>
      <div class="bottom-lists" v-if="product_type == 2">
        <div class="list" v-for="(list,index) in getList" :key="'list' + index">
          <h4>收货信息   <span>【修改】</span></h4>
          <ul>
            <li class="list-item"><label for="">姓名</label> <div>{{list.receive_name}}</div></li>
            <li class="list-item"><label for="">收货地址</label> <div>{{list.receive_address}}</div></li>
            <li class="list-item"><label for="">收货电话</label> <div>{{list.receive_mobile}}</div></li>
          </ul>
        </div>
        <!-- <div class="list">
          <h4>发票信息   <span>【修改】</span></h4>
          <ul>
            <li class="list-item"><label for="">姓名</label> <div>孙小静</div></li>
          </ul>
        </div> -->
      </div>
      <div class="align-right">
        <router-link :to="{path: 'myorder'}" class="return">返回</router-link>
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
      steps: [],
      getList: [],
      product_type: '',
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
          let data = res.data.data
          this.product_type = data.product.product_type
          this.tableData.push(data.product)
          this.steps = data.express
          this.getList.push(data.receive)
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
  .wrapper {
    padding: 30px 20px;
    border:1px solid #EBEEF5;
    border-top:0;
  }
  .status {
    padding: 10px 20px;
    border:1px solid #EBEEF5;
    border-top:0;
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
    margin-top: 30px;
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