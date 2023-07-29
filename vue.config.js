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
        target: 'http://127.0.0.1:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/security': ''
        },
        ws: false
      }
    }
  }
})
