<template>
  <div class="register-page">
    <div class="common-layout">
      <el-container>
        <!-- 左侧 Cloud Drive -->
        <el-main class="left-panel">
          <div class="title">
            <span class="cloud">Cloud</span>
            <span class="drive">Drive</span>
          </div>
          <div class="github-link">
            <div>
              <p>Github 链接</p>
            </div>
            <img style="width: 25px" src="@/assets/github-mark-white.png" />
            <a href="https://github.com/AsihanBit/cloud-drive-frontend" target="_blank">前端</a>
            <a href="https://github.com/AsihanBit/cloud-drive-backend" target="_blank">后端</a>
          </div>
        </el-main>
        <el-aside class="right-panel">
          <div class="register-form">
            <el-form
              ref="registerFormRef"
              :model="loginForm"
              :rules="rules"
              status-icon
              label-width="70px"
            >
              <h3 class="register-title">注册账号</h3>

              <!-- 用户名 -->
              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username" placeholder="您的唯一标识"> </el-input>
              </el-form-item>
              <!-- 昵称 -->
              <el-form-item label="昵称" prop="nickname">
                <el-tooltip
                  class="box-item"
                  content="默认为用户名"
                  placement="right"
                  effect="customized"
                >
                  <el-input v-model="loginForm.nickname" placeholder="可选"> </el-input>
                </el-tooltip>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item label="密码" prop="password">
                <el-input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="输入密码"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <!-- 确认密码 -->
              <el-form-item label="确认密码" prop="checkPass">
                <el-input
                  v-model="loginForm.checkPass"
                  type="password"
                  placeholder="再次输入密码"
                  autocomplete="off"
                />
              </el-form-item>
              <!-- 验证码 -->
              <el-form-item label="验证码" prop="captcha">
                <el-tooltip
                  class="box-item"
                  content="验证码随意填4位即可"
                  placement="right"
                  effect="customized"
                >
                  <el-input v-model="loginForm.captcha" placeholder="输入图形验证码"></el-input>
                </el-tooltip>
              </el-form-item>
              <!-- 提交 -->
              <el-form-item>
                <el-button class="submit-btn" @click="submitForm(registerFormRef)">注册</el-button>
                <el-button class="reset-btn" @click="resetForm(registerFormRef)">重置</el-button>
              </el-form-item>
              <!-- 登陆页面 -->
              <el-form-item>
                <el-button class="login-link-btn" @click="clickToLogin()">去登陆 =></el-button>
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
import { userRegister } from '@/api/login'
import { ElNotification } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
import type { Result } from '@/types/fileType'

// 获取当前路由对象
const route = useRoute()
// 获取路由实例
const router = useRouter()

// 表单信息
const loginForm = ref({
  username: '',
  nickname: '',
  password: '',
  checkPass: '',
  captcha: '',
})
// 表单实例
const registerFormRef = ref<FormInstance>()

// 用户名验证函数
const validateUsername = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
// 昵称验证函数
const validateNickname = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback()
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
// 确认密码验证

