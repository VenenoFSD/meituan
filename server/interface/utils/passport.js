import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import userModel from '../../dbs/models/users'

//  验证登录
passport.use(new LocalStrategy(async (username, password, done) => {
  let result = await userModel.findOne({username});
  return result !== null ? (password === result.password ? done(null, result) : done(null, false, '密码错误')) : done(null, false, '用户不存在');
}));

passport.serializeUser((user, done) => {  //  序列化
  done(null, user);
});

passport.deserializeUser((user, done) => {  //  反序列化
  return done(null, user);
});

export default passport
