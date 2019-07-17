<template>
  <div class="order">
    <div class="container">
      <div class="order-wrapper">
        <div class="order-head">请填写核对订单信息</div>
        <div class="order-main">
          <div v-if="pageType =='bookId'">
            <div class="adress-section" v-if="defaultAddr !== ''">
              <div class="label">默认地址：</div>
              <div class="block">
                <ul class="address-list">
                  <li>
                    <div class="item">{{defaultAddr.name}}</div>
                    <div class="item">{{defaultAddr.mobile}}</div>
                    <div class="item">{{defaultAddr.addr_all}}</div>
                    <div class="item">{{defaultAddr.addr_detail}}</div>
                  </li>
                </ul>
                <span class="list-edit" @click="handleEditAddress">修改默认地址</span>
              </div>
            </div>
            <div class="adress-section" v-else>
              <div class="label">收货管理：</div>
              <div style="flex:1">
                <div v-if="defaultAddr === ''" class="red block" @click="handleEditAddress">(管理收货地址)</div>
                <div style="width:100%" v-if="showAddrList">
                  <div class="tit">
                    <span>收货地址</span>
                    <span class="list-edit"  @click="handleAddAddress">添加地址</span>
                  </div>
                  <div v-if="!editState">
                      <ul class="address-list" v-if="addrList.length > 0">
                        <li
                          class="list-item"
                          v-for="(item, index) in addrList"
                          :key="index"
                          >
                          <div class="list-tit">{{item.name}}</div>
                          <div class="list-sub">{{item.mobile}}</div>
                          <div class="list-adress">{{item.addr_detail}}</div>
                          <div class="list-edit">
                            <span @click="setDefaultAddress(item)" class="btn">设置为收货地址</span>
                          </div>
                        </li>
                      </ul>
                      <div v-else>
                        暂时没有收货地址，去添加吧
                      </div>
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
                      <el-switch v-model="form.isdefault"></el-switch>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="addAddrSubmit('form')">立即创建</el-button>
                      <el-button @click="resetForm('form'); editState = false; showAddrList= false">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </div>
         
          <div class="order-section">
            <span class="tit">商品信息</span>
          </div>
          <ul class="order-list">
            <li class="list-item list-title">
              <div class="order-list-hd">
                <!-- <checkbox name="food[]" value="hamburger" v-model="checkboxValue">
                </checkbox> -->
              </div>
              <div class="order-list-sub">单价</div>
              <div class="order-list-sub">数量</div>
              <div class="order-list-sub">金额</div>
              <div class="order-list-sub">详情</div>
            </li>
            <li
              class="list-item">
              <div class="order-list-hd">
                <!-- <checkbox name="food[]" value="hamburger" v-model="checkboxValue">
                </checkbox> -->
                <div class="img-box">
                  <img :src="orderDetail.img_url" alt="">
                </div>
                <div class="order-list-title">
                   {{orderDetail.title}}
                </div>
              </div>
              <div class="order-list-sub">¥ {{orderDetail.price}}</div>
              <div class="order-list-sub">{{number}}</div>
              <div class="order-list-sub">¥ {{total}}</div>
              <div class="order-list-sub">
                <router-link :to="{path:'/detail?' + pageType + '=' + id}">查看</router-link>
              </div>
            </li>
          </ul>
          <div class="order-form">
            <h4>确认付款方式</h4>
            <div class="radio-group">
              <el-radio v-model="radioValue" label="1">
                <img width="100" src="./../assets/images/zfb.jpg" alt="">
              </el-radio>
              <el-radio v-model="radioValue" label="2">
                <img width="130" src="./../assets/images/wx.png" alt="">
              </el-radio>
            </div>
            <p class="order-tips">为了保证及时处理您的订单，请下单24小时内付款</p>
            <div class="order-section">
              <div class="label">订单赠言：</div>
              <el-input
                type="textarea"
                class="textarea"
                placeholder="请输入内容"
                v-model="remark">
              </el-input>
            </div>
            <div class="order-section align-end">
              <div class="label">金额总计：</div>
              <div class="total">
                <p>
                  <span>商品总金额： <span class="num">{{total}}</span>元</span>
                  <span v-if="pageType == 'bookId'">配送费用： <span class="num">{{transfer}}</span>元</span>
                </p>
                <p>
                  <span>应付金额： <span class="num">{{total + transfer}}</span>元</span>
                  <span>实付金额： <span class="num">{{total + transfer}}</span>元</span>
                </p>
              </div>
            </div>
            <div class="clearfix">
              <div class="submit-box">
                <span class="submit-btn" @click="onSubmit">提交订单</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      :visible.sync="payVisible"
      width="800px">
      <div class="dialog-content">
        <div>
          <div>订单号：{{payParam.order_id}}</div>
          <img :src="payParam.code_url" alt="">
        </div>
        <div>
          <img src="./../assets/images/weixin-qrcode.jpg" alt="">
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { getOrderList, postWxpay, postAlipay, checkWxPay, getMyAddress, getProvinceList, getCityList, getCountyList, addMyAddress, editMyAddress} from './../api/mine'
import {getCourseDetail} from './../api/course.js'
import {getBookDetail} from './../api/book.js'
export default {
  name: 'Order',
  components: {},
  data () {
    return {
      payVisible: false,
      adressShow: false,
      checkboxValue: '',
      radioValue: '1',
      checkall: '',
      orderDetail: {
        price: 0
      },
      addrList: [],
      defaultAddr: {}, // 默认收货地址
      provinceList: [],
      cityList: [],
      countyList: [],
      form: {
        addr_id: '',
        province: '',
        city: '',
        county: '',
        name: '',
        desc: '',
        mobile: '',
        isdefault: false,
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
      remark: '', // 订单备注
      pageType: '', // 页面类型
      id: '',
      editState: false,
      showAddrList: false,
      transfer: 0, // 物流价格
      number: 1,
      modify: 0,
      payParam: '',
      timer: null
    }
  },
  computed: {
    total () {
      return this.orderDetail.price * this.number
    }
  },
  mounted () {
    this.$store.commit('handleLoad', false)
    for (let key in this.$route.query) {
      this.pageType = key
      this.id = this.$route.query[key]
    }
    this.getDetail()
    this._getProvinceList()
    this.getAdress()
  },
  destroyed(){
    window.clearInterval(this.timer)
    this.timer = null;
    console.log("beforeDestroy");
  },
  methods: {
    // 提交订单 走支付接口
    onSubmit () {
      // 支付宝支付
      if (this.radioValue === '1') {
        let params = {
          addr_id: this.defaultAddr.addr_id,
          product_id: this.id,
          product_type: this.pageType == 'courseId' ? 1 : 2, // product_type 1: 课程 2:教材
          remark: this.remark
        }
        postAlipay(params).then(res => {
          if (res.data.code == 0) {
            let data = res.data.data
             window.location.href = data.confirm_url + '?order_id=' + data.order_id + '&token=' + this.$store.state.user.token
          }
        })
      }
      // 微信支付
      if (this.radioValue === '2') {
        let params = {
          addr_id: this.defaultAddr.addr_id,
          product_id: this.id,
          product_type: this.pageType =='courseId' ? 1 : 2, // product_type 1: 课程 2:教材
          remark: this.remark
        }
        postWxpay(params).then(res => {
          if (res.data.code == 0) {
            this.payVisible = true
            this.payParam = res.data.data
            this.timer = setInterval(() => {
              this.checkPay()
            },2000)
          }
        })
      }
    },
    checkPay () {
      let params = {
        order_id: this.payParam.order_id
      }
      checkWxPay(params).then(res => {
        if (res.data.code == 0) {
          this.payVisible = false
          window.clearInterval(this.timer)
          this.timer = null;
          this.$router.push({path:'/mycourse'})
        }
      })
    },
    getDetail () {
      this.$store.commit('handleLoad', false)
      switch (this.pageType) {
        case 'bookId':
          this._getBookdetail()
          break
        case 'courseId':
          this._getCoursedetail()
          break
      }
    },
    _getBookdetail () {
      let params = {
        book_id: this.id 
      }
      getBookDetail(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.orderDetail = data
          this.productId = data.book_id
          this.$store.commit('handleLoad', false)
        }
      })
    },
    _getCoursedetail () {
      let params = {
        course_id: this.id 
      }
      getCourseDetail(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.orderDetail = data
          this.$store.commit('handleLoad', false)
        }
      })
    },
    getAdress () {
      let params = {
        page_index: 1,
        page_size: 20
      }
      getMyAddress(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.addrList = data.items
          this.$store.commit('handleLoad', false)
          this.defaultAddr = ''
          this.addrList.map((item, index) => {
            if (item.isdefault == 1) {
             this.defaultAddr = item
            }
          })
        }
      })
    },
    handleAddAddress () {
      this.editState = true
      this.showAddrList = true
    },
    addAddrSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            provinceId: this.form.province,
            cityId: this.form.city,
            countyId: this.form.county,
            name: this.form.name,
            detail_addr: this.form.desc,
            mobile: this.form.mobile,
            isdefault: this.form.isdefault ? 1 : 0
          }
          if (this.modify === 0) {
            addMyAddress(params).then(res => {
              if (res.data.code == 0) {
                this.editState = false
                this.modify = 0
                this.getAdress()
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
                this.getAdress()
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
    setDefaultAddress (item) {
      this.defaultAddr = item
    },
    handleEditAddress () {
      this.defaultAddr = ''
      this.showAddrList = true
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
  }
}
</script>

<style scoped lang="scss">
/* scss */
.order {
  padding: 30px 0;
  background: #eeeeee;
  color: #333;
}
.order-wrapper {
  padding:0 20px 20px;
  background: #ffffff;
  .order-head {
    font-size: 20px;
    line-height: 60px;
    border-bottom: 1px solid #a6a6a6;
  }
}
.radio-group {
  display: flex;
  .el-radio {
    display: flex;
    align-items: center;
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
  padding-left: 20px;
  color: #e26262;
}
.order-section {
  padding-top: 20px;
  display: flex;
  font-size: 18px;
  line-height: 60px;
  &.align-end {
    justify-content: space-between;
  }
  .textarea {
    flex: .6;
  }
  .total {
    margin-top: 60px;
    p {
      text-align: right;
      margin: 0;
      &>span {
        margin-left: 20px;
      }
    }
    .num {
      color: #e26262;
      font-size: 30px;
    }
  }
}
.adress-section {
  display: flex;
  .address-list {
    li {
      display: flex;
      &>.item  {
        margin-right: 20px;
      }
    }
    flex: 1;
  }
  .tit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #a6a6a6;
    margin-bottom: 30px;
  }
  .block  {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .block,.label,.tit {
    line-height: 60px;
  }
  .list-edit {
    background: #2b93c6;
    color: #fff;
    padding:4px 16px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    .btn {
      color: #fff;
    }
  }
}
.order-list {
  .list-item {
    display: flex;
    padding: 18px 20px;
    border-bottom: 1px solid  #e6e6ee;
    justify-content: space-between;
  }
  .list-title {
    padding: 0 20px;
    background: #fafafa;
    color: #a6a6a6;
    font-size: 16px;
    line-height: 48px;
    border-bottom: 0;
  }
  .img-box {
    width: 64px;
    height: 48px;
    margin-right: 20px;
    img {
      width:100%;
      height: 100%;
    }
  }
  .order-list-hd {
    display: flex;
    width: 40%;
    .checkbox-component {
      margin-right: 20px;
    }
  }
  .order-list-sub {
    width: 20%;
    padding-top: 6px;
    text-align: right;
  }
  .order-list-title {
    flex: 1;
    height: 30px;
    line-height: 30px;
    padding-top: 6px;
    display:-webkit-box;
    overflow:hidden;
    text-overflow:ellipsis;
    -webkit-line-clamp:1;
    -webkit-box-orient:vertical;
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
.order-form {
  .order-tips {
    font-size: 16px;
    color: #ef2020;
  }
  .submit-box {
    margin-top: 30px;
  }
  .submit-btn {
    float: right;
    display: block;
    width: 180px;
    height: 48px;
    background: #2b93c6;
    color: #ffffff;
    border-radius: 4px;
    line-height: 48px;
    text-align: center;
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
