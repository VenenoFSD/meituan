<template>
  <section class="m-istyle">
    <dl>
      <dt>有格调</dt>
      <dd v-for="(item, index) in sort" :class="{active: curKind === sort[index].kind}" @mouseover="over(index)">{{item.name}}</dd>
    </dl>
    <ul class="ibody">
      <li v-for="(item, index) in cur" :key="index">
        <el-card :body-style="{ padding: '0px' }" shadow="never">
          <img :src="item.img" class="image" alt="">
          <ul class="cbody">
            <li class="title">{{item.title}}</li>
            <li class="pos"><span>{{item.pos}}</span></li>
            <li class="price">￥<em>{{item.price}}</em><span>/起</span></li>
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
        curKind: 'all',
        sort: [
          {
            kind: 'all',
            keyword: '景点',
            name: '全部'
          },
          {
            kind: 'part',
            keyword: '美食',
            name: '约会聚餐'
          },
          {
            kind: 'spa',
            keyword: '丽人',
            name: '丽人SPA'
          },
          {
            kind: 'movie',
            keyword: '电影',
            name: '电影演出'
          },
          {
            kind: 'travel',
            keyword: '旅游',
            name: '品质出游'
          }
        ],
        list: {
          all: [
            {
              title: 'Hitea茶室（西湾路店）',
              img: '//p0.meituan.net/mogu/95ec42406ae31577634ddd83680d69a3515107.jpg@368w_208h_1e_1c',
              pos: 'aaa',
              price: '1'
            }
          ],
          part: [{
            title: 'Hitea茶室（西湾路店）',
            img: '//p0.meituan.net/mogu/95ec42406ae31577634ddd83680d69a3515107.jpg@368w_208h_1e_1c',
            pos: 'aaa',
            price: '2'
          }],
          spa: [{
            title: 'Hitea茶室（西湾路店）',
            img: '//p0.meituan.net/mogu/95ec42406ae31577634ddd83680d69a3515107.jpg@368w_208h_1e_1c',
            pos: 'aaa',
            price: '3'
          }],
          movie: [{
            title: 'Hitea茶室（西湾路店）',
            img: '//p0.meituan.net/mogu/95ec42406ae31577634ddd83680d69a3515107.jpg@368w_208h_1e_1c',
            pos: 'aaa',
            price: '4'
          }],
          travel: [{
            title: 'Hitea茶室（西湾路店）',
            img: '//p0.meituan.net/mogu/95ec42406ae31577634ddd83680d69a3515107.jpg@368w_208h_1e_1c',
            pos: 'aaa',
            price: '5'
          }]
        }
      }
    },
    methods: {
      over (index) {
        this.curKind = this.sort[index].kind;
      }
    },
    computed: {
      cur () {
        return this.list[this.curKind];
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/css/index/artistic.scss";
</style>
