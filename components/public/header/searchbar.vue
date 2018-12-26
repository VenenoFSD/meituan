<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="">
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input placeholder="搜索商家或地点" v-model="search" @focus="focus" @blur="blur"></el-input>
          <el-button type="primary"><i class="el-icon-search"></i></el-button>
          <dl class="hotPlace" v-show="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="item in hotPlace">{{item}}</dd>
          </dl>
          <dl class="searchList" v-show="isSearchList">
            <dd v-for="item in searchList">{{item}}</dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="javascript:" v-for="item in suggest">{{item}}</a>
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
        hotPlace: ['a'],
        searchList: ['a'],
        suggest: ['a']
      }
    },
    computed: {
      isHotPlace () {
        return this.isFocus && !this.search.length;
      },
      isSearchList () {
        return this.isFocus && this.search.length;
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
      }
    }
  }
</script>

<style>
</style>
