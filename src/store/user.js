import { defineStore } from 'pinia'
import Cookies from 'js-cookie'

// 用户信息store，负责管理登录用户的全局状态
export const useUserStore = defineStore('user', {
  state: () => ({
    token: Cookies.get('token') || '', // 登录token，优先从cookie恢复
    usercode: localStorage.getItem('usercode') || '', // 用户编码
    username: localStorage.getItem('username') || '', // 用户名
    orgcode: localStorage.getItem('orgcode') || '', // 组织编码
    dashboards: JSON.parse(localStorage.getItem('dashboards') || '[]') // 用户可访问的看板列表
  }),
  actions: {
    // 设置用户信息
    setUserInfo(payload) {
      this.token = payload.token
      this.usercode = payload.usercode
      this.username = payload.username
      this.orgcode = payload.orgcode
      this.dashboards = payload.dashboards || []
      // token存cookie
      Cookies.set('token', payload.token)
      // 其他信息存localStorage
      localStorage.setItem('usercode', payload.usercode)
      localStorage.setItem('username', payload.username)
      localStorage.setItem('orgcode', payload.orgcode)
      localStorage.setItem('dashboards', JSON.stringify(payload.dashboards || []))
    },
    // 清空用户信息（如退出登录时）
    resetUserInfo() {
      this.token = ''
      this.usercode = ''
      this.username = ''
      this.orgcode = ''
      this.dashboards = []
      // 移除cookie和localStorage
      Cookies.remove('token')
      localStorage.removeItem('usercode')
      localStorage.removeItem('username')
      localStorage.removeItem('orgcode')
      localStorage.removeItem('dashboards')
    }
  }
})