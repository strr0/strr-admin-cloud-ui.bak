<template>
  <el-container>
    <div class="item_center">
      <login v-if="!logged" @pass="logged = true" />
      <auth v-else />
    </div>
  </el-container>
</template>

<script>
import login from './components/login.vue'
import auth from './components/auth.vue'
import { setToken, getToken, removeToken } from '../../utils/auth'
export default {
  components: { login, auth },
  name: 'Login',
  data() {
    return {
      logged: false
    }
  },
  mounted() {
    let token = getToken()
    if (token) {
      let path = this.$route.query.redirect;
      this.$router.replace((path == '/' || path == undefined) ? '/home' : path)
      return
    }
    // 获取token
    let code = this.$route.query.code
    if (code) {
      removeToken()
      this.postRequest('/oauth2/token', {
        grant_type: 'authorization_code',
        scope: 'web',
        client_id: 'STRR_CLIENT',
        client_secret: 'STRR_SECRET',
        code: code
      }).then(resp => {
        if(resp && resp.access_token) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$store.commit('token', resp.access_token)
          setToken(resp.access_token)
          let path = this.$route.query.redirect;
          this.$router.replace((path == '/' || path == undefined) ? '/home' : path)
        } else {
          this.$alert('授权失败')
        }
      })
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.item_center {
  margin: 180px auto;
}
</style>