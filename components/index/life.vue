<template>
  <div class="m-life">
    <el-row>
      <el-col :span="14">
        <slider></slider>
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-login">
          <h4>
            <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt="">
          </h4>
          <div v-if="!userName.length">
            <p class="m-life-login-name">Hi！你好</p>
            <p>
              <nuxt-link to="/register">
                <el-button round size="medium">注册</el-button>
              </nuxt-link>
            </p>
            <p>
              <nuxt-link to="/login">
                <el-button round size="medium">立即登录</el-button>
              </nuxt-link>
            </p>
          </div>
          <div class="login-user" v-else>
            <p>欢迎您，{{userName}}</p>
            <ul>
              <nuxt-link tag="li" to="/order">
                <i class="el-icon-tickets"></i>
                <p>订单</p>
              </nuxt-link>
              <li>
                <i class="el-icon-star-on"></i>
                <p>收藏</p>
              </li>
              <li>
                <i class="el-icon-more"></i>
                <p>更多</p>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <div class="m-life-hotel"></div>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"></div>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"></div>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载APP">
          <p>美团APP手机版</p>
          <h4>
            <span class="red">1元起</span>
            <em class="gary">吃喝玩乐</em>
          </h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Slider from './slider'
  export default {
    name: "life",
    data () {
      return {
        userName: ''
      }
    },
    async mounted () {
      const {status, data: {user}} = await this.$axios.get('/users/getUser');
      if (status === 200) {
        this.userName = user;
      }
    },
    components: {
      Slider
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/index/life.scss';
</style>
