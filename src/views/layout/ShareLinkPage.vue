<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-header>
          <h3>分享链接</h3>
        </el-header>
        <el-container>
          <!-- <el-aside> </el-aside> -->
          <el-container>
            <el-main>
              <div class="share-imput" v-show="!extractSuccess">
                <el-form :model="shareForm" style="width: 400px">
                  <el-form-item label="分享码">
                    <el-input v-model="shareForm.shareStr" placeholder="请输入 分享码"></el-input>
                  </el-form-item>
                  <el-form-item label="提取码">
                    <el-input v-model="shareForm.extractCode" placeholder="请输入 提取码">
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="handleShareLink">确认</el-button>
                  </el-form-item>
                </el-form>
              </div>

              <div v-show="extractSuccess">
                <el-button type="primary" @click="saveSelectedFiles()">转存选中文件</el-button>
                <!-- 文件夹路径显示 -->
                <div class="folder-path">
                  <template v-for="(folder, index) in shareFolderPath" :key="folder.id">
                    <div
                      class="folder-item"
                      :class="{ 'last-item': index === shareFolderPath.length - 1 }"
                      @click="handleShareFolderPathClick(folder.id)"
                    >
                      {{ folder.name }}
                    </div>
                    <div class="separator" v-if="index < shareFolderPath.length - 1">></div>
                  </template>
                </div>

                <!-- @selection-change="handleSelectionChange" -->
                <el-table
                  :data="sharedFiles"
                  @row-click="handleShareRowClick"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column
                    prop="shareItemId"
                    label="分享条目ID"
                    width="90"
                  ></el-table-column>
                  <el-table-column prop="shareId" label="分享ID" width="80"></el-table-column>
                  <!-- <el-table-column prop="userId" label="用户ID" width="120"></el-table-column> -->
                  <!-- <el-table-column prop="itemId" label="用户条目ID" width="120"></el-table-column> -->
                  <el-table-column prop="itemName" label="文件名" width="180"></el-table-column>
                  <el-table-column prop="itemType" label="条目类型" width="90"></el-table-column>
                  <el-table-column prop="fileId" label="文件id" width="80"></el-table-column>
                  <el-table-column prop="fileSize" label="大小" width="80"></el-table-column>
                  <el-table-column prop="fileCover" label="封面" width="80"></el-table-column>
                  <el-table-column prop="fileExtension" label="扩展名" width="80"></el-table-column>
                  <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
                </el-table>
              </div>
            </el-main>
            <el-dialog
              class="user-folder"
              v-model="saveSelectedFilesDialogVisible"
              title="转存文件"
            >
              <div class="folder-path">
                <template v-for="(folder, index) in myFolderPath" :key="folder.id">
                  <div
                    class="folder-item"
                    :class="{ 'last-item': index === myFolderPath.length - 1 }"
                    @click="handleMyFolderPathClick(folder.id)"
                  >
                    {{ folder.name }}
                  </div>
                  <div class="separator" v-if="index < myFolderPath.length - 1">></div>
                </template>
              </div>
              <el-table :data="fileList">
                <!-- <el-table-column prop="itemId" label="Item ID" width="80" /> -->
                <el-table-column prop="itemName" label="文件名称" width="180" />
                <!-- <el-table-column prop="directoryLevel" label="文件层级" width="100" /> -->
                <el-table-column prop="itemType" label="类型" width="100">
                  <template #default="scope">
                    <span v-if="scope.row.itemType === 1" style="cursor: pointer; color: black">
                      文件
                    </span>
                    <span
                      v-else
                      @click="
                        handleMyFileClick(
                          scope.row.itemId,
                          scope.row.directoryLevel,
                          scope.row.itemName,
                        )
                      "
                      style="cursor: pointer; color: blue"
                    >
                      文件夹
                    </span>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="fileId" label="File ID" width="100" /> -->
                <!-- pId为什么不是驼峰了? -->
                <!-- <el-table-column prop="pid" label="父条目id" width="100" /> -->
                <el-table-column prop="fileSize" label="文件大小" width="100">
                  <template #default="scope">
                    <span v-if="scope.row.itemType === 1">
                      {{ formatSize(scope.row.fileSize) }}
                    </span>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="fileExtension" label="文件扩展名" width="100" /> -->

                <el-table-column label="文件修改时间" width="180">
                  <template #default="scope">
                    {{ formatUpdateTime(scope.row.updateTime) }}
                  </template>
                </el-table-column>
              </el-table>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="saveSelectedFilesDialogVisible = false">取消</el-button>
                  <el-button type="primary" @click="confirmSaveSelectedFilesBtn()">确认</el-button>
                </span>
              </template>
            </el-dialog>
            <el-footer>
              <!-- Footer -->
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getShareByShareCode } from '@/api/share'
import { useRoute, useRouter } from 'vue-router'
import { getSharedItems, getOtherSharedItems, saveSelectedItems } from '@/api/share'
// 用户的文件
import { useUserFilesStore } from '@/stores/userFiles'
import { getUserItems } from '@/api/userItems'
import { formatSize, formatUpdateTime } from '@/utils/fileInfoUtils'
import { ElNotification } from 'element-plus'
import type { Result } from '@/types/fileType'
import { ElMessage, ElMessageBox } from 'element-plus' // 导入 ElMessage

