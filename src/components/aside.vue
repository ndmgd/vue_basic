<template>
  <div>
    <el-menu
      :style="{ width: !isCollapse ? '230px' : '64px' }"
      class="aside-container"
      mode="vertical"
      background-color="#0f172a"
      text-color="#fff"
      active-text-color="#409eff"
      :collapse="isCollapse"
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
const menuData = reactive(router.options.routes[0].children)

const store = useStore()
const isCollapse = computed(() => store.state.menu.isCollapse)

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
