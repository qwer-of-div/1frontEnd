const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const cors = require("cors");
const mime = require("mime-types");

// 静态资源目录
const PUBLIC_DIR = path.resolve(__dirname, "public");
// 确保静态资源目录存在
fs.ensureDir(PUBLIC_DIR);

const app = express();
app.use(cors());
// 静态资源服务
app.use(express.static(PUBLIC_DIR));

app.head("/download/:filename", async (req, res) => {
  // 获取文件名
  const { filename } = req.params;
  const filepath = path.resolve(PUBLIC_DIR, filename);
  // 获取文件信息
  const fileInfo = await fs.stat(filepath);
  res.header("Content-Length", fileInfo.size);
  res.header("Content-Type", mime.lookup(filepath));
  res.end();
});

app.get("/download/:filename", async (req, res) => {
  // 获取文件名
  const { filename } = req.params;
  const filepath = path.resolve(PUBLIC_DIR, filename);
  // 获取文件信息
  const fileInfo = await fs.stat(filepath);
  // 读取文件的起始位置
  const start = req.query.start ? parseInt(req.query.start) : 0;
  // 读取文件的结束位置
  const end = req.query.end ? parseInt(req.query.end) : fileInfo.size;
  // 创建可读流
  const readStream = fs.createReadStream(filepath, { start, end });
  // 设置响应头
  res.header("Content-Length", end - start + 1);
  // 管道流
  readStream.pipe(res);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
