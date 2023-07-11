<template>
  <el-form :model="loginForm" ref="loginForm" :rules="rules" class="login_container" v-loading="loading">
    <h3 class="login_title">系统登录</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="loginForm.username" placeholder="账号" />
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="密码" />
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%" @click="doLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { securityLogin } from '../../../utils/api'
export default {
  name: 'toLogin',
  data() {
    return {
      rules: {
        username: {required: true, message: '请输入用户名', trigger: 'blur'},
        password: {required: true, message: '请输入密码', trigger: 'blur'},
      },
      //记住密码
      checked: false,
      loginForm: {
        grant_type: 'password',
        scope: 'web',
        username: 'admin',
        password: 'abc123'
      },
      loading: false
    }
  },
  methods: {
    doLogin() {
      this.$refs.loginForm.validate(valid => {
        if(valid) {
          this.loading = true;
          securityLogin({username: 'admin', password: 'abc123'})
          .then(response => {
            this.loading = false
            let resp = response.data
            if (resp && resp.success) {
              this.$store.commit('login', resp.data)
              this.$emit('pass')
            } else {
              this.$alert('用户名或密码错误')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.login_container {
  border-radius: 15px;
  background-clip: padding-box;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>