<template>
  <div class="m-geo">
    <i class="el-icon-location"></i>{{$store.state.geo.position.city}}
    <nuxt-link to="/changeCity" class="changeCity">切换城市</nuxt-link>
  </div>
</template>

<script>
  export default {
    name: "geo"
  }
</script>

<style>
</style>
