const sliceUpload = async (file: File) => {
  isProcessing.value = true
  const suffix: any = /\.([\w]+)$/.exec(file.name)![1]
  const fileHash = await getFileHash(file)
  let alreadyList: any[] = []
  const res = await uploadService.uploadAlready(fileHash)
  if (res.success) {
    alreadyList = res.data.fileList
  }
  let max = props.sliceSize // 每个切片的大小
  let count = Math.ceil(file.size / max) // 切片数量

  let chunks: any[] = [] // 所有切片
  let index = 0
  while (index < count) {
    chunks.push({
      file: file.slice(index * max, (index + 1) * max),
      filename: `${fileHash}_${index + 1}.${suffix}`
    })
    index++
  }
  index = 0
  isProcessing.value = false
  uploading.value = true
  let pools: any[] = [] // 并发池
  const maxPoolsSize = props.maxPoolsSize // 并发池最大值
  // 一个切片上传完成后执行的方法
  const chunkUploadComplete = async () => {
    index++
    uploadPencent.value = Math.round((index / count!) * 100)

    if (index < count) return
    // 全部切片上传完成
    uploadPencent.value = 100
    try {
      const res = await uploadService.uploadMerge(fileHash, count)
      if (res.success) {
        reset()
      }
    } catch (e) {
      console.log('文件合并失败')
    }
  }
  // 上传所有切片
  const uploadChunks = async (chunks: any[]) => {
    for (let idx = 0; idx < chunks.length; idx++) {
      let chunk = chunks[idx]
      // 已经上传过的
      if (alreadyList.length > 0 && alreadyList.includes(chunk.filename)) {
        chunkUploadComplete()
      }

      const task = uploadService.uploadChunk(chunk.file, chunk.filename)
      task.then(res => {
          if (res.success) {
            chunkUploadComplete()
          } 
          // 执行完成,从池中移除
          const idx = pools.findIndex(x => x === task)
          pools.splice(idx)
        })
      pools.push(task)
      if (pools.length >= maxPoolsSize) {
        // 等待并发池执行完一个任务后
        await Promise.race(pools)
      }
    }
  }
  await uploadChunks(chunks)
}