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
            v-for="(item, index) in defaultAddr"
            :key="index"
            >
            <div class="list-tit">{{item.name}}</div>
            <div class="list-sub">{{item.mobile}}</div>
            <div class="list-adress">{{item.addr_all}}{{item.addr_detail}}</div>
            <div class="list-edit">
              <span @click="modifyAddress(item)" class="btn">修改</span>
              <span @click="deletAddress(item)" class="btn">删除</span>
            </div>
          </li>
        </ul>
        <ul class="address-list">
          <li
            class="list-item"
            v-for="(item, index) in tableData"
            :key="index"
            >
            <div class="list-tit">{{item.name}}</div>
            <div class="list-sub">{{item.mobile}}</div>
            <div class="list-adress">{{item.addr_all}}{{item.addr_detail}}</div>
            <div class="list-edit">
              <span @click="modifyAddress(item)" class="btn">修改</span>
              <span @click="deletAddress(item)" class="btn">删除</span>
            </div>
          </li>
        </ul>
      </div>
      <el-form v-else class="form-list" :rules="rules" ref="form" :model="form" label-width="130px">
        <el-form-item label="地址" class="form-inner">
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
        <el-form-item label="电话" prop="mobile">
          <el-input type="" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="是否设为常用地址">
          <el-switch v-model="form.isdefalut"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
          <el-button @click="resetForm('form'); editState = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {getMyAddress,getProvinceList,getCityList,getCountyList,addMyAddress,editMyAddress,deletMyAddress} from './../../api/mine'
export default {
  components: {},
  data () {
    return {
      editState: false,
      tableData: [],
      form: {
        addr_id: '',
        province: '',
        city: '',
        county: '',
        name: '',
        desc: '',
        mobile: '',
        isdefalut: false,
      },
      rules: {
        mobile: [
          {
            required: true,
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入手机号'));
              } else if (!/^1[3456789]\d{9}$/.test(value)) {
                callback(new Error('请输入正确的手机号'));
              } else {
                callback();
              }
            },
            trigger: 'change'
          }
        ]
      },
      provinceList: [],
      modify: 0,
      cityList: [],
      countyList: [],
      pagination: {}
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
        page_index: 1,
        page_size: 20
      }
      getMyAddress(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.tableData = data.items
          this.defaultAddr = this.tableData.some(item => {})
          this.$store.commit('handleLoad', false)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },    
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            provinceId: this.form.province,
            cityId: this.form.city,
            countyId: this.form.county,
            name: this.form.name,
            detail_addr: this.form.desc,
            mobile: this.form.mobile,
            isdefalut: this.form.isdefalut ? 1 : 0
          }
          if (this.modify === 0) {
            addMyAddress(params).then(res => {
              if (res.data.code == 0) {
                this.editState = false
                this.modify = 0
                this.getData()
                this.$message({
                  type: 'success',
                  message: '添加成功'
                })
              }
            })
          } else {
            params.addr_id = this.form.addr_id
            editMyAddress(params).then(res => {
              if (res.data.code == 0) {
                this.editState = false
                this.modify = 0
                this.getData()
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
              }
            })
          }
        } else {
          console.log('error submit!!');
          return false
        }
      })
    },
    handleEditAddress () {
      this.form = {
        addr_id: '',
        province: '',
        city: '',
        county: '',
        name: '',
        desc: '',
        mobile: '',
        isdefalut: false,
      }
      this.modify = 0
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
      this.modify = 1
      this.editState = true
      this.form =  {
        addr_id: row.addr_id,
        province: row.provinceid,
        city: row.cityid,
        county: row.countyid,
        name: row.name,
        desc: row.addr_detail,
        mobile: row.mobile,
        isdefalut: row.isdefalut == 1
      }
      this.form.province && this._getCityList(this.form.province)
      this.form.city && this._getCountyList(this.form.city)
    },
    deletAddress (row) {
      this.$confirm('此操作将永久删除该地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            addr_id: row.addr_id
          }
          deletMyAddress(params).then(res => {
            if (res.data.code == 0) {
              this.getData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
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
        width: 15%;
        text-align: center;
        color: #e62626;
        .btn {
          display: inline-block;
          padding: 0 4px;
          margin: 0 5px;
          cursor: pointer;
        }
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