const userFilesStore = useUserFilesStore()

const route = useRoute()
const router = useRouter()

// 分享的文件
// const sharedFiles = ref([])
const sharedFiles = ref<any[]>([]) // 明确 sharedFiles 是 any[] 类型
// 显示提取/转存
const extractSuccess = ref(false)
// 当前分享id
const currentShareStr = ref<string>('')
// 分享的路径
const shareFolderPath = ref<{ id: number; name: string }[]>([])

// 定义表单数据
const shareForm = ref({
  shareStr: '',
  extractCode: '',
})

onMounted(() => {
  // 获取路径参数
  // const shareStr = route.query.shareStr // "rzrGR/ZTjLAZHOcZRnWuyw=="
  // const shareCode = route.query.shareCode as string // "1vea"

  const rawShareStr = (route.query.shareStr as string) || ''
  const shareCode = (route.query.shareCode as string) || ''

  console.log('原始参数:', rawShareStr, shareCode)

  // // 关键修复：先编码特殊字符，再解码
  // const decodedShareStr = decodeURIComponent(
  //   rawShareStr.replace(/\+/g, '%2B') // 先把+替换为%2B
  //     .replace(/\//g, '%2F')         // 可选：处理/字符
  //     .replace(/=/g, '%3D')          // 可选：处理=字符
  // )

  console.log('路径参数:', route.query.shareStr, shareCode)
  const decodedShareStr = rawShareStr ? decodeURIComponent(rawShareStr) : ''
  shareForm.value = {
    shareStr: decodedShareStr,
    extractCode: shareCode,
  }
})

// 处理分享链接的函数
const handleShareLink = async () => {
  const { shareStr, extractCode } = shareForm.value
  console.log('Share ID:', shareStr)
  console.log('提取码:', extractCode)
  // 在这里调用处理函数
  const tempShareStr = shareStr === null ? '' : shareStr
  const res = (await getShareByShareCode(tempShareStr, extractCode)) as unknown as Result
  if (res.code === 1) {
    // as unknown
    sharedFiles.value = res.data as unknown as Array<any>
    extractSuccess.value = true
    currentShareStr.value = shareStr // 存储当前的 shareId
    shareFolderPath.value = [{ id: 0, name: '根目录' }] // 初始化路径
  } else {
    ElNotification({
      title: '分享链接提取错误',
      message: res.msg,
      type: 'error',
    })
  }
}

// 加载文件夹内容
const loadShareFolderContent = async (shareStr: string, pItemId: number | null) => {
  const res = await getOtherSharedItems(shareStr, pItemId)
  sharedFiles.value = res.data
}

const handleShareRowClick = async (row: any) => {
  if (row.itemType === 0) {
    // 如果是文件夹，则添加到路径中
    shareFolderPath.value.push({ id: row.shareItemId, name: row.itemName })
    // 加载该文件夹的内容
    // await loadShareFolderContent(row.shareStr, row.shareItemId)
    await loadShareFolderContent(currentShareStr.value, row.shareItemId)
    // const res = await getSharedItems(row.shareId, row.shareItemId)
    // sharedFiles.value = res.data
  }
  if (row.itemType === 1) {
    // TODO: 预览文件
  }
}

// 点击路径中的文件夹
const handleShareFolderPathClick = async (pItemId: number) => {
  const index = shareFolderPath.value.findIndex((folder) => folder.id === pItemId)
  if (index !== -1) {
    // 截断路径到点击的文件夹
    shareFolderPath.value = shareFolderPath.value.slice(0, index + 1)
    // 加载该文件夹的内容
    // const shareId = route.params.shareId as number
    // await loadShareFolderContent(shareId, pItemId)
    // 加载该文件夹的内容
    if (currentShareStr.value !== null) {
      await loadShareFolderContent(currentShareStr.value, pItemId)
    }
  }
}

// 选中分享条目
const selectedItemIds = ref<number[]>([])
const handleSelectionChange = (selection: any[]) => {
  selectedItemIds.value = selection.map((item) => item.shareItemId)
}

