import request from '@/utils/request'
// 请求头
// const UPLOAD_HEADERS = {
//   'Content-Type': 'multipart/form-data',
// }
export const uploadFileChunk0 = (formData: FormData) => {
  return request.post('/user/file/chunkUpload', formData, {
    timeout: 3000, // 5000
  })
}
// 实现Worker随时停止请求
// 在 '@/api/file' 中修改 uploadFileChunk 函数签名
export async function uploadFileChunk(
  formData: FormData,
  options?: { signal?: AbortSignal },
): Promise<any> {
  const { signal } = options || {}
  // 处理上传逻辑，支持取消请求
  const response = await request.post('/user/file/chunkUpload', formData, {
    signal,
  })
  return response
}

// 定义调用 /fileIsNew 接口的函数
export const checkFileIsExist = (fileHash: string, fileName: string, targetPathId: number) => {
  return request.post('/user/file/fileIsExist', {
    fileHash,
    fileName,
    targetPathId,
  })
}
//
export const checkChunkIsExist = (fileHash: string, chunkHash: string, chunkNumber: number) => {
  return request.get('/user/file/chunkIsExist', {
    params: {
      fileHash,
      chunkHash,
      chunkNumber,
    },
  })
}
export const downloadChunk = (itemId: number, fileId: number, start: number, end: number) => {
  return request.get('/user/file/chunkDownload', {
    responseType: 'blob',
    headers: {
      Range: `bytes=${start}-${end}`,
    },
    params: {
      itemId: itemId,
      fileId: fileId,
    },
  })
}
// export const checkFileIsExist = (fileHash: string) => {
//   return request.get('/user/file/fileIsExist', {
//     params: {
//       fileHash,
//     },
//   })
// }

// 用户文件浏览页面进行上传文件

// export const uploadFileToDirectory = (formData: FormData) => {
//   return request.post('/user/file/chunkUpload', formData, {
//     timeout: 1000, // 5000
//   })
// }

// export const uploadFileChunk = (formData: FormData, onCancel?: () => void) => {
//   const controller = new AbortController();
//   const signal = controller.signal;
//   if (typeof onCancel === 'function') {
//     onCancel(() => controller.abort());
//   }

//   return request.post('/user/file/chunkUpload', formData, {
//     timeout: 1000,
//     signal
//   });
// }
