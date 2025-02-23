import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { UploadRawFile } from 'element-plus'

export const useFileListTransferStore = defineStore('fileListTransfer', () => {
  const files = ref<UploadRawFile[]>([])

  const addFile = (file: UploadRawFile) => {
    files.value.push(file)
  }

  const removeFile = (uid: string) => {
    files.value = files.value.filter((file) => file.uid !== uid)
  }

  const clearFiles = () => {
    files.value = []
  }

  return {
    files,
    addFile,
    removeFile,
    clearFiles,
  }
})
