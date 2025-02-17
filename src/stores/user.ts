import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { storageUserToken, getUserToken, clearUserToken } from '@/utils/storage' // 调整路径
// 定义一个 Pinia 存储，用于管理用户信息

interface UserToken {
  username: string
  token: string
}

export const useUserStore = defineStore('user', () => {
  // 使用 ref 定义响应式变量
  // let userToken = ref('')
  const userToken = ref<UserToken>(getUserToken() || { token: '', username: '' })
  // const userToken = ref<UserToken>({ username: '', token: '' })

  // 获取 token 的方法
  function getToken() {
    userToken.value = getUserToken()
    console.log('Pinia user 中 getToken', userToken.value)
    return userToken.value.token // 返回 token
  }

  // 设置 token 的方法
  function setToken(username: string, token: string) {
    userToken.value = { username, token }
    storageUserToken(userToken.value)
  }

  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }

  // return { count, doubleCount, increment }
  return { userToken, getToken, setToken }
})
