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
import panelHead from './components/panelHead.vue'
// 配置后端基础URL
axios.defaults.baseURL = 'http://localhost:8080'
// 允许跨域携带cookie
axios.defaults.withCredentials = true

// 刷新后的动态路由添加
const localData = localStorage.getItem('pz_vuex')
if (localData) {
  // 将localData转换为json对象
  store.commit('menu/dynamicMenu', JSON.parse(localData).menu.routerList)
  store.state.menu.routerList.forEach((item: any) => {
    router.addRoute('main',item)
  })
}

// 登录验证拦截器
router.beforeEach((to, from) => {
  console.log('开始验证token')
  // 1. 先处理localStorage返回undefined的情况
  let token = localStorage.getItem('token')
  if (token === 'undefined' || token === 'null') {
    token = null
    localStorage.removeItem('token'); // 清除异常值
  }
  console.log('处理后token值:', token, '目标路径:', to.path)
    // 2. 有效token的判断：非null/undefined + 非空字符串
  const hasValidToken = !!token && token.trim() !== ''
  // 非登陆页面token不存在
  if (to.path !== '/login' && !hasValidToken) {
    console.log('返回登录页面')
    return '/login'
  } else if (hasValidToken && to.path === '/login') {
    console.log('跳转首页页面')
    // 已登录状态访问login跳转首页
    return '/'
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
// 注册全局组件,头部
app.component('panel-head', panelHead)
// 将store挂载到vue实例上
app.use(store)
app.mount('#app')
