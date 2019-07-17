<template>
  <div class="course">
    <!-- <bread-crumbs></bread-crumbs> -->
    <div class="container">
      <div class="catalog" v-if="sortTypes.category">
        <label for="">分类：</label>
        <span v-for="(item,index) in sortTypes.category" :class="{'active': item.checked}" :key="'cat' + index" @click="getFilter('category',item)">{{item.name}}</span>
      </div>
      <ul class="list-course-title" v-if="sortTypes.sort">
        <!-- <li class="active">综合排序</li> -->
        <li v-for="(item,index) in sortTypes.sort" :class="{'active': item.checked}" :key="'sort' + index" @click="getFilter('sort',item)">{{item.name}}</li>
      </ul>
      <!--列表标题-->
      <div class="list-news-box">
        <ul class="list-news">
          <!--缩略图在标题左边-->
          <li v-for="(item,index) in courseLists" :key="'course' + index" class="list-news-item clearfix">
            <router-link :to="{path:'detail',query:{courseId: item.course_id}}">
              <div class="list-thumb">
                <img :src="item.img_url" />
              </div>
              <div class="list-main">
                <h3 class="list-item-hd">
                  <router-link :to="{path: item.href}" class="">{{item.title}}</router-link>
                  <span class="price">¥{{item.price}}</span>
                </h3>
                <div class="list-item-text">课程简介：{{item.desc}}</div>
                <div class="list-item-text">
                  <span>【{{item.course_type}}】</span> 
                  <span>浏览量{{item.view_num}}</span></div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="pagination-box" v-if="Math.floor(pagination.pageTotal/pagination.pageSize) > 0">
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
</template>

<script type="text/ecmascript-6">
import BreadCrumbs from './../components/BreadCrumbs'
import {getCourses, getSortType} from './../api/course.js'
export default {
  name: 'Course',
  components: {
    BreadCrumbs
  },
  data () {
    return {
      sortTypes: [],
      courseLists: [],
      filterParam: {
        catId: '',
        sortId: '',
      },
      pagination: {
        pageIndex: 1,
        pageSize: 15,
        pageTotal: 100,
      }
    }
  },
  mounted () {
    this.getSorts()
    this.getCourseList()
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
    getCourseList () {
      this.$store.commit('handleLoad', true)
      this.courseLists = []
      let params = {
        cat_id: this.filterParam.catId,
        page_index: this.pagination.pageIndex,
        page_size: this.pagination.pageSize,
        sort_id: this.filterParam.sortId,
      }
      // this.paramsEdit(params)
      getCourses(params).then(res=> {
        if (res.data.code == 0) {
          let data = res.data.data
          this.pagination.pageTotal = parseInt(data.total_num)
          this.courseLists = data.items
          this.$store.commit('handleLoad', false)
        }
      })
    },
    getFilter (val,item) {
      this.sortTypes[val].map(item => {item.checked = false})
      item.checked = true
      this.pagination.pageIndex = 1
      this.filterParam[val == 'sort' ? 'sortId' : 'catId'] = item[val == 'sort' ? 'sort_id' : 'cat_id']
      this.getCourseList()
    },
    handleChange (val) {
      this.pagination.pageIndex = val
      this.getCourseList()
    }
  }
}
</script>

<style scoped lang="scss">
/* scss */
.list-news {
  list-style-type: none;
  .list-news-item {
    margin-bottom:20px;
    padding: 30px 20px;
    background: #eeeeee;
  }
  .list-thumb{
    float: left;
    width:328px;
    height: 208px;
    margin-right: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .list-main {
    .list-item-hd {
      display: flex;
      margin-bottom:30px;
      font-size: 24px;
      a {
        max-width: 60%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #333333;
        white-space: nowrap;
      }
    }
    .list-item-text {
      margin-bottom:30px;
      font-size:20px;
      color: #666666;
      span {
        padding: 0 10px 0 0
      }
    }
    .price {
      margin-left: 20px;
      font-size: 26px;
      color: #e62626
    }
  }
}
</style>

