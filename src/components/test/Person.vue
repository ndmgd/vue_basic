<template>
  <div class="app-root">
    <!-- 顶部导航区 -->
    <div class="header">
      <div class="logo">
        <el-icon :size="24" name="cube" />
        <span class="logo-text">系统管理平台</span>
      </div>

      <div class="main-nav">
        <el-dropdown trigger="hover" class="nav-item">
          <template #default>
            <span class="nav-link level-1">导航一 <el-icon :size="16" name="arrow-down" /></span>
          </template>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="level-2">一级菜单1</el-dropdown-item>
              <el-dropdown-item class="level-2">一级菜单2</el-dropdown-item>
              <el-dropdown-item>
                <el-dropdown trigger="hover">
                  <template #default>
                    <span class="level-2"
                      >二级菜单组 <el-icon :size="14" name="arrow-right"
                    /></span>
                  </template>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item class="level-3">三级菜单1</el-dropdown-item>
                      <el-dropdown-item class="level-3">三级菜单2</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-dropdown trigger="hover" class="nav-item">
          <template #default>
            <span class="nav-link level-1">导航二 <el-icon :size="16" name="arrow-down" /></span>
          </template>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="level-2">一级菜单A</el-dropdown-item>
              <el-dropdown-item class="level-2">一级菜单B</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-dropdown trigger="hover" class="nav-item">
          <template #default>
            <span class="nav-link level-1">导航三 <el-icon :size="16" name="arrow-down" /></span>
          </template>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="level-2">功能1</el-dropdown-item>
              <el-dropdown-item class="level-2">功能2</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <el-dropdown trigger="hover" class="user-menu">
        <template #default>
          <div class="user-info level-1">
            <el-avatar :size="32" icon="User" />
            <span>管理员</span>
            <el-icon :size="16" name="arrow-down" />
          </div>
        </template>
        <template #dropdown>
          <el-dropdown-menu align="end">
            <el-dropdown-item class="level-2">
              <el-icon :size="16" name="setting" /> 用户设置
            </el-dropdown-item>
            <el-dropdown-item class="level-2">
              <el-icon :size="16" name="switch-button" /> 退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 主体区域 -->
    <div class="main-container">
      <!-- 侧边导航 -->
      <div class="sidebar">
        <el-menu
          mode="vertical"
          default-active="3-1"
          background-color="#fff"
          text-color="#333"
          active-text-color="#165DFF"
          class="sidebar-menu"
          :style="{ '--el-menu-item-height': '45px' }"
        >
          <!-- 菜单组一 -->
          <el-sub-menu index="1">
            <template #title>
              <el-icon :size="18" name="menu" />
              <span class="level-1">菜单组一</span>
            </template>

            <!-- 二级菜单项1 -->
            <el-menu-item index="1-1" class="level-2">
              <div class="menu-item-content">
                <el-icon :size="16" name="menu" />
                <span>菜单项1</span>
              </div>
            </el-menu-item>

            <!-- 二级菜单项2 -->
            <el-menu-item index="1-2" class="level-2">
              <div class="menu-item-content">
                <el-icon :size="16" name="menu" />
                <span>菜单项2</span>
              </div>
            </el-menu-item>

            <!-- 二级子菜单组（关键：给el-submenu的title也套menu-item-content） -->
            <el-sub-menu index="1-3">
              <template #title>
                <div class="menu-item-content submenu">
                  <el-icon :size="16" name="menu" />
                  <span>子菜单组</span>
                </div>
              </template>

              <!-- 三级菜单项 -->
              <el-menu-item index="1-3-1" class="level-3">
                <div class="menu-item-content">
                  <el-icon :size="14" name="menu" />
                  <span>三级菜单1</span>
                </div>
              </el-menu-item>
              <el-menu-item index="1-3-2" class="level-3">
                <div class="menu-item-content">
                  <el-icon :size="14" name="menu" />
                  <span>三级菜单2</span>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>

          <!-- 菜单组二 -->
          <el-sub-menu index="2">
            <template #title>
              <el-icon :size="18" name="document" />
              <span class="level-1">菜单组二</span>
            </template>
            <el-menu-item index="2-1" class="level-2">
              <div class="menu-item-content">
                <el-icon :size="16" name="document" />
                <span>文档管理</span>
              </div>
            </el-menu-item>
          </el-sub-menu>

          <!-- 系统设置 -->
          <el-sub-menu index="3">
            <template #title>
              <el-icon :size="18" name="setting" />
              <span class="level-1">系统设置</span>
            </template>
            <el-menu-item index="3-1" class="level-2">
              <div class="menu-item-content">
                <el-icon :size="16" name="setting" />
                <span>基本设置</span>
              </div>
            </el-menu-item>
            <el-sub-menu index="3-2">
              <template #title>
                <div class="menu-item-content submenu">
                  <el-icon :size="16" name="user" />
                  <span>用户管理</span>
                </div>
              </template>
              <el-menu-item index="3-2-1" class="level-3">
                <div class="menu-item-content">
                  <el-icon :size="14" name="user" />
                  <span>用户列表</span>
                </div>
              </el-menu-item>
              <el-menu-item index="3-2-2" class="level-3">
                <div class="menu-item-content">
                  <el-icon :size="14" name="user" />
                  <span>角色管理</span>
                </div>
              </el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </div>

      <!-- 内容展示区 -->
      <div class="content-container">
        <div class="content-scroll">
          <div class="content-body">
            <h2>内容展示区域</h2>
            <p>此区域支持横向和纵向滚动</p>

            <div class="long-content">
              <div class="wide-box">
                横向超长测试：这是一段远超容器宽度的内容，用于触发横向滚动条。Lorem ipsum dolor sit
                amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </div>

              <div v-for="i in 50" :key="i" class="vertical-item">
                纵向内容段 {{ i }}：Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
            </div>

            <div class="pagination-container">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 30, 50]"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 分页相关数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(200)