const validatePass2 = (rule: any, value: string, callback: (error?: Error) => void) => {
  if (value === '') {
    callback(new Error('请确认密码'))
  } else if (value !== loginForm.value.password) {
    callback(new Error('两次输入密码不相同'))
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
  nickname: [{ validator: validateNickname, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  captcha: [{ validator: validateCaptcha, trigger: 'blur' }],
})

// 提交表单的方法
const submitForm = (formEl: FormInstance | undefined) => {
  // 先检查 formEl 存在
  if (!formEl) return
  // 调用 validate 方法进行表单验证，该方法接受一个回调函数作为参数
  formEl.validate(async (valid) => {
    // 回调函数会在验证完成后被调用，参数 valid 表示验证结果，为布尔值
    if (valid) {
      // 如果验证通过，输出 'submit!' 提示信息
      console.log('submit!')
      // 实际的表单提交逻辑

      const res = (await userRegister(
        loginForm.value.username,
        loginForm.value.password,
        loginForm.value.nickname,
      )) as unknown as Result
      if (res.code === 0) {
        ElNotification({
          title: '用户名已存在',
          message: res.msg,
          type: 'error',
        })
      } else if (res.code === 1) {
        ElNotification({
          title: '注册成功',
          // message: res.msg,
          type: 'success',
        })
        // 进行判断，看地址栏有无回跳地址
        // 1. 如果有   => 说明是其他页面，拦截到登录来的，需要回跳
        // 2. 如果没有 => 正常去首页
        const url = (route.query.backUrl as string) || '/login'
        // const url = '/login'
        router.replace(url)
      }

      // userRegister(
      //   loginForm.value.username,
      //   loginForm.value.password,
      //   loginForm.value.nickname,
      // ).then((res) => {
      //   console.log(res)
      //   console.log(res.code)
      //   if (res.code === 0) {
      //     ElNotification({
      //       title: '用户名已存在',
      //       message: res.msg,
      //       type: 'error',
      //     })
      //   } else if (res.code === 1) {
      //     ElNotification({
      //       title: '注册成功',
      //       // message: res.msg,
      //       type: 'success',
      //     })
      //     // 进行判断，看地址栏有无回跳地址
      //     // 1. 如果有   => 说明是其他页面，拦截到登录来的，需要回跳
      //     // 2. 如果没有 => 正常去首页
      //     const url = route.query.backUrl || '/login'
      //     // const url = '/login'
      //     router.replace(url)
      //   }
      // })
    } else {
      // 如果验证不通过，输出 'error submit!' 提示信息
      // console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

// 去登录界面
const clickToLogin = () => {
  // 点击按钮后跳转到 /register 页面
  router.push('/login')
}
</script>

<style lang="less" scoped>
.register-page {
  // === 美观样式 ===
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: linear-gradient(to right, #a0d4ff, #2facff); // 现代化渐变背景
  background-color: white;
  .common-layout {
    // background-color: bisque; // 看不到了
    // width: 80vw;
    // height: 70vh;
    // display: flex;
    // border-radius: 10px;
    // overflow: hidden;
    .el-container {
      height: 98vh;
      box-shadow: 0 4px 40px rgba(0, 0, 0, 0.6);

      .left-panel {
        flex: 1;
        width: 80vh;

        // background: rgba(152, 255, 224, 0.76);
        background: linear-gradient(to right, #a6d7ff, #5eb6ff); // 现代化渐变背景
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        // background-color: pink;
        flex-direction: column; /* 垂直排列 */
        // align-items: center; /* 居中对齐 */
        // justify-content: center;
        // height: 100%;

        .title {
          font-size: 100px;
          font-weight: bold;
          line-height: 100px;
          .cloud {
            display: block; // 让 Cloud 在上面
            color: #1565c0;
            letter-spacing: 20px;
            margin-right: 100px; // 让两个词稍微错开一点
          }

          .drive {
            display: block; // 让 Drive 在下面
            color: rgb(255, 181, 107);
            letter-spacing: 20px;
            margin-left: 100px; // 让两个词稍微错开一点
          }
        }

        .github-link {
          // margin-top: auto; // 让 GitHub 链接自动靠底部
          // padding-bottom: 100px; // 调整与底部的间距
          font-size: 20px;

          p {
            // margin-bottom: 10px;/
            font-size: 18px;
            font-weight: bold;
            color: #333;
          }

          a {
            // display: inline-block;
            margin: 5px;
            padding: 8px 15px;
            background-color: rgba(255, 255, 255, 0.3);
            color: #fcf3c0;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;

            &:hover {
              background: rgba(216, 216, 216, 0.7);
            }
          }
        }
      }
      .right-panel {
        background: linear-gradient(to right, #fff3d2, #ffdd80); // 现代化渐变背景
        width: 80vh;
        /* 设置为相对定位，作为 .login-form 绝对定位的参考 */
        // position: relative;
        .register-form {
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

          width: 400px;
          height: 520px;

          // 表单框位置
          position: relative;
          top: 140px;
          left: 150px;

          border-radius: 30px;

          .el-form {
            max-width: 320px;
            // 输入框位置
            position: relative;
            top: 100px;
            left: 20px;
            /* 标题 */
            .register-title {
              text-align: center;
              font-size: 22px;
              color: #575757;
              margin-bottom: 40px;
            }

            /* 按钮样式 */
            .submit-btn {
              width: 40%;
              background: #2c8cfa;
              color: white;
              &:hover {
                background: #0d47a1;
              }
            }

            .reset-btn {
              width: 40%;
              background: #bdbdbd;
              color: white;
              &:hover {
                background: #808080;
              }
            }

            .login-link-btn {
              width: 85%;
              background: #ffc68d;
              color: white;
              &:hover {
                background: #e65100;
              }
            }
            .login-link {
              // color: aqua;
              width: 130px;
              background-color: antiquewhite;
            }
          }
        }
      }
    }
  }
}

// 淡入淡出
.register-page {
  animation: fadeIn 0.4s ease-in-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .register-page {
    .common-layout {
      .el-container {
        flex-direction: column;
        .left-panel {
          width: 100%;
          // height: auto;
          flex: none;
        }
        .right-panel {
          width: 100%;
          // height: auto;
          // flex: none;
          .register-form {
            // width: 100%;
            // height: auto;
            position: static;
            border-radius: 0;
            padding: 10px;
            box-shadow: none;
            .el-form {
              // max-width: 100%;
              position: static;
              // left: 0;
              // top: 0;
              .register-title {
                // font-size: 20px;
              }
              .submit-btn,
              .reset-btn,
              .login-link-btn {
                // width: 100%;
                // margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .register-page .common-layout .el-container .left-panel .title {
    font-size: 40px;
  }
  .register-page .common-layout .el-container .left-panel .github-link {
    font-size: 14px;
  }
  .register-page .common-layout .el-container .right-panel .register-form {
    padding: 10px;
  }
}
</style>
<style lang="less">
/* 自定义 el-tooltip 的样式 */
.el-popper.is-customized {
  background: #67c23a; /* 绿色背景 */
  color: #fff; /* 白色文字 */
  border: 1px solid #67c23a; /* 绿色边框 */
  padding: 8px 12px; /* 内边距 */
  border-radius: 4px; /* 圆角 */
}

/* 自定义箭头的样式 */
.el-popper.is-customized .el-popper__arrow::before {
  background: #67c23a; /* 箭头背景颜色 */
  border: 1px solid #67c23a; /* 箭头边框颜色 */
}
</style>
