<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <nuxt-link to="/">
          <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="">
        </nuxt-link>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点" v-model="search" @focus="focus" @blur="blur"></el-input>
          <el-button type="primary" @click="searchAll"><i class="el-icon-search"></i></el-button>
          <dl class="hotPlace" v-show="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="item in hotPlace"><a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{item.name}}</a></dd>
          </dl>
          <dl class="searchList" v-show="isSearchList">
            <dd v-for="item in searchList"><a :href="'/products?keyword=' + encodeURIComponent(item.name)">{{item.name}}</a></dd>
          </dl>
        </div>
        <p class="suggest">
          <a :href="'/products?keyword=' + encodeURIComponent(item.name)" v-for="item in hotPlace">{{item.name}}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿／公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">美团公益</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund"></i>
            <p class="txt">随时退</p>
          </li>
          <li>
            <i class="single"></i>
            <p class="txt">不满意免单</p>
          </li>
          <li>
            <i class="overdue"></i>
            <p class="txt">过期退</p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "searchBar",
    data () {
      return {
        isFocus: false,
        search: '',
        hotPlace: [],
        searchList: []
      }
    },
    methods: {
      focus () {
        this.isFocus = true;
      },
      blur () {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.isFocus = false;  //  延时提供点击事件
        }, 100);
      },
      searchAll () {
        if (!this.search.length) {
          return;
        }
        location.href = `/products?keyword=${encodeURIComponent(this.search)}`;
      },
      debounce (func, delay) {
        let timer = null;
        return function (...args) {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            func.apply(this, args);
          }, delay);
        }
      }
    },
    created () {
      this.hotPlace = this.$store.state.home.hotPlace.slice(0, 4);
      this.$watch('search', this.debounce((newVal) => {
        if (!newVal.length) {
          return;
        }
        (async () => {
          this.searchList = [];
          let city = this.$store.state.geo.position.city.replace('市', '');
          let {status, data: {top}} = await this.$axios.get('/search/top', {
            params: {
              input: newVal,
              city
            }
          });
          if (status === 200) {
            this.searchList = top.slice(0, 10);
          }
        })();
      }, 200));
    },
    computed: {
      isHotPlace () {
        return this.isFocus && !this.search.length;
      },
      isSearchList () {
        return this.isFocus && this.search.length;
      }
    }
  }
</script>

<style>
</style>
