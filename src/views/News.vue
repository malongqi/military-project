<template>
  <div class="news">
    <div class="container">
      <div class="catalog">
        <span v-for="(item,index) in category" :class="{'active': item.checked}" :key="'cat' + index" @click="getFilter('category',item)">{{item.name}}</span>
      </div>
      <div class="list-news-wrapper">
        <ul class="list-news">
          <li class="list-news-item" v-for="(item,index) in newsList" :key="'new' + index">
            <router-link :to="{path: 'detail', query: {newsId: item.news_id}}">
              <h3 class="list-news-hd">{{item.title}}</h3>
              <p class="list-news-text">
                <span>发表于：{{item.public_time}}</span>
                <span>新闻来源：{{item.source}}</span>
              </p>
            </router-link>
          </li>
        </ul>
        <am-pagination :total="100" align="center" v-model="filterParam.pageIndex" @change="changePages"></am-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getSortType, getNewsList } from './../api/news'
export default {
  name: 'News',
  components: {},
  data () {
    return {
      category: [],
      newsList: [],
      filterParam: {
        pageIndex: 1,
        pageSize: 15
      }
    };
  },
  computed: {},
  mounted () {
    this.getSort()
    this.getList()
  },
  methods: {
    getSort () {
      getSortType().then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          for ( let key in data) {
            data[key].map((item, index) => {
              index === 0 ? item.checked = true :  item.checked = false
            })
          }
          this.category = data.category
        }
      })
    },
    getList () {
      this.newsList = []
      let params = {
        page_index: this.filterParam.pageIndex,
        page_size: this.filterParam.pageSize
      }
      getNewsList(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.newsList = data.items
        }
      })
    },
    changePages (val) {
      this.filterParam.pageIndex = val
      this.getList()
    }
  }
}
</script>
<style lang='scss' scoped>
.catalog {
  background: #f5f5f5;
}
.list-news-wrapper {
  padding: 0 10px;
  border: 1px solid #a6a6a6;
  border-top: 0;
  .list-news-item {
    padding: 54px 10px;
    list-style: none;
    border-bottom: 1px solid #a6a6a6;
    .list-news-hd {
      margin: 0;
      font-size: 24px;
      color: #333;
    }
    .list-news-text {
      font-size:16px;
      color: #666666;
      span {
        display: inline-block;
        margin-right: 40px;
      }
    }
  }
}
</style>