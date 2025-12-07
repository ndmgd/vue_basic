<template>
  <div>
    <el-menu
      :style="{ width: !isCollapse ? '230px' : '64px' }"
      class="aside-container"
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse"
      :default-active="defaultActive"
    >
      <p class="logo-lg">{{ isCollapse ? 'DIDI' : 'DIDI陪诊' }}</p>
      <treeMenu :index="'0'" :menuData="menuData" />
    </el-menu>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import treeMenu from '@/components/treeMenu.vue'

const router = useRouter()
// 静态路由获取菜单数据
// const menuData = reactive(router.options.routes[0].children)
// 动态路由获取菜单数据
const menuData = computed(() => store.state.menu.routerList)

const store = useStore()
const isCollapse = computed(() => store.state.menu.isCollapse)

// 菜单激活状态
const defaultActive = computed(() => {
  store.state.menu.menuActive
})
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>
<style lang="less" scoped>
.aside-container {
  height: 100%;

  .logo-lg {
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
}
</style>
