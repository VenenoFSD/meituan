<template>
  <div class="m-product-category">
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="item in sort">
        <i-select :name="item.type" :list="item.module"></i-select>
      </dd>
    </dl>
    <dl class="classic">
      <dt>分类</dt>
      <dt>全部</dt>
      <dd v-for="item in areas">
        <i-select :name="item.type" :list="item.module"></i-select>
      </dd>
    </dl>
  </div>
</template>

<script>
  import ISelect from './iSelect'

  export default {
    name: "category",
    props: {
      sort: {
        type: Array,
        default: () => []
      },
      areas: {
        type: Array,
        default: () => []
      }
    },
    components: {
      ISelect
    }
  }
</script>

<style>
</style>
