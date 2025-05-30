import request from '@/utils/request'

export const userRegister = (username: string, password: string, nickname: string) => {
  return request.post('/user/user/register', {
    username,
    password,
    nickname,
  })
}

export const userLogin = (username: string, password: string, authToken?: string | null) => {
  const requestData: any = {
    username,
    password,
  }
  
  // 如果有authToken，则添加到请求数据中
  if (authToken) {
    requestData.authToken = authToken
  }
  
  return request.post('/user/user/login', requestData)
}
