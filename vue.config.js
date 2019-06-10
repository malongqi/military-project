module.exports = {
  // 选项...
  devServer: {
    proxy: {
      '/': {
        target: 'http://xingjun.zdapk.cn/Api',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/': ''
        }
      },
    }
  }
}