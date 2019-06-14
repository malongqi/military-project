<template>
 <div class="detail">
<!-- html code -->
  <div class="container">
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
      <div class="sidebar">
        <div class="tabbar-content">
          <ul class="list-item-wrapper">
            <li class="list-item clearfix" v-for="(item,index) in courseDetail.downs" :key="'down' + index">
              <div class="img-box">
               <img src="" alt="">
              </div>
              <div class="list-hd">
               
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  
 </div>
</template>

<script type="text/ecmascript-6">
import {getDetail} from './../api/course.js'
// import md5 from './../utils/md5.js'
var md5 = require('md5');
debugger
export default {
  name: 'Detail',
  components: {

  },
  data () {
    return {
      id: '',
      courseDetail: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getCoursedetail()
  },
  methods: {
    paramsEdit (params) {
      debugger
      let paramList = ''
      for (let key in params) {
        if ( params[key] !== '') {
          paramList += `&${key}=${encodeURI(params[key])}`
        }
      }
      let msg =  paramList.substring(1) + '_1Ftjv0bfpVmqbE38'
      let code = md5(msg)
      console.log(JSON.stringify(code))
    },
    getCoursedetail () {
      let params = {
        course_id: this.id 
      }
      this.paramsEdit({id:12})
      this.paramsEdit({id:12})
      getDetail(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.courseDetail = data
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
.tabbar-wrapper {
  .tabbar {
    padding: 34px 30px 25px;
    background: #f5f5f5;
    .tabbar-item {
      font-size: 24px;
      padding: 0 10px;
      margin-right: 80px;
    }
  }
  .tabbar-content {
    box-sizing: border-box;
    padding: 0 30px;
    border: 1px solid #a6a6a6;
    border-top: 0;
  }
}

</style>