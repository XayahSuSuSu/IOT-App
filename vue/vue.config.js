module.exports = {
  publicPath: './',
  outputDir: 'dist',
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://localhost:3307',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  }
}
