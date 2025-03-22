export const previewFile = () => {
  const fileUrl = 'http://your-domain.com/file' // 文件下载 URL
  const kkFileViewUrl = 'http://kkfileview-domain.com/onlinePreview' // kkFileView 预览地址
  const previewUrl = kkFileViewUrl + '?url=' + encodeURIComponent(Base64.encode(fileUrl))
  window.open(previewUrl)
}
