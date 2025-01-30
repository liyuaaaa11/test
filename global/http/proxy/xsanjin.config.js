module.exports = {
  serve: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/xsanjin/api': {
        target: 'http://localhost:6666',
        changeOrigin: true
      }
    }
  }
}