<template>
  <div>admin</div>
</template>

<script setup lang="ts">
import { authAdmin } from '@/apis'
import { reactive, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
// 请求参数
const paginationData = reactive({
  pageNum: 1,
  pageSize: 10,
})

onMounted(() => {
  authAdmin(paginationData).then((res) => {
    console.log(res)
  })
})
</script>

<style></style>
