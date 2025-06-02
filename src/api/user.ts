import request from '@/utils/request'
import type { UserAccountInfo, UserModifyRequest, PasswordChangeRequest, Result } from '@/types/fileType'

// 获取用户信息
export function getUserInfo() {
  return request.get<Result & { data: UserAccountInfo }>('/user/account/userinfo')
}

// 修改用户信息
export function modifyUserInfo(data: UserModifyRequest) {
  return request.post<Result & { data: UserAccountInfo }>('/user/account/modify', data)
}

// 修改密码
export function changePassword(data: PasswordChangeRequest) {
  return request.post<Result>('/user/account/changepwd', data)
} 