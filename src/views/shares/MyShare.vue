<template>
  <div class="my-share-container">
    <!-- 页面头部操作栏 -->
    <div class="share-header">
      <div class="header-left">
        <h2 class="page-title">
          <el-icon class="title-icon"><Share /></el-icon>
          我的分享
        </h2>
        <p class="page-subtitle">管理您创建的所有分享链接</p>
      </div>
      <div class="header-right">
        <div class="action-buttons">
          <el-button type="primary" @click="showUseShareCodeDialog = true" class="use-code-btn">
            <el-icon><Key /></el-icon>
            使用分享码
          </el-button>
          <el-button type="danger" @click="delShare()" class="delete-btn">
            <el-icon><Delete /></el-icon>
            删除选中
          </el-button>
        </div>
      </div>
    </div>

    <!-- 分享列表 -->
    <div class="share-table-container">
      <el-table
        :data="sharedItemsStore.userSharedItems"
        @row-click="handleRowClick"
        @selection-change="handleSelectionChange"
        class="modern-table"
        stripe
        empty-text="暂无分享记录"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="shareId" label="分享ID" width="100">
          <template #default="scope">
            <el-tag type="info" effect="light" class="share-id-tag">
              #{{ scope.row.shareId }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="shareCode" label="提取码" width="100">
          <template #default="scope">
            <el-tag type="success" effect="light" class="share-code-tag">
              {{ scope.row.shareCode }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="分享用户" width="120" />
        <el-table-column prop="nickname" label="昵称" width="120" />
        <el-table-column prop="expireType" label="有效期" width="100">
          <template #default="scope">
            <el-tag 
              :type="getExpireTypeColor(scope.row.expireType)" 
              effect="light"
              class="expire-tag"
            >
              {{ getExpireTypeText(scope.row.expireType) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="expireTime" label="过期时间" width="150">
          <template #default="scope">
            <div class="expire-time">
              <el-icon class="time-icon"><Clock /></el-icon>
              <span>{{ formatDateTime(scope.row.expireTime) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="accessCount" label="访问次数" width="110">
          <template #default="scope">
            <div class="access-info">
              <span class="access-count">{{ scope.row.accessCount }}</span>
              <span class="access-separator">/</span>
              <span class="access-limit">{{ scope.row.accessLimit }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="shareStatus" label="状态" width="100">
          <template #default="scope">
            <el-tag 
              :type="scope.row.shareStatus === 1 ? 'success' : 'danger'" 
              effect="light"
              class="status-tag"
            >
              {{ scope.row.shareStatus === 1 ? '正常' : '已禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
          <template #default="scope">
            <div class="create-time">
              <el-icon class="time-icon"><Calendar /></el-icon>
              <span>{{ formatDateTime(scope.row.createTime) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" fixed="right">
          <template #default="scope">
            <div class="action-buttons-cell">
              <el-button 
                type="primary" 
                size="small"
                @click="createShareLink(scope.row.shareId, $event)"
                class="action-btn"
              >
                <el-icon><Link /></el-icon>
                获取链接
              </el-button>
              <el-button 
                type="warning" 
                size="small"
                @click="resetExpireBtn(scope.row.shareId, $event)"
                class="action-btn"
              >
                <el-icon><Refresh /></el-icon>
                重置期限
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 使用分享码对话框 -->
    <el-dialog v-model="showUseShareCodeDialog" title="使用分享码" class="use-share-dialog" width="500px">
      <template #header>
        <div class="dialog-header">
          <el-icon class="dialog-icon"><Key /></el-icon>
          <span class="dialog-title">使用分享码</span>
        </div>
      </template>
      
      <el-form :model="shareCodeForm" class="share-code-form" label-width="80px">
        <el-form-item label="分享链接">
          <el-input 
            v-model="shareCodeForm.shareLink" 
            placeholder="请输入分享链接"
            class="input-with-icon"
          >
            <template #prefix>
              <el-icon><Link /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="提取码">
          <el-input 
            v-model="shareCodeForm.shareCode" 
            placeholder="请输入提取码"
            class="input-with-icon"
          >
            <template #prefix>
              <el-icon><Key /></el-icon>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showUseShareCodeDialog = false" class="cancel-btn">取消</el-button>
          <el-button type="primary" @click="useShareCode" class="confirm-btn">
            <el-icon><Check /></el-icon>
            确认使用
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 重置有效期对话框 -->
    <el-dialog v-model="resetExpireDialogVisible" title="重置有效期" class="reset-expire-dialog" width="500px">
      <template #header>
        <div class="dialog-header">
          <el-icon class="dialog-icon"><Refresh /></el-icon>
          <span class="dialog-title">重置有效期</span>
        </div>
      </template>
      
      <el-form :model="shareForm" class="reset-form" label-width="120px">
        <el-form-item label="过期时间">
          <el-select v-model="shareForm.expireType" placeholder="请选择过期时间" class="full-width">
            <el-option label="1天" value="0" />
            <el-option label="7天" value="1" />
            <el-option label="30天" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="访问次数限制">
          <el-input-number
            v-model="shareForm.accessLimit"
            :min="1"
            placeholder="请输入访问次数限制"
            class="full-width"
          />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="resetExpireDialogVisible = false" class="cancel-btn">取消</el-button>
          <el-button type="primary" @click="confirmResetExpireBtn" class="confirm-btn">
            <el-icon><Check /></el-icon>
            确认重置
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 分享成功对话框 -->
    <el-dialog v-model="shareSuccessDialogVisible" title="分享成功" class="share-success-dialog" width="600px">
      <template #header>
        <div class="dialog-header">
          <el-icon class="dialog-icon success-icon"><SuccessFilled /></el-icon>
          <span class="dialog-title">分享成功</span>
        </div>
      </template>
      
      <div class="share-success-content">
        <div class="share-info-card">
          <div class="info-item">
            <label class="info-label">分享链接</label>
            <div class="info-value-container">
              <el-input v-model="shareSuccessData.shareLink" readonly class="share-input">
                <template #prefix>
                  <el-icon><Link /></el-icon>
                </template>
              </el-input>
              <el-button @click="copyToClipboard(shareSuccessData.shareLink)" class="copy-btn">
                <el-icon><CopyDocument /></el-icon>
              </el-button>
            </div>
          </div>
          <div class="info-item">
            <label class="info-label">提取码</label>
            <div class="info-value-container">
              <el-input v-model="shareSuccessData.shareCode" readonly class="share-input">
                <template #prefix>
                  <el-icon><Key /></el-icon>
                </template>
              </el-input>
              <el-button @click="copyToClipboard(shareSuccessData.shareCode)" class="copy-btn">
                <el-icon><CopyDocument /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
        
        <div class="share-tips">
          <el-icon class="tip-icon"><InfoFilled /></el-icon>
          <span class="tip-text">请将分享链接和提取码一起发送给需要的人员</span>
        </div>
      </div>
      
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="shareSuccessDialogVisible = false" class="cancel-btn">关闭</el-button>
          <el-button type="primary" @click="copyShareLink" class="confirm-btn">
            <el-icon><CopyDocument /></el-icon>
            复制完整信息
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { getUserSharedItems } from '@/api/userItems'
import { ref, onMounted } from 'vue'
import { useSharedItemsStore } from '@/stores/sharedItems'
import { deleteSharedItems, resetShareExpire, getShareLink } from '@/api/share'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { 
  Share, 
  Key, 
  Delete, 
  Clock, 
  Calendar, 
  Link, 
  Refresh, 
  Check, 
  SuccessFilled, 
  InfoFilled, 
  CopyDocument 
} from '@element-plus/icons-vue'

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

const resetExpireDialogVisible = ref(false)
const shareForm = ref({
  expireType: '',
  accessLimit: null as number | null,
})

const selectedShareId = ref<number>(0)
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

const createShareLink = async (shareId: number, event: Event) => {
  event.stopPropagation() // 阻止事件冒泡
  const res = await getShareLink(shareId) as any
  console.log(res)
  if (res.data && res.code === 1) {
    handleShareSuccess(res.data.shareStr, res.data.shareCode, res.data.shareLink)
  } else {
    ElMessage.error(res.data?.msg || '获取分享链接失败')
  }
}

// 分享成功弹出框
const shareSuccessDialogVisible = ref(false)
const shareSuccessData = ref({
  shareStr: '',
  shareCode: '',
  shareLink: '',
})

const handleShareSuccess = async (shareStr: string, shareCode: string, shareLink: string) => {
  shareSuccessDialogVisible.value = true
  shareSuccessData.value.shareStr = shareStr
  shareSuccessData.value.shareCode = shareCode
  shareSuccessData.value.shareLink = shareLink
}

// 复制分享链接
const copyShareLink = async () => {
  try {
    const fullText = `分享链接: ${shareSuccessData.value.shareLink}\n提取码: ${shareSuccessData.value.shareCode}`
    await navigator.clipboard.writeText(fullText)
    ElMessage.success('分享信息已复制到剪贴板')
  } catch (err) {
    console.error('无法复制到剪贴板:', err)
    ElMessage.error('无法复制分享信息')
  }
}

// 使用分享码相关
const showUseShareCodeDialog = ref(false)
const shareCodeForm = ref({
  shareLink: '',
  shareCode: '',
})

const useShareCode = () => {
  if (!shareCodeForm.value.shareLink || !shareCodeForm.value.shareCode) {
    ElMessage.warning('请输入分享链接和提取码')
    return
  }
  
  // 从分享链接中提取shareId
  const shareIdMatch = shareCodeForm.value.shareLink.match(/\/sharelink\/(\d+)/)
  if (shareIdMatch) {
    const shareId = shareIdMatch[1]
    // 跳转到分享链接页面
    router.push(`/sharelink/${shareId}`)
    showUseShareCodeDialog.value = false
    shareCodeForm.value = { shareLink: '', shareCode: '' }
  } else {
    ElMessage.error('无效的分享链接格式')
  }
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制到剪贴板')
  } catch (err) {
    console.error('无法复制到剪贴板:', err)
    ElMessage.error('复制失败')
  }
}

const getExpireTypeColor = (expireType: number) => {
  switch (expireType) {
    case 0:
      return 'warning' // 1天
    case 1:
      return 'success' // 7天
    case 2:
      return 'info' // 30天
    default:
      return 'info'
  }
}

const getExpireTypeText = (expireType: number) => {
  switch (expireType) {
    case 0:
      return '1天'
    case 1:
      return '7天'
    case 2:
      return '30天'
    default:
      return '未知'
  }
}

const formatDateTime = (dateTimeData: any) => {
  if (!dateTimeData) return '无'
  
  // 处理数组格式的时间数据
  if (Array.isArray(dateTimeData) && dateTimeData.length >= 6) {
    const [year, month, day, hour, minute, second] = dateTimeData
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
  }
  
  // 处理字符串格式的时间数据
  if (typeof dateTimeData === 'string') {
    return dateTimeData
  }
  
  return '无'
}
</script>
<style lang="less" scoped>
.my-share-container {
  padding: 0;
  
  .share-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding: 24px 0;
    border-bottom: 1px solid #e5e7eb;
    
    .header-left {
      .page-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 28px;
        font-weight: 700;
        color: #1a1a1a;
        margin: 0 0 8px 0;
        
        .title-icon {
          color: #667eea;
          font-size: 32px;
        }
      }
      
      .page-subtitle {
        color: #6b7280;
        font-size: 16px;
        margin: 0;
        font-weight: 400;
      }
    }
    
    .header-right {
      .action-buttons {
        display: flex;
        gap: 12px;
        
        .use-code-btn, .delete-btn {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
          }
        }
        
        .use-code-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
        }
        
        .delete-btn {
          background: linear-gradient(135deg, #f56565 0%, #dc2626 100%);
          border: none;
        }
      }
    }
  }
  
  .share-table-container {
    .modern-table {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
      border: 1px solid #e5e7eb;
      
      :deep(.el-table__header) {
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        
        th {
          background: transparent;
          border-bottom: 2px solid #e5e7eb;
          color: #374151;
          font-weight: 700;
          font-size: 14px;
          padding: 16px 12px;
        }
      }
      
      :deep(.el-table__body) {
        tr {
          transition: all 0.3s ease;
          cursor: pointer;
          
          &:hover {
            background: #f8fafc;
          }
          
          td {
            padding: 16px 12px;
            border-bottom: 1px solid #f3f4f6;
          }
        }
      }
      
      .share-id-tag, .share-code-tag, .expire-tag, .status-tag {
        font-weight: 600;
        padding: 4px 12px;
        border-radius: 8px;
      }
      
      .expire-time, .create-time {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .time-icon {
          font-size: 14px;
          color: #6b7280;
        }
      }
      
      .access-info {
        .access-count {
          color: #1a1a1a;
          font-weight: 600;
        }
        
        .access-separator {
          color: #6b7280;
          margin: 0 4px;
        }
        
        .access-limit {
          color: #6b7280;
        }
      }
      
      .action-buttons-cell {
        display: flex;
        gap: 8px;
        
        .action-btn {
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          transition: all 0.3s ease;
          
          &:hover {
            transform: translateY(-1px);
          }
          
          &.el-button--primary {
            &:hover {
              box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
            }
          }
          
          &.el-button--warning {
            &:hover {
              box-shadow: 0 4px 12px rgba(230, 162, 60, 0.3);
            }
          }
        }
      }
    }
  }
}

// 对话框样式
:deep(.use-share-dialog), 
:deep(.reset-expire-dialog), 
:deep(.share-success-dialog) {
  border-radius: 20px;
  overflow: hidden;
  
  .el-dialog__header {
    padding: 24px 24px 0;
    border-bottom: none;
    
    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .dialog-icon {
        font-size: 24px;
        
        &.success-icon {
          color: #67c23a;
        }
      }
      
      .dialog-title {
        font-size: 20px;
        font-weight: 600;
        color: #1a1a1a;
      }
    }
  }
  
  .el-dialog__body {
    padding: 24px;
    
    .share-code-form, .reset-form {
      .el-form-item {
        margin-bottom: 24px;
        
        :deep(.el-form-item__label) {
          font-weight: 600;
          color: #374151;
        }
        
        .input-with-icon, .full-width {
          width: 100%;
          
          :deep(.el-input__wrapper) {
            border-radius: 12px;
            border: 2px solid #e5e7eb;
            transition: all 0.3s ease;
            
            &:hover {
              border-color: #d1d5db;
            }
            
            &.is-focus {
              border-color: #667eea;
              box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
            }
          }
        }
      }
    }
    
    .share-success-content {
      .share-info-card {
        background: #f8fafc;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 20px;
        
        .info-item {
          margin-bottom: 20px;
          
          &:last-child {
            margin-bottom: 0;
          }
          
          .info-label {
            display: block;
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-size: 14px;
          }
          
          .info-value-container {
            display: flex;
            gap: 12px;
            
            .share-input {
              flex: 1;
              
              :deep(.el-input__wrapper) {
                border-radius: 12px;
                background: #ffffff;
                border: 1px solid #e5e7eb;
              }
            }
            
            .copy-btn {
              padding: 12px;
              border-radius: 12px;
              background: #667eea;
              border: none;
              color: white;
              transition: all 0.3s ease;
              
              &:hover {
                background: #5a67d8;
                transform: scale(1.05);
              }
            }
          }
        }
      }
      
      .share-tips {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 16px;
        background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
        border-radius: 12px;
        
        .tip-icon {
          color: #0284c7;
          font-size: 16px;
        }
        
        .tip-text {
          color: #0369a1;
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
  }
  
  .el-dialog__footer {
    padding: 0 24px 24px;
    
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      
      .cancel-btn {
        padding: 12px 24px;
        border-radius: 12px;
        color: #6b7280;
        border: 2px solid #e5e7eb;
        background: #ffffff;
        
        &:hover {
          color: #374151;
          border-color: #d1d5db;
          background: #f9fafb;
        }
      }
      
      .confirm-btn {
        padding: 12px 24px;
        border-radius: 12px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        font-weight: 600;
        
        &:hover {
          background: linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .my-share-container {
    .share-header {
      flex-direction: column;
      gap: 16px;
      text-align: center;
      
      .header-right {
        .action-buttons {
          justify-content: center;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .my-share-container {
    .share-header {
      padding: 16px 0;
      margin-bottom: 24px;
      
      .header-left {
        .page-title {
          font-size: 24px;
          
          .title-icon {
            font-size: 28px;
          }
        }
        
        .page-subtitle {
          font-size: 14px;
        }
      }
      
      .header-right {
        .action-buttons {
          width: 100%;
          
          .use-code-btn, .delete-btn {
            flex: 1;
            padding: 12px 16px;
          }
        }
      }
    }
    
    .share-table-container {
      .modern-table {
        :deep(.el-table__header) {
          th {
            padding: 12px 8px;
            font-size: 12px;
          }
        }
        
        :deep(.el-table__body) {
          td {
            padding: 12px 8px;
          }
        }
        
        .action-buttons-cell {
          flex-direction: column;
          gap: 4px;
          
          .action-btn {
            width: 100%;
            padding: 8px 12px;
          }
        }
      }
    }
  }
}
</style>
