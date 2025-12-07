<template>
  <div class="container" style="padding: 50px">
    <h2>Vue3 + Element Plus 跨域测试</h2>

    <!-- GET请求测试 -->
    <el-card style="margin: 20px 0">
      <el-button type="primary" @click="testGet">发送GET请求</el-button>
      <div style="margin-top: 20px">
        <h4>GET请求结果：</h4>
        <pre>{{ getResult }}</pre>
      </div>
    </el-card>

    <!-- POST请求测试 -->
    <el-card style="margin: 20px 0">
      <el-form :model="form" inline style="margin-bottom: 20px">
        <el-form-item label="用户名：">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="年龄：">
          <el-input v-model="form.age" type="number" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-button type="success" @click="testPost">发送POST请求</el-button>
      </el-form>
      <div>
        <h4>POST请求结果：</h4>
        <pre>{{ postResult }}</pre>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// GET请求结果
const getResult = ref('')
// POST请求表单数据
const form = ref({
  username: '',
  age: 0,
})
// POST请求结果
const postResult = ref('')

// 配置Axios默认基础URL（Django后端地址）
axios.defaults.baseURL = 'http://127.0.0.1:8000'

// 测试GET请求
const testGet = async () => {
  try {
    // 发送GET请求，传递query参数
    const res = await axios.get('/api/test-get/', {
      params: { name: 'Vue前端用户' },
    })
    // 保存返回结果
    getResult.value = JSON.stringify(res.data, null, 2)
  } catch (error) {
    // 捕获错误（如跨域失败、接口报错）
    getResult.value = `请求失败：${error.message}`
  }
}

// 测试POST请求
const testPost = async () => {
  try {
    // 发送POST请求，传递JSON数据
    const res = await axios.post('/api/test-post/', form.value)
    // 保存返回结果
    postResult.value = JSON.stringify(res.data, null, 2)
  } catch (error) {
    // 捕获错误
    postResult.value = `请求失败：${error.message}`
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
}
pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  color: #333;
}
</style>
