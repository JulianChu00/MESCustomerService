<template>
  <div class="layout-container">
    <!-- 侧边菜单栏 -->
    <aside class="layout-sider">
      <div class="logo">
        <img src="/logo-bg.png" alt="logo" class="logo-img" />
      </div>
      <ul class="menu">
        <li
          v-for="item in menus"
          :key="item.dashboardcode"
          :class="{ active: activeMenu === item.dashboardcode }"
          @click="selectMenu(item)"
        >
          {{ item.dashboardname }}
        </li>
      </ul>
    </aside>
    <!-- 主体内容区 -->
    <div class="layout-main">
      <!-- 顶部栏，右上角显示用户信息和退出按钮 -->
      <header class="layout-header">
        <div class="user-info">
          <span class="username">{{ userStore.username }}</span>
          <el-button type="text" @click="onLogout">退出登录</el-button>
        </div>
      </header>
      <!-- 页面内容插槽 -->
      <main class="layout-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { ElMessage } from "element-plus";

const router = useRouter();
const userStore = useUserStore();

// 菜单数据，取自用户store中的dashboards
const menus = ref([
  {
    dashboardcode: "1",
    dashboardname: "投诉工单处理",
    path: "ComplaintWorkOrder",
  },
]);
const activeMenu = ref(menus.value[0]?.dashboardcode || "");

// 切换菜单
function selectMenu(item) {
  activeMenu.value = item.dashboardcode;
  router.push(`/${item.path}`);
}

// 退出登录
function onLogout() {
  userStore.resetUserInfo();
  ElMessage.success("已退出登录");
  router.replace("/login");
}
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: #f6f8fa;
}
.layout-sider {
  width: 200px;
  background: #005BAC;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 32px;
  box-shadow: 2px 0 8px 0 rgba(165, 180, 252, 0.08);
}
.logo {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 32px;
  letter-spacing: 2px;
}
.menu {
  list-style: none;
  padding: 0;
  width: 100%;
}
.menu li {
  padding: 14px 32px;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 1.05rem;
}
.menu li.active,
.menu li:hover {
  background: #2586FF;
}
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.layout-header {
  height: 56px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.04);
}
.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  color: #333;
}
.username {
  font-weight: 500;
}
.layout-content {
  flex: 1;
  padding: 16px;
  background: #f6f8fa;
  overflow: auto;
  box-sizing: border-box;
}
.logo-img {
  width: 120px;
  height: 43.78px;
}
</style>
