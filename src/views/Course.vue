<template>
  <div class="course">
    <bread-crumbs></bread-crumbs>
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
            <div class="list-thumb">
              <router-link :to="{path:'detail',query:{courseId: item.course_id}}">
                <img :src="item.img_url" />
              </router-link>
            </div>
            <div class="list-main">
              <h3 class="list-item-hd">
                <a :href="item.href" class="">{{item.title}}</a>
                <span class="price">¥{{item.price}}</span>
              </h3>
              <div class="list-item-text">{{item.desc}}</div>
              <div class="list-item-text">{{item.course_type}} 浏览量{{item.view_num}}</div>
            </div>
          </li>
        </ul>
        <am-pagination :total="100" align="center" v-model="filterParam.pageIndex" @change="changePages"></am-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BreadCrumbs from './../components/BreadCrumbs'
import AmPagination from './../components/Pagination'
import {getCourses, getSortType} from './../api/course.js'
export default {
  name: 'Course',
  components: {
    BreadCrumbs,
    AmPagination
  },
  data () {
    return {
      sortTypes: [],
      courseLists: [],
      filterParam: {
        catId: '',
        sortId: '',
        pageIndex: 1,
        pageSize: 15
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
      this.courseLists = []
      let params = {
        cat_id: this.filterParam.catId,
        page_index: this.filterParam.pageIndex,
        page_size: this.filterParam.pageSize,
        sort_id: this.filterParam.sortId,
      }
      // this.paramsEdit(params)
      getCourses(params).then(res=> {
        if (res.data.code == 0) {
          let data = res.data.data
          this.courseLists = data.items
        }
      })
    },
    getFilter (val,item) {
      this.sortTypes[val].map(item => {item.checked = false})
      item.checked = true
      this.filterParam.pageIndex = 1
      this.filterParam[val == 'sort' ? 'sortId' : 'catId'] = item[val == 'sort' ? 'sort_id' : 'cat_id']
      this.getCourseList()
    },
    changePages (val) {
      this.filterParam.pageIndex = val
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
    }
  }
  .list-main {
    .list-item-hd {
      margin-bottom:30px;
      font-size: 24px;
      a {
        color: #333333;
      }
    }
    .list-item-text {
      margin-bottom:30px;
      font-size:20px;
      color: #666666;
    }
    .price {
      margin-left: 20px;
      font-size: 26px;
      color: #e62626
    }
  }
}
</style>

