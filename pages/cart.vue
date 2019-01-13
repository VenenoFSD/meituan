<template>
  <div class="page-cart">
    <el-row>
      <el-col :span="24" v-if="1" class="m-cart">
        <list :cartData="cart"></list>
        <p>应付金额：<em class="money">￥{{total}}</em></p>
        <div class="post">
          <el-button type="primary" @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col :span="24" v-else class="empty">购物车为空</el-col>
    </el-row>
  </div>
</template>

<script>
  import List from '../components/cart/list'

  export default {
    name: "cart",
    data () {
      return {
        cart: []
      }
    },
    methods: {
      submit () {
      }
    },
    async asyncData (ctx) {
      let cartNo = ctx.query.cartNo;
      let {status, data: {code, data: {name, price}}} = await ctx.$axios.post('/cart/getCart', {
        cartNo
      });
      if (status === 200 && code === 0 && name) {
        return {
          cart: [{
            name,
            price,
            count: 1
          }],
          cartNo
        }
      }
    },
    components: {
      List
    },
    computed: {
      total () {
        let total = 0;
        this.cart.forEach(item => {
          total += item.price * item.count;
        });
        return total;
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/cart/index.scss';
</style>
