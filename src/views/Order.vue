<template>
  <div class="order">
    <div class="container">
      <div class="order-wrapper">
        <div class="order-head">请填写核对订单信息</div>
        <div class="order-main">
          <div class="order-section">
            <span class="tit">收获管理</span>
            
            <div class="label">收获管理：</div>
            <div>
              <div class="adress" @click="handleAdress">(管理收获地址)</div>
              <div>
                
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
              <radio name="robot" :value="1" v-model="radioValue">
                 支付宝 <img src="" alt="">
              </radio>
              <radio name="robot" :value="2" v-model="radioValue">
                  微信
              </radio>
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
                <span class="submit-btn">提交订单</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { getOrderList,postpayConfirm } from './../api/mine'
import {getCourseDetail} from './../api/course.js'
import {getBookDetail} from './../api/book.js'
import {Checkbox, Radio} from 'vue-checkbox-radio';
export default {
  name: 'Order',
  components: {
    Checkbox,
    Radio
  },
  data () {
    return {
      adressShow: false,
      checkboxValue: '',
      radioValue: 1,
      checkall: '',
      orderDetail: {
        price: 0
      },
      transfer: 12,
      number: 1,
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
  },
  methods: {
    submit () {
      let params = {
        product_id: this.orderDetail.id,
        product_type: 1,
        pay_type: this.radioValue
      }
      postpayConfirm().then(res => {

      })
    },
    getDetail () {
      this.$store.commit('handleLoad', false)
      switch (this.pageType) {
        case 'bookId':
           this._getBookdetail()
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
    handleAdress () {

    }
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
.order-section {
  padding-top: 20px;
  display: flex;
  font-size: 18px;
  line-height: 60px;
  &.align-end {
    justify-content: space-between;
  }
  .adress {
    padding-left: 20px;
    color: #e26262;
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
.radio-group {
  padding: 20px 0;
  display: flex;
}
.checkbox-component
/deep/ .input-box {
  line-height: 18px;
}
</style>
