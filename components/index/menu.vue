<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="leave">
      <dt>全部分类</dt>
      <dd v-for="(item, index) in menu" @mouseenter="enter(index)">
        <i :class="item.type"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
      <div class="detail" v-show="curDetail.length">
        <div v-for="item in curDetail">
          <h4>{{item.title}}</h4>
          <span v-for="v in item.child">{{v}}</span>
        </div>
      </div>
    </dl>
  </div>
</template>

<script>
  export default {
    name: "MyMenu",
    data () {
      return {
        curDetail: [],
        menu: []
      }
    },
    methods: {
      enter (index) {
        this.curDetail = this.menu[index].child;
      },
      leave () {
        this.curDetail = [];
      }
    },
    created () {
      this.menu = this.$store.state.home.menu;
    }
  }
</script>

<style>
</style>
