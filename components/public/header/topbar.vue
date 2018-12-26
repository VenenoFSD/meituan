<template>
  <el-row class="m-header">
    <el-col :span="5">
      <geo></geo>
    </el-col>
    <el-col :span="5">
      <user></user>
    </el-col>
    <el-col :span="14">
      <nav-bar></nav-bar>
    </el-col>
  </el-row>
</template>

<script>
  import Geo from './geo'
  import User from './user'
  import NavBar from './navbar'
  export default {
    name: "topBar",
    components: {
      Geo,
      User,
      NavBar
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/css/public/layout.scss';
</style>
