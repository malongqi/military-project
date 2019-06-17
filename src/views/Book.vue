<template>
 <div class="book">
   <div class="container">
      <div class="catalog" v-if="sortTypes.category">
        <label for="">分类：</label>
        <span v-for="(item,index) in sortTypes.category" :class="{'active': item.checked}" :key="'cat' + index" @click="getFilter('category',item)">{{item.name}}</span>
      </div>
       <div class="list-books-box clearfix">
         <div class="list-book" v-for="(book, index) in bookLists" :key="'book' + index">
           <router-link :to="{path: 'detail', query: {bookId: book.book_id}}">
              <div class="img-box">
                <img :src="book.img_url" alt="">
              </div>
              <div class="list-hd">
                <h3 class="list-hd-title">{{book.title}}</h3>
                <p class="list-hd-text">{{book.desc}}</p>
                <div class="price">¥{{book.price}}</div>
              </div>
           </router-link>
         </div>
       </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
import {getSortType} from './../api/course.js'
import { getbooks } from './../api/book.js'
export default {
  name: 'Book',
  components: {

  },
  data () {
    return {
      sortTypes: '',
      bookLists: [
        {
                "book_id":0,
                "title":"2019 专业课专业课专业课专业课专业课专业课专业课专业课-新闻0",
                "desc":"课程简介:新闻学专业讲解新闻学专业讲解新闻学专业讲解新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2980"
            },
            {
                "book_id":1,
                "title":"2019 专业课-新闻1",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2981"
            },
            {
                "book_id":2,
                "title":"2019 专业课-新闻2",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2982"
            },
            {
                "book_id":3,
                "title":"2019 专业课-新闻3",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2983"
            },
            {
                "book_id":4,
                "title":"2019 专业课-新闻4",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2984"
            },
            {
                "book_id":5,
                "title":"2019 专业课-新闻5",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2985"
            },
            {
                "book_id":6,
                "title":"2019 专业课-新闻6",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2986"
            },
            {
                "book_id":7,
                "title":"2019 专业课-新闻7",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2987"
            },
            {
                "book_id":8,
                "title":"2019 专业课-新闻8",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2988"
            },
            {
                "book_id":9,
                "title":"2019 专业课-新闻9",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"2989"
            },
            {
                "book_id":10,
                "title":"2019 专业课-新闻10",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"29810"
            },
            {
                "book_id":11,
                "title":"2019 专业课-新闻11",
                "desc":"课程简介:新闻学专业讲解",
                "img_url":"http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png",
                "price":"29811"
            }
      ]
    }
  },
  mounted () {
    this.getSorts()
    // this.getbookList()
  },
  methods: {
    getSorts () {
      getSortType().then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          for ( let key in data) {
            data[key].map((item, index) => {
              index === 0 ? item.checked = true :  item.checked = false
            })
          }
          this.sortTypes = data
        }
      })
    },
    getbookList () {
      let params = {
        cat_id: '',
        page_index: 1,
        page_size: 15,
      }
      getbooks(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.bookLists = data.items
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* scss */
.list-books-box {
  width: 1401px;
  box-sizing: border-box;
  border-right:1px solid #a6a6a6;
  border-bottom:1px solid #a6a6a6; 
}
.list-book {
  box-sizing: border-box;
  float: left;
  width: 350px;
  height: 420px;
  border-top:1px solid #a6a6a6;
  border-left:1px solid #a6a6a6;
  .img-box {
    padding: 30px 40px 35px;
    height:251px;
    img {
      width:100%;
    }
  }
  .list-hd {
    font-size: 18px;
    padding:  0 30px;
    .list-hd-title {
      margin: 0 0 10px;
      color:#333333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .list-hd-text {
      margin: 0 0 20px;
      color: #666666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      color: #ef2020;
      font-size: 24px;
    }
  }
}
</style>
