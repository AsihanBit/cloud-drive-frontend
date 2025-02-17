import { createChunk } from '@/utils/createChunk'

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
    } = e.data
    console.log(file, CHUNK_SIZE, start, end) // 拿到数据
    console.log('准备切片')

    // const proms = []
    // for (let i = start; i < end; i++) {
    //   proms.push(createChunk(file, i, CHUNK_SIZE))
    // }
    // const chunks = await Promise.all(proms)
    // postMessage(chunks)
    for (let i = start; i < end; i++) {
      const chunkData = await createChunk(file, i, CHUNK_SIZE)
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
