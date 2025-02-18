import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
// axios 实例
const instance = axios.create({
  baseURL: '/api',
  timeout: 500000, // 5000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // 从 Pinia store 中获取 token
    const userStore = useUserStore()
    const token = userStore.getToken()
    console.log('请求拦截器', token)

    // const token2 = userStore.userToken.token
    // console.log('请求拦截器2', token2)

    if (token) {
      // 将 token 添加到请求头中
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    // console.log('请求成功')

    const res = response.data
    console.log(res)

    if (res.code === 1) {
      // 请求成功
      console.log('请求成功')
      ElMessage({
        message: res.msg,
        grouping: true,
        type: 'success',
      })
      // ElNotification({
      //   title: res.msg,
      //   message: res.msg,
      //   type: 'success',
      // })
    } else if (res.code === 0) {
      ElMessage({
        message: res.msg,
        grouping: true,
        type: 'error',
      })
      // ElNotification({
      //   title: res.msg,
      //   message: res.msg,
      //   type: 'error',
      // })
    }
    return res
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)

export default instance
