<template>
  <dl class="m-sum-card">
    <dt>
      <h1>{{meta.name}}</h1>
      <el-rate v-model="meta.rate" disabled :colors="['#ff9900', '#ff9900', '#FF9900']"></el-rate>
      <span>{{meta.rate}}分</span>
      <span>{{meta.price}}</span>
      <ul>
        <li @click="openMap(meta.location)">地址：{{meta.address}}</li>
        <li>电话：{{meta.tel}}</li>
      </ul>
    </dt>
    <dd>
      <el-carousel height="214px" indicator-position="none">
        <el-carousel-item v-for="(item, index) in meta.photos" :key="index">
          <h3>
            <img :src="item.url" alt="" width="100%" height="100%">
          </h3>
        </el-carousel-item>
      </el-carousel>
    </dd>
  </dl>
</template>

<script>
  export default {
    name: "mySummary",
    props: {
      meta: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      openMap () {}
    }
  }
</script>

<style>
</style>
