const files = require.context("./", false, /\.js$/);
const modules = {}

files.keys().forEach((item) => {
  if (item === './index.js' || item === './interceptor.js') {
    return;
  }
  let name = item.replace(/\.\/|\.js/g, '')
  // 兼容 import export 和 require module.export 两种规范  Es modules  commonjs
  modules[name] = files(item).default || files(item);
});

export default modules