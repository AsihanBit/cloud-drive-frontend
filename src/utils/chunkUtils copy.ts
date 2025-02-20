import { uploadFileChunk, checkFileIsExist, checkChunkIsExist } from '@/api/file'
import { calculateFileHash } from '@/utils/fileMD5'

interface Chunk {
  start: number
  end: number
  index: number
  hash: string
  blob: Blob
}

export async function uploadFileChunksThreadPool(file: File) {
  // 计算整个文件的MD5值
  const fileHash = await calculateFileHash(file)

  // 调用新文件判断接口
  try {
    const { data } = await checkFileIsExist(fileHash)
    console.log('文件存在性检查', data)
    if (data) {
      console.log('文件已存在，停止上传')
      return 1 // 文件已存在，停止上传
    }
  } catch (error) {
    console.error('检查文件是否存在时出错:', error)
    return 0
  }

  const chunkSize = 5 * 1024 * 100 // 15KB
  const totalChunks = Math.ceil(file.size / chunkSize)

  console.log('文件片数:', totalChunks)

  // 使用唯一的 identifier
  const identifier = file.name + '_' + new Date().getTime()

  // 限制并发请求数量
  const maxConcurrentRequests = 4 // 最大并发请求数量
  const queue: (() => Promise<void>)[] = []
  let activeRequests = 0

  // 每个线程分到的分片
  const totalThread = navigator.hardwareConcurrency
  // const totalThread = 4
  const threadChunkCount = Math.ceil(totalChunks / totalThread)
  const workers = []

  for (let i = 0; i < totalThread; i++) {
    const start = i * threadChunkCount
    let end = (i + 1) * threadChunkCount
    if (end > totalChunks) {
      end = totalChunks
    }

    const worker = new Worker(new URL('@/utils/worker.ts', import.meta.url), { type: 'module' })
    workers.push(worker)

    worker.postMessage({
      file,
      CHUNK_SIZE: chunkSize,
      startChunkIndex: start,
      endChunkIndex: end,
      identifier,
      fileHash,
      totalChunks,
    })

    worker.onmessage = async (e) => {
      const chunkData = e.data as Chunk
      if (!chunkData.blob) {
        console.error('Invalid chunk data:', chunkData)
        return
      }

      const uploadRequest = async () => {
        try {
          // 检查分片是否已存在
          try {
            const { data } = await checkChunkIsExist(fileHash, chunkData.hash, chunkData.index)
            console.log('分片存在性检查', data)
            if (data) {
              console.log(`分片 ${chunkData.index} 已存在，跳过`)
              return // 分片已存在，停止上传
            }
            // return 1
          } catch (error) {
            console.error(`检查分片 ${chunkData.index} 是否存在时出错`, error)
            return
          }

          const formData = new FormData()
          formData.append('file', chunkData.blob, `${file.name}.part${chunkData.index}`)
          formData.append('start', chunkData.start.toString())
          formData.append('end', chunkData.end.toString())
          formData.append('chunkNumber', chunkData.index.toString())
          formData.append('chunkCount', totalChunks.toString())
          formData.append('chunkHash', chunkData.hash)
          formData.append('fileHash', fileHash)
          formData.append('identifier', identifier)

          activeRequests++
          console.log('目前并发请求数量', activeRequests)
          const response = await uploadFileChunk(formData)
          console.log(`分片 ${chunkData.index} 上传成功`, response)
        } catch (error) {
          console.error(`分片 ${chunkData.index} 上传失败`, error)
        } finally {
          activeRequests--
          processQueue()
        }
      }

      if (activeRequests < maxConcurrentRequests) {
        console.log('增加并发请求', activeRequests)
        uploadRequest()
      } else {
        console.log('加入并发队列', activeRequests)
        queue.push(uploadRequest)
      }
      // 处理队列中的任务
      function processQueue() {
        if (queue.length > 0 && activeRequests < maxConcurrentRequests) {
          const nextRequest = queue.shift()!
          nextRequest()
        }
      }
      // worker.terminate()
    }
  }

  // 等待所有 worker 完成
  await Promise.all(workers.map((worker) => new Promise((resolve) => (worker.onmessage = resolve))))

  // 上传完成
  return 1
}
