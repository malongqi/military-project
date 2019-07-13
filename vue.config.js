module.exports = {
  publicPath: './',
  // 选项...
  devServer: {
    proxy: {
      '/Api': {
        target: 'http://xingjun.zdapk.cn/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/Api': 'Api'
        }
      },
    }
  }
}