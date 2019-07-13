<template>
  <div class="home">
    <swiper
      class="banner-slider"
      v-if="bannerList.length > 0"
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
        <div class="advert" v-if="section.view_type == '1' && section.data">
          <a :href="section.data.target_url">
            <img :src="section.data.img_url" alt="">
          </a>
        </div>
        <div v-if="section.view_type == '2' || section.view_type == '3'" class="titlebar">
          <h2 class="titlebar-title">
            {{section.title}}
          </h2>
          <nav class="titlebar-nav">
            <router-link :to="{path: section.data_type}" class="">更多 <i class="am-icon-angle-right"></i></router-link>
          </nav>
        </div>
        <!-- 课程列表 -->
        <div class="list-wrapper" v-if="section.view_type == '2' && section.data.length > 0" >
          <ul class="lists clearfix" :class="{'has-cover': section.cover_data}">
            <li  class="list cover-item" v-if="section.cover_data">
              <router-link :to="{path: '/detail?' + section.data_type + 'Id=' + section.cover_data.id}">
                <img :src="section.cover_data.img_url" alt="">
              </router-link>
            </li>
            <li class="list" v-for="(listItem,index) in section.data" :key="'listItem' + index">
              <router-link :to="{path:'detail',query:{courseId: listItem.id}}">
                <div class="list-img">
                  <img :src="listItem.img_url" alt="">
                </div>
                <div class="list-infor">
                  <h5 class="tit">{{listItem.title}}</h5>
                  <div class="clearfix">
                    <div class="infor-left">
                      <p class="label">{{listItem.class_num}}课时</p>
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
        <div class="list-wrapper" v-if="section.view_type == '3' && section.data.length > 0" >
          <ul class="lists clearfix">
            <li class="list-book" v-for="(listItem,index) in section.data" :key="'listItem' + index">
              <router-link :to="{path:'detail',query:{bookId: listItem.id}}">
                <div class="list-img">
                  <img :src="listItem.img_url" alt="">
                </div>
                <div class="list-infor clearfix">
                  <h5 class="tit">{{listItem.title}}</h5>
                  <span class="list-btn">立即购买</span>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
        <!--军政list列表 -->
        <div class="list-wrapper" v-if="section.view_type == '4' && section.data.length > 0" >
          <div class="list-item-wrapper clearfix">
            <ul class="lists list-two" v-for="(twoItem,index) in section.data" :key="'twoItem' + index">
              <li class="titlebar">
                <h2 class="titlebar-title">
                  {{twoItem.title}}
                </h2>
                <nav class="titlebar-nav">
                  <router-link :to="{path: 'news'}" class="">更多 <i class="am-icon-angle-right"></i></router-link>
                </nav>
              </li>
              <li class="list-item clearfix" v-for="(listsubItem,index) in twoItem.items" :key="'listsubItem' + index">
                <router-link :to="{path: 'detail', query: {newsId: listsubItem.id}}">
                  <div class="title">
                  {{listsubItem.title}}
                  </div>
                  <div class="label">
                    {{listsubItem.public_time}}
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="list-links" v-if="links.length > 0">
      <div class="links-title">
        友情链接
      </div>
      <ul class="links-items">
        <li class="links-item" v-for="(link, index) in links" :key="'link' + index">
          <a :href="link.target_url" target="_blank">
            <img :src="link.img_url" alt="">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// data_type 区分类型： 1:课程 2:教材 3:资讯
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
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        loop: true,
        pagination: {
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
      this.$store.commit('handleLoad', true)
      getHomeList().then(res => {
        if (res.status === 200) {
          let data = res.data.data
          this.$store.commit('handleLoad', false)
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
    // getPath(val) {
    //   debugger
    //   switch (val) {
    //     case 1:
    //       return 'course'
    //     case 2:
    //       return 'book'
    //     case 3:
    //       return 'news'
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background: #eeeeee;
  padding-bottom: 50px;
}
.banner-slider {
  height: 370px;
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
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  &.default {
    .list:nth-child(4n+1){
      margin-left:0
    }
  }
  .has-cover .list:nth-child(4n + 1) {
    margin-left:1.2%
  }
  .list.cover-item {
    height: 460px;
    margin-left: 0 !important;
  }
  .list:nth-child(4n + 1) {
    margin-left: 0; 
  }
  .list {
    float: left;
    margin-left: 1.2%;
    margin-bottom: 24px;
    width: 24%;
    list-style: none;
    .list-img {
      overflow: hidden;
      background: #fff;
      height: 110px;
      img{
        width: 100%;
      }
    }
    .list-infor {
      padding: 14px 20px 20px;
      font-size: 14px;
      line-height: 1;
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
        margin-top: 0;
        margin-bottom: 8px;
        height: 20px;
        line-height: 20px;
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
    width: 18.2%;
    height: 352px;
    padding: 30px;
    background: #fff;
    margin-right: 2.2%;
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
    .list-two {
      width: 49%;
    }
  }
  .list-item {
    margin: 10px 30px;
    line-height: 50px;
    list-style: none;
    border-bottom: 1px solid #eeeeee;
    font-size: 16px;
    .title {
      max-width: 76%;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      float: left;
      color: #4d4d4d;
    }
    .label {
      float: right;
      color: #808080;
    }
  }
}
.list-links {
  .links-title {
    margin-top: 30px;
    background: #2b93c6;
    line-height: 80px;
    text-align: center;
    color:#fff;
    font-size: 20px;
  }
  .links-items {
    padding: 30px 0 0;
    text-align: center;
  }
  .links-item {
    display: inline-block;
    margin: 0 13px;
  }
}
</style>

