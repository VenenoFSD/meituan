import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/geo'
});

const sign = 'a3c9fe0782107295ee9f1709edd15218';  //  接口签名

//  线上接口【完整数据】
router.get('/getPosition', async ctx => {
  let {status, data: {province, city}} = await axios.get(`http://cp-tools.cn/geo/getPosition?sign=${sign}`);
  ctx.body = status === 200 ? {province, city} : {province: '', city: ''};
});
router.get('/menu', async ctx => {
  let {status, data: {menu}} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  ctx.body = status === 200 ? {menu} : {menu: []};
});
router.get('/province', async ctx => {
  let {status, data: {province}} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`);
  ctx.body = status === 200 ? {province} : {province: []};
});
router.get('/province/:id', async ctx => {
  let {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`);
  ctx.body = status === 200 ? {city} : {city: []};
});
router.get('/city', async ctx => {
  let {status, data: {city}} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  ctx.body = status === 200 ? {city} : {city: []};
});
router.get('/hotCity', async ctx => {
  let {status, data: {hots}} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  ctx.body = status === 200 ? {hots} : {hots: []};
});

//  查询本地数据库【部分数据】
// router.get('/province', async (ctx) => {
//   let province = await Province.find();
//   ctx.body = {
//     province: province.map(item => {
//       return {
//         id: item.id,
//         name: item.value[0]
//       }
//     })
//   };
// });
// router.get('/province/:id', async (ctx) => {
//   let city = await City.findOne({id: ctx.params.id});
//   ctx.body = {
//     code: 0,
//     city: city.value.map(item => {
//       return {province: item.province, id: item.id, name: item.name}
//     })
//   };
// });
// router.get('/city', async (ctx) => {
//   let city = [];
//   let result = await City.find();
//   result.forEach(item => {
//     city = city.concat(item.value);
//   });
//   ctx.body = {
//     code: 0,
//     city: city.map(item => {
//       return {
//         province: item.province,
//         id: item.id,
//         name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
//           ? item.province
//           : item.name
//       }
//     })
//   };
// });
// router.get('/hotCity', async (ctx) => {
//   let list = ['北京市', '上海市', '广州市', '深圳市', '天津市', '西安市', '杭州市', '南京市', '武汉市', '成都市'];
//   let result = await City.find();
//   let nList = [];
//   result.forEach(item => {
//     nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)));
//   });
//   ctx.body = {
//     hots: nList
//   };
// });
// router.get('/menu', async (ctx) => {
//   const result = await Menu.findOne();
//   ctx.body = {
//     menu: result.menu
//   };
// });

export default router;
