import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/category'
});

const sign = 'a3c9fe0782107295ee9f1709edd15218';

router.get('/crumbs', async ctx => {
  let {status, data: {areas, types}} = await axios.get('http://cp-tools.cn/categroy/crumbs', {
    params: {
      city: ctx.query.city.replace('市', '') || '广州',
      sign
    }
  });
  ctx.body = status === 200 ? {areas, sort: types} : {areas: [], sort: []};
});

export default router;
