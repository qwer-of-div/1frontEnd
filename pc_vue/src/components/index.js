/**
 * 全局组件
 * 表单下拉选项列表
 * 请求样式（加载中、请求失败404、大量、极少、无）
 * table
 * 日期组件无法复用
 */
import Vue from 'vue'

const files = require.context('.', false, /\.vue$/)

files.keys().forEach(item => {
  const module = files(item).default
  // 使用内置的组件名称 进行全局组件注册
  Vue.component(module.name, module)
})
