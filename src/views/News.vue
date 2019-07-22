<template>
  <div class="news">
    <div class="container">
      <div class="catalog" v-if="sortTypes.category">
        <label for="">分类：</label>
        <span v-for="(item,index) in sortTypes.category" :class="{'active': item.checked}" :key="'cat' + index" @click="getFilter('category',item)">{{item.name}}</span>
      </div>
      <ul class="list-course-title" v-if="sortTypes.sort">
        <!-- <li class="active">综合排序</li> -->
        <li v-for="(item,index) in sortTypes.sort" :class="{'active': item.checked}" :key="'sort' + index" @click="getFilter('sort',item)">{{item.name}}</li>
      </ul>
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
        <div class="pagination-box">
          <el-pagination
            prev-text="上一页"
            next-text="下一页"
            layout="prev, pager, next"
            :page-size="pagination.pageSize"
            :total="pagination.pageTotal"
            @current-change="handleChange">
          </el-pagination>
        </div>
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
      sortTypes: [],
      newsList: [],
      filterParam: {
        catId: '',
      },
      pagination: {
        pageIndex: 1,
        pageSize: 15,
        pageTotal: 0,
      }
    };
  },
  computed: {},
  mounted () {
    this.getSorts()
    this.getList()
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
    getList () {
      this.$store.commit('handleLoad', true)
      this.newsList = []
      let params = {
        cat_id: this.filterParam.catId,
        page_index: this.pagination.pageIndex,
        page_size: this.pagination.pageSize
      }
      getNewsList(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.pagination.pageTotal = data.total_num
          this.newsList = data.items
          this.$store.commit('handleLoad', false)
        }
      })
    },
    getFilter (val,item) {
      this.sortTypes[val].map(item => {item.checked = false})
      item.checked = true
      this.pagination.pageIndex = 1
      this.filterParam[val == 'sort' ? 'sortId' : 'catId'] = item[val == 'sort' ? 'sort_id' : 'cat_id']
      this.getList()
    },
    handleChange (val) {
      this.pagination.pageIndex = val
      this.getList()
    }
  }
}
</script>
<style lang='scss' scoped>
.news {
  margin-bottom: 50px;
  .catalog {
    background: #f5f5f5;
    margin-bottom: 0;
  }
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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
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