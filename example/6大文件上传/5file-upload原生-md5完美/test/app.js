const express = require("express");
const cors = require("cors"); // 解决跨域问题
const path = require("path"); // 处理路径问题
const fs = require("fs"); // 文件读取操作
const multer = require("multer"); // 进行文件上传的操作处理
const upload = multer({ dest: "uploads/" }); // 设置文件上传地址
const bodyParser = require("body-parser"); // 实现body解析操作
const app = express();

app.use(cors());
app.use(bodyParser.json()); // 实现中间件body的应用
app.use(bodyParser.urlencoded({ extended: false })); // 实现文件路径的处理

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

app.post("/upload", upload.single("file"), (req, res) => {
  const file = req.file; // 获取上传的文件对象
  const filename = req.body.filename; // 获取文件名
  const totalChunks = parseInt(req.body.totalChunks); // 获取总块数
  const currentChunk = parseInt(req.body.currentChunk); //获取当前块数
  const chunkPath = path.join("uploads/", `${filename}-chunk-${currentChunk}`); // 设置当前文件的存储路径

  const chunkStream = fs.createReadStream(file.path); //创建读取文件块的可读流
  const writeStream = fs.createWriteStream(chunkPath); //创建写入当前块的可写流

  chunkStream.pipe(writeStream); //通过chunkStream.pipe管道操作，将读取的文件块内容通过管道写入当前块的文件

  // 对分块上传内容结束以后的事件监听
  chunkStream.on("end", () => {
    fs.unlinkSync(file.path); //读取文件块的流结束后，删除临时文件
    // 打印 progress 我们就可以获取到文件进度情况
    const progress = ((currentChunk + 1) / totalChunks) * 100; // 计算上传进度情况
    res.json({ progress }); // 服务器端向客户端进行返回操作
  });
});

app.post("/merge", (req, res) => {
  const filename = req.body.filename; //获取文件名
  const totalChunks = parseInt(req.body.totalChunks); //获取总块数

  const mergedPath = path.join("uploads", filename); //生成合并后文件的存储路径
  const writeStream = fs.createWriteStream(mergedPath); //创建写入合并后文件的可写流

  // 合并文件块
  const mergeChunks = (index) => {
    if (index === totalChunks) {
      writeStream.end(); //所有块都合并完成后，关闭写入流
      res.sendStatus(200); //响应合并成功的状态
      return;
    }

    const chunkPath = path.join("uploads", `${filename}-chunk-${index}`); //获取当前块的存储路径
    const chunk = fs.readFileSync(chunkPath); //同步读取当前块的内容
    fs.unlinkSync(chunkPath); //删除已合并的块文件

    writeStream.write(chunk, () => {
      mergeChunks(index + 1); //递归合并下一块
    });
  };

  mergeChunks(0); //从第一块开始合并
});
