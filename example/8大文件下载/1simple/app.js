
const express = require('express');
const fs = require('fs');
const app = express();
// 获取文件大小
app.get('/length', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end('' + fs.statSync(`${__dirname}/44422221.docx`).size);
});
// 预检请求 options
app.options('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Range');
  res.end('');
});
// 下载
app.get('/', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.download('44422221.docx', {
    acceptRanges: true
  });
});

app.listen(3006, () => {
  console.log(`server is running at port 3006`);
});