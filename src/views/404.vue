<template>
  <el-col :sm="8" :lg="6" :xl="4">
    <el-result icon="warning" title="404" sub-title="你的页面走丢~">
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
      </template>
    </el-result>
  </el-col>
</template>

<script setup lang="ts"></script>

<style></style>
