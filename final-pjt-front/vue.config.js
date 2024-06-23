const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})
const path = require('path');
module.exports = {
  publicPath: process.env.BASE_URL,
  assetsDir: process.env.BASE_URL, 
  devServer: {
  //  contentBase: path.join(__dirname, '') // 설정하면 url(/src/assets") 경로 사용 가능 
  }
};