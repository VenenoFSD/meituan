<template>
  <div class="page-index">
    <el-row>
      <el-col :span="5">
        <my-menu></my-menu>
      </el-col>
      <el-col :span="19">
        <life></life>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <scenes></scenes>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyMenu from '.././components/index/menu'
import Life from '.././components/index/life'
import Scenes from '.././components/index/scenes'

export default {
  components: {
    MyMenu,
    Life,
    Scenes
  }
}
</script>

<style lang="scss">
  @import '../assets/css/index/index.scss';
</style>
