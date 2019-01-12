<template>
  <el-row class="page-product">
    <el-col :span="19">
      <breadcrumb :keyword="keyword"></breadcrumb>
      <category :sort="sort" :areas="areas"></category>
      <list :list="list"></list>
    </el-col>
    <el-col :span="5">
      <my-map :width="290" :height="240" :point="point" v-if="point.length"></my-map>
    </el-col>
  </el-row>
</template>

<script>
  import Breadcrumb from '../components/products/breadcrumb'
  import Category from '../components/products/category'
  import List from '../components/products/list'
  import MyMap from '../components/public/myMap'

  export default {
    name: "products",
    data () {
      return {
        keyword: '',
        sort: [],
        areas: [],
        list: [],
        point: []
      }
    },
    async asyncData (ctx) {  //  服务端请求数据【ssr渲染】，拿不到 this
      let city = ctx.store.state.geo.position.city;
      let keyword = ctx.query.keyword;
      let {status, data: {count, pois}} = await ctx.$axios.get('/search/resultsByKeywords', {
        params: {
          city,
          keyword
        }
      });
      let {status: status2, data: {areas, sort}} = await ctx.$axios.get('/category/crumbs', {
        params: {
          city
        }
      });
      if (status === 200 && status2 === 200 && count > 0) {
        return {
          keyword,
          sort: sort.filter(item => item.type !== '').slice(0, 6),
          areas: areas.filter(item => item.type !== '').slice(0, 6),
          list: pois.filter(item => item.photos.length).map(item => ({
            img: item.photos[0].url,
            name: item.name,
            rate: Number(item.biz_ext.rating),
            comment: Math.floor(Math.random() * 10000),
            type: item.type.split(';')[0],
            addr: item.address,
            price: item.biz_ext.cost,
            status: '可订明日',
            scene: item.tag
          })),
          point: (pois.find(item => item.location).location || '').split(',')
        }
      }
    },
    components: {
      Breadcrumb,
      Category,
      List,
      MyMap
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/products/index.scss';
</style>
