<template>
  <div class="player">
    <div class="title">{{title}}</div>
    <div class="wrapper">
      <div class="video-box">
        <dhf-player
          v-if="videoOptions.source"
          ref="player"
          :videoOptions="videoOptions">
        </dhf-player>
      </div>
      <div class="sidebar">
        <div class="sidebar-content">
          <ul class="list-tit" v-if= "activeMenu !== 3">
            <li class="tit" v-for="(item,index) in list" :key="'list'+index">
              <div class="playname">{{item.title}}</div>
              <el-button size="small" v-if="activeMenu == 1" class="btn" :class="{'active': item.isPlay}" :disabled="item.is_trial == '0'"  @click="getPlaying(item.class_id)">{{item.is_trial==1 ? '试看':'观看视频'}}</el-button>
              <el-button size="small" v-if="activeMenu == 2" class="btn" :loading="item.loading" @click="downLoad(item)">点击下载</el-button>
            </li>
          </ul>
          <div v-else class="message-list">
            <div class="list-item" v-for="(msg,index) in messageList" :key="'msg' + index">
              <div class="avatar">
                <img :src="msg.head_pic_small" alt="">
              </div>
              <div class="list-hd">
                <div class="list-sub">
                  <p>{{msg.nickname}} </p>
                  <p> {{msg.comment_time}} </p>
                </div>
                <div class="list-text">
                  {{msg.content}}
                </div>
              </div>
            </div>
            
          </div>
          <div class="texteara" v-if= "activeMenu == 3">
            <el-input
              type="textarea"
              style="width:100%, height:40px"
              resize="none"
              placeholder="请输入内容"
              v-model="textarea">
            </el-input>
            <el-button slot="append" type="primary" @click="submit">提交</el-button>
          </div>
        </div>
        <ul class="menu-bar">
          <li class="bar-item" :class="{'active' : item.active}" v-for="(item,index) in menu" :key="'menu'+index" @click="handleMenu(item.id)">{{item.title}}</li>
        </ul>
      </div>
    </div>
    
  </div>
