<template>
  <div class="m-user">
    <div v-if="userName">
      欢迎您，<span class="username">{{userName}}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </div>
    <div v-else>
      <nuxt-link to="/login" class="login">立即登录</nuxt-link>
      <nuxt-link to="/register" class="register">注册</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "user",
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
    }
  }
</script>

<style>
</style>
