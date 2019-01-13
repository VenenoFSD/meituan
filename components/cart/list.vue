<template>
  <el-table :data="cartData" style="width: 980px">
    <el-table-column label="项目" prop="name" width="500"></el-table-column>
    <el-table-column label="单价" prop="price" width="130" align="center"></el-table-column>
    <el-table-column label="数量" prop="count" width="210" align="center">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.count" :min="0"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column label="总价" align="center">
      <template slot-scope="scope">
        <div>{{scope.row.price * scope.row.count}}</div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "list",
    props: {
      cartData: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style>
</style>
