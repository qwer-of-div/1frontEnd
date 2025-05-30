// vite.config.js # or vite.config.ts
const path = require('path')
import vue from '@vitejs/plugin-vue'

module.exports = {
  plugins: [vue()],
  alias: {
    // vite2 为 @
    '@': path.resolve(__dirname, './src')
  },
  hostname: '0.0.0.0',
  port: 8080,
  // 是否自动在浏览器打开
  open: true,
  // 是否开启 https
  https: false,
  // 服务端渲染
  ssr: false,
  /**
   * 在生产中服务时的基本公共路径。
   * @default '/'
   */
  base: './',
  /**
   * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
   * @default 'dist'
   */
  outDir: 'dist',
  // 反向代理
  proxy: {
    '/api': {
      target: 'https://blog.csdn.net/weixin_45292658',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    },
    '/ms/serverComputingGetdata': {
      target:
        'http://10.235.46.153:8824',
      changeOrigin: true,
      pathRewrite: {
        '^/ms/serverComputingGetdata': '/'
      }
    },
    '/ms': {
      target: 'https://smartde.libing-beta.rnd.huawei.com/smartdm/ms', // ms
      changeOrigin: true,
      pathRewrite: {
        '^/ms': '/'
      }
    },
  }
}
