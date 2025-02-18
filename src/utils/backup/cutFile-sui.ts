import request from '@/utils/request'

// const WORKER_URL = './utils/worker.ts' ./worker.ts
const WORKER_URL = new URL('@/utils/worker.ts', import.meta.url).href
const CHUNK_SIZE = 15 * 1024
// const CHUNK_SIZE = 5 * 1024 * 1024
const THREAD_COUNT = navigator.hardwareConcurrency // cpu内核数

// 随切随传
export function cutFileChunk(file: File) {
  return new Promise((resolve) => {
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
    const threadChunkCount = Math.ceil(chunkCount / THREAD_COUNT)

    console.log(`开始切片: 文件大小为 ${file.size} 字节, 共需分割为 ${chunkCount} 片`)

    let finishCount = 0
    for (let i = 0; i < THREAD_COUNT; i++) {
      const worker = new Worker(WORKER_URL, { type: 'module' })
      const start = i * threadChunkCount
      let end = (i + 1) * threadChunkCount
      if (end > chunkCount) end = chunkCount

      console.log(`启动线程 ${i}: 处理从第 ${start} 到第 ${end - 1} 分片`)

      worker.postMessage({ file, CHUNK_SIZE, startChunkIndex: start, endChunkIndex: end })

      worker.onmessage = async (e) => {
        const chunks = e.data
        // 对于每个分片，立即上传
        for (const chunk of chunks) {
          console.log(`正在上传分片 ${chunk.index}`)
          await uploadChunk(chunk, file)
          console.log(`分片 ${chunk.index} 上传完成`)
        }
        worker.terminate()
        console.log(`线程 ${i} 完成任务`)
        finishCount++
        // if (finishCount === THREAD_COUNT) resolve({ chunks, chunkCount })
        if (finishCount === THREAD_COUNT) {
          console.log('所有分片处理完毕')
          resolve({ chunks, chunkCount })
        }
      }
    }
  })
}

async function uploadChunk(chunk: any, file: File) {
  const formData = new FormData()
  formData.append('file', chunk.blob, `${file.name}.part${chunk.index}`)
  formData.append('start', chunk.start.toString())
  formData.append('end', chunk.end.toString())
  formData.append('chunkNumber', chunk.index.toString())
  formData.append('chunkHash', chunk.hash)
  formData.append('identifier', file.name + '_' + new Date().getTime())

  try {
    const response = await request.post('/user/file/chunkUpload', formData)
    console.log(`分片 ${chunk.index} 上传成功`, response)
  } catch (error) {
    console.error(`分片 ${chunk.index} 上传失败`, error)
  }
}
