const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();
app.use(express.urlencoded({ extended: true }));

// 文件上传临时目录
const UPLOAD_DIR = path.resolve(__dirname, "uploads");

// 设置静态文件目录
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 分块上传接口
app.post("/upload", upload.single("chunk"), (req, res) => {
  // 检查上传目录是否存在，如果不存在则创建
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }

  // console.log('req.body', req.file)
  const { fileHash, chunkHash, chunkIndex } = req.body;
  const chunk = req.file;

  // 检查参数是否正确
  if (!chunk || !fileHash || !chunkHash || chunkIndex === undefined) {
    return res.status(400).send({ code: 1, message: "参数错误" });
  }

  // 创建分块目录
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }

  // 保存分块文件
  const chunkPath = path.resolve(chunkDir, `${chunkIndex}-${chunkHash}`);

  fs.writeFileSync(chunkPath, chunk.buffer);
  res.send({ code: 0, message: "上传成功" });
});

// 合并文件接口
app.post("/merge", (req, res) => {
  const { fileHash, fileName, chunkCount } = req.body;
  // 检查参数是否正确
  if (!fileHash || !fileName || !chunkCount) {
    return res.status(400).send({ code: 1, message: "参数错误" });
  }

  // 创建分块目录
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
  const filePath = path.resolve(UPLOAD_DIR, fileName);

  // 检查所有分块是否已上传
  for (let i = 0; i < chunkCount; i++) {
    const chunkPath = path.resolve(chunkDir, `${i}-${req.body.chunks[i].hash}`);
    // console.log(chunkPath)
    if (!fs.existsSync(chunkPath)) {
      return res.status(400).send({ code: 1, message: `分块${i}缺失` });
    }
  }

  // 合并文件
  const writeStream = fs.createWriteStream(filePath);

  for (let i = 0; i < chunkCount; i++) {
    const chunkPath = path.resolve(chunkDir, `${i}-${req.body.chunks[i].hash}`);
    const chunk = fs.readFileSync(chunkPath);
    writeStream.write(chunk);
    fs.unlinkSync(chunkPath);
  }

  writeStream.end();
  fs.rmdirSync(chunkDir);

  res.send({ code: 0, message: "合并成功" });
});

// 校验文件接口
app.post("/verify", (req, res) => {
  const { fileHash, fileName } = req.body;

  // 检查参数是否正确
  if (!fileHash || !fileName) {
    return res.status(400).send({ code: 1, message: "参数错误" });
  }

  const filePath = path.resolve(UPLOAD_DIR, fileName);

  // 检查文件是否已存在
  if (fs.existsSync(filePath)) {
    return res.send({
      code: 0,
      message: "文件已存在",
      data: { shouldUpload: false },
    });
  } else {
    // 检查已上传的分块
    const chunkDir = path.resolve(UPLOAD_DIR, fileHash);
    const uploadedChunks = [];

    if (fs.existsSync(chunkDir)) {
      uploadedChunks.push(...fs.readdirSync(chunkDir)); // 将文件夹中的chunk添加到数组中
      res.send({
        code: 0,
        message: "校验成功",
        data: {
          shouldUpload: true,
          uploadedChunks: uploadedChunks.map((c) => parseInt(c.split("-")[0])),
        },
      });
    } else {
      res.send({
        code: 0,
        message: "校验成功",
        data: {
          shouldUpload: true,
          uploadedChunks: null, // 返回已经上传过的chunks的索引
        },
      });
    }
    console.log("uploadedChunks", uploadedChunks);
  }
});
// 简单文件上传接口
app.post("/upload-single", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ code: 1, message: "请上传文件" });
  }
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
  }

  const filePath = path.resolve(UPLOAD_DIR, req.file.originalname);
  fs.writeFileSync(filePath, req.file.buffer);

  res.send({
    code: 0,
    message: "上传成功",
    data: {
      filename: req.file.originalname,
      size: req.file.size,
    },
  });
});

const PORT = 12306;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
