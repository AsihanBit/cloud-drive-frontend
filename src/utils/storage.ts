// 定义通用的键名
const USER_TOKEN = 'cloud_drive_token'

interface UserInfo {
  userId: number
  username: string
  token: string
}
// 持久化存储 用户令牌
// 存储
export const storageUserToken = (obj: UserInfo) => {
  localStorage.setItem(USER_TOKEN, JSON.stringify(obj))
}
// 获取
export const getUserToken = () => {
  const defaultObj = { userId: '', username: '', token: '' }
  const result = localStorage.getItem(USER_TOKEN)
  // console.log('storage工具类中 getUserToken', result)
  return result ? JSON.parse(result) : defaultObj
}
// 清除
export const clearUserToken = () => {
  localStorage.removeItem(USER_TOKEN)
}
