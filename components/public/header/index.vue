<template>
  <div class="m-header">
    <el-row>
      <el-col>
        <top-bar></top-bar>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <search-bar></search-bar>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TopBar from './topbar'
  import SearchBar from './searchbar'
  export default {
    name: "index",
    components: {
      TopBar,
      SearchBar
    }
  }
</script>

<style lang="scss">
  @import '../../../assets/css/public/header/index.scss';
</style>
