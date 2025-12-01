<template>
  <div class="cors-test">
    <h2>Django-Vue跨域测试</h2>
    <button @click="sendGetRequest">发送GET请求</button>
    <button @click="sendPostRequest">发送POST请求</button>
    <div v-if="responseData">
      <h3>响应结果：</h3>
      <pre>{{ responseData }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()
const responseData = ref(null)

// 发送GET请求
const sendGetRequest = async () => {
  try {
    const res = await proxy.$axios.get('/api/test/')
    responseData.value = res.data
  } catch (err) {
    responseData.value = '请求失败：' + err.message
  }
}

// 发送POST请求
const sendPostRequest = async () => {
  try {
    const res = await proxy.$axios.post('/api/test/', {
      name: 'vue_user',
      age: 20,
    })
    responseData.value = res.data
  } catch (err) {
    responseData.value = '请求失败：' + err.message
  }
}
</script>

<style scoped>
.cors-test {
  padding: 20px;
}
button {
  margin: 0 10px 10px 0;
  padding: 8px 16px;
  cursor: pointer;
}
pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}
</style>
