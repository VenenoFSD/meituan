<template>
  <div class="page-detail">
    <el-row>
      <el-col :span="24">
        <breadcrumb :type="type" :keyword="keyword"></breadcrumb>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <my-summary :meta="product"></my-summary>
      </el-col>
    </el-row>
    <el-row class="m-title">
      <el-col :span="24">
        <h3 v-show="list.length">商家团购及优惠</h3>
      </el-col>
    </el-row>
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <list :list="list" v-if="login"></list>
        <div class="deal-need-login" v-else>
          <img src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png" alt="登录查看">
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <nuxt-link to="/login">立即登录</nuxt-link>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Breadcrumb from '../components/detail/breadcrumb'
  import MySummary from '../components/detail/summary'
  import List from '../components/detail/list'

  export default {
    name: "detail",
    async asyncData (ctx) {
      let {keyword, type} = ctx.query;
      let {status, data: {product, more, login}} = await ctx.$axios.get('/search/products', {
        params: {
          keyword,
          city: ctx.store.state.geo.position.city
        }
      });
      if (status === 200) {
        return {
          type,
          keyword,
          product: {
            name: product.name,
            rate: product.biz_ext.rating.length ? Number(product.biz_ext.rating) : Math.floor(Math.random() * 5),
            price: product.biz_ext.cost.length ? `人均￥${product.biz_ext.cost}`: '暂无报价',
            location: product.location.split(','),
            address: product.address,
            tel: product.tel,
            photos: product.photos
          },
          list: more.filter(item => item.photos.length).map(item => ({
            name: item.name,
            photo: item.photos[0].url,
            ticket: item.biz_ext.ticket_ordering || '',
            deadline: item.deadline || '',
            price: Number(item.biz_ext.cost.length ? item.biz_ext.cost : Math.random().toString().slice(3, 5))
          })),
          login
        }
      } else {
        return {
          type,
          keyword,
          product: {},
          list: [],
          login: false
        }
      }
    },
    components: {
      Breadcrumb,
      MySummary,
      List
    },
    computed:{
      canOrder () {
        return this.list.length
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/detail/index.scss';
</style>
