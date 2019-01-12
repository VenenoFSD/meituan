<template>
  <div class="m-detail-list">
    <ul>
      <li>{{list.length}}款套餐</li>
      <item v-for="(item, index) in list" :meta="item" :key="index"></item>
    </ul>
  </div>
</template>

<script>
  import Item from './item'

  export default {
    name: "list",
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    components: {
      Item
    }
  }
</script>

<style>
</style>
