<template>
  <div class="m-products-list">
    <dl>
      <dd v-for="item in nav" :class="{'s-nav-active': item.active}" @click="navSelect(item)">{{item.txt}}</dd>
    </dl>
    <ul>
      <li v-for="item in newList">
        <product :meta="item"></product>
      </li>
    </ul>
  </div>
</template>

<script>
  import Product from './product'

  export default {
    name: "list",
    data () {
      return {
        nav: [
          {
            txt: '智能排序',
            active: true,
            code: 0
          },
          {
            txt: '价格最低',
            active: false,
            code: 1
          },
          {
            txt: '人气最高',
            active: false,
            code: 2
          },
          {
            txt: '评价最高',
            active: false,
            code: 3
          }
        ],
        curSort: {},
        newList: []
      }
    },
    props: {
      list: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      navSelect (item = this.nav[0]) {
        if (item.code === this.curSort.code) {
          return;
        }
        this.curSort = item;
        let code = this.curSort.code;
        let tempList = this.list.concat();
        if (code === 0) {
          this.newList = this.list;
        } else if (code === 1) {
          tempList.sort((a, b) => {
            if (a.price.length && b.price.length) {
              return Number(a.price) - Number(b.price);
            } else if (a.price.length && !b.price.length) {
              return 1;
            } else if (!a.price.length && b.price.length) {
              return -1;
            } else {
              return 0;
            }
          });
          this.newList = tempList;
        } else if (code === 2) {
          tempList.sort((a, b) => {
            return b.comment - a.comment;
          });
          this.newList = tempList;
        } else {
          tempList.sort((a, b) => {
            return b.rate - a.rate;
          });
          this.newList = tempList;
        }
      }
    },
    components: {
      Product
    },
    watch: {
      curSort (newSort, oldSort) {
        if (oldSort.active !== undefined) {
          this.nav[oldSort.code].active = false;
        }
        this.nav[newSort.code].active = true;
      }
    },
    created () {
      this.navSelect();
    }
  }
</script>

<style>

</style>
