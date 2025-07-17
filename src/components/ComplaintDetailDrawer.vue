<template>
  <el-drawer
    :model-value="visible"
    @update:model-value="handleVisibleChange"
    :title="title"
    size="80%"
    :before-close="handleBeforeClose"
    class="complaint-drawer"
  >
    <div class="complaint-detail">
      <!-- 基本信息 -->
      <div class="section">
        <h3 class="section-title">基本信息</h3>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">投诉单号：</label>
              <span>{{ complaintDetailData.complaintNo || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">销售客户：</label>
              <span>{{ complaintDetailData.salesCustomer || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">联系方式：</label>
              <span>{{ complaintDetailData.contact || '-' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">产品名称：</label>
              <span>{{ complaintDetailData.productName || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">销售日期：</label>
              <span>{{ complaintDetailData.salesDate || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">供货工厂：</label>
              <span>{{ complaintDetailData.factory || '-' }}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">问题程度：</label>
              <span>{{ complaintDetailData.severityLevel || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">投诉时间：</label>
              <span>{{ complaintDetailData.complaintTime || '-' }}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="info-item">
              <label class="info-label">投诉类型：</label>
              <span>{{ complaintDetailData.complaintType || '-' }}</span>
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 问题描述与诉求 -->
      <div class="section">
        <h3 class="section-title">问题描述与诉求</h3>
        <div class="problem-description">
          {{ complaintDetailData.problemDesc || '-' }}
        </div>
      </div>

      <!-- 用户反馈照片 -->
      <div class="section">
        <h3 class="section-title">用户反馈照片</h3>
        <div class="photo-grid">
          <!-- 展示图片 -->
          <div class="photo-item" v-for="(url, i) in photoBlobUrls" :key="i">
            <div class="photo-placeholder" @click="handlePhotoPreview(url, i)">
              <img v-if="url" :src="url" class="photo-img" />
              <el-icon v-else><Close /></el-icon>
            </div>
          </div>
        </div>
        <!-- 图片预览对话框 -->
        <el-dialog v-model="photoPreviewVisible" width="40vw" :show-close="true" center>
          <img v-if="previewPhotoUrl" :src="previewPhotoUrl" style="width:100%" />
        </el-dialog>
      </div>

      <!-- 追溯信息按钮 -->
      <div class="section">
        <h3 class="section-title">追溯信息</h3>
        <el-row :gutter="20">
          <!-- 左侧列 -->
          <el-col :span="12">
            <!-- 订单信息 -->
            <div class="info-section">
              <h4 class="subsection-title">订单信息</h4>
              <div class="info-item">
                <label class="info-label">订单号：</label>
                <span>{{ complaintDetailData.settlementNo || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">销售客户：</label>
                <span>{{ complaintDetailData.salesCustomer || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">价格：</label>
                <span class="price">¥{{ complaintDetailData.price || '0.00' }}</span>
              </div>
            </div>
            <!-- 生产加工信息 -->
            <div class="info-section">
              <h4 class="subsection-title">生产加工信息</h4>
              <div class="info-item">
                <label class="info-label">条形码：</label>
                <span>{{ complaintDetailData.barcode || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">加工车间：</label>
                <span>{{ complaintDetailData.processingPlant || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">生产时间：</label>
                <span>{{ complaintDetailData.productionTime || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">称重操作：</label>
                <span>{{ complaintDetailData.weighter || '-' }}</span>
              </div>
            </div>
          </el-col>
          <!-- 右侧列 -->
          <el-col :span="12">
            <!-- 仓储物流信息 -->
            <div class="info-section">
              <h4 class="subsection-title">仓储物流信息</h4>
              <div class="info-item">
                <label class="info-label">运输车辆：</label>
                <span>{{ complaintDetailData.transportVehicle || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">司机：</label>
                <span>{{ complaintDetailData.driver || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">发货员：</label>
                <span>{{ complaintDetailData.shipper || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">发货时间：</label>
                <span>{{ complaintDetailData.shipmentTime || '-' }}</span>
              </div>
            </div>
            <!-- 供应链信息 -->
            <div class="info-section">
              <h4 class="subsection-title">供应链信息</h4>
              <div class="info-item">
                <label class="info-label">供应商：</label>
                <span>{{ complaintDetailData.supplier || '-' }}</span>
              </div>
              <div class="info-item">
                <label class="info-label">养户信息：</label>
                <span>{{ complaintDetailData.farmerInfo || '-' }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 底部固定操作栏 -->
    <div class="bottom-action-bar" v-if="title == '处理工单'">
      <div class="action-content">
        <div class="action-left">
          <el-select
            v-model="processingStatus"
            placeholder="请选择处理状态"
            class="status-select"
          >
            <!-- 1:处理中 2:同意退货 3:不同意退货 -->
            <el-option label="处理中" value="1" />
            <el-option label="同意退货" value="2" />
            <el-option label="不同意退货" value="3" />
          </el-select>
          <!-- 处理意见输入框，自动高度，超出显示滚动条 -->
          <el-input
            v-model="processingOpinion"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 8 }"
            placeholder="请输入处理意见..."
            class="opinion-input"
            maxlength="500"
            show-word-limit
          />
        </div>
        <div class="action-right">
          <el-button @click="handleClose">关闭</el-button>
          <el-button type="primary" :loading="submitLoading" @click="handleSubmit">提交</el-button>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Close } from '@element-plus/icons-vue'
import { getComplaintDetail, updateComplaintStatus, getFileDownloadUrl } from '../api/complaint'
import axios from 'axios' // 用于请求图片Blob数据

// 处理状态和处理意见
const processingStatus = ref('')
const processingOpinion = ref('')
// 提交按钮loading
const submitLoading = ref(false)
// 图片预览相关
const photoPreviewVisible = ref(false)
const previewPhotoUrl = ref('')
// 投诉详情数据
const complaintDetailData = ref({})
// 记录初始内容用于关闭确认
let initialStatus = ''
let initialOpinion = ''
// 用于存放图片本地URL
const photoBlobUrls = ref([])

/**
 * 下载图片并转为本地URL
 * @param {Array} photoIds 图片ID数组
 */
async function fetchPhotoBlobs(photoIds) {
  const urls = []
  for (const id of photoIds) {
    if (!id) { urls.push(null); continue }
    try {
      // 请求图片Blob数据
      const response = await axios.get(getFileDownloadUrl(id), {
        responseType: 'blob'
      })
      // 转为本地URL
      const blobUrl = URL.createObjectURL(response.data)
      urls.push(blobUrl)
    } catch (e) {
      urls.push(null) // 下载失败用null占位
    }
  }
  photoBlobUrls.value = urls
}

// 计算属性：生成图片URL数组
const photoUrls = computed(() => {
  if (!complaintDetailData.value.photos || !Array.isArray(complaintDetailData.value.photos)) {
    return []
  }
  return complaintDetailData.value.photos.map(photoId => {
    if (!photoId) return null
    return getFileDownloadUrl(photoId)
  }).filter(url => url !== null)
})

// props定义
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  complaintData: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: '投诉工单详情'
  }
})

// 声明支持 update:visible（控制抽屉显示）和 refreshList（通知父组件刷新列表）
const emit = defineEmits(['update:visible', 'refreshList'])

// 监听抽屉显示，记录初始内容并获取详情
watch(() => props.visible, async (val) => {
  if (val) {
    initialStatus = processingStatus.value
    initialOpinion = processingOpinion.value
    // 获取详情
    if (props.complaintData && props.complaintData.complaintNo) {
      try {
        const res = await getComplaintDetail(props.complaintData.complaintNo)
        // 适配接口数据为页面展示结构
        const d = res.data || {}
        complaintDetailData.value = {
          // 基本信息
          complaintNo: d.complaintNo || '-',
          salesCustomer: d.salesCustomer || '-',
          contact: d.contact || '-',
          productName: d.prodName || '-',
          salesDate: d.saleDate || '-',
          severityLevel: d.severityLevel || '-',
          complaintTime: d.complaintTime || '-',
          complaintType: d.complaintType || '-',
          problemDesc: d.problemDesc || '-',
          // 处理状态、时间
          handleTime: d.handleTime || '',
          // 照片数组，只取photoId字段
          photos: Array.isArray(d.photos) ? d.photos.map(p => p.photoId) : [],
          // 订单信息
          settlementNo: d.settlementNo || '-',
          price: d.devliverBillInfo?.price || '-',
          // 生产加工信息
          barcode: d.barCode || '-',
          processingPlant: d.prodWskpInfo?.wskpName || '-',
          productionTime: d.prodWskpInfo?.prodTime || '-',
          weighter: d.prodWskpInfo?.personName || '-',
          // 仓储物流信息
          transportVehicle: d.loadingBillInfo?.busCode || '-',
          driver: d.loadingBillInfo?.driverName || '-',
          shipper: d.loadingBillInfo?.loadingPerson || '-',
          shipmentTime: d.loadingBillInfo?.loadingTime || '-',
          // 供应链信息
          supplier: d.carrideLinkInfo?.carrideName || '-',
          farmerInfo: d.carrideLinkInfo?.farmerName || '-',
        }
        // 获取图片Blob URL
        if (complaintDetailData.value.photos && complaintDetailData.value.photos.length > 0) {
          await fetchPhotoBlobs(complaintDetailData.value.photos)
        } else {
          photoBlobUrls.value = []
        }
      } catch (e) {
        ElMessage.error('获取投诉详情失败')
        complaintDetailData.value = {}
        photoBlobUrls.value = []
      }
    } else {
      complaintDetailData.value = {}
      photoBlobUrls.value = []
    }
  }
})

// 处理抽屉显示状态变化
const handleVisibleChange = (value) => {
  emit('update:visible', value)
}

// 关闭抽屉，带未保存内容确认
const handleBeforeClose = (done) => {
  if (
    processingStatus.value !== initialStatus ||
    processingOpinion.value !== initialOpinion
  ) {
    ElMessageBox.confirm(
      '有未保存的更改，确定要关闭吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    )
      .then(() => {
        done()
      })
      .catch(() => {})
  } else {
    done()
  }
}

// 关闭抽屉
const handleClose = () => {
  // 关闭抽屉时清空处理状态和处理意见，防止残留
  processingStatus.value = ''
  processingOpinion.value = ''
  emit('update:visible', false)
  emit('refreshList') // 通知父组件刷新投诉列表
}

// 图片点击预览
const handlePhotoPreview = (photoUrl, i) => {
  previewPhotoUrl.value = photoUrl
  photoPreviewVisible.value = true
}

// 提交处理
const handleSubmit = async () => {
  if (!processingStatus.value) {
    ElMessage.warning('请选择处理状态')
    return
  }
  if (!processingOpinion.value.trim()) {
    ElMessage.warning('请输入处理意见')
    return
  }
  submitLoading.value = true
  try {
    // 调用后端接口，提交处理状态和意见
    await updateComplaintStatus({
      complaintNo: complaintDetailData.value.complaintNo, // 投诉单号
      handleStatus: processingStatus.value, // 处理状态
      handleComment: processingOpinion.value // 处理意见
    })
    ElMessage.success('提交成功')
    handleClose()
  } catch (e) {
    ElMessage.error('提交失败')
  } finally {
    submitLoading.value = false
  }
}
</script>

<style scoped>
.complaint-detail {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 120px; /* 为底部操作栏留出空间 */
}

.section {
  margin-bottom: 36px; /* 增大分区间距 */
  padding: 28px 24px;
  background-color: #fafbfc;
  border-radius: 12px;
  box-shadow: 0 2px 12px 0 rgba(64,158,255,0.08); /* 柔和阴影 */
  transition: box-shadow 0.2s;
}
.section:hover {
  box-shadow: 0 4px 24px 0 rgba(64,158,255,0.16);
}

.section-title {
  margin: 0 0 24px 0;
  font-size: 22px;
  font-weight: 700;
  color: #2d3a4b;
  border-bottom: 2px solid #409eff;
  padding-bottom: 10px;
  letter-spacing: 1px;
}

.info-item {
  margin-bottom: 14px;
  display: flex;
  align-items: center;
}
.info-label {
  font-weight: 500;
  color: #666;
  min-width: 96px;
  margin-right: 8px;
  text-align: right;
  flex-shrink: 0;
}
.info-item span {
  color: #333;
  flex: 1;
}

.problem-description {
  background-color: white;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  line-height: 1.7;
  color: #333;
  font-size: 16px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}
.photo-item {
  aspect-ratio: 1;
}
.photo-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f5f7fa;
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0c4cc;
  font-size: 28px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.photo-placeholder:hover {
  border-color: #409eff;
}
.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.bottom-info {
  margin-top: 30px;
}

.info-section {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e4e7ed;
  margin-bottom: 20px;
}

.subsection-title {
  margin: 0 0 16px 0;
  font-size: 17px;
  font-weight: 600;
  color: #333;
  border-left: 4px solid #409eff;
  padding-left: 12px;
}

.price {
  color: #f56c6c;
  font-weight: 600;
}

/* 底部固定操作栏样式 */
.bottom-action-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #e4e7ed;
  padding: 18px 24px;
  z-index: 1000;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
}

.action-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
}

.action-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.status-select {
  width: 220px;
}

.opinion-input {
  flex: 1;
}

.action-right {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.el-button[type="primary"] {
  font-weight: 600;
  letter-spacing: 1px;
}

.complaint-drawer {
  position: relative;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .photo-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .info-item {
    flex-direction: column;
    align-items: flex-start;
  }
  .info-label {
    margin-bottom: 4px;
    text-align: left;
  }
  .section {
    padding: 16px 8px;
  }
  .section-title {
    font-size: 18px;
    padding-bottom: 6px;
  }
}
</style>