import { uploadFileChunk } from '@/api/file'
import { calculateFileHash } from '@/utils/fileMD5'
import type { Ref } from 'vue'

interface Chunk {
  start: number
  end: number
  index: number
  hash: string
  blob: Blob
}
export async function uploadFileChunksThreadPool(
  file: File,
  isPaused: Ref<boolean>,
  uploadedChunks: Ref<number[]>,
) {
  // 计算整个文件的MD5值
  const fileHash = await calculateFileHash(file)
  const chunkSize = 5 * 1024 * 5 // 15KB
  const totalChunks = Math.ceil(file.size / chunkSize)

  console.log('文件片数:', totalChunks)

  // 使用唯一的 identifier
  const identifier = file.name + '_' + new Date().getTime()

  // 限制并发请求数量
  const maxConcurrentRequests = 4 // 最大并发请求数量
  const queue: (() => Promise<void>)[] = []
  let activeRequests = 0

  // 每个线程分到的分片
  // const totalThread = navigator.hardwareConcurrency
  const totalThread = 4
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
      uploadedChunks: Array.isArray(uploadedChunks.value) ? uploadedChunks.value : [], // 确保是数组
    })

    worker.onmessage = async (e) => {
      const chunkData = e.data as Chunk
      if (!chunkData.blob) {
        console.error('Invalid chunk data:', chunkData)
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

      const uploadRequest = async () => {
        try {
          activeRequests++
          console.log('目前并发请求数量', activeRequests)
          const response = await uploadFileChunk(formData)
          console.log(`分片 ${chunkData.index} 上传成功`, response)
          // 更新主线程中的 uploadedChunks
          if (Array.isArray(uploadedChunks.value)) {
            uploadedChunks.value.push(chunkData.index)
          } else {
            console.error('uploadedChunks is not an array:', uploadedChunks.value)
          }
        } catch (error) {
          console.error(`分片 ${chunkData.index} 上传失败`, error)
        } finally {
          activeRequests--

          if (queue.length > 0) {
            const nextRequest = queue.shift()!
            nextRequest()
          }
        }
      }

      if (activeRequests < maxConcurrentRequests) {
        uploadRequest()
      } else {
        queue.push(uploadRequest)
      }

      if (isPaused.value) {
        worker.terminate()
      }
    }
  }
}
