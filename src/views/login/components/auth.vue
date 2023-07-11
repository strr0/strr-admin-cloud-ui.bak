<template>
  <el-form :model="authForm" ref="authForm" :rules="rules" class="auth_container" v-loading="loading">
    <h3 class="auth_title">授权认证</h3>
    <el-row>
      <el-col :span="8">
        <div>
          <el-avatar :size="size">Admin</el-avatar>
        </div>
        <div>已登录</div>
      </el-col>
      <el-col :span="16" style="height: 100%">
        <el-form-item prop="checkScopes">
          <el-checkbox-group v-model="checkScopes">
            <el-checkbox v-for="scope in scopes" :key="scope.code" :label="scope.code" :disabled="scope.disabled">{{ scope.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-button :loading="loading" type="info" style="width: 44%;" @click="cancelConsent">取消</el-button>
        <el-button :loading="loading" type="primary" style="width: 44%; float: right" @click="handleConsent">授权</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { securityAuthorize, securityConsent } from '../../../utils/api'
export default {
  name: 'toAuth',
  data() {
    return {
      size: 70,
      rules: {
        checkScopes: {required: true, message: '请选择授权', trigger: 'blur'}
      },
      authForm: {
        client_id: 'STRR_CLIENT',
        state: null,
        scope: []
      },
      scopes: [],
      checkScopes: [],
      loading: false,
    }
  },
  mounted() {
    this.oauth2Authorize()
  },
  methods: {
    cancelConsent() {
      this.checkScopes = []
      this.handleConsent()
    },
    handleConsent() {
      this.loading = true
      securityConsent({...this.authForm, scope: this.checkScopes}).then(response => {
        let resp = response.data
        if (resp.code === 302) {
          location.href = resp.data
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    oauth2Authorize() {
      securityAuthorize().then(response => {
        let resp = response.data
        if (resp.code === 200) {
          this.principalName = resp.data.principalName
          this.authForm.client_id = resp.data.clientId
          this.authForm.state = resp.data.state
          this.scopes = resp.data.scopes
          this.checkScopes = resp.data.scopes.filter(data => !data.disabled).map(data => data.code)
          this.redirectUri = resp.data.redirectUri
        } else if (resp.code === 302) {
          location.href = resp.data
        }
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
.auth_container {
  border-radius: 15px;
  background-clip: padding-box;
  width: 390px;
  padding: 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.auth_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>