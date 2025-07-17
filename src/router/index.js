import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import ComplaintWorkOrder from '../components/ComplaintWorkOrder.vue'
import Layout from '../components/Layout.vue'
import { useUserStore } from '../store/user'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'ComplaintWorkOrder', component: ComplaintWorkOrder }
      // 其他业务页面可继续添加在此
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 已登录用户访问登录页，自动跳转到主页
  if (to.path === '/login' && userStore.token) {
    next('/ComplaintWorkOrder')
  } else if (to.path !== '/login' && !userStore.token) {
    // 未登录访问其它页面，强制跳转登录页并提示
    next('/login')
    // 由于setup外无法直接用ElMessage，这里用setTimeout异步弹窗
    setTimeout(() => {
      import('element-plus').then(({ ElMessage }) => {
        ElMessage.error('请先登录')
      })
    }, 0)
  } else {
    next()
  }
})

export default router