const saveSelectedFilesDialogVisible = ref(false)

// 转存选中的文件
const saveSelectedFiles = () => {
  if (selectedItemIds.value.length === 0) {
    ElMessage.warning('未选择任何要转存的文件')
    return
  }

  saveSelectedFilesDialogVisible.value = true
  loadMyFolderPath()
}

// ============================转存路径选择器========================
// 转存路径
// const fileList = ref([])
const fileList = ref<any[]>([]) // 明确类型为 any[]

const myFolderPath = ref<{ id: number; name: string }[]>([])

const loadMyFolderPath = async () => {
  const res = (await getUserItems(0)) as unknown as Result
  if (res.code === 1) {
    // userFilesStore.userFilePath.push({
    //   id: 0,
    //   name: '根目录',
    //   directoryLevel: 0,
    // })
    // fileList.value = res.data
    fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    myFolderPath.value = [{ id: 0, name: '根目录' }]
  } else {
    console.error('Failed to fetch user items:', res.msg)
  }
}
const handleMyFileClick = async (itemPId: number, directoryLevel: number, itemName: string) => {
  console.log('Clicked on itemPId:', itemPId)
  try {
    const res = (await getUserItems(itemPId)) as unknown as Result
    if (res.code === 1) {
      // userFilesStore.userFilePath.push({
      //   id: itemPId,
      //   directoryLevel: directoryLevel + 1,
      //   name: itemName,
      // })
      myFolderPath.value.push({ id: itemPId, name: itemName })
      // fileList.value = res.data as any[]
      // 文件夹在前 文件在后
      fileList.value = (res.data as unknown as Array<any>).sort((a, b) => a.itemType - b.itemType)
    } else {
      console.error('Failed to fetch user items:', res.msg)
    }
  } catch (error) {
    console.error('Error fetching user items:', error)
  }
}

// 点击路径中的文件夹
const handleMyFolderPathClick = async (pItemId: number) => {
  const index = myFolderPath.value.findIndex((folder) => folder.id === pItemId)
  if (index !== -1) {
    // 截断路径到点击的文件夹
    myFolderPath.value = myFolderPath.value.slice(0, index + 1)
    // 加载该文件夹的内容
    // const shareId = route.params.shareId as number
    const res = await getUserItems(pItemId)
    fileList.value = res.data
  }
}

// 执行转存
const confirmSaveSelectedFilesBtn = async () => {
  // 要转存的文件夹id
  const saveToFolder = myFolderPath.value[myFolderPath.value.length - 1]
  console.log('confirmSaveSelectedFilesBtn', saveToFolder.id)
  console.log('保存的条目数组', selectedItemIds.value)
  const res = await saveSelectedItems(
    shareForm.value.shareStr,
    shareForm.value.extractCode,
    saveToFolder.id,
    selectedItemIds.value,
  )
}
</script>

<style lang="less" scoped>
.common-layout {
  .el-container {
    background-color: #0f5757;
    .el-header {
      // background-color: #f5ff67;
      // background: linear-gradient(to right, #ffdfa2, #fff59e);
      background: linear-gradient(to bottom, #f8ff7d, #d7eeff);

      text-align: center;
      min-height: 8vh;
    }
    .el-container {
      .el-aside {
        width: 120px;
      }
    }
    .el-main {
      // background-color: #6bb5ff;
      background: linear-gradient(to bottom, #d7eeff, #8dcbff);
      // text-align: center;
      min-height: 82vh;
      .share-imput {
        margin: 0 auto;
        width: 900px;
        height: 180px;
        // background-color: #b6ffa7;
        background: linear-gradient(to bottom, #d7eeff, #c9ffbe, #c7e7ff);
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .user-folder {
      width: 600px;
      height: 400px;
    }
    .el-footer {
      // background-color: #b6ffa7;
      background: linear-gradient(to bottom, #8dcbff, #1fffa2);

      text-align: center;
      min-height: 8vh;
    }
  }
}

.folder-path {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 16px;

  .folder-item {
    color: #409eff;
    cursor: pointer;
    margin: 0 4px;

    &:hover {
      // text-decoration: underline;
      color: rgb(39, 223, 255);
    }

    &.last-item {
      font-weight: bold; // 最后一个元素加粗
      color: #000; // 最后一个元素颜色改为黑色
    }
    &.last-item:hover {
      font-weight: bold; // 最后一个元素加粗
      color: #4530fc; // 最后一个元素颜色改为黑色
    }
  }

  .separator {
    margin: 0 4px;
    color: #999;
  }
}
</style>
