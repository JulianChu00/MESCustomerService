import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 设置公共基础路径为相对路径，这样打包后的资源会使用相对路径
  base: './',
  // 配置开发服务器代理，解决跨域问题
  server: {
    proxy: {
      // 以 /api 开头的请求将被代理到目标服务器
      '/api': {
        target: 'http://172.26.4.21:8080', // 这里填写后端接口地址，必须带http://
        changeOrigin: true, // 是否更改请求源，解决跨域
        secure: false, // 如果是https接口且使用自签名证书时需设为false
        // rewrite: path => path.replace(/^\/api/, ''), // 去掉请求路径中的 /api 前缀
      }
    }
  }
})
