<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-aside> -->
      <NavAside />
      <!-- </el-aside> -->
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
        <userdata />
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
  import NavAside from '@/components/aside.vue'
  import Header from '@/components/navHeader.vue'
  import userdata from '@/components/userdata.vue'
</script>

<style lang="less" scoped>
  .common-layout {
    height: 100%;

    .el-container {
      height: 100%;
      display: flex;
    }

    // 给 el-main 加 flex:1，强制填充剩余宽度
    // :deep(.el-main) {
    //   flex: 1;
    //   padding: 0; /* 可选：去掉默认内边距 */
    // }
  }
</style>
