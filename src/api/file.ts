import request from '@/utils/request'
// 请求头
// const UPLOAD_HEADERS = {
//   'Content-Type': 'multipart/form-data',
// }
export const uploadFileChunk = (formData: FormData) => {
  return request.post('/user/file/chunkUpload', formData, {
    timeout: 1000, // 5000
  })
}

// 定义调用 /fileIsNew 接口的函数
export const checkFileIsExist = (fileHash: string) => {
  return request.get('/user/file/fileIsExist', {
    params: {
      fileHash,
    },
  })
}
export const checkChunkIsExist = (fileHash: string, chunkHash: string, chunkNumber: number) => {
  return request.get('/user/file/chunkIsExist', {
    params: {
      fileHash,
      chunkHash,
      chunkNumber,
    },
  })
}
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
