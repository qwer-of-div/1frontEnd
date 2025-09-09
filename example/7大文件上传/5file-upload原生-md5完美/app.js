// 1.引入 express
const express = require("express");
const cors = require("cors"); // 处理跨域
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// 2.创建 express 实例
const app = express();
const port = 3001;
app.use(
  cors({
    origin: "*" // 或 ['http://你的前端域名', 'https://你的前端域名']
  })
);
app.use(express.json());

// 配置文件上传的临时存储目录
const upload = multer({ dest: "temp/" });

// 创建上传目录
const UPLOAD_DIR = path.resolve(__dirname, "uploads");
const TEMP_DIR = path.resolve(__dirname, "temp");
!fs.existsSync(UPLOAD_DIR) && fs.mkdirSync(UPLOAD_DIR);
!fs.existsSync(TEMP_DIR) && fs.mkdirSync(TEMP_DIR);

// 3.注册路由
app.get("/", (req, res) => {
  res.cookie("token", "xxxxxxxxx", {
    // expires: new Date(Date.now() + 30 * 1000),
    // httpOnly: true,
    // maxAge: 30 * 1000
  });
  res.send("Hello");
});

app.get("/api/check", (req, res) => {
  const { fileHash } = req.query;
  const chunkDir = path.resolve(TEMP_DIR, fileHash);

  // 检查文件是否已存在
  const filePath = path.resolve(UPLOAD_DIR, `${fileHash}`);
  if (fs.existsSync(filePath)) {
    return res.send({ shouldUpload: false });
  }

  // 获取已上传分片列表
  const chunkPaths = [];
  if (fs.existsSync(chunkDir)) {
    chunkPaths = fs.readdirSync(chunkDir);
  }

  res.send({
    shouldUpload: true,
    uploadedChunks: chunkPaths.map(path => parseInt(path))
  });
});

app.post("/api/upload", upload.single("chunk"), (req, res) => {
  const { hash, index } = req.body;
  const chunkDir = path.resolve(TEMP_DIR, hash);

  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }

  // 移动临时文件到分片目录
  const oldPath = req.file.path;
  const newPath = path.join(chunkDir, index);
  console.log(newPath, 'newPath', hash, index)
  fs.renameSync(oldPath, newPath);

  res.send({ code: 0 });
});

app.post("/api/merge", async (req, res) => {
  const { fileHash, fileName } = req.body;
  const chunkDir = path.resolve(TEMP_DIR, fileHash);
  const filePath = path.resolve(UPLOAD_DIR, fileName);

  // 获取所有分片并排序
  const chunks = fs.readdirSync(chunkDir).sort((a, b) => a - b);

  // 管道写入文件
  const writeStream = fs.createWriteStream(filePath);

  const mergeChunk = index => {
    if (index === chunks.length) {
      writeStream.end(() => {
        // 删除临时目录
        fs.rmdirSync(chunkDir, { recursive: true });
        res.send({ code: 0 });
      });
      return;
    }

    const chunkPath = path.resolve(chunkDir, chunks[index]);
    const readStream = fs.createReadStream(chunkPath);

    readStream.pipe(writeStream, { end: false });
    readStream.on("end", () => {
      // 删除文件
      fs.unlinkSync(chunkPath);
      mergeChunk(index + 1);
    });
  };

  mergeChunk(0);
});

// 中间件函数
const middleware1 = (req, res, next) => {
  console.log("this is middleware1");
  next();
};

// 4.为所有的路由添加中间件函数
app.use(middleware1);

// 5.启动服务
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
