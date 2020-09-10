const path = require('path')
module.exports = {
  productionSourceMap: false,
  publicPath: '',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/variable.less')]
    }
  }
}
