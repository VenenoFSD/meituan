<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd v-for="(item, index) in sort" :class="{active: curKind.kind === sort[index].kind}" @mouseover="over(index)">{{item.name}}</dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item, index) in cur" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image" alt="">
          <ul class="cbody">
            <li class="title">{{item.title}}</li>
            <li class="pos"><span>{{item.pos}}</span></li>
            <li class="price">
              <span v-if="item.price.length">￥<em>{{item.price}}</em><span>/起</span></span>
              <span v-else><em>暂无价格</em></span>
            </li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        curKind: {},
        sort: [
          {
            kind: 'all',
            keyword: '景点',
            name: '全部',
            hasLoaded: false
          },
          {
            kind: 'part',
            keyword: '美食',
            name: '约会聚餐',
            hasLoaded: false
          },
          {
            kind: 'spa',
            keyword: '丽人',
            name: '丽人SPA',
            hasLoaded: false
          },
          {
            kind: 'movie',
            keyword: '电影',
            name: '电影演出',
            hasLoaded: false
          },
          {
            kind: 'travel',
            keyword: '旅游',
            name: '品质出游',
            hasLoaded: false
          }
        ],
        list: {
          all: [],
          part: [],
          spa: [],
          movie: [],
          travel: []
        }
      }
    },
    methods: {
      over (index) {
        this.curKind = this.sort[index];
      },
      async getResult () {
        this.sort[this.sort.findIndex(item => item.kind === this.curKind.kind)].hasLoaded = true;
        let city = this.$store.state.geo.position.city;
        let {status, data: {count, pois}} = await this.$axios.get('/search/resultsByKeywords', {
          params: {
            city,
            keyword: this.curKind.keyword
          }
        });
        if (status === 200 && count > 0) {
          this.list[this.curKind.kind] = pois.filter(item => item.photos.length).map(item =>({
            title: item.name,
            img: item.photos[0].url,
            pos: item.type.split(';')[0],
            price: item.biz_ext.cost
          })).slice(0, 9);
        }
      }
    },
    computed: {
      cur () {
        return this.list[this.curKind.kind];
      }
    },
    created () {
      this.curKind = this.sort[0];
    },
    watch: {
      curKind (newVal) {
        if (newVal.hasLoaded) {
          return;
        }
        this.getResult();
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/index/artistic.scss";
</style>
