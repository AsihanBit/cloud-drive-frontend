import type { UploadRawFile, UploadFile, UploadStatus } from 'element-plus'
// 定义响应的格式
export interface Result {
  code: number
  msg: string
  data: JSON
}
// 用户信息
export interface UserInfo {
  userId: number
  username: string
  token: string
}
declare global {
  interface Window {
    showSaveFilePicker(options?: {
      suggestedName?: string
      types?: Array<{
        description?: string
        accept: Record<string, string[]>
      }>
    }): Promise<FileSystemFileHandle>
  }
}
// declare global {
//   interface FileSystemFileHandle {
//     createWritable(options?: { keepExistingData?: boolean }): Promise<FileSystemWritableFileStream>
//   }
// }
// 定义分片的接口
export interface ChunkInfo {
  identifier: number
  fileHash: string
  totalChunks: number

  start: number
  end: number
  index: number
  hash: string
  blob: Blob

  // hash: string
}

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
  targetPathId: number
  workers: Worker[] // 添加 workers 数组
  abortControllers: AbortController[] // 添加 abortControllers 数组
}

// 定义文件记录的接口，使用 Record 类型
export interface FileRecord {
  [key: number]: FileInfo
}
// const files = ref<FileRecord>({})

// 用户文件夹信息
export interface FolderInfo {
  id: number
  name: string
  directoryLevel: number
}

// 下载文件信息
export interface DownloadFileInfo {
  itemId: number
  fileName: string
  fileSize: number

  downloadStatus: string // 下载状态: 已准备 正在下载 已暂停 已完成 下载失败
  downloadedChunks: number // 已下载分片数量
  totalChunks: number
  // progress: number // 下载百分比
  // 待做: 下载速度
  // fileHash: string
  // filePath: string
  // fileType: string
}
// 定义文件记录的接口，使用 Record 类型
export interface DownloadFileRecord {
  [key: number]: DownloadFileInfo // key是item_id
}
// 定义分享文件的接口
export interface SharedItemInfo {
  shareId: number
  shareCode: string
  username: number
  nickname: string
  expireType: string
  expireTime: string
  accessCount: string
  accessLimit: number
  accessStatus: number
  createTime: number
}
// 分享成功回调DTO
export interface ShareResultDTO {
  shareId: number
  shareStr: string
  shareCode: string
  shareLink: string
}

// 用户账户信息
export interface UserAccountInfo {
  userId: number
  username: string
  nickname: string
  age: number
  gender: number
  phone: string
  email: string
  vip: number
  avatar: string
  usedSpace: number
  totalSpace: number
  registerTime: string
  lastLoginTime: string
  status: number
}

// 用户信息修改请求体
export interface UserModifyRequest {
  nickname?: string
  age?: number
  gender?: number
  phone?: string
  email?: string
  avatar?: string
}

// 密码修改请求体
export interface PasswordChangeRequest {
  oldPassword: string
  newPassword: string
}
