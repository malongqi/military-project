<template>
  <div class="table-container">
    <div class="table-header">
      <span>收货地址</span>
      <span class="list-edit" @click="handleEditAddress">添加地址</span>
    </div>
    <div class="table-content">
      <div class="list" v-if="!editState">
        <label for="">默认收货地址</label>
        <ul class="address-list">
          <li
            class="list-item"
            v-for="(item, index) in tableData"
            :key="index"
            >
            <div class="list-tit">{{item.name}}</div>
            <div class="list-sub">{{item.mobile}}</div>
            <div class="list-adress">{{item.addr_detail}}</div>
            <div class="list-edit" @click="modifyAddress">修改</div>
          </li>
        </ul>
      </div>
      <el-form v-else class="form-list" ref="form" :model="form" label-width="130px">
        <el-form-item label="活动名称" class="form-inner">
          <el-select v-model="form.province" placeholder="请选择省" @change="handleChangeProvince">
            <el-option
              v-for="(item,index) in provinceList"
              :key="'province' + index"
              :label="item.name"
              :value="item.provinceId">
            </el-option>
          </el-select>
          <el-select v-model="form.city" placeholder="请选择市" @change="handleChangeCity">
            <el-option
              v-for="(item,index) in cityList"
              :key="'city' + index"
              :label="item.name"
              :value="item.cityId">
            </el-option>
          </el-select>
          <el-select v-model="form.county" placeholder="请选择县">
            <el-option
              v-for="(item,index) in countyList"
              :key="'county' + index"
              :label="item.name"
              :value="item.countyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收件人姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input type="" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="是否设为常用地址">
          <el-switch v-model="form.isdefalut"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="resetForm('form'); editState = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getMyAddress,getProvinceList,getCityList,getCountyList,addMyAddress,editMyAddress} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      editState: false,
      tableData: [],
      form: {
        province: '',
        city: '',
        county: '',
        name: '',
        desc: '',
        mobile: '',
        isdefalut: false,
      },
      provinceList: [],
      cityList: [],
      countyList: [],
      pagination: {

      }
    }
  },
  computed: {},
  mounted() {
    this.user = this.$cookies.get('user')
    this._getProvinceList()
    this.getData()
  },
  methods: {
    getData () {
      let params = {
        user_id: this.user.uid,
        page_index: 1,
        page_size: 20
      }
      getMyAddress(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.tableData = data.items
          this.$store.commit('handleLoad', false)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },    
    onSubmit () {
      let params = {
        user_id: this.user.uid,
        provinceId: this.form.province,
        cityId: this.form.city,
        countyId: this.form.county,
        name: this.form.name,
        detail_addr: this.form.desc,
        mobile: this.form.mobile,
        isdefalut: this.form.isdefalut
      }
      addMyAddress(params).then(res => {
        if (res.data.code == 0) {
          this.editState = false
          this.$toasted.show('添加成功', {
            type : 'success',
          })
        } else {
         this.$toasted.show('res.data.msg', {
            type : 'error',
          })
        }
      })
    },
    handleEditAddress () {
      this.editState = true
      this._getProvinceList()
    },
    handleChangeProvince (val) {
      this._getCityList(val)
    },
    handleChangeCity (val) {
      this._getCountyList(val)
    },
    _getProvinceList (val) {
      getProvinceList(val).then(res => {
        if (res.data.code == 0) {
          this.provinceList = res.data.data.items
        }
      })
    },
    _getCityList (val) {
      let params = {
        provinceId: val
      }
      getCityList(params).then(res => {
        if (res.data.code == 0) {
          this.cityList = res.data.data.items
        }
      })
    },
    _getCountyList (val) {
      let params = {
        cityId: val
      }
      getCountyList(params).then(res => {
        if (res.data.code == 0) {
          this.countyList = res.data.data.items
        }
      })
    },
    modifyAddress (row) {
      this.editState = true
      this.form =  {
        province: '',
        city: '',
        county: '',
        name: '',
        desc: '',
        mobile: '',
        isdefalut: false
      }
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
      cursor: pointer;
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
    color: #666;
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