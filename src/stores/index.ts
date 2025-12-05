import { createStore } from 'vuex'
import menu from './menu'
// 持久化插件
import VuexPersistence from 'vuex-persist'
// 配置持久化插件
const vuexLocal = new VuexPersistence({
  // 持久化到localStorage
  storage: window.localStorage, 
  key: 'pz_vuex', // 存储的key名
  // 仅持久化menu模块（可选）
  // modules: ['menu'] 
})

export default createStore({
  plugins: [vuexLocal.plugin],
  modules: {
    menu,
  },
})
