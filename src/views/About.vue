<template>
  <div class="about container">
    <div class="banner">
      <img :src="oursDetail.banner" alt="">
    </div>
    <div class="about-content">
      <div class="tabbar clearfix">
        <ul class="tabbar-nav">
          <li
            class="tabbar-nav-item"
            v-for="(navItem, index) in oursDetail.detail"
            :key="'nav' + index"
            :class="{'active': navItem.active}"
            @click="handleClickNav(navItem)">
            {{navItem.title}}
          </li>
        </ul>
        <div class="tabbar-content">
          {{content}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      oursDetail: {
        banner: 'http://wechatapppro-1252524126.file.myqcloud.com/appq9jtJc2T2160/image/compress/be44a1a9ea8f6e88a7aeefd16955ccf0.png',
        detail : [
          {
            title: '关于我们',
            active: true,
            des: '1本科生学费全额奖励计划是李嘉诚基金会捐资在汕头大学设立的专项奖助学金。首期奖励计划的对象为2019级至2022级本科生，包括四年制专业和临床医学、口腔医学等五年制专业。主要奖励支持这四个年级的汕大本科学生在校修读完成本科所有课程。每年的捐资额度依据2019级至2022级本科生当年的学费总额，并以每年一亿元人民币为资助上限'
          },
          {
            title: '企业文化',
            active: false,
            des: '2本科生学费全额奖励计划是李嘉诚基金会捐资在汕头大学设立的专项奖助学金。首期奖励计划的对象为2019级至2022级本科生，包括四年制专业和临床医学、口腔医学等五年制专业。主要奖励支持这四个年级的汕大本科学生在校修读完成本科所有课程。每年的捐资额度依据2019级至2022级本科生当年的学费总额，并以每年一亿元人民币为资助上限'
          },
          {
            title: '企业愿景',
            active: false,
            des: '3本科生学费全额奖励计划是李嘉诚基金会捐资在汕头大学设立的专项奖助学金。首期奖励计划的对象为2019级至2022级本科生，包括四年制专业和临床医学、口腔医学等五年制专业。主要奖励支持这四个年级的汕大本科学生在校修读完成本科所有课程。每年的捐资额度依据2019级至2022级本科生当年的学费总额，并以每年一亿元人民币为资助上限'
          }
        ]
      },
      content: ''
    };
  },
  computed: {},
  mounted() {
    this.content = this.oursDetail.detail[0].des
  },
  methods: {
    handleClickNav (item) {
      this.oursDetail.detail.map(item => {
        item.active = false
      })
      item.active = true
      this.content = item.des
    }
  }
}
</script>
<style lang='scss' scoped>
.banner {
  height: 320px;
  overflow: hidden;
  img {
    width: 100%;
  }
}
.about-content {
  padding: 20px 260px;
}
.tabbar {
  display: flex;
  .tabbar-nav {
    float: left;
    margin-right: 40px;
    list-style: none;
  }
  .tabbar-nav-item {
    width: 198px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 24px;
    color: #333333;
    &.active {
      color: #ffffff;
      background: #2b93c6;
    }
  }
  .tabbar-content {
    float: left;
    line-height: 1.5;
  }
}
</style>