<template>
  <div class="other-share">
    外部分享
    <el-button type="primary" @click="goToShareLink">使用分享码</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

// 获取路由实例
const router = useRouter()

// 跳转到 /sharelink
const goToShareLink = () => {
  router.push('/sharelink')
}
</script>

<style lang="less" scoped></style>
