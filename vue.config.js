module.exports = {
  publicPath: './',
  // 选项...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xingjun.zdapk.cn/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'Api'
        }
      },
    }
  }
}