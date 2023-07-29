## strr-admin-ui

### 项目介绍
- strr-admin前端页面

### 使用
1. 拉取代码
```
git clone https://github.com/strr0/strr-admin-cloud-ui.git
```
2. 新建项目引入依赖
```
yarn add ../strr-admin-cloud-ui
```
3. 修改配置
```
App.vue
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  margin: 0;
}
</style>
```
```
main.js
import App from './App.vue'
import { setupApp } from 'strr-admin-cloud-ui'

setupApp(App)
```
```
vue.config.js
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        ws: false
      },
      '/security': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/security': ''
        },
        ws: false
      }
    }
  }
})
```