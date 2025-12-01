import './assets/main.css'
// 引入createApp用于创建vue实例
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 引入App根组件
import App from '@/App.vue'
import router from './router'
// 引入axios，用于发送网络请求
import axios from 'axios'

// 引入element-plus组建库，用于快速构建页面
import ElementPlus from 'element-plus'
// 导入所有图标（如果用到内置图标）
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import 'virtual:windi.css'

import store from './stores'

// 配置后端基础URL
axios.defaults.baseURL = 'http://localhost:8080'
// 允许跨域携带cookie
axios.defaults.withCredentials = true

router.beforeEach((to, from) => {
  const token = localStorage.getItem('token')
  console.log(token, 'token')
  // 非登陆页面token不存在
  if (to.path !== '/login' && !token) {
    return '/login'
  } else if (token && to.path === '/login') {
    // 已登录状态访问login跳转首页
    return '/dashboard'
  } else {
    return true
  }
})

// 创建vue实例
const app = createApp(App)
// 将axios挂载到vue实例上，方便在组件中使用
app.config.globalProperties.$axios = axios
// 将Pinia挂载到vue实例上
app.use(createPinia())
// 将router挂载到vue实例上
app.use(router)
// 将element-plus挂载到vue实例上
app.use(ElementPlus)
// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 将store挂载到vue实例上
app.use(store)
app.mount('#app')
