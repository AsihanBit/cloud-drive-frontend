import SparkMD5 from 'spark-md5'

/**
 * 计算整个文件的MD5值
 * @param file - 文件对象
 * @returns Promise<string> - 文件的MD5哈希值
 */
export async function calculateFileHash(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()

    reader.onload = (e) => {
      if (!e.target || !e.target.result) {
        reject('Failed to read the file.')
        return
      }
      spark.append(e.target.result as ArrayBuffer)
      resolve(spark.end())
    }

    reader.onerror = () => reject('Error reading file.')
    console.log('fileMD5', file)
    reader.readAsArrayBuffer(file)
  })
}

/**
 * 计算文件前N个字节的MD5值（部分哈希）
 * @param file - 文件对象
 * @param bytes - 要读取的字节数，默认为1024字节
 * @returns Promise<string> - 文件的部分MD5哈希值
 */
export async function calculatePartialFileHash(file: Blob, bytes: number = 1024): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    const spark = new SparkMD5.ArrayBuffer()

    reader.onload = (e) => {
      if (!e.target || !e.target.result) {
        reject('Failed to read the file.')
        return
      }
      spark.append(e.target.result as ArrayBuffer)
      resolve(spark.end())
    }

    reader.onerror = () => reject('Error reading file.')
    reader.readAsArrayBuffer(file.slice(0, bytes))
  })
}
