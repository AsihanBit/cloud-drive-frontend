import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UploadInstance, UploadProps, UploadRawFile, UploadRequestHandler } from 'element-plus'
import type { FileRecord, FileInfo } from '@/types/fileType'

interface uploadFile extends UploadRawFile {
  // 已有属性: name  percentage  status  size  raw  uid
  status: string // 文件状态：已准备、正在上传、已暂停、已完成、上传失败
  uploadedChunks: number // 已上传的分片数量
  totalChunks: number // 总分片数量
  uploadedChunkIndexes: number[] // 已上传的分片下标
}

const chunkSize = 5 * 1024 * 100 // 5MB
const units = ['B', 'KB', 'MB', 'GB', 'TB']

export const useUploadFileStore = defineStore('uploadFile', () => {
  const filestest = ref<FileRecord>({})
  // 初始化文件上传状态的方法
  const addFile = (rawFile: UploadRawFile) => {
    const file: FileInfo = {
      ...rawFile,
      status: '已准备',
      uploadedChunks: 0,
      totalChunks: 0,
      uploadedChunkIndexes: [],
    }
    filestest.value[file.uid] = file
  }

  const initFile = (fileUid: number) => {
    // const file = uploadFile.value[index]
    const file = getUploadFileByUid(fileUid)
    if (file) {
      // 避免返回undefined
      file.status = '已准备'
      file.uploadedChunks = 0
      file.uploadedChunkIndexes = []

      const totalChunks = Math.ceil(file.size / chunkSize)
      file.totalChunks = totalChunks
    } else {
      console.warn(`未找到 uid 为 ${fileUid} 的文件`)
    }
  }

  // *************************************************
  const uploadFile = ref<uploadFile[]>([])

  const addUploadFile = (rawFile: UploadRawFile) => {
    const file = rawFile as uploadFile
    uploadFile.value.push(file)
  }

  // 查找文件
  const getUploadFileByUid = (uid: number) => {
    return uploadFile.value.find((item) => item.uid === uid)
  }

  // 获取文件状态
  const getUploadFileStatusByUid = (uid: number) => {
    return uploadFile.value.find((item) => item.uid === uid)?.status
  }

  // 设置文件状态
  const setUploadFileStatusByUid = (uid: number, newStatus: string) => {
    const file = getUploadFileByUid(uid)
    // console.log(file)
    if (file) {
      // 避免返回undefined
      file.status = newStatus
      console.log('改变文件状态前:', file.status, '改变后', newStatus)
      console.log(`找到 uid 为 ${uid} 的文件`, newStatus)
    } else {
      console.warn(`未找到 uid 为 ${uid} 的文件`)
    }
  }

  // 初始化文件上传状态的方法
  const initUploadFileStatus = (fileUid: number) => {
    // const file = uploadFile.value[index]
    const file = getUploadFileByUid(fileUid)
    if (file) {
      // 避免返回undefined
      file.status = '已准备'
      file.uploadedChunks = 0
      file.uploadedChunkIndexes = []

      const totalChunks = Math.ceil(file.size / chunkSize)
      file.totalChunks = totalChunks
    } else {
      console.warn(`未找到 uid 为 ${fileUid} 的文件`)
    }
  }

  // 格式化文件大小
  const formatSize = (fileUid: number) => {
    const file = getUploadFileByUid(fileUid)
    let size = file?.size || 0
    let i = 0
    while (size >= 1024 && i < units.length - 1) {
      size /= 1024
      i++
    }
    return size.toFixed(2) + ' ' + units[i]
  }

  // 计算文件上传进度的 getter
  const uploadFileProgress = (fileUid: number) => {
    const file = getUploadFileByUid(fileUid)
    if (!file || file.totalChunks === 0) return 0

    return Math.round((file.uploadedChunks / file.totalChunks) * 100)
  }
  // 更新已上传的分片数量的方法
  const incrementUploadedChunks = (uid: number, chunkIndex: number) => {
    const file = getUploadFileByUid(uid)

    if (files.value[uid]) {
      files.value[uid].uploadedChunks += 1
      files.value[uid].uploadedChunkIndexes.push(chunkIndex)
    }
  }

  // *****************************************

  // 文件状态对象
  const files = ref<
    Record<
      number,
      {
        name: string
        size: number
        status: string // 文件状态：已准备、正在上传、已暂停、已完成、上传失败
        uploadedChunks: number // 已上传的分片数量
        totalChunks: number // 总分片数量
        uploadedChunkIndexes: number[] // 已上传的分片下标
      }
    >
  >({})

  // 初始化文件上传状态的方法
  const initFileStatus = (uid: number, name: string, size: number, totalChunks: number) => {
    files.value[uid] = {
      name,
      size,
      uploadedChunks: 0,
      totalChunks,
      status: '已准备',
      uploadedChunkIndexes: [],
    }
  }

  // 获取文件对象的方法
  const getFileByUid = (
    uid: number,
  ): {
    name: string
    size: number
    status: string
    uploadedChunks: number
    totalChunks: number
    uploadedChunkIndexes: number[]
  } | null => {
    if (files.value[uid]) {
      return files.value[uid]
    }
    console.log('未成功根据uid获取文件对象')
    return null
  }

  // // 更新已上传的分片数量的方法
  // const incrementUploadedChunks = (uid: number, chunkIndex: number) => {
  //   if (files.value[uid]) {
  //     files.value[uid].uploadedChunks += 1
  //     files.value[uid].uploadedChunkIndexes.push(chunkIndex)
  //   }
  // }

  // 设置文件状态的方法
  const setFileStatus = (uid: number, status: string) => {
    console.log('触发 - 设置文件状态的方法')
    console.log('文件状态-前', files.value[uid].status)
    const file = files.value[uid]
    if (file) {
      files.value[uid].status = status
    }
    console.log('文件状态-后', files.value[uid].status)
  }

  // 重置文件状态的方法
  const removeFileStatus = (uid: number) => {
    if (files.value[uid]) {
      delete files.value[uid]
    }
  }

  // // 计算文件上传进度的 getter
  // const uploadFileProgress = (uid: number) => {
  //   const file = files.value[uid]
  //   if (!file || file.totalChunks === 0) return 0
  //   return Math.round((file.uploadedChunks / file.totalChunks) * 100)
  // }
  // 检查文件是否暂停
  const isFilePaused = (uid: number) => {
    return files.value[uid]?.status === '已暂停'
  }

  // 返回状态和方法
  return {
    uploadFile,
    addUploadFile,
    getUploadFileByUid,
    initUploadFileStatus,
    formatSize,
    getUploadFileStatusByUid,
    // setPercentage,
    setUploadFileStatusByUid,
    files,
    initFileStatus,
    getFileByUid,
    incrementUploadedChunks,
    setFileStatus,
    removeFileStatus,
    uploadFileProgress,
    isFilePaused,
    filestest,
    addFile,
  }
})
