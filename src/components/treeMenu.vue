<template>
  <template v-for="item in props.menuData" :key="item.path">
    <el-menu-item
      @click="handleMenuClick(item, `${props.index}-${item.meta.id}`)"
      v-if="!item.children || item.children.length == 0"
      :index="`${props.index}-${item.meta.id}`"
    >
      <el-icon>
        <component :is="item.meta.icon" />
      </el-icon>
      <span>{{ item.meta.name }}</span>
    </el-menu-item>

    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.name }}</span>
      </template>
      <TreeMenu :index="`${props.index}-${item.meta.id}`" :menuData="item.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const props = defineProps(['menuData', 'index'])

const router = useRouter()
const store = useStore()

const handleMenuClick = (item: any, active: any) => {
  // console.log(item, 'item')
  console.log('当前点击菜单的值active：', active)
  store.commit('menu/addMenu', item.meta)
  store.commit('menu/updateMenuActive', active)
  router.push(item.meta.path)
}
// console.log(props.menuData)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
