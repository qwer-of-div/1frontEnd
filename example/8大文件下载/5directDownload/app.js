const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
// 定义文件夹路径
const mergedDir = path.join(__dirname, 'merged');

// 文件下载接口
app.get('/download', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
  const { fileName } = req.query;
  const filePath = path.join(mergedDir, fileName);
  console.log(req.query, filePath, 333);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: '文件不存在' });
    }

    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      const contentType = getContentType(fileName);
      res.setHeader('Content-Type', contentType);
      // 对 fileName 进行编码
      const encodedFileName = encodeURIComponent(fileName);
      res.setHeader('Content-Disposition', `attachment; filename=${encodedFileName}`);
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.status(400).json({ error: '不是一个文件' });
    }
  });
});

// 获取文件的 MIME 类型
function getContentType (fileName) {
  // 获取文件后缀名
  const ext = path.extname(fileName).toLowerCase();
  console.log(ext, 111);
  switch (ext) {
    case '.js':
      return 'application/javascript';
    case '.json':
      return 'application/json';
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.txt':
      return 'text/plain';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.gif':
      return 'image/gif';
    case '.pdf':
      return 'application/pdf';
    case '.doc':
      return 'application/msword';
    case '.docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    case '.ppt':
      return 'application/vnd.ms-powerpoint';
    case '.pptx':
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
    case '.xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    default:
      return 'application/octet-stream';
  }
}


// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});