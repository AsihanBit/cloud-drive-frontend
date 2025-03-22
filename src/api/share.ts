import request from '@/utils/request'

// 删除共享文件 最终没用delete方式
export const deleteSharedItems = (itemIds: number[]) => {
  return request.post('/user/share/delItems', {
    itemIds,
  })
}

// 获取自己分享中的文件列表
export const getSharedItems = (shareId: number, pItemId: number | null = null) => {
  // 处理 pItemId 为 null 的情况
  const actualPItemId = pItemId === null ? 0 : pItemId
  // 构建请求 URL
  const url = `/user/share/getMyShareFiles/${shareId}/${actualPItemId}`
  return request.get(url)
}

// 获取外部分享中的文件列表
export const getOtherSharedItems = (shareId: number, pItemId: number | null = null) => {
  // 处理 pItemId 为 null 的情况
  const actualPItemId = pItemId === null ? 0 : pItemId
  // 构建请求 URL
  const url = `/user/share/getOtherShareFiles/${shareId}/${actualPItemId}`
  return request.get(url)
}

// 重置分享有效期
export const resetShareExpire = (
  shareId: number,
  expireType: number | null = null,
  accessLimit: number | null = null,
) => {
  // 构建请求 URL
  const url = `/user/share/resetExpire/${shareId}/${expireType}/${accessLimit}`
  return request.put(url)
}

// 分享链接获取文件
export const getShareByShareCode = (shareId: number, extractCode: string) => {
  // 构建请求 URL
  const url = `/user/share/useShareLink/${shareId}/${extractCode}`
  return request.get(url)
}

// 转存文件
// 分享链接获取文件
export const saveSelectedItems = (
  shareId: number,
  extractCode: string,
  folderId: number,
  selectedItemIds: number[],
) => {
  // 构建请求 URL
  return request.post('/user/share/saveSelectedItems', {
    shareId,
    extractCode,
    folderId,
    selectedItemIds,
  })
}
