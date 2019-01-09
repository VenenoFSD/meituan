<template>
  <div class="page-login">
    <div class="login-header">
      <nuxt-link to="/" class="logo"></nuxt-link>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
      </div>
      <div class="form">
        <h4 v-if="error" class="tips">{{error}}</h4>
        <p>账号登录</p>
        <el-input v-model="username" prefix-icon="profile"></el-input>
        <el-input v-model="password" prefix-icon="password" type="password"></el-input>
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <span class="forget">忘记密码？</span>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    layout: 'blank',
    data () {
      return {
        error: false,
        username: '',
        password: '',
        checked: ''
      }
    },
    methods: {
      login () {

      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/login/index.scss';
</style>