// 分页事件处理
const handleSizeChange = (val) => {
  pageSize.value = val
}
const handleCurrentChange = (val) => {
  currentPage.value = val
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 顶部导航样式 */
.header {
  height: 60px;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  z-index: 10;
}

.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #165dff;
  margin-right: 40px;
  font-size: 18px;
}
.logo-text {
  margin-left: 10px;
}

.main-nav {
  display: flex;
  margin-right: auto;
}
.nav-item {
  margin: 0 15px;
}
.nav-link {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  height: 60px;
  line-height: 60px;
  color: #666;
  transition: color 0.2s;
}
.nav-link:hover {
  color: #165dff;
}

.user-menu {
  cursor: pointer;
}
.user-info {
  display: flex;
  align-items: center;
  color: #333;
}

/* 主体区域样式 */
.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 侧边栏样式 */
.sidebar {
  width: 220px;
  background: #fff;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
  flex-shrink: 0;
}

/* 核心：菜单对齐样式 */
.sidebar-menu {
  --el-menu-base-level-padding: 0 !important;
  --el-menu-item-padding: 0 !important;
}

/* 隐藏所有子菜单默认箭头 */
.sidebar-menu :deep(.el-submenu__icon-arrow) {
  display: none !important;
}

/* 统一菜单项/子菜单容器样式 */
.sidebar-menu :deep(.el-menu-item),
.sidebar-menu :deep(.el-submenu__title) {
  padding: 0 !important;
  height: 45px !important;
  line-height: 45px !important;
  overflow: hidden;
}

/* 二级菜单内容容器（关键：所有二级元素都用这个容器） */
.menu-item-content {
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 30px; /* 二级统一缩进 */
  padding-right: 20px; /* 右侧留空 */
}

/* 二级子菜单组的自定义箭头 */
.menu-item-content.submenu::after {
  content: '';
  width: 5px;
  height: 5px;
  border-top: 1px solid #666;
  border-right: 1px solid #666;
  transform: rotate(45deg);
  margin-left: auto; /* 箭头靠右 */
}

/* 图标样式（统一大小和间距） */
.menu-item-content .el-icon {
  width: 16px;
  height: 16px;
  margin-right: 8px;
  flex-shrink: 0; /* 图标不压缩 */
}

/* 文本样式（占满剩余空间） */
.menu-item-content span {
  flex-grow: 1;
}

/* 三级菜单调整（比二级多缩进15px） */
.sidebar-menu :deep(.level-3 .menu-item-content) {
  padding-left: 45px;
}
.sidebar-menu :deep(.level-3 .el-icon) {
  width: 14px;
  height: 14px;
}

/* 选中状态样式 */
.sidebar-menu :deep(.el-menu-item.is-active) {
  background-color: #e8f3ff !important;
  border-left: 3px solid #165dff;
}

/* 内容区样式 */
.content-container {
  flex: 1;
  padding: 20px;
  background: #f5f7fa;
  overflow: hidden;
}

.content-scroll {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid #e5e7eb;
}

/* 超长内容样式 */
.long-content {
  margin-bottom: 20px;
}
.wide-box {
  width: 1500px;
  padding: 10px;
  margin: 10px 0;
  border: 1px dashed #e5e7eb;
}
.vertical-item {
  padding: 15px 0;
  border-bottom: 1px dashed #e5e7eb;
}

/* 分页样式 */
.pagination-container {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #e5e7eb;
  text-align: right;
}

/* 导航层级字体 */
.level-1 {
  font-size: 16px;
  font-weight: 500;
}
.level-2 {
  font-size: 14px;
  font-weight: 400;
}
.level-3 {
  font-size: 13px;
  font-weight: 400;
}
</style>
