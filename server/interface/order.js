import Router from 'koa-router'
import md5 from 'crypto-js/md5'
import Cart from '../dbs/models/cart'
import Order from '../dbs/models/order'

let router = new Router({
  prefix: '/order'
});

router.post('/createOrder', async ctx => {  //  创建订单
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请先登录再操作'
    }
  } else {
    let {cartNo, total} = ctx.request.body;
    let time = Date();
    let orderId = md5(Math.random() * 1000 + time).toString();
    let searchCart = await Cart.findOne({cartNo});
    try {
      let newOrder = await Order.create({
        name: searchCart.detail[0].name,
        id: orderId,
        status: 0,
        user: ctx.session.passport.user,
        time,
        total,
        img: searchCart.detail[0].img
      });
      if (newOrder) {
        await searchCart.remove();
        ctx.body = {
          code: 0,
          orderId
        }
      } else {
        ctx.body = {
          code: -1
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1
      }
    }
  }
});

router.post('/getOrders', async ctx => {  //  获取所有订单
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: -1,
      msg: '请先登录再操作',
      list: []
    }
  } else {
    try {
      let list = await Order.find();
      if (list) {
        ctx.body = {
          code: 0,
          list
        }
      } else {
        ctx.body = {
          code: -1,
          list: []
        }
      }
    } catch (e) {
      ctx.body = {
        code: -1,
        list: []
      }
    }
  }
});

export default router
