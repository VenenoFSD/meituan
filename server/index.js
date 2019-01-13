import Koa from 'koa'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

//  my import
import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
import category from './interface/category'
import cart from './interface/cart'
import order from './interface/order'

// 配置
app.keys = ['veneno', 'meituan'];
app.proxy = true;
app.use(session({
  key: 'mt',
  prefix: 'mt:uid',
  store: Redis()
}));
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}));
app.use(json());
mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
});
app.use(passport.initialize());
app.use(passport.session());

// Import and Set Nuxt.js options
import config from '../nuxt.config.js'
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  //  启用路由
  app.use(users.routes()).use(users.allowedMethods());
  app.use(geo.routes()).use(geo.allowedMethods());
  app.use(search.routes()).use(search.allowedMethods());
  app.use(category.routes()).use(category.allowedMethods());
  app.use(cart.routes()).use(cart.allowedMethods());
  app.use(order.routes()).use(order.allowedMethods());

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
