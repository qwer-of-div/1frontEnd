<template>
  <div class="upload-container">
    <!-- 上传组件 -->
    <el-upload
      class="upload-demo"
      :auto-upload="false"
      :on-change="handleFileChange"
      :show-file-list="false"
    >
      <template #trigger>
        <!-- 选择文件按钮 -->
        <el-button type="primary">select file</el-button>
      </template>
    </el-upload>

    <!-- 文件上传进度条 -->
    <div class="progress-container" v-if="file1">
      <div class="file-info">
        <p>{{ file1.name }}</p>
        <p>{{ (file1.size / 1024 / 1024).toFixed(2) }} MB</p>
      </div>
      <el-progress :percentage="progressPercent" :status="progressStatus" />
      <el-button type="primary" @click="startUpload">开始上传</el-button>
    </div>
  </div>
  <video v-if="videoUrl" width="400px" :src="videoUrl" controls></video>
</template>

<script setup>
import { ref } from 'vue'
import { cutFile, chunkSize } from './utils'
import { fileHash1 } from './utils/fileHash'
import axios from 'axios'

const baseUrl = 'http://localhost:12306/'
// const upload = ref()
const videoUrl = ref('')
const file1 = ref() // 文件
const progressPercent = ref(0) // 进度百分比
const progressStatus = ref('') // 进度状态

