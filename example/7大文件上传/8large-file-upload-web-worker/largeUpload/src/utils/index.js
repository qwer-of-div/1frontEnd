export const chunkSize = 10 * 1024 * 1024 // 10MB

const threadCount = navigator.hardwareConcurrency || 4 // 线程数
export const cutFile = async (file) => {
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / chunkSize) // 块数
    const threadChunkCount = Math.ceil(chunkCount / threadCount) // 每个线程处理的块数
    console.log('threadChunkCount', threadChunkCount, chunkCount)
    const result = []
    let finishCount = 0
    for (let i = 0; i < threadCount; i++) {
      const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' })
      worker.postMessage({
        file,
        start: i * threadChunkCount, // 每个线程处理的起始块数
        end: Math.min((i + 1) * threadChunkCount, chunkCount), // 每个线程处理的结束块数
        chunkSize,
      })
      worker.onmessage = (e) => {
        worker.terminate() // 处理完就关闭线程
        result[i] = e.data // 将每个线程的结果保存到result数组中, 用下标时因为要保证顺序
        finishCount++
        if (finishCount === threadCount) {
          resolve(result.flat()) // 将二维数组变为一维数组
        }
      }
    }
  })
}
