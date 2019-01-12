<template>
  <div class="m-product-select">
    <dl class="tab">
      <dt>{{name}}<i class="el-icon-caret-bottom"></i></dt>
      <dd>
        <h3>{{name}}</h3>
        <span v-for="item in list">{{item}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  export default {
    name: "iSelect",
    props: {
      name: {
        type: String,
        default: ''
      },
      list: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style>
</style>
