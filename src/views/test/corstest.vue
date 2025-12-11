<template>
    <el-button type="primary" @click="handleLogin">测试登录</el-button>
    <el-button type="success" @click="handleUserList">测试获取用户信息列表</el-button>
</template>

<script setup lang='ts'>
    import requestUtil from '@/utils/test'

    const handleLogin = async () => {
        let result = await requestUtil.get("user/jwt_test")
        console.log("result=", result)
        // let data = result.data;
        if (result.code == 200) {
            const token = result.token
            console.log("登录成功，token=" + token)
            window.sessionStorage.setItem("token", token)
        } else {
            console.log("登录出错")
        }
    }

    const handleUserList = async () => {
        let result = await requestUtil.get("user/test")
        // let data = result.data;  
        if (result.code == 200) {
            const userList = result.data;
            console.log("用户信息列表，userList=", userList)
        } else {
            console.log("登录出错")
        }
    }
</script>

<style></style>