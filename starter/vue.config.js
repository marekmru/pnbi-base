// vue.config.js
module.exports = {
  outputDir: 'dist',
  lintOnSave: true,
  baseUrl: './',
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    }
  }
}
