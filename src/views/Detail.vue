<template>
 <div class="detail">
  <bread-crumbs :lists="breadMenu"></bread-crumbs>
  <!-- 课程详情 -->
  <div class="container" v-if="pageType == 'courseId'">
    <ul class="list-news">
      <!--缩略图在标题左边-->
      <li class="list-news-item clearfix">
        <div class="list-thumb">
          <img width="560" height="420" :src="courseDetail.img_url" />
        </div>
        <div class="list-main">
          <h3 class="list-item-hd title">
            {{courseDetail.title}}
          </h3>
          <div class="list-item-hd border-bt list-text">
            <span class="item-sub">购买数{{courseDetail.buy_num}}</span>
            <span class="item-sub">课时数{{courseDetail.course_num}}</span>
            <span class="item-sub">浏览量{{courseDetail.view_num}}</span>
          </div>
          <div class="list-item-text">
            <p>主讲：{{courseDetail.lecturer}}</p>
            <p>课程有效期：从购买之日起{{courseDetail.period}}天</p>
          </div>
          <div v-if="courseDetail.pre_sale && courseDetail.pre_sale == 1" class="list-item-text clearfix">
            <span v-if="coupon.status == 1" class="price">活动已结束</span>
            <span v-if="coupon.status == 2" class="price">优惠券已售卖完</span>
            <span v-if="coupon.status == 0" class="price">活动中：{{coupon.desc}}</span>
            <router-link v-if="coupon.is_buy==0 && coupon.status == 0" class="list-btn" :to="{path:'order',query:{courseId: id}}">购买</router-link>
            <router-link v-if="coupon.is_buy==1 && coupon.status == 0" class="list-btn" :to="{path:'mycourse'}">已购买</router-link>
          </div>
          <div v-else class="list-item-text clearfix">
            <span class="price">¥ {{courseDetail.price}}</span>
            <router-link v-if="courseDetail.is_buy==0" class="list-btn" :to="{path:'order',query:{courseId: id}}">购买</router-link>
            <router-link v-if="courseDetail.is_buy==1" class="list-btn" :to="{path:'mycourse'}">已购买</router-link>
          </div>
        </div>
      </li>
    </ul>
    <div class="section">
      <div class="tabbar-wrapper">
        <div class="tabbar">
          <span
            class="tabbar-item"
            v-for="(item, index) in tabNavs"
            :key="'bar' + index"
            :class="{'active':item.checked}"
            @click="handleNavBar(item)"
            >{{item.name}}</span>
        </div>
        <div class="two-colomn clearfix">
          <div class="sidebar">
            <div class="sidebar-title">
              <h3>课程推荐</h3>
            </div>
            <ul class="list-item-wrapper">
              <li class="list-item clearfix" v-for="(item,index) in recommend" :key="'down' + index">
                <router-link :to="{path:'detail', query: {courseId: item.course_id}}">
                  <div class="img-box">
                    <img :src="item.img_url" alt="">
                  </div>
                  <div class="list-hd">
                    {{item.title}}
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
          <div class="tabbar-content">
            <ul class="list-item-wrapper" v-if="typeof content=='object'&&content.constructor==Array">
              <li class="list-item clearfix" v-for="(item,index) in content" :key="'down' + index">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="label">
                  <el-button class="load-btn" v-if="currentTab === 'courses'" @click="goPlayer(item)">{{(courseDetail.is_buy =='0' && item.is_trial== 1) ? '试看':'观看视频'}}</el-button>
                  <a v-else class="load-btn" @click="downLoad(item)">点击下载</a>
                </div>
              </li>
            </ul>
            <div class="article" v-else v-html="content"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
  <!-- 教材详情 -->
  <div class="container" v-if="pageType == 'bookId'">
    <ul class="list-book">
      <!--缩略图在标题左边-->
      <li class="list-news-item clearfix">
        <div class="list-thumb">
          <img :src="bookDetail.img_url" />
        </div>
        <div class="list-main">
          <h3 class="list-item-hd">
            {{bookDetail.title}}
          </h3>
          <div class="list-item-hd" v-if="bookDetail.pre_sale != 1">
              <span class="price">¥ {{bookDetail.price}}</span>
          </div>
          <div class="list-item-text">
            <p>{{bookDetail.desc}}</p>
          </div>
          <div v-if="bookDetail.pre_sale && bookDetail.pre_sale == 1" class="list-item-text clearfix">
            <span v-if="coupon.status == 1" class="price">活动已结束</span>
            <span v-if="coupon.status == 2" class="price">优惠券已售卖完</span>
            <span v-if="coupon.status == 0" class="price">活动中：{{coupon.desc}}</span>
            
            <router-link v-if="coupon.is_buy==0 && coupon.status == 0" class="list-btn" :to="{path:'order',query:{courseId: id}}">购买</router-link>
            <router-link v-if="coupon.is_buy==1 && coupon.status == 0" class="list-btn" :to="{path:'mycourse'}">已购买</router-link>
          </div>
          <div v-else class="list-item-text clearfix">
            <router-link v-if="bookDetail.is_buy==0" class="list-btn" :to="{path:'order',query:{bookId: id}}">提交订单</router-link>
            <router-link v-if="bookDetail.is_buy==1" class="list-btn" :to="{path:'myorder'}">已购买</router-link>
          </div>
        </div>
      </li>
    </ul>
    <div class="section">
      <div class="tabbar-wrapper book-detail-wrapper">
        <div class="tabbar">
          <span class="tabbar-item active">书籍介绍</span>
        </div>
        <div class="detail-content">
          {{bookDetail.desc}}
        </div>
      </div>
    </div>
  </div>
  <!-- 资讯详情 -->
  <div class="container" v-if="pageType == 'newsId'">
    <div class="social-share"></div>
    <div class="news-detail">
      <div class="title-box">
        <h3 class="title" v-html="newsDetail.title"></h3>
        <span class="icon-prev" @click="getNews('prev')"></span>
        <span class="icon-next" @click="getNews('next')"></span>
      </div>
      <div class="label">
        <span>{{newsDetail.public_time}}</span>
        <span>新闻来源: {{newsDetail.source}}</span>
      </div>
      <div class="artical" v-html="newsDetail.content"></div>
    </div>
  </div>
 </div>
