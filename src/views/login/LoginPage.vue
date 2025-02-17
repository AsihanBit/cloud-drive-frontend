<template>
  <div class="login-page">
    <div class="common-layout">
      <el-container>
        <el-main>Main</el-main>
        <el-aside>
          <div class="login-form">
            <el-form ref="loginFormRef" :model="loginForm" :rules="rules" label-width="70px">
              <!-- 用户名 -->
              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="请输入用户名"> </el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item label="验证码" prop="captcha">
                <el-input v-model="loginForm.captcha" placeholder="请输入验证码"></el-input>
              </el-form-item>
              <!-- 提交 -->
              <el-form-item>
                <el-button type="primary" @click="submitForm(loginFormRef)">提交</el-button>
                <el-button @click="resetForm(loginFormRef)">Reset</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-aside>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { userLogin } from '@/api/login'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElNotification } from 'element-plus'

// 获取当前路由对象
const route = useRoute()
// 获取路由实例
const router = useRouter()
// 获取用户信息
const userStore = useUserStore()
// 表单信息
const loginForm = ref({
  username: '',
  password: '',
  captcha: '',
})
// 表单实例
const loginFormRef = ref<FormInstance>()

// 用户名验证函数
const validateUsername = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
// 密码验证函数
const validatePass = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

// 验证码验证函数
const validateCaptcha = (rule: any, value: string, callback: (error?: Error) => void) => {
  const reg = /^[a-zA-Z0-9]{4}$/ // 正则表达式，验证四位字母数字组合
  if (value === '') {
    callback(new Error('请填写验证码'))
  } else if (!reg.test(value)) {
    // 验证码格式错误逻辑
    callback(new Error('验证码必须为四位字母数字组合'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof loginForm>>({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  captcha: [{ validator: validateCaptcha, trigger: 'blur' }],
})

// 提交表单的方法
const submitForm = async (formEl: FormInstance | undefined) => {
  // 先检查 formEl 存在
  if (!formEl) return
  // 调用 validate 方法进行表单验证，该方法接受一个回调函数作为参数
  formEl.validate(async (valid) => {
    // 回调函数会在验证完成后被调用，参数 valid 表示验证结果，为布尔值
    if (!valid) {
      // 如果验证不通过，直接返回
      return
    }

    // 如果验证通过，输出 'submit!' 提示信息
    console.log('submit!')
    // 实际的表单提交逻辑

    try {
      // 调用登录接口
      const res = await userLogin(loginForm.value.username, loginForm.value.password)
      // console.log(res)

      // 处理登录结果
      if (res.code === 0) {
        // 登录失败
        ElNotification({
          title: '登录失败',
          message: res.data.msg,
          type: 'error',
        })
      } else if (res.code === 1) {
        // 登录成功
        ElNotification({
          title: '登录成功',
          type: 'success',
        })
        userStore.setToken(loginForm.value.username, res.data.token)

        // 进行判断，看地址栏有无回跳地址
        // 1. 如果有   => 说明是其他页面，拦截到登录来的，需要回跳
        // 2. 如果没有 => 正常去首页
        const url = route.query.backUrl || '/home'
        router.replace(url)
      }
    } catch (error) {
      // 捕获异常并提示
      ElNotification({
        title: '请求失败',
        message: '登录请求发生错误，请稍后重试',
        type: 'error',
      })
      console.error('登录请求失败:', error)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="less" scoped>
.common-layout {
  background-color: bisque; // 看不到了
  .el-container {
    height: 98vh;
    .el-main {
      background-color: pink;
    }
    .el-aside {
      background-color: aquamarine;
      width: 80vh;
      /* 设置为相对定位，作为 .login-form 绝对定位的参考 */
      position: relative;
      .login-form {
        background-color: aqua;

        width: 400px;
        height: 500px;

        // 表单框位置
        position: relative;
        top: 140px;
        left: 150px;

        .el-form {
          max-width: 320px;
          // 输入框位置
          position: relative;
          top: 100px;
          left: 20px;
        }
      }
    }
  }
}
</style>
