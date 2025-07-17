<template>
  <div class="complaint-work-order">
    <header>
      <el-form :model="form" label-width="120px" inline>
        <el-form-item label="销售客户">
          <el-input v-model="form.customerName" />
        </el-form-item>
        <el-form-item label="投诉时间">
          <el-date-picker
            v-model="form.complaintTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="单据状态">
          <el-select
            v-model="form.orderStatus"
            placeholder="请选择单据状态"
            style="width: 160px"
          >
            <el-option label="所有" value="null" />
            <el-option label="未处理" value="0" />
            <el-option label="处理中" value="1" />
            <el-option label="已解决" value="2" />
            <el-option label="已驳回" value="3" />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="buttons">
        <el-button type="primary" @click="search">查询</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </header>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" border stripe>
        <!-- 投诉单号 -->
        <el-table-column prop="complaintNo" label="投诉单号" />
        <!-- 销售客户 -->
        <el-table-column prop="salesCustomer" label="销售客户" />
        <!-- 联系方式 -->
        <el-table-column prop="contact" label="联系方式" />
        <!-- 投诉类型 -->
        <el-table-column prop="complaintType" label="投诉类型" />
        <!-- 严重程度 -->
        <el-table-column prop="severityLevel" label="严重程度" />
        <!-- 结算单号 -->
        <el-table-column prop="settlementNo" label="结算单号" />
        <!-- 投诉时间 -->
        <el-table-column prop="complaintTime" label="投诉时间" />
        <!-- 单据状态 -->
        <el-table-column prop="handleStatus" label="单据状态" />
        <el-table-column label="操作" width="100">
          <template #default="scope">
            <!-- 如果单据状态为已驳回(3)或已解决(2)，显示工单详情按钮，否则显示处理按钮 -->
            <el-button
              v-if="scope.row.handleStatus == '已驳回' || scope.row.handleStatus == '已解决'"
              type="text"
              @click="handleViewDetail(scope.row)"
            >工单详情</el-button>
            <el-button
              v-else
              type="text"
              @click="handleProcess(scope.row)"
            >处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="search"
        @size-change="search"
      />
    </div>

    <!-- 投诉详情抽屉组件，监听refreshList事件，关闭抽屉后自动刷新列表 -->
    <ComplaintDetailDrawer
      v-model:visible="drawerVisible"
      :complaint-data="currentComplaintData"
      :title="drawerTitle"
      @refreshList="search"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ComplaintDetailDrawer from "./ComplaintDetailDrawer.vue";
// 引入投诉API
import { getComplaintList } from "../api/complaint";

const form = ref({
  customerName: "",
  complaintTime: [],
  orderStatus: "",
});

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const small = ref(false);
const disabled = ref(false);
const background = ref(true);
const drawerTitle = ref("");

// 抽屉相关状态
const drawerVisible = ref(false);
const currentComplaintData = ref({});

const tableData = ref([]);

// 重置表单方法
const reset = () => {
  form.value = {
    customerName: "",
    complaintTime: [],
    orderStatus: "",
  };
};

// 处理投诉工单 - 打开抽屉显示详情
const handleProcess = (row) => {
  // 控制抽屉显示并传递当前行数据
  console.log("处理投诉工单:", row);
  currentComplaintData.value = row;
  drawerTitle.value = "处理工单";
  drawerVisible.value = true;
};

// 处理工单详情 - 打开抽屉显示详情（与处理按钮一致，便于后续扩展）
const handleViewDetail = (row) => {
  // 控制抽屉显示并传递当前行数据
  console.log("查看工单详情:", row);
  currentComplaintData.value = row;
  drawerTitle.value = "工单详情";
  drawerVisible.value = true;
};

/**
 * 查询投诉列表
 * 根据表单内容和分页参数，请求后端接口获取投诉数据
 */
const search = async () => {
  // 构造接口参数
  const params = {
    salesCustomer: form.value.customerName,
    startDate: form.value.complaintTime[0] || "",
    endDate: form.value.complaintTime[1] || "",
    status: form.value.orderStatus,
    pageIndex: currentPage.value,
    pageSize: pageSize.value,
  };
  try {
    // 调用接口获取数据
    const res = await getComplaintList(params);
    // 假设返回结构为 { data: [], total: 0 }
    tableData.value = res.data.items || [];
    total.value = res.data.totalCount || 0;
  } catch (err) {
    // 可以用Element Plus弹窗提示
    // ElMessage.error(err)
    console.error("获取投诉列表失败", err);
  }
};

// 页面加载时自动查询一次
onMounted(() => {
  search();
});
</script>

<style scoped>
.complaint-work-order {
  height: calc(100vh - 100px);
  background-color: #fff;
  padding: 16px;
}
.buttons {
  text-align: center;
  margin-top: 16px;
}
.table {
  margin-top: 32px;
}
.footer {
  float: right;
  margin-top: 16px;
}
</style>