const uploadedChunks = ref([]) // 已上传的块
const uploadCount = ref(0) // 已上传的块数量
let total = 0 // 总块数量
// 开始上传
const startUpload = async () => {
  console.time('upload')
  const file = file1.value
  let chunks = await cutFile(file, chunkSize) // 切割文件
  const fileHash = await fileHash1(chunks) // 计算文件哈希值
  total = chunks.length

  // 检查文件是否已上传或部分上传
  // 发送post请求到http://localhost:12306/verify，请求体中包含fileHash和fileName
  const { data: verifyRes } = await axios.post(`${baseUrl}verify`, {
    fileHash,
    fileName: file1.value.name,
  })
  console.log('data', verifyRes)

  // 如果verifyRes.data.shouldUpload为false，则设置进度条为100%和success状态，并返回
  if (!verifyRes.data.shouldUpload) {
    progressPercent.value = 100
    progressStatus.value = 'success'
    return
  }
  // 如果verifyRes.data.shouldUpload为true，且verifyRes.data.uploadedChunks不为空，则将uploadedChunks.value设置为verifyRes.data.uploadedChunks的排序后的数组，uploadCount.value设置为uploadedChunks.value的长度，并打印uploadedChunks.value
  let temp = []
  if (
    verifyRes.data.shouldUpload &&
    verifyRes.data.uploadedChunks &&
    verifyRes.data.uploadedChunks.length
  ) {
    uploadedChunks.value = verifyRes.data.uploadedChunks.sort((a, b) => a - b)
    uploadCount.value = uploadedChunks.value.length
    console.log('uploadedChunks', uploadedChunks.value)
    // 将chunks中不包含uploadedChunks.value的元素过滤出来，并赋值给temp
    temp = chunks.filter((chunk) => !uploadedChunks.value.includes(chunk.index))
  } else {
    // 否则将chunks赋值给temp
    temp = chunks
  }
  console.log('chunks', uploadCount.value, temp)
  // return
  // 上传每个分片
  // 遍历temp数组
  // for (let i = 0; i < temp.length; i++) {
  //   // 获取当前元素的hash值
  //   const chunkHash = temp[i].hash
  //   // 获取当前元素的blob值
  //   const blob = temp[i].blob
  //   // 创建一个FormData对象
  //   const formData = new FormData()
  //   // 向FormData对象中添加fileHash字段
  //   formData.append('fileHash', fileHash)
  //   // 向FormData对象中添加chunkHash字段
  //   formData.append('chunkHash', chunkHash)
  //   // 向FormData对象中添加chunkIndex字段
  //   formData.append('chunkIndex', temp[i].index)
  //   // 向FormData对象中添加chunk字段
  //   formData.append('chunk', blob)
  //   // 发送post请求
  //   try {
  //     await axios.post(`${baseUrl}upload`, formData)
  //     // 更新进度百分比
  //     progressPercent.value = Math.round(((i + 1) / temp.length) * 100)
  //     // 更新上传数量
  //     uploadCount.value++
  //   } catch (err) {
  //     // 打印错误信息
  //     console.log('err', err)
  //     // 更新进度状态
  //     progressStatus.value = 'exception'
  //     // 返回
  //     return
  //   }
  // }
  const urls = []
  for (let i = 0; i < temp.length; i++) {
    urls.push({
      url: `${baseUrl}upload`,
      data: {
        fileHash,
        chunkHash: temp[i].hash,
        chunkIndex: temp[i].index,
        chunk: temp[i].blob,
      },
    })
  }
  console.log('urls', urls)
  // 并发
  concurRequest(urls, 3).then(async (res) => {
    console.log('res', res)
    try {
      await axios.post(`${baseUrl}merge`, {
        fileHash,
        fileName: file1.value.name,
        chunkCount: chunks.length,
        chunks: chunks,
      })
      progressStatus.value = 'success'
      console.timeEnd('upload')
      videoUrl.value = `${baseUrl}uploads/${file1.value.name}`
    } catch (error) {
      progressStatus.value = 'exception'
      console.error(error)
    }
  })
  function concurRequest(urls, maxNum) {
    console.log('progressPercent.value', progressPercent.value)
    return new Promise((resolve) => {
      const result = []
      let nextIndex = 0
      let finishedCount = 0
      async function _request() {
        if (nextIndex >= urls.length) {
          return
        }
        const i = nextIndex++
        const url = urls[i]
        const formData = new FormData()
        formData.append('fileHash', url.data.fileHash)
        formData.append('chunkHash', url.data.chunkHash)
        // 向FormData对象中添加chunkIndex字段
        formData.append('chunkIndex', url.data.chunkIndex)
        // 向FormData对象中添加chunk字段
        formData.append('chunk', url.data.chunk)
        try {
          const resp = await axios.post(url.url, formData)
          result[i] = resp
          finishedCount++
          progressPercent.value = Math.round((i / urls.length) * 100)
          if (finishedCount === urls.length) {
            resolve(result)
            return
          }
          _request()
        } catch (error) {
          console.error('error', error)
        }
      }
      for (let i = 0; i < Math.min(maxNum, urls.length); i++) {
        _request()
      }
    })
  }
  console.log('总的chunks', temp.length, '已经上传的', total)
  if (uploadCount.value === total) {
    // 合并文件
    // try {
    //   await axios.post(`${baseUrl}merge`, {
    //     fileHash,
    //     fileName: file1.value.name,
    //     chunkCount: chunks.length,
    //     chunks: chunks,
    //   })
    //   progressStatus.value = 'success'
    //   console.timeEnd('upload')
    // } catch (error) {
    //   progressStatus.value = 'exception'
    //   console.error(error)
    // }
  }
}

const startUpload1 = async () => {
  if (!file1.value) return
  console.time('upload')
  const formData = new FormData()
  formData.append('file', file1.value)

  try {
    const response = await axios.post('http://111.231.166.113:12306/upload-single', formData, {
      onUploadProgress: (progressEvent) => {
        progressPercent.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      },
    })

    if (response.status === 200) {
      progressStatus.value = 'success'
      console.timeEnd('upload')
    }
  } catch (error) {
    progressStatus.value = 'exception'
  }
}

// 文件改变时触发
const handleFileChange = (uploadFile) => {
  file1.value = uploadFile.raw
  console.log('file1', file1.value)
  progressPercent.value = 0
}
</script>

<style scoped></style>
