import request from '@/utils/request'

// 获取用户文件列表 父文件夹item_p_id
export const getUserItems = (itemPId: number) => {
  return request.get('/user/files/items', {
    params: {
      itemPId,
    },
  })
}
// 获取用户分享条目列表
export const getUserSharedItems = () => {
  return request.get('/user/share/items')
}
