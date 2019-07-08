<template>
  <div class="order">
    <div class="container">
      <div class="order-wrapper">
        <div class="order-head">请填写核对订单信息</div>
        <div class="order-main">
          <div v-if="pageType =='bookId'">
             <div class="adress-section">
              <div class="label">默认地址：</div>
              <div class="block">
                <span>{{defaultAddr}} </span>
                <span class="list-edit" @click="handleEditAddress">修改默认地址</span>
              </div>
            </div>
            <div class="adress-section">
              <div class="label">收获管理：</div>
              <div class="block" v-if="editState">
                <div v-if="addrList.length==0" class="red block" @click="handleEditAddress">(管理收获地址)</div>
                <div style="width:100%">
                  <div class="tit">
                    <span>收货地址</span>
                    <span class="list-edit" @click="handleEditAddress">添加地址</span>
                  </div>
                  <!-- <div>
                      <ul class="address-list">
                        <li
                          class="list-item"
                          v-for="(item, index) in addrList"
                          :key="index"
                          >
                          <div class="list-tit">{{item.name}}</div>
                          <div class="list-sub">{{item.mobile}}</div>
                          <div class="list-adress">{{item.addr_detail}}</div>
                          <div class="list-edit">
                            <span @click="modifyAddress(item)" class="btn">修改</span>
                            <span @click="deletAddress(item)" class="btn">删除</span>
                          </div>
                        </li>
                      </ul>
                  </div> -->
                  <el-form class="form-list" ref="form" :model="form" label-width="130px">
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
                    <el-form-item label="电话">
                      <el-input type="" v-model="form.mobile"></el-input>
                    </el-form-item>
                    <el-form-item label="是否设为常用地址">
                      <el-switch v-model="form.isdefalut"></el-switch>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="addAddr">立即创建</el-button>
                      <el-button @click="resetForm('form'); editState = false">取消</el-button>
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
                <router-link to="">查看</router-link>
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
              <textarea class="textarea" name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div class="order-section align-end">
              <div class="label">金额总计：</div>
              <div class="total">
                <p>
                  <span>商品总金额： <span class="num">{{total}}</span>元</span>
                  <span>配送费用： <span class="num">{{transfer}}</span>元</span>
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
      width="50%">
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
import { getOrderList, postWxpay, postAlipay, checkWxPay, getMyAddress, getProvinceList, getCityList, getCountyList, addMyAddress} from './../api/mine'
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
      defaultAddr: '',
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
        isdefalut: false,
      },
      pageType: '',
      editState: false,
      transfer: 12,
      number: 1,
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
    clearInterval(this.timer)
    this.timer = null;
    console.log("beforeDestroy");
  },
  methods: {
    // 提交订单 走支付接口
    onSubmit () {
      // 支付宝支付
      if (this.radioValue === '1') {
        let params = {
          product_id: this.orderDetail.id,
          product_type: this.pageType == 'courseId' ? 1 : 2, // product_type 1: 课程 2:教材
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
          product_id: this.orderDetail.id,
          product_type: this.pageType =='courseId' ? 1 : 2, // product_type 1: 课程 2:教材
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
          clearInterval(this.timer)
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
          this.defaultAddr = this.addrList[0].addr_detail
          
          // this.addrList.map((item => {
          //   debugger
          //   if (item.isdefalut == 1) {
          //     return item
          //   }
          // })
          this.$store.commit('handleLoad', false)
        }
      })
    },
    addAddr () {},
    handleEditAddress () {

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
    .list-edit {
      background: #2b93c6;
      color: #fff;
      padding:4px 16px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
    }
  }
  .block,.label,.tit {
    line-height: 60px;
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
