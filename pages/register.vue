<template>
  <div class="page-register">
    <div class="header">
      <header>
        <nuxt-link to="/" class="site-logo"></nuxt-link>
        <span>
          <em class="bold">已有美团账号？</em>
          <nuxt-link to="/login">
            <el-button type="primary" size="mini" class="button-bg">登录</el-button>
          </nuxt-link>
        </span>
      </header>
    </div>
    <div class="form">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="small" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{statusMsg}}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cPwd">
          <el-input v-model="ruleForm.cPwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" class="button-bg">同意以下协议并注册</el-button>
          <p class="error">{{error}}</p>
        </el-form-item>
        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import Crypto from 'crypto-js'

  export default {
    name: "register",
    layout: 'blank',
    data () {
      return {
        ruleForm: {
          name: '',
          email: '',
          code: '',
          pwd: '',
          cPwd: ''
        },
        rules: {
          name: [{ required: true, type: 'string', message: '请输入昵称', trigger: 'blur' }],
          email: [{ required: true, type: 'email', message: '请输入邮箱', trigger: 'blur' }],
          code: [{ required: true, type: 'string', message: '请输入验证码', trigger: 'blur' }],
          pwd: [{ required: true, message: '创建密码', trigger: 'blur' }],
          cPwd: [
            { required: true, message: '确认密码', trigger: 'blur' },
            { validator: this.validatePwd, trigger: 'blur' }
          ]
        },
        statusMsg: '',
        error: ''
      }
    },
    methods: {
      sendMsg () {
        if (this.timer) {  //  验证邮件一分钟发送一次
          return false;
        }
        this.statusMsg = '';
        //  校验用户名
        let namePass = false,
           emailPass = false;
        this.$refs.ruleForm.validateField('name', valid => {
          if (!valid) {
            namePass = true;
          }
        });
        if (!namePass) {
          return false;
        }
        //  校验邮箱
        this.$refs.ruleForm.validateField('email', valid => {
          if (!valid) {
            emailPass = true;
          }
        });
        if (namePass && emailPass) {
          this.$axios.post('/users/verify', {
            username: encodeURIComponent(this.ruleForm.name),
            email: this.ruleForm.email
          }).then(({status, data}) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60;
              this.timer = setInterval(() => {
                this.statusMsg = `验证码已发送，剩余${count--}秒`;
                if (count === 0) {
                  this.statusMsg = '';
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            } else {
              this.statusMsg = data.msg;
            }
          });
        }
      },
      register () {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            this.$axios.post('/users/signUp', {
              username: this.ruleForm.name,
              password: Crypto.MD5(this.ruleForm.pwd).toString(),
              email: this.ruleForm.email,
              code: this.ruleForm.code
            }).then(({status, data}) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/login';
                } else {
                  this.error = data.msg;
                }
              } else {
                this.error = `服务器出错，错误码：${status}`;
              }
            });
          }
        });
      },
      validatePwd (rule, value, callback) {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pwd) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      }
    },
    watch: {
      error (newErr) {
        if (newErr) {
          clearTimeout(this.errTimer);
          this.errTimer = setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/register/index.scss';
</style>
