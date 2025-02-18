import request from '@/utils/request'
// 请求头
// const UPLOAD_HEADERS = {
//   'Content-Type': 'multipart/form-data',
// }
export const uploadFileChunk = (formData: FormData) => {
  return request.post('/user/file/chunkUpload', formData, {
    timeout: 100, // 5000
  })
}
/*
interface Chunk {
  start: number
  end: number
  index: number
  hash: string
  blob: Blob
}

export async function uploadFileByCutThreadPool(
  file: File,
  isPaused: Ref<boolean>,
  uploadedChunks: Ref<number[]>,
) {
  // 计算整个文件的MD5值
  const fileHash = await calculateFileHash(file)
  const chunkSize = 5 * 1024 * 1024 // 15KB
  const totalChunks = Math.ceil(file.size / chunkSize)

  console.log('文件片数:', totalChunks)

  // 使用唯一的 identifier
  const identifier = file.name + '_' + new Date().getTime()

  // 限制并发请求数量
  const maxConcurrentRequests = 4 // 最大并发请求数量
  const queue: (() => Promise<void>)[] = []
  const activeRequests = 0

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

      try {
        const response = await request.post('/user/file/chunkUpload', formData, {
          timeout: 500000, // 5000
        })
        console.log(`分片 ${chunkData.index} 上传成功`, response)
        // 更新主线程中的 uploadedChunks
        if (Array.isArray(uploadedChunks.value)) {
          uploadedChunks.value.push(chunkData.index)
        } else {
          console.error('uploadedChunks is not an array:', uploadedChunks.value)
        }
      } catch (error) {
        console.error(`分片 ${chunkData.index} 上传失败`, error)
      }

      if (isPaused.value) {
        worker.terminate()
      }
    }
  }
}
*/
