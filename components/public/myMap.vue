<template>
  <div class="m-map" :id="id" :style="{width: width + 'px', height: height + 'px', margin: '74px auto'}"></div>
</template>

<script>
  export default {
    name: "myMap",
    data () {
      return {
        id: 'map',
        key: 'b5a2ab623b30c7b56479b495d14856c5'
      }
    },
    props: {
      width: {
        type: Number,
        default: 300
      },
      height: {
        type: Number,
        default: 300
      },
      point: {
        type: Array,
        default: () => [116.46, 39.92]
      }
    },
    mounted () {
      this.id = `map${Math.random().toString().slice(4, 6)}`;
      window.onMapLoad  = () => {
        let map = new window.AMap.Map(this.id, {
          resizeEnable: true,
          zoom: 11,
          center: this.point
        });
        window.AMap.plugin('AMap.ToolBar', () => {
          let toolbar = new window.AMap.ToolBar();
          map.addControl(toolbar);
          let marker = new window.AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: this.point
          });
          marker.setMap(map);
        });
      };
      var url = `https://webapi.amap.com/maps?v=1.4.12&key=${this.key}&callback=onMapLoad`;
      var jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }
  }
</script>

<style>
</style>