</template>

<script type="text/ecmascript-6">
import 'social-share.js/dist/js/social-share.min.js'
import BreadCrumbs from './../components/BreadCrumbs'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {setLocalStorage} from './../assets/js/storage.js'
import {getCourseDetail, getCourseRecommend, getCourseDown} from './../api/course.js'
import {getBookDetail} from './../api/book.js'
import {getNewsDetail,getNewsPrev,getNewsNext} from './../api/news.js'
export default {
  name: 'Detail',
  components: {
    swiper,
    swiperSlide,
    BreadCrumbs
  },
  data () {
    return {
      pageType: '',
      id: '',
      courseDetail: '',
      bookDetail: '',
      newsDetail: '',
      recommend: [],
      coupon: '',
      tabNavs: [
        {
          name:'课时',
          type:'courses',
          checked: true
        },{
          name:'详情',
          type: 'content',
          checked: false
        },{
          name:'资料下载',
          type: 'downs',
          checked: false
        }
      ],
      currentTab: 'courses',
      content: '',
      breadMenu: [],
      swiperSlides: [],
      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, 
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, 
        slideToClickedSlide: true,
      },
    }
  },
  watch: {
    '$route' () {
      for (let key in this.$route.query) {
        this.pageType = key
        this.id = this.$route.query[key]
      }
      this.getBread(this.pageType)
      this.getDetail()
    }
  },
  mounted () {
    for (let key in this.$route.query) {
      this.pageType = key
      this.id = this.$route.query[key]
    }
    this.getBread(this.pageType)
    this.getDetail()
  },
  methods: {
    getBread (pageType) {
      this.breadMenu = []
      switch (pageType) {
        case 'newsId':
          this.breadMenu.push('资讯')
          break
        case 'bookId':
          this.breadMenu.push('教材')
          break
        case 'courseId':
          this.breadMenu.push('课程')
          break
      }
    },
    getDetail () {
      this.$store.commit('handleLoad', true)
      switch (this.pageType) {
        case 'bookId':
           this._getBookdetail()
           break
        case 'courseId':
          this._getCourseRecommend()
          this._getCoursedetail()
          break
        case 'newsId':
          this._getNewsdetail()
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
          this.bookDetail = data
          this.breadMenu.push(data.title)
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
          this.courseDetail = data
          this.breadMenu.push(data.title)
          if (this.courseDetail.pre_sale && this.courseDetail.pre_sale == '1') {
            this.coupon = this.courseDetail.coupon
            this.content = this.courseDetail.coupon.desc
            this.tabNavs.map(item => {
              if (item.type == 'content') {
                item.checked = true
              } else {
                item.checked = false
              }
            })
          } else {
            this.content = this.courseDetail.courses
          }
         
          this.$store.commit('handleLoad', false)
        }
      })
    },
    _getCourseRecommend () {
      getCourseRecommend().then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.recommend = data.items
        }
      })
    },
    _getNewsdetail () {
      let params = {
        news_id: this.id 
      }
      getNewsDetail(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.newsDetail = data
          this.breadMenu.push(data.title)
          let config = {
            url: window.location.href,
            title:data.title,
            description: data.title,
            img: '',
            sites: ['qzone', 'qq', 'weibo','wechat']
          }
          this.$nextTick(() => {
            let sharebox = document.querySelector('.social-share')
            window.socialShare(sharebox,  config)
          })
          this.$store.commit('handleLoad', false)
        }
      })
    },
    getNews (val) {
      let params = {
        news_id: this.id
      }
      if (val === 'prev') {
        getNewsPrev(params).then(res => {
          if (res.data.code == 0) {
            let data = res.data.data
            this.id = data.news_id
            this.$router.push({path:'detail', query: {newsId: this.id}})
            this.newsDetail = data
          } else {
            this.$message({
              type: 'error',
              message: '已到第一条数据'
            })
          }
        })
      }
      if (val === 'next') {
        getNewsNext(params).then(res => {
          if (res.data.code == 0) {
            let data = res.data.data
            this.id = data.news_id
            this.$router.push({path:'detail', query: {newsId: this.id}})
            this.newsDetail = data
          } else {
            this.$message({
              type: 'error',
              message: '已到最后一条数据'
            })
          }
        })
      }
    },
    // 处理点击tab
    handleNavBar (item) {
      this.tabNavs.map(item => {item.checked = false})
      this.currentTab = item.type
      item.checked  = true
      if (this.courseDetail.pre_sale && this.courseDetail.pre_sale == '1' && this.currentTab == 'content') {
        this.content = this.courseDetail.coupon.desc
      } else {
        this.content = this.courseDetail[item.type]
      }
    },
    goPlayer (item) {
      if (item.is_trial == '0') {
        if (JSON.stringify(this.$store.state.user) == '{}' && item.is_trial == '0') {
          this.$message({
            type: 'warning',
            message: '请先登录'
          })
          return
        }
        if (this.courseDetail.is_buy == 0 && item.is_trial == '0') {
          this.$message({
            type: 'warning',
            message: '请先购买该课程'
          })
          return
        }
      }
      setLocalStorage('class', item.class_id)
      window.open(location.origin + '/#/player?id=' + this.id)
    },
    downLoad (item) {
      if (this.courseDetail.is_buy == 0) {
        this.$message({
          type: 'warning',
          message: '请先购买该课程'
        })
        return
      }
      let params = {
        course_id: this.id,
        class_id: item.class_id
      }
      getCourseDown(params).then(res => {
        if (res.data.code == 0) {
          location.href = res.data.data.down_url
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })   
        }
      })
      
    }
  }
}
</script>
<style src="social-share.js/dist/css/share.min.css"></style>
<style scoped lang="scss">
/* scss */
/* scss */
.social-share {
  margin-bottom: 20px;
  text-align: right;
  /deep/ .icon-wechat .wechat-qrcode {
    top: 46px;
    &::after {
      top: -14px;
      transform: rotate(180deg);
    }
  }
}
.title-box {
  position: relative;
  .icon-prev {
    position: absolute;
    left: 30px;
    top:20px;
    display: inline-block;
    width:60px;
    height: 60px;
    cursor: pointer;
    background: url('./../assets/images/prev.png') no-repeat center;
    background-size: contain;
    &:hover {
      background: url('./../assets/images/prev_hover.png') no-repeat center;
      background-size: contain;
    }
  }
  .icon-next {
    position: absolute;
    right: 30px;
    top:20px;
    display: inline-block;
    width:60px;
    height: 60px;
    cursor: pointer;
    background: url('./../assets/images/next.png') no-repeat center;
    background-size: contain;
    &:hover {
      background: url('./../assets/images/next_hover.png') no-repeat center;
      background-size: contain;
    }
  }
  .title {
    padding: 0 120px;
  }
}
.detail {
  margin-bottom: 50px;
}
.list-news {
  list-style-type: none;
  .list-news-item {
    display: flex;
    margin-bottom:20px;
    padding: 30px;
    background: #f5f5f5;
  }
  .list-thumb{
    float: left;
    width:48%;
    height: 420px;
    margin-right: 50px;
    img {
      width: 100%;
    }
  }
  .list-main {
    width: 52%;
    .list-item-hd {
      margin-bottom: 50px;
      font-size: 24px;
      color: #333333;
      padding-bottom: 10px;
      &.title{
        white-space: nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
      }
      &.list-text {
        font-size: 18px;
      }
      .item-sub{
        display: inline-block;
        margin-right: 20px;
        color: #666666;
      }
    }
    .list-item-text {
      margin-top:60px;
      font-size:18px;
      color: #666666;
    }
    .price {
      float: left;
      margin-left: 20px;
      font-size: 26px;
      color: #e62626;
      font-weight: bold;
    }
    .list-btn{
      float: right;
      width: 200px;
      height: 40px;
      color: #fff;
      background: #2b93c6;
      text-align: center;
      line-height: 40px;
      border-radius: 8px;
    }
  }
}
.border-bt {
  border-bottom: 1px solid #666666;
}
.list-book {
  list-style: none;
  background: #f5f5f5;
  .list-thumb{ 
    float: left;
    width: 33%;
    height: 340px;
    padding: 20px;
    box-sizing: border-box;
    background: #fff;
    margin: 30px 50px 30px 20px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .list-main {
    padding: 50px 20px 0 0;
    .list-item-hd {
      margin-bottom: 30px;
      font-size: 24px;
      color: #333333;
      .item-sub{
        display: inline-block;
        margin-right: 20px;
        color: #666666;
      }
    }
    .list-item-text {
      margin-bottom: 30px;
      font-size:20px;
      color: #666666;
    }
    .price {
      font-size: 26px;
      color: #e62626;
      font-weight: bold;
    }
    .list-btn{
      float: right;
      width: 200px;
      height: 40px;
      color: #fff;
      background: #2b93c6;
      text-align: center;
      line-height: 40px;
      border-radius: 8px;
    }
  }
  .detail-content {
    background: #f5f5f5;
  }
}
.list-item-wrapper  {
  .lists {
      background-color: #fff;
  }
  .lists:nth-child(2n-1) {
    float: left
  }
  .lists:nth-child(2n) {
    float: right
  }
  .list-item {
    padding: 10px 30px;
    line-height: 50px;
    list-style: none;
    border-bottom: 1px solid #eeeeee;
    font-size: 16px;
    .title {
      float: left;
      color: #4d4d4d;
    }
    .label {
      float: right;
      color: #808080;
    }
    .load-btn {
      width: 117px;
      height: 34px;
      padding: 2px 7px;
      border-radius: 3px;
      color: #ef2020;
      text-align: center;
      border: 1px solid #ef2020;
    }
  }
}
.two-colomn {
  .sidebar {
    float: right;
  }
  .tabbar-content {
    float: left;
  }
}
.tabbar-wrapper {
  &.book-detail-wrapper{
    border: 1px solid #a6a6a6;
  }
  .tabbar {
    padding: 34px 30px 25px;
    background: #f5f5f5;
    .tabbar-item {
      font-size: 24px;
      padding: 0 10px;
      margin-right: 80px;
      &.active {
        color: #e62626;
      }
    }
  }
  .tabbar-content {
    width: 68%;
    box-sizing: border-box;
    padding: 0 30px;
    border: 1px solid #a6a6a6;
    border-top: 0;
  }
  .detail-content {
    padding: 30px 10%;
  }
}
.article {
  padding: 30px 0;
  line-height: 1.6;
  word-break: break-all;
}
.sidebar {
  width: 30%;
  border: 1px solid #a6a6a6;
  border-top: 0;
  .sidebar-title {
    padding: 36px 30px 0;
    
    h3 {
      margin:0;
      padding-bottom: 20px; 
      font-size: 24px;
      color: #333333;
      text-align: center;
      border-bottom: 1px solid #a6a6a6;
    }
  }
  .list-item {
    padding: 0 30px 20px;
    margin-top:20px;
    .img-box {
      float: left;
      width:120px;
      height: 90px;
      margin-right: 20px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .list-hd {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 16px;
      line-height: 30px;
      color: #666666;
    }
  }
}


 .swiper-container {
    // background-color: #000;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .gallery-top {
    height: 80%!important;
    width: 100%;
  }
  .gallery-thumbs {
    height: 20%!important;
    box-sizing: border-box;
    padding: 10px 0;
    img {
      width: 100%;
    }
  }
  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }
  .gallery-thumbs .swiper-slide-active {
    opacity: 1;
  }

  .news-detail {
    padding: 50px 60px;
    border: 1px solid #a6a6a6;
    .title {
      margin-bottom: 20px;
      font-size: 28px;
      color: #333333;
      text-align: center;
    }
    .label {
      text-align: center;
      font-size: 18px;
      color: #666666;
      span {
        display: inline-block;
        margin: 0 20px;
      }
    }
    .artical {
      margin-top: 60px;
      overflow: hidden;
    }
  }
</style>