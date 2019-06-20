<template>
  <div class="home">
    <swiper
      class="banner-slider"
      :options="swiperOption">
      <swiper-slide
        v-for="(banner, index) in bannerList"
        :key="'banner' + index"
        >
        <a :href="banner.target_url">
          <img :src="banner.img_url" alt="">
        </a>
      </swiper-slide>
      <div class="swiper-pagination swiper-pagination-bullets" slot="pagination"></div>
    </swiper>
    <div class="container">
      <div class="section" v-for="(section,index) in homeList" :key="'section' + index">
        <div class="advert" v-if="section.view_type == '1'">
          <a :href="section.data.target_url">
            <img :src="section.data.img_url" alt="">
          </a>
        </div>
        <div v-if="section.view_type == '2' || section.view_type == '3'" class="titlebar">
          <h2 class="titlebar-title">
            {{section.title}}
          </h2>
          <nav class="titlebar-nav">
              <a href="#more" class="">更多 <i class="am-icon-angle-right"></i></a>
          </nav>
        </div>
        <!-- 课程列表 -->
        <div class="list-wrapper" :class="section.cover_data ? 'padLeft': 'default'" v-if="section.view_type == '2'" >
          <div class="cover-item" v-if="section.cover_data">
            <a :href="section.cover_data.target_url"></a>
            <img :src="section.cover_data.img_url" alt="">
          </div>
          <ul class="lists clearfix">
            <li class="list" v-for="(listItem,index) in section.data" :key="'listItem' + index">
              <router-link to="">
                <div class="list-img">
                  <img :src="listItem.img_url" alt="">
                </div>
                <div class="list-infor">
                  <h5 class="tit">{{listItem.title}}</h5>
                  <div class="clearfix">
                    <div class="infor-left">
                      <p class="label">{{listItem.sub_title}}</p>
                    </div>
                    <div class="infor-right">
                      <div class="list-btn">{{listItem.course_type}}</div>
                    </div>
                  </div>
                  <div class="clearfix">
                    <div class="infor-left">
                      <div class="price">¥ {{listItem.price}}</div>
                    </div>
                    <div class="infor-right">
                      <div class="subinfor">{{listItem.buy_num}}人购买</div>
                    </div>
                  </div>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <!-- 图书列表 -->
        <div class="list-wrapper" v-if="section.view_type == '3'" >
          <ul class="lists clearfix">
            <li class="list-book" v-for="(listItem,index) in section.data" :key="'listItem' + index">
              <div class="list-img">
                <img :src="listItem.img_url" alt="">
              </div>
              <div class="list-infor clearfix">
                <h5 class="tit">{{listItem.title}}</h5>
                <span class="list-btn">立即购买</span>
              </div>
            </li>
          </ul>
        </div>
        <!--军政list列表 -->
        <div class="list-wrapper" v-if="section.view_type == '4'" >
          <div class="list-item-wrapper clearfix">
            <ul class="lists" v-for="(twoItem,index) in section.data" :key="'twoItem' + index">
              <li class="titlebar">
                <h2 class="titlebar-title">
                  {{twoItem.title}}
                </h2>
                <nav class="titlebar-nav">
                    <router-link to="/news" class="">更多 <i class="am-icon-angle-right"></i></router-link>
                </nav>
              </li>
              <li class="list-item clearfix" v-for="(listsubItem,index) in twoItem.items" :key="'listsubItem' + index">
                <div class="title">
                 {{listsubItem.title}}
                </div>
                <div class="label">
                  {{listsubItem.public_time}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class=""></div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { getBanner, getHomeList, getHomeLinks } from './../api/home'
export default {
  name: 'home',
  components: {
    swiper,
    swiperSlide,
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          autoplay: {
            delay: 2500,
            disableOnInteraction: false
          },
          el: '.swiper-pagination',
          clickable: true
        }
      },
      bannerList: [],
      homeList: [],
      links: [],
    }
  },
  mounted () {
    this.getBannerData()
    this.getHomeListData()
    this.getLinks()
  },
  methods: {
    getBannerData() {
      getBanner().then(res => {
        if (res.status === 200) {
          let data = res.data.data
          this.bannerList = data.items
        }
      })
    },
    getHomeListData() {
      getHomeList().then(res => {
        if (res.status === 200) {
          let data = res.data.data
          this.homeList = data.items
        }
      })
    },
    getLinks() {
      getHomeLinks().then(res => {
        if (res.status === 200) {
          let data = res.data.data
          this.links = data.items
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background: #eeeeee;
  padding-bottom: 50px;
}
.banner-slider {
  height: 520px;
  img {
    width: 100%;
    height: 100%;
  }
  .swiper-pagination {
    box-sizing: border-box;
    text-align: right;
    padding-right: 60px;
  }
  /deep/ .swiper-pagination-bullet {
    background: #fff;
    opacity: 1;
  }
  /deep/ .swiper-pagination-bullet-active {
    background: #e26262;
  }
}
.titlebar {
  padding: 46px 0 32px;
  .titlebar-title {
    display: inline-block;
    margin: 0;
    padding-bottom: 10px;
    color: #333333;
    font-size: 28px;
    border-bottom: 4px solid #e26262;
    &:before {
      border-left:0;
    }
  }
  a{
    text-decoration: none;
    color: #4d4d4d;
    line-height: 54px;
    font-size: 20px;
  }
  .titlebar-nav {
    float: right;
  }
  .am-icon-angle-right{
    font-size: 22px;
  }
}
.section {
  img {
    width: 100%;
    height: 100%;
  }
  .advert {
    img {
      height:116px;
    }
    margin: 40px 0 0;
  }
}
.list-wrapper {
  position: relative;
  &.padLeft {
    padding-left: 324px;
  }
  &.default {
    .list:nth-child(4n+1){
      margin-left:0
    }
  }
  .cover-item {
    position: absolute;
    left: 0;
    top:0;
    width: 324px;
    height: 400px;
  }
  .list {
    float: left;
    margin-left: 32px;
    margin-bottom: 24px;
    width: 324px;
    list-style: none;
    .list-img {
      overflow: hidden;
      height: 110px;
      img{
        width: 100%;
      }
    }
    .list-infor {
      padding: 14px 20px 20px;
      font-size: 14px;
      background: #fff;
      .infor-left {
        float: left;
      }
      .infor-right {
        float: right;
        text-align: right;
      }
      .tit {
        margin: 0 0 16px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .label {
        margin-bottom: 15px;
        color: #666666;
      }
      .price {
        font-size: 18px;
        color: #e26262;
        font-weight: bold;
      }
      .list-btn {
        float: right;
        width: 40px;
        height: 20px;
        margin-bottom: 14px;
        line-height: 20px;
        text-align: center;
        background: #e26262;
        color: #fff;
      }
      .subinfor {
        color: #808080;
      }
    }
  }
  .list-book {
    list-style: none;
    float: left;
    width: 248px;
    height: 352px;
    padding: 30px;
    background: #fff;
    margin-right: 40px;
    box-sizing: border-box;
    &:nth-child(5n){
       margin-right: 0;
    }
    .list-img {
      height: 182px;
    }
    .list-infor {
      text-align: center;
      font-size: 18px;
      .tit {
        height: 48px;
        margin: 20px 0;
        line-height: 26px;
        display:-webkit-box;
        overflow:hidden;
        text-overflow:ellipsis;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        color: #000;
      }
      .list-btn {
        background: #ff6666;
        color: #fff;
        padding: 2px 13px;
      }
    }
  }
  .list-item-wrapper  {
    margin-top: 50px;
    .lists {
      background-color: #fff;
      .titlebar {
        padding: 20px 30px;
      }
    }
    .lists:nth-child(2n-1) {
      float: left
    }
    .lists:nth-child(2n) {
      float: right
    }
  }
  .list-item {
    width:620px;
    margin: 10px 30px;
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
  }
}
</style>

