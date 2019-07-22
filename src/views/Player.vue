<template>
  <div class="player">
    <div class="title">{{title}}</div>
    <div class="wrapper">
      <div class="video-box">
        <video-player  class="vjs-custom-skin"
          v-if="playerOptions.sources[0].src"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)"
          @ended="onPlayerEnded($event)"
          @loadeddata="onPlayerLoadeddata($event)"
          @waiting="onPlayerWaiting($event)"
          @playing="onPlayerPlaying($event)"
          @timeupdate="onPlayerTimeupdate($event)"
          @canplay="onPlayerCanplay($event)"
          @canplaythrough="onPlayerCanplaythrough($event)"
          @ready="playerReadied"
          @statechanged="playerStateChanged($event)">
        </video-player>
      </div>
      <div class="sidebar">
        <div class="sidebar-content">
          <ul class="list-tit" v-if= "activeMenu !== 3">
            <li class="tit" v-for="(item,index) in list" :key="'list'+index" @click="getPlaying(item.class_id)">
              <div class="playname">{{item.title}}</div>
              <span class="btn" :class="{'active': item.isPlay}">观看视频</span>
            </li>
          </ul>
          <div v-else class="message-list">
            <div class="list-item" v-for="(msg,index) in messageList" :key="'msg' + index">
              <div class="avatar">
                <img src="" alt="">
              </div>
              <div class="list-hd">
                <div class="list-sub">
                  <span>{{msg.nickname}} </span>
                  <span> {{msg.comment_time}} </span>
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
          <li class="bar-item" v-for="(item,index) in menu" :key="'menu'+index" @click="handleMenu(item.id)">{{item.title}}</li>
        </ul>
      </div>
    </div>
    <login-dialog ref="login"></login-dialog>
    <register-dialog ref="register"></register-dialog>
  </div>
</template>
// <script src="./../assets/js/dhfPlayer.min.js"></script>
<script>
import RegisterDialog from './RegisterDialog'
import {getLocalStorage, setLocalStorage} from './../assets/js/storage.js'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import { videoPlayer } from 'vue-video-player'
import videojs from 'video.js'
import 'videojs-contrib-hls.js/src/videojs.hlsjs'
import {getCourseDetail,getPlay,getComments,addComments} from './../api/course.js'
export default {
  components: {
    videoPlayer,
    LoginDialog,
    RegisterDialog
    },
  data () {
    return {
      id: '',
      videoOptions: {},
      showPlayer: false,
      title: '星军课程',
      courses: [],
      books: [],
      messageList: [],
      list: [],
      menu: [
        {
          id: 1,
          title: '课时'
        },
        {
          id: 2,
          title: '资料下载'
        },
        {
          id: 3,
          title: '学员留言'
        }
      ],
      textarea: '', //留言内容
      activeMenu: 1,
      playerOptions: {
        muted: true,
        autoplay: true,
        preload: 'auto',
        language: 'en',
        sources: [{
          type: "video/mp4",
          src: "http://dhfspace.360drm.com/1616_25007_1560737976_马哲一.m3u8?e=1563697027&token=gUBmfZgZS5wy4wdQIDZG8UVxlNCyVSjvksIb13K5:Wlrzm5LGvrgk6blFsiE3EDSSf7A=",
        }],
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this._getCoursedetail()
    this.getPlaying(getLocalStorage('class'))
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    // 课程详情数据
    _getCoursedetail () {
      let params = {
        course_id: this.id 
      }
      getCourseDetail(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          data.courses.map(item => {
            if (item.class_id == getLocalStorage('class')) {
              item.isPlay = true
            } else {
              item.isPlay = false
            }
          })
          this.list = this.courses = data.courses
          this.books = data.downs
          this.$store.commit('handleLoad', false)
        }
      })
    },
    // 获取播放数据
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
      setLocalStorage('class',classid)
      getPlay(params).then(res => {
        if (res.data.code == 0) {
          let data = res.data.data
          this.$set(this.playerOptions.sources, 0, {
            type: "video/mp4",
            src: data.play_url
          });
          this.showPlayer = true
          // this.play(this.options)
          this.$store.commit('handleLoad', false)
        }
      })
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
     // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
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
        this.getPlaying()
        // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },
      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },
      // player is ready
      playerReadied(player) {
       this.player.play()
      },
     play(options){
      var me = this,url;
      if(options.source){
        this.player.ready(function() {
          this.src({
            src: options.source,
            type: 'application/x-mpegURL',
          });
        });
        this.player.play();
        return;
      }
      if(options.videoId&&options.app_id&&options.agencyId){
        axios.get('http://testweb.360drm.com/index.php?app=api&mod=Player&act=GetPlay&app_id=' + encodeURIComponent(this.videoOptions.app_id) + '&agencyId=' + this.videoOptions.agencyId +
          '&fid=' + this.videoOptions.videoId).then((res) => {
          if (res.data.code === 0) {
            console.log(this.decode(res.data.data))
            //url = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
            url = this.decode(res.data.data)
          } else {
            alert(res.data.msg)
          }
        }).then(function () {
          me.player.ready(function() {
            this.src({
              src: url,
              type: 'application/x-mpegURL',
            });
          });
          me.player.play();
        })
      }
    },
    decode (input) {
      var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
      var output = ''
      var chr1, chr2, chr3
      var enc1, enc2, enc3, enc4
      var i = 0
      var re = /[^A-Za-z0-9\+\/\=]/g;
      input = input.replace(re, '')
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++))
        enc2 = _keyStr.indexOf(input.charAt(i++))
        enc3 = _keyStr.indexOf(input.charAt(i++))
        enc4 = _keyStr.indexOf(input.charAt(i++))
        chr1 = (enc1 << 2) | (enc2 >> 4)
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
        chr3 = ((enc3 & 3) << 6) | enc4
        output = output + String.fromCharCode(chr1)
        if (enc3 !== 64) {
          output = output + String.fromCharCode(chr2)
        }
        if (enc4 !== 64) {
          output = output + String.fromCharCode(chr3)
        }
      }
      output = this._utf8_decode(output)
      return output
    },
    _utf8_decode(utftext) {
      let string = ''
      let i = 0
      let c = 0
      let c2 = 0
      let c3 = 0
      while (i < utftext.length) {
        c = utftext.charCodeAt(i)
        if (c < 128) {
          string += String.fromCharCode(c)
          i++
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1)
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
          i += 2
        } else {
          c2 = utftext.charCodeAt(i + 1)
          c3 = utftext.charCodeAt(i + 2)
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
          i += 3
        }
      }
      return string
    },
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
    height: 100%;
    padding:0 20px;
    /deep/ .video-player {
      height: 100%;
      .video-js {
        height: 100%;
      }
    }
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
      width: 155px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .btn {
      display: inline-block;
      color: #ff0000;
      border: 1px solid #ff0000;
      width: 108px;
      line-height: 32px;
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
    padding: 20px;
    display: flex;
    border-bottom: 1px solid #a6a6a6;
    .avatar {
      width: 66px;
      height: 66px;
      overflow: hidden;
      border-radius: 8px;
    }
    .list-hd {
      flex: 1;
      font-size:18px; 
      .list-sub {
        color: #a6a6a6;
      }
      .list-text {
        margin-top: 20px;
        color: #333333;
      }
    }
  }
}
</style>
