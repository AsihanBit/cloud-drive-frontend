import request from '@/utils/request'

export const userRegister = (username: string, password: string, nickname: string) => {
  return request.post('/user/user/register', {
    username,
    password,
    nickname,
  })
}

export const userLogin = (username: string, password: string) => {
  return request.post('/user/user/login', {
    username,
    password,
  })
}
