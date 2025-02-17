// const WORKER_URL = './utils/worker.ts' ./worker.ts
const WORKER_URL = new URL('@/utils/worker.ts', import.meta.url).href
const CHUNK_SIZE = 15 * 1024
// const CHUNK_SIZE = 5 * 1024 * 1024
const THREAD_COUNT = navigator.hardwareConcurrency // cpu内核数

// 分片上传
// 定义分片上传结果的类型
interface UploadChunkResult {
  index: number
  data: any // 根据实际返回的数据类型调整
}
export function cutFileChunk(file: File) {
  return new Promise((resolve) => {
    // 文件有多少片
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) // 向上取整
    console.log('文件片数: ', chunkCount)

    // 每个线程分到的分片
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT)
    const result: UploadChunkResult[] = []
    let finishCount = 0 // 判断完成
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 创建线程
      const worker = new Worker(WORKER_URL, {
        type: 'module',
      })

      const start = i * threadChunkCount
      let end = (i + 1) * threadChunkCount
      if (end > chunkCount) {
        end = chunkCount
      }
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startChunkIndex: start,
        endChunkIndex: end,
      })
      // 分片结束 汇总
      worker.onmessage = (e) => {
        console.log('第', i, '次分片结束: ', e.data)
        for (let i = start; i < end; i++) {
          // 取不到end
          result[i] = e.data[i - start]
        }
        worker.terminate()
        finishCount++
        if (finishCount === THREAD_COUNT) {
          console.log('全部分片结果: ', result)
          // resolve(result)
          resolve({ chunks: result, chunkCount })
        }
      }
    }
  })
}
