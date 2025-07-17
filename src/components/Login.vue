<template>
  <!-- 登录页面整体背景 -->
  <div class="login-bg">
    <!-- 登录卡片 -->
    <el-card class="login-card">
      <!-- 系统Logo和标题 -->
      <div class="login-header">
        <!-- 渐变圆形背景包裹logo -->
        <div class="logo-bg">
          <img src="/logo.png" alt="logo" class="login-logo" />
        </div>
        <h2 class="login-title">MES客户服务系统</h2>
        <div class="login-subtitle">让客户服务更高效</div>
      </div>
      <!-- 登录表单 -->
      <el-form
        class="login-form"
        :model="loginForm"
        :rules="rules"
        ref="loginFormRef"
        label-width="0"
      >
        <!-- 用户名输入框，带图标 -->
        <el-form-item prop="userCode">
          <el-input
            v-model="loginForm.userCode"
            placeholder="请输入账号"
            clearable
          >
            <template #prefix>
              <el-icon><User /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码输入框，带图标 -->
        <el-form-item prop="psk">
          <el-input
            v-model="loginForm.psk"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <div class="login-btn-wrapper">
            <el-button
              type="primary"
              class="login-btn"
              @click="onLogin"
              :loading="loading"
              round
              block
            >登 录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
// 引入 Vue 的响应式 API
import { reactive, ref } from "vue";
// 引入 Element Plus 消息提示和图标
import { ElMessage } from "element-plus";
import { User, Lock } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { login } from "../api/login";
import { useUserStore } from "../store/user";

// 登录表单数据
const loginForm = reactive({
  userCode: "",
  psk: "",
});

// 表单校验规则
const rules = {
  userCode: [{ required: true, message: "请输入账号", trigger: "blur" }],
  psk: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

// 表单引用
const loginFormRef = ref();
// 登录按钮加载状态
const loading = ref(false);

const router = useRouter();
const userStore = useUserStore();

// 登录按钮点击事件
const onLogin = () => {
  // 校验表单
  loginFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      try {
        // 通过axios请求后端登录接口
        const res = await login({
          userCode: loginForm.userCode,
          psk: loginForm.psk,
        });
        if (res.code === 200) {
          // 登录成功后，将用户信息存入pinia
          userStore.setUserInfo(res.data);
          ElMessage.success(res.message || "登录成功！");
          router.push("/ComplaintWorkOrder"); // 登录成功后跳转到主页
        } else {
          ElMessage.error(res.message || "账号或密码错误");
        }
      } catch (err) {
        ElMessage.error(err);
      } finally {
        loading.value = false;
      }
      // --- 以下为原有本地mock逻辑，已被axios请求替代 ---
      // setTimeout(() => {
      //   if (loginForm.username === 'admin' && loginForm.password === '123456') {
      //     ElMessage.success('登录成功！')
      //     router.push('/home')
      //   } else {
      //     ElMessage.error('账号或密码错误')
      //   }
      //   loading.value = false
      // }, 800)
    } else {
      ElMessage.error("请填写完整信息");
    }
  });
};
</script>

<style scoped>
/* 背景渐变和柔和动画 */
.login-bg {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #e0e7ff 0%, #f0fdfa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
/* 柔和背景动画气泡 */
.login-bg::before {
  content: "";
  position: absolute;
  left: 10%;
  top: 20%;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #a5b4fc 0%, transparent 70%);
  opacity: 0.4;
  filter: blur(40px);
  animation: float 8s ease-in-out infinite alternate;
  z-index: 0;
}
.login-bg::after {
  content: "";
  position: absolute;
  right: 10%;
  bottom: 10%;
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, #6ee7b7 0%, transparent 70%);
  opacity: 0.3;
  filter: blur(30px);
  animation: float2 10s ease-in-out infinite alternate;
  z-index: 0;
}
@keyframes float {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(-30px) scale(1.1);
  }
}
@keyframes float2 {
  0% {
    transform: translateY(0) scale(1);
  }
  100% {
    transform: translateY(30px) scale(1.05);
  }
}

.login-card {
  width: 380px;
  padding: 36px 32px 28px 32px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.12);
  border-radius: 20px;
  background: #fff;
  position: relative;
  z-index: 1;
  transition: box-shadow 0.3s;
}
.login-card:hover {
  box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.16);
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 28px;
}
/* 渐变圆形背景包裹logo */
.logo-bg {
  width: 72px;
  height: 72px;
  /* background: linear-gradient(135deg, #a5b4fc 0%, #6ee7b7 100%); */
  /* border-radius: 50%; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  /* box-shadow: 0 2px 12px 0 rgba(165, 180, 252, 0.18); */
}
.login-logo {
  width: 148px;
  height: 54px;
}
.login-title {
  font-size: 1.7rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  letter-spacing: 2px;
}
.login-subtitle {
  font-size: 1rem;
  color: #6b7280;
  margin-top: 4px;
  margin-bottom: 0;
  letter-spacing: 1px;
}
.login-btn {
  width: 100%;
  font-size: 1.15rem;
  letter-spacing: 2px;
  border-radius: 8px;
  background: #2196f3;
  color: #fff;
  border: none;
  height: 44px;
  font-weight: 500;
}
.login-btn:hover {
  background: linear-gradient(90deg, #6366f1 0%, #34d399 100%);
  box-shadow: 0 2px 8px 0 rgba(52, 211, 153, 0.12);
}
/* 登录按钮居中样式 */
.login-btn-wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 0;
}
</style>
