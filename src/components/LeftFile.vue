<template>
  <div class="left-file-tab">
    <!-- 文件分类菜单已移除 -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style lang="less" scoped>
.left-file-tab {
  display: none;
}
</style>
