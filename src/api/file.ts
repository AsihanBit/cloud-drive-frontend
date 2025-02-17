import request from '@/utils/request'
import { cutFileChunk } from '@/utils/cutFile'
import { calculateFileHash, calculatePartialFileHash } from '@/utils/fileMD5'

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
export async function uploadFileChunks(file: File) {
  // 计算整个文件的MD5值
  const fileHash = await calculateFileHash(file)

  // 或者如果你只想计算文件的前几KB的MD5值
  // const partialFileHash = await calculatePartialFileHash(file, 1024);

  // const chunks = await cutFileChunk(file)
  const chunks: Chunk[] = (await cutFileChunk(file)) as Chunk[]
  console.log('file.ts里:', chunks)

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
    formData.append('chunkHash', chunk.hash)
    formData.append('blob', chunk.blob.toString())
    // 添加整个文件的MD5值
    formData.append('fileHash', fileHash)

    formData.append('identifier', file.name + '_' + new Date().getTime()) // 使用文件名和时间戳作为唯一标识符

    try {
      const response = await request.post('/file/chunkUpload', formData)
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
