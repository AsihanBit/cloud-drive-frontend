<template>
  <div>
    <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" /> -->
    <h4>加载等待页面-暂未启用</h4>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const previewUrl = route.query.previewUrl as string
  if (previewUrl) {
    // window.location.href = previewUrl
    window.open(new URL(previewUrl)) // 打开预览页面
  } else {
    console.error('预览URL未找到')
    // router.push('/')
  }
})
</script>

<style lang="less" scoped>
/* 添加一些样式 */
</style>
