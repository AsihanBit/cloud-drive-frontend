import request from '@/utils/request'

// 获取用户文件列表 父文件夹item_p_id
export const getUserItems = (itemPId: number) => {
  return request.get('/user/files/items', {
    params: {
      itemPId,
    },
  })
}
