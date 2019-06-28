<template>
  <div class="mine">
    <bread-crumbs></bread-crumbs>
    <div class="container wrapper">
      <div class="sidebar">
        <div class="nenu-title">会员管理中心</div>
        <el-menu
          :default-active="defaultActive"
          router
          @open="handleOpen"
          @close="handleClose">
          <el-submenu
            v-for="(item, index) in menuList"
            :index="index +'-'+index"
            :key="index"
            >
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.menu}}</span>
            </template>
             <el-menu-item
                v-for="(subItem,subIndex) in item.children"
                :index="subItem.path"
                :key="'sub' +subIndex"
                >
                {{subItem.menu}}
              </el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="main">
        <div class="user-infor">
          <img class="avatar" src="" alt="">
          <div class="user-hd">
            <p>账号：11111111</p>
            <p>上次登录时间：dsss</p>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from './../../components/BreadCrumbs'
export default {
  components: {
    BreadCrumbs
  },
  data () {
    return {
      defaultActive: '',
      menuList: [
        {
          menu: '我的课程',
          children: [
            {
              path: '/mycourse',
              menu: '我的课程',
            },
            {
              path: '/myview',
              menu: '我的浏览',
            }
          ]
        },
        {
          menu: '个人资料',
          children: [
            {
              path: '/myinfor',
              menu: '完善资料',
            },
            {
              path: '/mypassword',
              menu: '修改密码',
            },
            {
              path: '/myaddress',
              menu: '收货地址',
            }
          ]
        },
        {
          menu: '我的资金',
          children: [
            {
              path: '/myorder',
              menu: '我的订单',
            }
          ]
        }
      ],
      tableData: []
    };
  },
  computed: {},
  mounted() {
    this.$store.commit('handleLoad', false)
  },
  methods: {
    handleOpen() {},
    handleClose() {}
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  display: flex;
  .sidebar {
    width: 194px;
    margin-right: 20px;
    .nenu-title {
      padding: 0 20px;
      background: #2b93c6;
      color: #fff;
      line-height: 54px;
    }
    /deep/ .el-menu {
      border-right: 0;
      overflow: hidden;
      .el-submenu__title {
        background: #e6e6e6;
      }
    }
  }
  .main {
    flex: 1;
  }
  .user-infor {
    display: flex;
    padding: 20px;
    border: 1px solid #e6e6e6;
    margin-bottom: 30px;
    .avatar {
      width: 110px;
      height: 110px;
      margin-right: 20px;
    }
  }
}
</style>