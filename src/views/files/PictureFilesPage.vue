<template>
  <div>
    <div class="common-layout">
      <LeftFile />
      <div class="all-files">这里是图片文件</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LeftFile from '@/components/LeftFile.vue'
</script>

<style lang="less" scoped>
.common-layout {
  display: flex;
  height: 76vh;

  .all-files {
    background-color: rosybrown;
    height: 100%;
  }
}
</style>
