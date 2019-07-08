<template>
 <div class="book">
   <div class="container">
      <div class="catalog" v-if="sortTypes.category">
        <label for="">分类：</label>
        <span v-for="(item,index) in sortTypes.category" :class="{'active': item.checked}" :key="'cat' + index" @click="getFilter('category',item)">{{item.name}}</span>
      </div>
      <ul class="list-course-title" v-if="sortTypes.sort">
        <!-- <li class="active">综合排序</li> -->
        <li v-for="(item,index) in sortTypes.sort" :class="{'active': item.checked}" :key="'sort' + index" @click="getFilter('sort',item)">{{item.name}}</li>
      </ul>
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
      <div class="pagination-box">
        <el-pagination
          prev-text="上一页"
          next-text="下一页"
          layout="prev, pager, next"
          :total="pageTotal"
          @current-change="handleChange">
        </el-pagination>
      </div>
   </div>
 </div>
</template>

<script type="text/ecmascript-6">
import { getbooks, getSortType } from './../api/book.js'
export default {
  name: 'Book',
  components: {

  },
  data () {
    return {
      sortTypes: [],
      bookLists: [],
      pageTotal: 100,
      filterParam: {
        catId: '',
        pageIndex: 1,
        pageSize: 4
      }
    }
  },
  mounted () {
    this.getSorts()
    this.getbookList()
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
      this.$store.commit('handleLoad', true)
      this.bookLists = []
      let params = {
        cat_id: this.filterParam.catId,
        page_index: this.filterParam.pageIndex,
        page_size: this.filterParam.pageSize,
        sort_id: this.filterParam.sortId,
      }
      getbooks(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          // this.pageTotal = data
          this.bookLists = data.items
          this.$store.commit('handleLoad', false)
        }
      })
    },
    getFilter (val,item) {
      this.sortTypes[val].map(item => {item.checked = false})
      item.checked = true
      this.filterParam.pageIndex = 1
      this.filterParam[val == 'sort' ? 'sortId' : 'catId'] = item[val == 'sort' ? 'sort_id' : 'cat_id']
      this.getbookList()
    },
    handleChange (val) {
      this.filterParam.pageIndex = val
      this.getbookList()
    }
  }
}
</script>

<style scoped lang="scss">
/* scss */
.book {
  margin-bottom: 50px;
}
.list-books-box {
  margin-top: 30px;
  box-sizing: border-box;
}
.list-book {
  box-sizing: border-box;
  float: left;
  width: 25%;
  height: 420px;
  border: 1px solid #a6a6a6;
  margin-top: -1px;
  margin-left: -1px;
  .img-box {
    box-sizing: border-box;
    padding: 30px 40px 35px;
    height:251px;
    overflow: hidden;
    img {
      width:100%;
    }
  }
  .list-hd {
    font-size: 18px;
    padding:  10px 30px 0;
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
