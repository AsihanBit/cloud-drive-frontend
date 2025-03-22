<template>
  <div class="my-share">
    我的分享
    <!-- <el-button type="primary" @click="resetExpireTime()">重置有效期(未完成)</el-button> -->
    <el-button type="primary" @click="delShare()">删除选中分享</el-button>
    <el-button type="primary" @click="removeExpired()">移除失效分享(未完成)</el-button>

    <el-table
      :data="sharedItemsStore.userSharedItems"
      @row-click="handleRowClick"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="shareId" label="分享ID" width="90"></el-table-column>
      <el-table-column prop="shareCode" label="提取码" width="80"></el-table-column>
      <el-table-column prop="username" label="分享用户" width="120"></el-table-column>
      <el-table-column prop="nickname" label="昵称" width="120"></el-table-column>
      <el-table-column prop="expireType" label="有效期" width="70"></el-table-column>
      <el-table-column prop="expireTime" label="过期时间" width="160"></el-table-column>
      <el-table-column prop="accessCount" label="访问数量" width="100"></el-table-column>
      <el-table-column prop="accessLimit" label="访问限制" width="100"></el-table-column>
      <el-table-column prop="shareStatus" label="分享状态" width="80"></el-table-column>
      <el-table-column prop="createTime" label="分享时间" width="180"></el-table-column>
      <!-- 放置按钮 -->
      <el-table-column label="操作" width="220">
        <template #default="scope">
          <!-- 创建分享链接 -->
          <el-button type="primary" @click="resetExpireBtn(scope.row.shareId, $event)">
            分享链接
          </el-button>
          <!-- 重置有效期按钮 -->
          <el-button type="primary" @click="resetExpireBtn(scope.row.shareId, $event)">
            重置期限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 - 重置有效期 -->
    <el-dialog v-model="resetExpireDialogVisible" title="重置有效期">
      <el-form :model="shareForm">
        <el-form-item label="过期时间" label-width="120px">
          <el-select v-model="shareForm.expireType" placeholder="请选择过期时间">
            <el-option label="1天" value="0" />
            <el-option label="7天" value="1" />
            <el-option label="30天" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问次数限制" label-width="120px">
          <el-input-number
            v-model="shareForm.accessLimit"
            :min="1"
            placeholder="请输入访问次数限制"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="shareDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmResetExpireBtn()">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getUserSharedItems } from '@/api/userItems'
import { ref, onMounted } from 'vue'
import { useSharedItemsStore } from '@/stores/sharedItems'
import { deleteSharedItems, resetShareExpire } from '@/api/share'
import { useRouter } from 'vue-router'
const sharedItemsStore = useSharedItemsStore()
const router = useRouter()

onMounted(async () => {
  sharedItemsStore.getAllSharedItems()
})

// 选中分享条目
const selectedItemIds = ref<number[]>([])
const handleSelectionChange = (selection: any[]) => {
  selectedItemIds.value = selection.map((item) => item.shareId)
}

// 删除分享
const delShare = async () => {
  if (selectedItemIds.value.length === 0) {
    return ElMessage.warning('请选择要删除的分享')
  }
  const res = await deleteSharedItems(selectedItemIds.value)
  // 刷新
  sharedItemsStore.getAllSharedItems()
}

const handleRowClick = async (row: any) => {
  // 跳转到 /share/myshare/:shareId
  router.push({ path: `/share/myshare/${row.shareId}` })
}

const expireType = ref(1) // 示例有效期类型
const accessLimit = ref(10) // 示例访问次数限制
const resetExpireDialogVisible = ref(false)

const shareForm = ref({
  expireType: '',
  accessLimit: null as number | null,
})

const selectedShareId = ref<number | null>(null)
const resetExpireBtn = (shareId: number, event: Event) => {
  event.stopPropagation() // 阻止事件冒泡
  selectedShareId.value = shareId

  // 简单页面回显
  // 找到对应的分享项
  const selectedShareItem = sharedItemsStore.userSharedItems.find(
    (item) => item.shareId === shareId,
  )

  if (selectedShareItem) {
    shareForm.value.expireType = selectedShareItem.expireType.toString()
    shareForm.value.accessLimit = selectedShareItem.accessLimit
  } else {
    console.error('Selected share item not found')
  }

  // 显示弹出框
  resetExpireDialogVisible.value = true
}

const confirmResetExpireBtn = async () => {
  const expireTypeValue = parseInt(shareForm.value.expireType, 10)
  const accessLimitValue = shareForm.value.accessLimit !== null ? shareForm.value.accessLimit : 100

  console.log(expireTypeValue, accessLimitValue, selectedShareId.value)
  await resetShareExpire(selectedShareId.value, expireTypeValue, accessLimitValue)
  resetExpireDialogVisible.value = false

  // 刷新页面
  sharedItemsStore.getAllSharedItems()
}

const createShareLink = () => {}
</script>
<style lang="less" scoped></style>
