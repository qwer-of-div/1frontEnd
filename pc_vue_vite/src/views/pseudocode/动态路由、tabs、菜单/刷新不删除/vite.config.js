import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from "vite-plugin-mock";
const path = require('path')
const {  VUE_APP_PORT } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: "./src/mock", // mock????
      logger: false, //????????????
      supportTs: false //???????? ts ????? ????????????.js ??
  })
  ],
  alias: {
    '@': path.resolve(__dirname, './src')
  },
  server: { 
    port: 9002, // ?????
    open: true
  },
})
