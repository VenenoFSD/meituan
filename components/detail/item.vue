<template>
  <li class="m-detail-item">
    <dl class="section">
      <dd>
        <img :src="meta.photo" alt="">
      </dd>
      <dd>
        <h4>{{meta.name}}</h4>
        <p>
          <span v-show="meta.ticket.length">剩余：{{meta.ticket}}</span>
          <span v-show="meta.deadline.length">截止日期：{{meta.deadline}}</span>
        </p>
        <p>
          <span class="price">{{meta.price}}</span>
          <sub>门店价: {{meta.price}}</sub>
        </p>
      </dd>
      <dd>
        <el-button type="warning" round @click="createCart">立即抢购</el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
  export default {
    name: "item",
    props: {
      meta: {
        type: Object,
        default: () => ({})
      }
    },
    methods: {
      createCart: async function () {
      }
    }
  }
</script>

<style>
</style>
