const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭语法检查
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:9001',
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
