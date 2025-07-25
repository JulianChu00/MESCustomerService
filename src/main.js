import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
app.use(createPinia())
app.mount('#app')
