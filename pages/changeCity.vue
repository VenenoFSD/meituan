<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <city-select></city-select>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot></hot>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <category></category>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import CitySelect from '../components/changeCity/cSelect'
  import Hot from '../components/changeCity/hot'
  import Category from '../components/changeCity/category'

  export default {
    name: "changeCity",
    components: {
      CitySelect,
      Hot,
      Category
    }
  }
</script>

<style lang="scss">

</style>
