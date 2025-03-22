import { UNITS } from '@/constants/constants'
export const formatSize = (fileSize: number) => {
  let size = fileSize || 0
  let i = 0
  while (size >= 1024 && i < UNITS.length - 1) {
    size /= 1024
    i++
  }
  return size.toFixed(2) + ' ' + UNITS[i]
}

export const formatUpdateTime = (updateTime: number[] | undefined): string => {
  if (!updateTime || updateTime.length !== 6) {
    return ''
  }
  const [year, month, day, hour, minute, second] = updateTime
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}
