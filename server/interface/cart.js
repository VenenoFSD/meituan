import Router from 'koa-router'
import md5 from 'crypto-js/md5'
import Cart from '../dbs/models/cart'

let router = new Router({
  prefix: '/cart'
});

router.post('/create', async ctx => {  //  创建购物车
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请先登录再操作'
    }
  } else {
    let date = Date();
    let cartNo = md5(Math.random() * 1000 + date).toString();
    let {params: {id, detail}} = ctx.request.body;
    let user = ctx.session.passport.user;
    let newCart = await Cart.create({
      id,
      detail,
      cartNo,
      date,
      user
    });
    if (newCart) {
      ctx.body = {
        code: 0,
        msg: 'success',
        cartNo
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'fail'
      }
    }
  }
});

router.post('/getCart', async ctx => {
  let {cartNo} = ctx.request.body;
  try {
    let result = await Cart.findOne({cartNo});
    ctx.body = {
      code: 0,
      data: result ? result.detail[0] : {}
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
});

export default router;
