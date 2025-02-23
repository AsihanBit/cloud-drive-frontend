import request from '@/utils/request'

export const getUserItems = (itemId: number) => {
  return request.get('/user/files/items', {
    params: {
      itemId,
    },
  })
}
