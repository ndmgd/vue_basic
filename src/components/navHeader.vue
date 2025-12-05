<template>
  <div class="header-container flex-box">
    <div class="header-left flex-box">
      <el-icon class="icon" size="20" @click="store.commit('menu/collapseMenu')">
        <Fold />
      </el-icon>
      <ul class="flex-box">
        <li v-for="(item, index) in selectedMenu" :key="item.path" :class="{ selected: route.path === item.path }"
          class="tab flex-box">
          <el-icon size="12">
            <component :is="item.icon" />
          </el-icon>
          <router-link class="flex-box text" :to="{ path: item.path }">
            {{ item.name }}
          </router-link>
          <el-icon size="12" class="close" @click="closeTab(item, index)">
            <Close />
          </el-icon>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <el-dropdown @command="handleClick">
        <div class="el-icon--right flex-box">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <p class="username">andim</p>
        </div>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="cancle">退出登录</el-dropdown-item>

          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useStore } from 'vuex'
  import { computed } from 'vue'
  import { Close } from '@element-plus/icons-vue'
  import { useRoute, useRouter } from 'vue-router'
  // 拿到store实例
  const store = useStore()
  // 获取当前选中的菜单
  const selectedMenu = computed(() => store.state.menu.selectMenu)
  const route = useRoute()
  const router = useRouter()
  const closeTab = (item: any, index: any) => {
    store.commit('menu/closeMenu', item)
    // 删除非当前页标签的跳转逻辑
    if (item.path !== route.path) {
      return
    }
    const selectMenuData = selectedMenu.value

    // 删除的最后一项
    if (index === selectMenuData.length) {
      // 如果是最后一个，跳转至首页
      if (!selectMenuData.length) {
        router.push({
          path: '/dashboard',
        })
      } else {
        router.push({
          path: selectMenuData[index - 1].path,
        })
      }
    } else {
      router.push({
        path: selectMenuData[index].path,
      })
    }
  }

  const handleClick = (command: any) => {
    if (command === 'cancle') {
      // 清除菜单缓存
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      localStorage.removeItem('pz_vuex')
      // 跳转至登录页面
      window.location.href = window.location.origin

    }
  }
</script>

<style>
  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-container {
    height: 100%;
    background-color: #fff;
    padding-right: 25px;

    .header-left {
      height: 100%;

      .icon {
        width: 45px;
        height: 100%;
      }

      .icon:hover {
        background-color: #f5f5f5;
        cursor: pointer;
      }

      .tab {
        padding: 0 10px;
        height: 100%;

        .text {
          margin: 0 5px;
        }

        .close {
          visibility: hidden;
        }

        &.selected {
          background-color: #f5f5f5;

          i {
            color: #409eff;
          }

          a {
            color: #409eff;
          }
        }
      }

      .tab:hover {
        background-color: #f5f5f5;

        .close {
          visibility: inherit;
          cursor: pointer;
          color: #000;
        }
      }
    }
  }

  .user-name {
    margin-left: 10px;
  }
</style>
