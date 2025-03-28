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
export const getOtherSharedItems = (shareStr: string, pItemId: number | null = null) => {
  console.log('share.ts: getOtherSharedItems', shareStr, pItemId)
  // 处理 pItemId 为 null 的情况
  const actualPItemId = pItemId === null ? 0 : pItemId
  // 构建请求 URL
  // const url = `/user/share/getOtherShareFiles/${shareStr}/${actualPItemId}`
  // return request.get(url)

  // // 构建请求 URL，使用模板字符串形式
  // const url = `/user/share/getOtherShareFiles?shareStr=${encodeURIComponent(shareStr)}&actualPItemId=${actualPItemId}`
  // return request.get(url)

  // 构建请求 URL，使用查询参数形式
  const queryParams = new URLSearchParams()
  queryParams.append('shareStr', shareStr)
  queryParams.append('pItemId', String(actualPItemId))
  const url = `/user/share/getOtherShareFiles?${queryParams.toString()}`
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
export const getShareByShareCode = (shareStr: string, extractCode: string) => {
  // // 构建请求 URL
  // const url = `/user/share/useShareLink/${shareStr}/${extractCode}`
  // return request.get(url)

  // 构建请求 URL，使用查询参数形式
  const queryParams = new URLSearchParams()
  queryParams.append('shareStr', shareStr)
  queryParams.append('extractCode', extractCode)
  const url = `/user/share/useShareLink?${queryParams.toString()}`
  return request.get(url)
}

// 转存文件
// 分享链接获取文件
export const saveSelectedItems = (
  shareStr: string,
  extractCode: string,
  folderId: number,
  selectedItemIds: number[],
) => {
  // 构建请求 URL
  return request.post('/user/share/saveSelectedItems', {
    shareStr,
    extractCode,
    folderId,
    selectedItemIds,
  })
}
