module.exports = {
  publicPath: './',
  outputDir: 'dist',
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:3307',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
