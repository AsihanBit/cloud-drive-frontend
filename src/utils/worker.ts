import { createChunk } from '@/utils/backup/createChunk'

onmessage = async (e) => {
  try {
    // const { file, CHUNK_SIZE, startChunkIndex: start, endChunkIndex: end } = e.data
    const {
      file,
      CHUNK_SIZE,
      startChunkIndex: start,
      endChunkIndex: end,
      identifier,
      fileHash,
      totalChunks,
      uploadedChunkIndexes, // 接收已上传的分片下标
    } = e.data
    console.log('Received data:', {
      file,
      CHUNK_SIZE,
      start,
      end,
      identifier,
      fileHash,
      totalChunks,
      uploadedChunkIndexes,
    }) // 调试信息
    console.log(file, CHUNK_SIZE, start, end) // 拿到数据
    // console.log('准备切片')

    // const proms = []
    // for (let i = start; i < end; i++) {
    //   proms.push(createChunk(file, i, CHUNK_SIZE))
    // }
    // const chunks = await Promise.all(proms)
    // postMessage(chunks)
    // 将 JSON 字符串解析为数组
    const parsedUploadedChunkIndexes = JSON.parse(uploadedChunkIndexes)

    for (let i = start; i < end; i++) {
      // if (uploadedChunks.includes(i)) {
      //   console.log(`分片 ${i} 已上传，跳过`)
      //   continue
      // }
      // if (uploadedChunkIndexes.includes(i)) {
      //   console.log(`分片 ${i} 存在于Pinia Store中，跳过`)
      //   continue
      // }

      if (parsedUploadedChunkIndexes.includes(i)) {
        console.log(`分片 ${i} 存在于Pinia Store中，跳过`)
        continue
      }

      const chunkData = await createChunk(file, i, CHUNK_SIZE)
      console.log('切片完成')
      chunkData.identifier = identifier
      chunkData.fileHash = fileHash
      chunkData.totalChunks = totalChunks
      postMessage(chunkData)
    }
  } catch (error) {
    console.error('Error in worker:', error)
    postMessage({ error: 'Worker encountered an error' })
  }
}
