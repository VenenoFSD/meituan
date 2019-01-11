<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pValue" placeholder="省份">
      <el-option v-for="item in province" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-select v-model="cValue" placeholder="城市">
      <el-option v-for="item in city" :key="item.value" :label="item.label" :value="item.value" :disabled="!city.length"></el-option>
    </el-select>
    <span class="name r-name">直接搜索:</span>
    <el-autocomplete v-model="input" :fetch-suggestions="querySearchAsync" placeholder="请输入城市中文" @select="handleSelect"></el-autocomplete>
  </div>
</template>

<script>
  export default {
    name: "cSelect",
    data () {
      return {
        pValue: '',
        province: [],
        cValue: '',
        city: [],
        input: '',
        cities: []
      }
    },
    methods: {
      async querySearchAsync (query, cb) {
        if (this.cities.length) {
          cb(this.cities.filter(item => item.value.indexOf(query) > -1));
        } else {
          let {status, data: {city}} = await this.$axios.get('/geo/city');
          if (status === 200) {
            this.cities = city.map(item => ({
              value: item.name
            }));
            cb(this.cities.filter(item => item.value.indexOf(query) > -1));
          } else {
            cb([]);
          }
        }
      },
      handleSelect () {
        location.href = '/';
      }
    },
    async created () {
      let {status, data: {province}} = await this.$axios.get('/geo/province');
      if (status === 200) {
        this.province = province.map(item => ({
          value: item.id,
          label: item.name
        }));
      }
    },
    watch: {
      async pValue (newPValue) {
        let {status, data: {city}} = await this.$axios.get(`/geo/province/${newPValue}`);
        if (status === 200) {
          this.city = city.map(item => ({
            value: item.id,
            label: item.name
          }));
        }
        this.cValue = '';
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/changecity/iselect.scss';
</style>
