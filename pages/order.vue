<template>
  <div class="page-order">
    <el-row>
      <el-col :span="4" class="navbar">
        <h3>我的美团</h3>
        <dl>
          <dt>我的订单</dt>
          <dd>全部订单<i class="el-icon-arrow-right"></i></dd>
          <dd>待付款<i class="el-icon-arrow-right"></i></dd>
          <dd>待使用<i class="el-icon-arrow-right"></i></dd>
        </dl>
        <dl>
          <dt>我的收藏</dt>
          <dd>收藏的商家<i class="el-icon-arrow-right"></i></dd>
          <dd>收藏的团购<i class="el-icon-arrow-right"></i></dd>
        </dl>
        <dl>
          <dt>抵用卷</dt>
          <dd>可用卷<i class="el-icon-arrow-right"></i></dd>
          <dd>失效卷<i class="el-icon-arrow-right"></i></dd>
        </dl>
      </el-col>
      <el-col :span="19" class="table">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部订单" name="all">
            <list :cur="cur"></list>
          </el-tab-pane>
          <el-tab-pane label="待付款" name="unpay">
            <list :cur="cur"></list>
          </el-tab-pane>
          <el-tab-pane label="待使用" name="unuse">
            <list :cur="cur"></list>
          </el-tab-pane>
          <el-tab-pane label="待评价" name="unreplay">
            <list :cur="cur"></list>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import List from '../components/order/list'

  export default {
    name: "order",
    data () {
      return {
        activeName: 'all',
        list: [],
        cur: []
      }
    },
    async asyncData (ctx) {
      let {status, data: {code, list}} = await ctx.$axios.post('/order/getOrders');
      if (status === 200 && code === 0 && list.length) {
        return {
          list: list.map(item => ({
            name: item.name,
            img: item.img,
            count: 1,
            total: item.total,
            statusTxt: item.status === 0 ? '待付款' : '已付款'
          })),
          cur: list.map(item => ({
            name: item.name,
            img: item.img,
            count: 1,
            total: item.total,
            statusTxt: item.status === 0 ? '待付款' : '已付款'
          }))
        }
      }
    },
    methods: {
      handleClick () {
        console.log(this.activeName);
      }
    },
    components: {
      List
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/order/index.scss';
</style>
