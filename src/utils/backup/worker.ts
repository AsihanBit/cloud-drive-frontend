import { createChunk } from '@/utils/backup/createChunk'

onmessage = async (e) => {
  try {
    const { file, CHUNK_SIZE, startChunkIndex: start, endChunkIndex: end } = e.data
    console.log(file, CHUNK_SIZE, start, end) // 拿到数据
    const proms = []
    for (let i = start; i < end; i++) {
      proms.push(createChunk(file, i, CHUNK_SIZE))
    }
    const chunks = await Promise.all(proms)
    postMessage(chunks)
  } catch (error) {
    console.error('Error in worker:', error)
    postMessage({ error: 'Worker encountered an error' })
  }
}
