import { uploadFileChunk, checkFileIsExist, checkChunkIsExist } from '@/api/file'
import { calculateFileHash } from '@/utils/fileMD5'
import type { UploadInstance, UploadProps, UploadRawFile, UploadFile } from 'element-plus'
import { useUploadFileStore } from '@/stores/uploadFile'
import { reactive } from 'vue'
import { CHUNK_SIZE } from '@/constants/constants'
import type { FileRecord, FileInfo } from '@/types/fileType'
interface Chunk {
  start: number
  end: number
  index: number
  hash: string
  blob: Blob
}

export async function uploadFileChunksThreadPool(fileUid: number) {
  return new Promise(async (resolve, reject) => {
    const abortControllers: AbortController[] = [] // 存储所有 AbortController

    // 获取Pinia里的文件
    const uploadFileStore = useUploadFileStore()
    const uploadFile = uploadFileStore.files[fileUid] as FileInfo
    // console.log('要上传的文件对象', uploadFile)
    const file = uploadFile.raw
    console.log('uploadFileChunksThreadPool - file对象', file, typeof file)

    // 计算整个文件的MD5值
    const fileHash = await calculateFileHash(file as File)
    // const fileSize = uploadFile.size
    const fileName = uploadFile.name

    // 调用新文件判断接口
    try {
      const res = await checkFileIsExist(fileHash, uploadFile.name, uploadFile.targetPathId,uploadFile.raw.size)
      console.log('文件存在性检查', res)

        
      // 直接返回对应的状态码，让调用者处理
      if (res.data === 1 || res.data === 2 || res.data === 3) {
        if (res.data === 1) {
          // 文件已存在，标记为已完成
          uploadFile.uploadedChunks = uploadFile.totalChunks
        }
        resolve(res.data)
        return
      }

    
    } catch (error) {
      console.error('检查文件是否存在时出错:', error)
      reject(0)
      return
      // return 0
    }
    console.log('新文件,开始切片上传')

    // const chunkSize = 5 * 1024 * 100 // 15KB
    // const totalChunks = Math.ceil(file.size / chunkSize)

    const totalChunks = uploadFile.totalChunks
    console.log('文件片数:', totalChunks)

    // 没啥用的标识器 identifier
    const identifier = file.name + '_' + new Date().getTime()
    // 目标路径
    const targetPathId = uploadFile.targetPathId

    // 限制并发请求数量
    const maxConcurrentRequests = 4 // 最大并发请求数量
    const queue: (() => Promise<void>)[] = []
    let activeRequests = 0

    // 获取已上传的分片下标
    const uploadedChunkIndexes = uploadFile.uploadedChunkIndexes || []
    // const uploadedChunkIndexes = reactive(
    //   uploadFileStore.getFileByUid(file.uid)?.uploadedChunkIndexes || [],
    // )

    // 每个线程分到的分片
    // const totalThread = navigator.hardwareConcurrency
    const totalThread = 4
    const threadChunkCount = Math.ceil(totalChunks / totalThread)
    const workers = []

    const checkAllChunksUploaded = () => {
      if (uploadFile.uploadedChunks === uploadFile.totalChunks) {
        console.log('所有分片上传完成')
        resolve(1)
      }
    }

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
        CHUNK_SIZE: CHUNK_SIZE,
        startChunkIndex: start,
        endChunkIndex: end,
        identifier,
        fileHash,
        totalChunks,
        // uploadedChunkIndexes, // 传递已上传的分片下标
        // uploadedChunkIndexes: [...uploadedChunkIndexes], // 浅拷贝数组
        uploadedChunkIndexes: JSON.stringify(uploadedChunkIndexes), // 序列化为 JSON 字符串
      })

      worker.onmessage = async (e) => {
        const chunkData = e.data as Chunk
        if (!chunkData.blob) {
          console.error('Invalid chunk data:', chunkData)
          return
        }

        // 检查文件是否处于暂停状态
        if (uploadFileStore.isFilePaused(file.uid)) {
          console.log('文件已暂停，停止上传')
          return
        }

        // 封装分片存在性检查请求
        const checkChunkExistenceRequest = async () => {
          try {
            activeRequests++
            console.log('目前并发分片存在性检查请求数量', activeRequests)
            const { data } = await checkChunkIsExist(fileHash, chunkData.hash, chunkData.index)
            console.log('分片存在性检查', data)
            if (data) {
              console.log('uploadFileStore 的文件uid', file.uid)
              // 更新中的 uploadedChunks
              uploadFileStore.incrementUploadedChunks(file.uid, chunkData.index)
              console.log(`分片 ${chunkData.index} 已存在，跳过`)
              checkAllChunksUploaded()
              return // 分片已存在，停止上传
            }

            const formData = new FormData()
            formData.append('file', chunkData.blob, `${file.name}.part${chunkData.index}`)
            formData.append('fileName', fileName)
            // formData.append('fileSize', fileSize.toString())
            formData.append('start', chunkData.start.toString())
            formData.append('end', chunkData.end.toString())
            formData.append('chunkNumber', chunkData.index.toString())
            formData.append('chunkCount', totalChunks.toString())
            formData.append('chunkHash', chunkData.hash)
            formData.append('fileHash', fileHash)
            formData.append('identifier', identifier)
            // 用户指定的上传目录
            formData.append('targetPathId', targetPathId.toString())

            const abortController = new AbortController()
            abortControllers.push(abortController)
            const uploadRequest = async () => {
              try {
                activeRequests++
                console.log('目前并发请求数量', activeRequests)
                const response = await uploadFileChunk(formData, { signal: abortController.signal })
                console.log(`分片 ${chunkData.index} 上传成功`, response)
                // 更新已上传的分片数量
                console.log('uploadFileStore 的文件uid', file.uid)
                // 更新中的 uploadedChunks
                uploadFileStore.incrementUploadedChunks(file.uid, chunkData.index)
                checkAllChunksUploaded()
                // 更新主线程中的 uploadedChunks
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
          } catch (error) {
            console.error(`检查分片 ${chunkData.index} 是否存在时出错`, error)
          } finally {
            activeRequests--
            if (queue.length > 0) {
              const nextRequest = queue.shift()!
              nextRequest()
            }
          }
        }

        if (activeRequests < maxConcurrentRequests) {
          checkChunkExistenceRequest()
        } else {
          queue.push(checkChunkExistenceRequest)
        }
      }
    }
    // 将 workers 和 abortControllers 存储在 uploadFile 中，以便在暂停时可以访问
    uploadFile.workers = workers
    uploadFile.abortControllers = abortControllers
  })
}
