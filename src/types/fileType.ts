import type { UploadRawFile, UploadFile, UploadStatus } from 'element-plus'

// 定义单个文件信息的接口
export interface FileInfo extends UploadFile {
  // name: string // name size等已有的 可加可不加
  // percentage?: number
  // status: UploadStatus
  // size?: number
  // response?: unknown
  // uid: number
  // raw?: UploadRawFile
  size?: number
  uploadStatus: string // 文件状态：已准备、正在上传、已暂停、已完成、上传失败
  uploadedChunks: number // 已上传的分片数量
  totalChunks: number // 总分片数量
  uploadedChunkIndexes: number[] // 已上传的分片下标
  raw: UploadRawFile
}

// 定义文件记录的接口，使用 Record 类型
export interface FileRecord {
  [key: number]: FileInfo
}
// const files = ref<FileRecord>({})
