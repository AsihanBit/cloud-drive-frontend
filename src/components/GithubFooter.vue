<template>
  <div class="github">
    <p>Github 项目介绍</p>
    <a href="https://github.com/AsihanBit/cloud-drive-frontend" target="_blank">前端</a>
    <a href="https://github.com/AsihanBit/cloud-drive-backend" target="_blank">后端</a>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.github {
  // background-color: #b6ffa7;
  // background: linear-gradient(to bottom, #8dcbff, #1fffa2);

  // text-align: center;
  // height: 10vh;
  a {
    display: inline-block;
    // margin: 5px;
    padding: 1px 9px;
    // background-color: #007bff;
    color: rgb(145, 0, 212);
    text-decoration: none;
    border-radius: 4px;
    // transition: background-color 0.3s ease;

    &:hover {
      background-color: #ffa844;
    }
  }
}
</style>
