
'use strict'

// 添加版本号  此处用时间戳
// process.env.VUE_APP_VERSION = require('./package.json').version
// const Timestamp = new Date().getTime()

if (process.env.NODE_ENV === 'production') {
  // 为生产环境修改配置...
} else {
  // 为开发环境修改配置...
}

// 压缩
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

// 处理 css 时 引入MiniCssExtractPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = {
  publicPath: './',
  outputDir: 'dist2', // eg: '../dist2'
  indexPath: 'index1.html',
  assetsDir: 'assets1',
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。（提供 Sourcemap 相当于暴露了一部分源码，所以一般关掉）
  productionSourceMap: false,
  devServer: {
    // open: true,
    // host: '127.0.0.1',
    port: 7777,
    proxy: {
      '/api': {
        target: 'http://localhost:9999',
        // ws: true, // 如果要代理 websockets，配置这个参数
        // secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/api': ''
        }
      },
      '/test': { // 测试
        target: 'xxx'
      },
      '/pre': { // 预发布
        target: 'xxx'
      }
    }
  },
  css: {
    extract: {
      filename: 'assets1/css/[name].min.css',
      chunkFilename: 'assets1/css/[name]1.min.css'
    },
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/style/common.scss"'
      }
    }
  },
  configureWebpack: {
    output: {
      //   // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      //   filename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
      //   chunkFilename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
      filename: 'assets1/js/[name].min.js',
      chunkFilename: 'assets1/js/[name]1.min.js'
    },
    plugins: [
      // 下面是下载的插件的配置
      new CompressionWebpackPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 哪些文件要压缩
        threshold: 10240, // 10k
        minRatio: 0.8 // 压缩率小于0.8才会压缩
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1, // 控制打包生成js的个数
        minChunkSize: 100
      }),
      new MiniCssExtractPlugin({
        //   // 修改打包后css文件名
        //   filename: `css/[name].${Timestamp}.css`,
        //   chunkFilename: `css/[name].${Timestamp}.css`
        filename: 'assets1/css/[name].min.css'
        // chunkFilename: 'assets1/css/[name].css'
      })
    ]
  }
}
