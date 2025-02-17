import request from '@/utils/request'
import { cutFileChunk } from '@/utils/cutFile'
import { calculateFileHash, calculatePartialFileHash } from '@/utils/fileMD5'
import { createChunk } from '@/utils/createChunk'
// 请求头
// const UPLOAD_HEADERS = {
//   'Content-Type': 'multipart/form-data',
// }

export const uploadFile = (file: File) => {
  const fileForm = new FormData()
  fileForm.append('file', file)

  // FormData 对象在发送请求时会自动设置正确的 Content-Type 头部信息。
  return request.post('/file/upload', fileForm)
}

/**
 * 上传文件分片
 * @param file - 原始文件对象
 */

interface Chunk {
  start: number
  end: number
  index: number
  hash: string
  blob: Blob
}

interface CutFileResult {
  chunks: Chunk[]
  chunkCount: number
}
export async function uploadFileChunks(file: File) {
  // 计算整个文件的MD5值
  const fileHash = await calculateFileHash(file)

  // 或者如果你只想计算文件的前几KB的MD5值
  // const partialFileHash = await calculatePartialFileHash(file, 1024);

  // const chunks = await cutFileChunk(file)
  // const chunks: Chunk[] = (await cutFileChunk(file)) as Chunk[]
  const { chunks, chunkCount }: CutFileResult = (await cutFileChunk(file)) as CutFileResult
  console.log('file.ts里:', chunks)
  console.log('chunkCount:', chunkCount)

  const uploadPromises = chunks.map(async (chunk, index) => {
    if (!chunk.blob) {
      console.error('Invalid chunk data:', chunk)
      return { index: chunk.index, success: false }
    }

    const formData = new FormData()

    formData.append('file', chunk.blob, `${file.name}.part${chunk.index}`)

    formData.append('start', chunk.start.toString())
    formData.append('end', chunk.end.toString())
    formData.append('chunkNumber', chunk.index.toString())
    formData.append('chunkCount', chunkCount.toString())
    formData.append('chunkHash', chunk.hash)
    formData.append('blob', chunk.blob.toString())
    // 添加整个文件的MD5值
    formData.append('fileHash', fileHash)

    formData.append('identifier', file.name + '_' + new Date().getTime()) // 使用文件名和时间戳作为唯一标识符

    try {
      const response = await request.post('/user/file/chunkUpload', formData)
      console.log(`第${index}分片 ${chunk.index} 上传成功`, response)
      return { index: chunk.index, success: true }
    } catch (error) {
      console.error(`分片 ${chunk.index} 上传失败`, error)
      return { index: chunk.index, success: false }
    }
  })

  // 等待所有分片上传完成
  const results = await Promise.all(uploadPromises)

  // 检查是否有分片上传失败
  const allSuccess = results.every((result) => result.success)
  if (allSuccess) {
    console.log('所有分片上传成功')
  } else {
    console.error(
      '部分分片上传失败:',
      console.error(
        '部分分片上传失败:',
        results.filter((result) => !result.success),
      ),
    )
  }
}

export async function uploadFileChunks1(file: File) {
  return request.post('/file/upload', file)
}

// 边分片边上传
export async function uploadFileByCut(file: File) {
  // 计算整个文件的MD5值
  const fileHash = await calculateFileHash(file)
  const chunkSize = 15 * 1024 * 5 // 15KB
  const totalChunks = Math.ceil(file.size / chunkSize)

  console.log('文件片数:', totalChunks)

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize
    const end = Math.min(start + chunkSize, file.size)
    const chunk = file.slice(start, end)

    // 创建分片
    const chunkData = await createChunk(file, i, chunkSize)

    if (!chunkData.blob) {
      console.error('Invalid chunk data:', chunkData)
      continue
    }

    const formData = new FormData()
    formData.append('file', chunkData.blob, `${file.name}.part${chunkData.index}`)
    formData.append('start', chunkData.start.toString())
    formData.append('end', chunkData.end.toString())
    formData.append('chunkNumber', chunkData.index.toString())
    // formData.append('chunkNumber', chunkData.start.toString())
    formData.append('chunkCount', totalChunks.toString())
    formData.append('chunkHash', chunkData.hash)
    formData.append('fileHash', fileHash)
    formData.append('identifier', file.name + '_' + new Date().getTime())

    try {
      const response = await request.post('/user/file/chunkUpload', formData, {
        timeout: 5000,
      })
      console.log(`分片 ${chunkData.index} 上传成功`, response)
    } catch (error) {
      console.error(`分片 ${chunkData.index} 上传失败`, error)
    }
  }
}
export async function uploadFileByCutThreadPool(file: File) {
  // 计算整个文件的MD5值
  const fileHash = await calculateFileHash(file)
  const chunkSize = 15 * 1024 * 5 // 15KB
  const totalChunks = Math.ceil(file.size / chunkSize)

  console.log('文件片数:', totalChunks)

  // 使用唯一的 identifier
  const identifier = file.name + '_' + new Date().getTime()

  // 每个线程分到的分片
  const threadChunkCount = Math.ceil(totalChunks / navigator.hardwareConcurrency)
  const workers = []

  for (let i = 0; i < navigator.hardwareConcurrency; i++) {
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
          timeout: 5000,
        })
        console.log(`分片 ${chunkData.index} 上传成功`, response)
      } catch (error) {
        console.error(`分片 ${chunkData.index} 上传失败`, error)
      }

      // worker.terminate()
    }
  }
}
