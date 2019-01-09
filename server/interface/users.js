import Router from 'koa-router'
import Redis from 'koa-redis'
import NodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Email from '../dbs/config'
import Passport from './utils/passport'
import axios from './utils/axios'

let router = new Router({
  prefix: '/users'
});

let Store  = new Redis().client;

//  注册接口
router.post('/signUp', async ctx => {
  const {username, password, email, code} = ctx.request.body;  //  获取表单内容

  //  验证验证码
  if (code) {
    //  从redis取验证码和过期时间
    const saveCode = await Store.hget(`nodemailer:${username}`, 'code');
    const saveExpire = await Store.hget(`nodemailer:${username}`, 'expire');

    if (code === saveCode) {
      if (new Date().getTime() > saveExpire) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重试'
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '验证码填写有误，请重新填写'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    };
  }

  //  验证用户名与密码
  let user = await User.find({
    username
  });
  if (user.length) {
    ctx.body = {
      code: '-1',
      msg: '用户名已存在'
    };
    return false;
  }

  //  所有验证通过，写入库并自动登录
  let newUser = await User.create({
    username,
    password,
    email
  });
  if (newUser) {
    let res = await axios.post('/users/signIn', {
      username,
      password
    });
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      };
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    };
  }
});

//  登录接口
router.post('/signIn', async (ctx, next) => {
  return Passport.authenticate('local', (err, user, info) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      };
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 1,
          msg: info
        };
      }
    }
  })(ctx, next);
});

//  验证码接口
router.post('/verify', async ctx => {
  let username = ctx.request.body.username;
  const saveExpire = await Store.hget(`nodemailer:${username}`, 'expire');
  if (saveExpire && saveExpire > new Date().getTime()) {
    ctx.body = {
      code: -1,
      msg: '验证高频'
    };
    return false;
  }

  //  配置验证邮箱发件人
  let transporter = NodeMailer.createTransport({
    host: Email.smtp.host,
    port: Email.smtp.port,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  });

  //  配置收件人
  let ko = {
    user: username,
    email: ctx.request.body.email,
    code: Email.smtp.code(),
    expire: Email.smtp.expire()
  };

  //  邮件内容
  let mailOptions = {
    from: `"验证邮件"<${Email.smtp.user}>`,
    to: ko.email,
    subject: '【美团网】邮箱注册',  //  主题
    html: `您正在【美团网】进行邮箱注册，您的验证码为：${ko.code}`
  };

  //  发送邮件
  await transporter.sendMail(mailOptions, err => {
    if (err) {
      return console.log('err');
    } else {
      //  发送成功，存入redis
      Store.hmset(`nodemailer:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email);
    }
  });

  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延时，有效期1分钟'
  };
});

//  退出登录接口
router.get('/exit', async ctx => {
  await ctx.logout();
  if (!ctx.isAuthenticated) {  //  ctx.isAuthenticate: 登录状态
    ctx.body = {
      code: 0
    };
  } else {
    ctx.body = {
      code: -1
    };
  }
});

//  获取用户信息
router.get('/getUser', async ctx => {
  if (ctx.isAuthenticated) {
    const {username, email} = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email
    };
  } else {
    ctx.body = {
      user: '',
      email: ''
    };
  }
});

export default router
