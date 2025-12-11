<template>
    <el-row class="login-container" justify="center" align="middle">
        <el-card style="max-width: 480px">
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="" />
                </div>
            </template>

            <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="rules"
                class="demo-ruleForm">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" :prefix-icon="UserFilled" placeholder="手机号" />
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" :prefix-icon="Lock" type="passWord" placeholder="密码" />
                </el-form-item>

                <el-form-item>
                    <el-button :style="{ width: '100%' }" type="primary" @click="submitForm(loginFormRef)">登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup lang="ts">
    import { UserFilled, Lock } from '@element-plus/icons-vue'
    import { ref, reactive, computed, toRaw } from 'vue'
    import { ElMessage } from 'element-plus'
    import { logintest } from '@/apis/apis'
    import { useRouter } from 'vue-router'
    import { useStore } from 'vuex'

    // 加载静态资源图片
    const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href

    // 表单数据
    const loginForm = reactive({
        userName: '',
        passWord: '',
        // validCode: '',
    })

    // 表单验证规则
    const rules = reactive({
        userName: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        passWord: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
    })

    const router = useRouter()
    // 提交表单
    const loginFormRef = ref()
    const store = useStore()
    // 获取路由列表
    const routerList = computed(() => store.state.menu.routerList)
    const submitForm = async (formEl: any) => {
        if (!formEl) return
        // 手动触发校验
        await formEl.validate((valid: any, fields: any) => {
            if (valid) {
                console.log('submit!', loginForm)
                // console.log('formType', formType.value)
                // 登录页面
                logintest(loginForm).then((data) => {
                    console.log('已经入自己的登录页面测试：')
                    console.log('data', data)
                    if (data.code === 200) {
                        console.log('登录成功')
                        ElMessage.success('登录成功')
                        console.log(data)
                        // 将token和用户信息缓存到浏览器
                        // localStorage.setItem('token', data.data.data.token)
                        // localStorage.setItem('userInfo', JSON.stringify(data.data.data.userInfo))
                    }
                })
            } else {
                console.log('error submit!', fields)
            }
        })
    }





</script>

<style lang="less" scoped>
    :deep(.el-card__header) {
        padding: 0;
    }

    .login-container {
        height: 100%;

        .card-header {
            background-color: #899fe1;

            img {
                width: 430px;
            }
        }

        .jump-link {
            text-align: right;
            margin-bottom: 10px;
        }
    }
</style>
