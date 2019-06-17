<template>
 <div class="detail">
  <!-- 课程详情 -->
  <div class="container" v-if="pageType == 'courseId'">
    <ul class="list-news">
      <!--缩略图在标题左边-->
      <li class="list-news-item clearfix">
        <div class="list-thumb">
          <img :src="courseDetail.img_url" />
        </div>
        <div class="list-main">
          <h3 class="list-item-hd">
            {{courseDetail.title}}
          </h3>
          <div class="list-item-hd">
            <span class="item-sub">购买数{{courseDetail.buy_num}}</span>
            <span class="item-sub">课时数{{courseDetail.course_num}}</span>
            <span class="item-sub">浏览量{{courseDetail.view_num}}</span>
          </div>
          <div class="list-item-text">
            <p>主讲：{{courseDetail.lecturer}}</p>
            <p>课程有效期：从购买之日起{{courseDetail.period}}天</p>
          </div>
          <div class="list-item-text clearfix">
            <span class="price">¥{{courseDetail.price}}</span>
            <div class="list-btn">购买</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="section">
      <div class="tabbar-wrapper">
        <div class="tabbar">
          <span class="tabbar-item">课时</span>
          <span class="tabbar-item">详情</span>
          <span class="tabbar-item">资料下载</span>
        </div>
        <div class="two-colomn clearfix">
          <div class="sidebar">
            <div class="sidebar-title">
              <h3>课程推荐</h3>
            </div>
            <ul class="list-item-wrapper">
              <li class="list-item clearfix" v-for="(item,index) in courseDetail.downs" :key="'down' + index">
                <div class="img-box">
                  <img src="http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png" alt="">
                </div>
                <div class="list-hd">
                  2019星军精讲班-习题册
                </div>
              </li>
            </ul>
          </div>
          <div class="tabbar-content">
            <ul class="list-item-wrapper">
              <li class="list-item clearfix" v-for="(item,index) in courseDetail.downs" :key="'down' + index">
                <div class="title">
                  {{item.title}}
                </div>
                <div class="label">
                  <span class="load-btn">点击下载</span>
                </div>
              </li>
            </ul>
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
          <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
            <swiper-slide v-for="(item, index) in swiperSlides" :key="'gallery-top' + index">
              <img :src="item.url" alt="">
            </swiper-slide>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
          </swiper>
          <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
            <swiper-slide v-for="(item, index) in swiperSlides" :key="'gallery-thumbs' + index">
              <img :src="item.url" alt="">
            </swiper-slide>
          </swiper>
        </div>
        <div class="list-main">
          <h3 class="list-item-hd">
            {{courseDetail.title}}
          </h3>
          <div class="list-item-hd">
              <span class="price">¥{{courseDetail.price}}</span>
          </div>
          <div class="list-item-text">
            <p>{{courseDetail.desc}}</p>
          </div>
          <div class="list-item-text clearfix">
            <div class="list-btn">提交订单</div>
          </div>
        </div>
      </li>
    </ul>
    <div class="section">
      <div class="tabbar-wrapper">
        <div class="tabbar">
          <span class="tabbar-item active">书籍介绍</span>
        </div>
        <div class="detail-content">
          
        </div>
      </div>
    </div>
  </div>
  <!-- 资讯详情 -->
  <div class="container" v-if="pageType == 'newsId'">
    <bread-crumbs></bread-crumbs>
    <div class="news-detail">
      <h3 class="title">{{newsDetail.title}}</h3>
      <div class="label">
        <span>{{newsDetail.public_time}}</span>
        <span>{{newsDetail.source}}</span>
      </div>
      <div class="artical" v-html="newsDetail.content"></div>
      <ul class="down-list">
        <li v-for="(item, index) in newsDetail.attach" :key="'down' + index">
          <a :href="item.down_url">{{item.name}}</a>
        </li>
      </ul>
    </div>
  </div>
 </div>
</template>

<script type="text/ecmascript-6">
import BreadCrumbs from './../components/BreadCrumbs'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {getCourseDetail} from './../api/course.js'
import {getBookDetail} from './../api/book.js'
import {getNewsDetail} from './../api/news.js'
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
      swiperSlides: [
        {
          url: 'http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png'
        },
        {
          url: 'http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png'
        },
        {
          url: 'http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png'
        }
      ],
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
      } 
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted () {
    for (let key in this.$route.query) {
      this.pageType = key
      this.id = this.$route.query[key]
    }
    this.getDetail()
  },
  methods: {
    getDetail () {
      switch (this.pageType) {
        case 'bookId':
           this._getBookdetail()
           this.$nextTick(() => {
            const swiperTop = this.$refs.swiperTop.swiper
            const swiperThumbs = this.$refs.swiperThumbs.swiper
            swiperTop.controller.control = swiperThumbs
            swiperThumbs.controller.control = swiperTop
          })
           break
        case 'courseId':
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
        }
      })
    },
    _getNewsdetail () {
      let params = {
        course_id: this.id 
      }
      getNewsDetail(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.newsDetail = data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* scss */
/* scss */
.list-news {
  list-style-type: none;
  .list-news-item {
    margin-bottom:20px;
    padding: 30px;
    background: #eeeeee;
  }
  .list-thumb{
    float: left;
    width:600px;
    height: 420px;
    margin-right: 50px;
    img {
      width: 100%;
    }
  }
  .list-main {
    .list-item-hd {
      margin-bottom: 50px;
      font-size: 24px;
      color: #333333;
      .item-sub{
        display: inline-block;
        margin-right: 20px;
        color: #666666;
      }
    }
    .list-item-text {
      margin-top:60px;
      font-size:20px;
      color: #666666;
    }
    .price {
      float: left;
      margin-left: 20px;
      font-size: 26px;
      color: #e62626
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
.list-book {
  list-style: none;
  background: #eee;
  .list-thumb{ 
    float: left;
    width: 420px;
    height: 420px;
    margin-right: 50px;
    padding: 30px 20px;
  }
  .list-main {
    padding: 50px 0 0;
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
      font-size: 36px;
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
      line-height: 34px;
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
    width: 958px;
    box-sizing: border-box;
    padding: 0 30px;
    border: 1px solid #a6a6a6;
    border-top: 0;
  }
}
.sidebar {
  width:412px;
  margin-left: 30px;
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
      font-size: 16px;
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
      font-size: 33px;
      color: #333333;
      text-align: center;
    }
    .label {
      text-align: center;
      font-size: 16px;
      color: #666666;
      span {
        display: inline-block;
        margin: 0 20px;
      }
    }
    .artical {
      margin-top: 60px;
    }
  }
</style>