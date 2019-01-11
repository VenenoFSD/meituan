<template>
  <div>
    <dl class="m-category">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list">
        <a :href="'#city-' + item">{{item}}</a>
      </dd>
    </dl>
    <dl class="m-category-section" v-for="item in block">
      <dt :id="'city-' + item.title">{{item.title}}</dt>
      <dd>
        <span v-for="c in item.city">{{c}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
  import Pinyin from 'js-pinyin'

  export default {
    name: "category",
    data () {
      return {
        list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        block: []
      }
    },
    async created () {
      let {status, data: {city}} = await this.$axios.get('/geo/city');
      if (status === 200) {
        let cityPinyin;
        let temp = {};
        city.forEach(item => {
          cityPinyin = Pinyin.getFullChars(item.name).toLocaleLowerCase().slice(0, 1);
          if (cityPinyin.charCodeAt(0) > 96 && cityPinyin.charCodeAt(0) < 123) {
            if (!temp[cityPinyin]) {
              temp[cityPinyin] = [];
            }
            temp[cityPinyin].push(item.name);
          }
        });
        for (let [k, v] of Object.entries(temp)) {
          this.block.push({
            title: k.toUpperCase(),
            city: v
          });
        }
        this.block.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/css/changecity/category.scss';
</style>
