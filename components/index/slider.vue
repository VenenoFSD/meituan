<template>
  <div class="slide">
    <el-carousel height="240px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    name: 'slider',
    data () {
      return {
        list: ['http://p0.meituan.net/codeman/00c8bc1c25fbcc6d0651b29a2057a8c1560658.png', 'http://p1.meituan.net/codeman/826a5ed09dab49af658c34624d75491861404.jpg', 'http://p0.meituan.net/codeman/a97baf515235f4c5a2b1323a741e577185048.jpg', 'http://p0.meituan.net/codeman/33ff80dc00f832d697f3e20fc030799560495.jpg', 'http://p1.meituan.net/codeman/bb0abb3435a60c44d87e90ed4237b61039329.jpg']
      }
    }
  }
</script>
