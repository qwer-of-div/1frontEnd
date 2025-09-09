<script setup>
import { ref } from "vue";
import axios from "axios";
const filename = ref("厅堂服务-视频.zip");
const progressInfo = ref({});

const handleDownload = async () => {
  progressInfo.value = {};
  const res = await axios.head(`http://localhost:3000/${filename.value}`);
  // 获取文件信息
  const chunkSize = 1024 * 1024 * 100; // 100MB
  const totalSize = res.headers["content-length"];
  const mime = res.headers["content-type"];
  const count = Math.ceil(totalSize / chunkSize);

  // 并发分段下载
  const tasks = Array.from({ length: count }, (_, i) => {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, totalSize);
    return axios.get(`http://localhost:3000/${filename.value}`, {
      headers: {
        Range: `bytes=${start}-${end - 1}`,
      },
      responseType: "blob",
      onDownloadProgress: (e) => {
        progressInfo.value[`切片${i}`] = Math.round((e.loaded / e.total) * 100);
      },
    });
  });

  // 合并分段
  const blobs = await Promise.all(tasks);
  const blob = new Blob(
    blobs.map((blob) => blob.data),
    { type: mime }
  );

  // 保存为文件
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename.value;
  link.click();
  link.remove();
};
const handleCustom = async () => {
  progressInfo.value = {};
  const res = await axios.head(
    `http://localhost:3000/download/${filename.value}`
  );
  // 获取文件信息
  const chunkSize = 1024 * 1024 * 100; // 100MB
  const totalSize = res.headers["content-length"];
  const mime = res.headers["content-type"];
  const count = Math.ceil(totalSize / chunkSize);

  // 并发分段下载
  const tasks = Array.from({ length: count }, (_, i) => {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, totalSize);
    return axios.get(`http://localhost:3000/download/${filename.value}`, {
      params: {
        start,
        end: end - 1,
      },
      responseType: "blob",
      onDownloadProgress: (e) => {
        progressInfo.value[`切片${i}`] = Math.round((e.loaded / e.total) * 100);
      },
    });
  });

  // 合并分段
  const blobs = await Promise.all(tasks);
  const blob = new Blob(
    blobs.map((blob) => blob.data),
    { type: mime }
  );

  // 保存为文件
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename.value;
  link.click();
  link.remove();
};
</script>

<template>
  <div class="wrapper">
    <el-input v-model="filename" placeholder="文件名"></el-input>

    <el-button type="primary" @click="handleDownload">分段下载</el-button>

    <el-button type="primary" @click="handleCustom">自定义分段下载</el-button>

    <div class="progress-wrapper">
      <div class="progress-item" v-for="(progress, key) in progressInfo" :key="key">
        <div class="label">{{ key }}</div>
        <el-progress type="circle" :percentage="progress" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 20px;
  height: 100vh;
}

.el-button {
  margin-top: 20px;
}

.progress-wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}
</style>