</template>
<script>
import {getLocalStorage, setLocalStorage} from './../assets/js/storage.js'
import {getCourseDetail,getPlay,getCourseDown,getComments,addComments} from './../api/course.js'
import '../../node_modules/video.js/dist/video-js.css'
export default {
  components: {},
  data () {
    return {
      id: '',
      player: null,
      videoOptions: {
        // 宽度
        width: 400,
        // 高度
        height: 400,
        // 视频播放后是否循环播放
        loop: false,
        // 是否静音
        muted: true,
        // 是否自动播放
        autoplay: false,
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。设置为true，宽度和高度以父盒子为准
        fluid: true,
        // 视频m3u8地址
        source: '',
        // 传入的网校ID
        // agencyId: '1',
        // // //视频id
        // videoId: '79313',
        // // //后台分配的app_id
        // app_id: 'LB6nIZoJj8DjFYwGtkkOoQ',
        // 视频播放事件
        onplay: function () {
          console.log('onplaybegin event')
        },
        // 视频报错事件
        onerror: function () {
          console.log('onplayerror event')
        },
        // 视频结束事件
        onended: function () {
          console.log('onplayend event')
        },
        // 视频暂停事件
        onpause: function () {
          console.log('onplaypause event')
        }
      },
      showPlayer: false,
      title: '星军课程',
      messageList: [],
      courses: [],
      books: [],
      list: [],
      menu: [
        {
          id: 1,
          title: '课时',
          active: true,
        },
        {
          id: 2,
          title: '资料下载',
          active: false,
        },
        {
          id: 3,
          title: '学员留言',
          active: false,
        }
      ],
      textarea: '', //留言内容
      activeMenu: 1,
    }
  },
  computed: {},
  mounted() {
    // debugger
    this.id = this.$route.query.id
    this.class = getLocalStorage('class')
    this._getCoursedetail()
    let _this = this
    this.videoOptions.onended = function() {
      _this.playEnd()
    }
    this.getPlaying(this.class)
    let that = this
  },
  methods: {
    _getCoursedetail () {
      let params = {
        course_id: this.id 
      }
      getCourseDetail(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          data.courses.map(item => {
            if (item.class_id == this.class) {
              item.isPlay = true
            } else {
              item.isPlay = false
            }
          })
          this.list = this.courses = data.courses
          data.downs.map(item => {
            item.loading = false
          })
          this.books = data.downs
          this.$store.commit('handleLoad', false)
        }
      })
    },
    getPlaying (classid) {
      let params = {
        course_id: this.id,
        class_id: classid
      }
      this.list.map(item => {
        if (item.class_id == classid) {
          item.isPlay = true
        } else {
          item.isPlay = false
        }
      })
      setLocalStorage('class', classid)
      // this.videoOptions.source =  'http://dhfspace.360drm.com/1616_25007_1560737976_马哲一.m3u8?e=1563697027&token=gUBmfZgZS5wy4wdQIDZG8UVxlNCyVSjvksIb13K5:Wlrzm5LGvrgk6blFsiE3EDSSf7A='
      // this.showPlayer = true
      getPlay(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.videoOptions.source =  data.play_url 
          this.showPlayer = true
          this.$nextTick(() => {
            this.player = this.$refs.player
            this.player.play()
          })
          
          this.$store.commit('handleLoad', false)
        }
      })
    },
    playEnd () {
      this.showPlayer = false
      for (let i = 0; i < this.courses.length; i++) {
        let item = this.courses[i]
        item.isPlay = false
        if (item.class_id = this.class) {
          if (i == this.courses.length -1) {
            setLocalStorage('class', this.courses[0].class_id)
            this.$set(this.list[0], 'isPlay', true)
          } else {
            setLocalStorage('class', this.courses[i + 1].class_id)
            this.$set(this.list[i + 1], 'isPlay', true)
          }
        }
      }
      // this.videoOptions.source =  // data.play_url
      // this.player.play(this.videoOptions)
      this.getPlaying(this.class)
    },
    // 获取评论数据
    getCommentsList () {
      this.messageList = []
      let params = {
        course_id: this.id,
        class_id: getLocalStorage('class'),
        page_index: 1,
        page_size: 15
      }
      getComments(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.messageList = data.items
          // this.play(this.options)
          this.$store.commit('handleLoad', false)
        }
      })
    },
    submit() {
      if (this.textarea == '') {
        this.$message({
          type: 'error',
          message: '请输入评论内容'
        })
      }
      let params = {
        course_id: this.id,
        class_id: getLocalStorage('class'),
        content: this.textarea
      }
      addComments(params).then(res => {
        if (res.data.code == 0) {
          this.textarea = ''
          // this.play(this.options)
          this.getCommentsList()
          this.$message({
            type: 'sucess',
            message: '评论已添加'
          })
        }
      })
    },
    handleMenu (id) {
      this.activeMenu = id
      if (id == 1) {
        this.list = this.courses
      }
      if (id == 2) {
        this.list = this.books
      }
      if (id == 3) {
        this.getCommentsList()
      }
    },
    downLoad (item) {
      item.loading = true
      let params = {
        course_id: this.id,
        class_id: item.class_id
      }
      getCourseDown(params).then(res => {
        if (res.data.code == 0) {
          item.loading = false
          location.href = res.data.data.down_url
        }
      })  
    }
  }
}
</script>
// <style link="./../assets/css/dhfPlayer.css">
</style>
<style lang="scss">
// body {
//   overflow: hidden;
// }
.player {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #36373b;
  .title {
    padding: 28px 40px;
    color: #ffffff;
    font-size: 30px;
  }
  .wrapper {
    height:calc(100% - 139px);
    padding-bottom: 40px; 
  }
  .video-box {
    width: 74%;
    box-sizing: border-box;
    float: left;
    padding:0 20px;
  }
  .sidebar {
    width: 26%;
    height: 100%;
    float: right;
    display: flex;
  }
  .sidebar-content {
    position: relative;
    height: 100%;
    flex: 1;
    background: #fff;
    .tit {
      display: block;
      padding: 23px 20px;
      display: flex;
      font-size: 18px;
      line-height: 30px;
      color: #4d4d4d;
    }
    .playname {
      flex: 1;
      width: 130px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .btn {
      display: inline-block;
      color: #ff0000;
      border: 1px solid #ff0000;
      text-align: center;
      border-radius: 4px;
      font-size: 18px;
      &.active {
        background: #ff0000;
        color: #ffff;
      }
    }
  }
  .menu-bar {
    width: 70px;
    height: 100%;
    color: #fff;
    font-size: 18px;
    .bar-item {
      padding: 20px 10px;
      height: 88px;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      border-bottom: 3px solid #000;
      &:first-child {
        border-top: 3px solid #000;
      }
    }
  }
  .message-list {
    padding: 10px 10px 100px;
    box-sizing: border-box;
    height: 100%;
    overflow-y: auto;
    position: relative;
  }
  .texteara {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    height: 40px;
    box-sizing: border-box;
    width: 100%;
    /deep/ .el-textarea__inner {
      height: 40px;
    }
  }
  .list-item {
    padding:20px 10px;
    display: flex;
    border-bottom: 1px solid #a6a6a6;
    .avatar {
      width: 66px;
      height: 66px;
      margin-right: 10px;
      overflow: hidden;
      border-radius: 8px;
    }
    .list-hd {
      flex: 1;
      font-size:18px; 
      .list-sub {
        color: #a6a6a6;
        p {
          margin: 0
        }
      }
      .list-text {
        margin-top: 10px;
        color: #333333;
        word-break: break-all;
      }
    }
  }
}
</style>
