<template>
  <dl class="s-item">
    <dt>
      <img :src="meta.img" alt="">
    </dt>
    <dd>
      <h3>
        <nuxt-link :to="{path:'detail',query:{keyword: meta.name, type: meta.type}}">{{meta.name}}</nuxt-link>
      </h3>
      <el-rate v-model="meta.rate" disabled :colors="['#ff9900', '#ff9900', '#FF9900']"></el-rate>
      <span class="s-item-comment">{{calComment}}</span>
      <span class="s-item-value">{{meta.rate}}分</span>
      <span class="s-item-comment-total">{{meta.comment}}人评论</span>
      <p>
        <span class="s-item-type">{{meta.type}}</span>
        <span class="s-item-addr">{{meta.addr}}</span>
      </p>
      <p>
        <em class="s-item-price">{{priceFormat(meta.price)}}</em>
        <b>{{meta.status}}</b>
      </p>
      <ul>
        <li v-if="meta.scene && meta.scene.length">
          <span class="detail-type">景酒</span>{{meta.scene}}
        </li>
        <li v-else>
          <span class="detail-type">景酒</span>暂无描述
        </li>
      </ul>
    </dd>
  </dl>
</template>

<script>
  export default {
    name: "product",
    props: {
      meta: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      priceFormat (price) {
        return price.length ? `￥${price}起` : '暂无报价';
      }
    },
    computed: {
      calComment () {
        return this.meta.rate > 4 ? '很好' : this.meta.rate > 3 ? '一般' : '很差';
      }
    }
  }
</script>

<style>
</style>
