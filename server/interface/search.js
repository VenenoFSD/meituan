import Router from 'koa-router'
import axios from './utils/axios'

let router = new Router({
  prefix: '/search'
});

const sign = 'a3c9fe0782107295ee9f1709edd15218';

router.get('/top', async ctx => {
  let {status, data: {top}} = await axios.get('http://cp-tools.cn/search/top', {
    params: {
      input: ctx.query.input,  //  参数请求时传递
      city: ctx.query.city,
      sign
    }
  });
  ctx.body = status === 200 ? {top} : {top: []};
});
router.get('/hotPlace', async ctx => {
  let {status, data: {result}} = await axios.get('http://cp-tools.cn/search/hotPlace', {
    params: {
      city: ctx.query.city,
      sign
    }
  });
  ctx.body = status === 200 ? {result} : {result: []};
});
router.get('/resultsByKeywords', async ctx => {
  const {city, keyword} = ctx.query;
  let {status, data: {count, pois}} = await axios.get('http://cp-tools.cn/search/resultsByKeywords', {
    params: {
      city,
      keyword,
      sign
    }
  });
  ctx.body = status === 200 ? {count, pois} : {count: 0, pois: []};
});

export default router;
