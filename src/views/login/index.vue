<template>
  <el-row class="login-container" justify="center" align="middle">
    <el-card style="max-width: 480px">
      <template #header>
        <div class="card-header">
          <img :src="imgUrl" alt="" />
        </div>
      </template>
      <div class="jump-link">
        <el-link @click="handleChange" type="primary" underline>{{
          formType ? '返回登录' : '注册账号'
          }}</el-link>
      </div>
      <el-form ref="loginFormRef" style="max-width: 600px" :model="loginForm" status-icon :rules="rules"
        class="demo-ruleForm">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" :prefix-icon="UserFilled" placeholder="手机号" />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="loginForm.passWord" :prefix-icon="Lock" type="passWord" placeholder="密码" />
        </el-form-item>
        <el-form-item v-if="formType" prop="validCode">
          <el-input v-model="loginForm.validCode" :prefix-icon="Lock" placeholder="验证码">
            <template #append>
              <span @click="countdownChange">{{ countdown.validText }}</span>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :style="{ width: '100%' }" type="primary" @click="submitForm(loginFormRef)">
            {{ formType ? '注册账号' : '登录' }}
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
  import { getCode, login, userAuthentication, menuPermissions } from '@/apis'
  import { useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  // 加载静态资源图片
  const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href

  // 表单数据
  const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: '',
  })

  // 账号校验规则
  const validateUser = (rule: any, value: any, callback: any) => {
    // 不能为空
    if (value === '') {
      callback(new Error('请输入账号'))
    } else {
      const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
      reg.test(value) ? callback() : callback(new Error('手机号格式不对,请输入正确手机号'))
    }
  }

  // 密码校验规则
  const validatePass = (rule: any, value: any, callback: any) => {
    // 不能为空
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      const reg = /^[a-zA-Z0-9_-]{4,16}$/
      reg.test(value)
        ? callback()
        : callback(new Error('密码格式不对,需要4到16位字母/数字/下划线/减号'))
    }
  }
  // 表单验证规则
  const rules = reactive({
    userName: [{ validator: validateUser, trigger: 'blur' }],
    passWord: [{ validator: validatePass, trigger: 'blur' }],
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
        console.log('formType', formType.value)
        // 注册页面
        if (formType.value) {
          userAuthentication(loginForm).then((data) => {
            if (data.data.code === 10000) {
              ElMessage.success('注册成功,请登录')
              formType.value = 0
            }
          })
        } else {
          // 登录页面
          login(loginForm).then((data) => {
            console.log('已经入登录页面')
            console.log('data', data)
            if (data.data.code === 10000) {
              console.log('登录成功')
              ElMessage.success('登录成功')
              console.log(data)
              // 将token和用户信息缓存到浏览器
              localStorage.setItem('token', data.data.data.token)
              localStorage.setItem('userInfo', JSON.stringify(data.data.data.userInfo))
              // 在登录时拿到用户菜单权限信息
              menuPermissions().then((data) => {
                // 缓存菜单权限信息
                store.commit('menu/dynamicMenu', data.data.data)
                console.log('动态路由列表：', routerList)
                // 动态添加路由
                toRaw(routerList.value).forEach((item: any) => {
                  console.log('动态路由情况：', item)
                  router.addRoute('main', item)
                })
                // console.log('【所有已注册的完整路由表】', router.getRoutes())
                // 测试
                // const adminRoute = router.getRoutes().find((r) => r.path === '/auth/admin')
                // console.log('admin路由完整信息：', adminRoute)
                // console.log('admin路由的component：', adminRoute?.path)
                // console.log('component类型：', typeof adminRoute?.component)
                // router.push('/auth/admin')
                // console.log('刷新后路由', router.getRoutes().map(r => r.path))
                // 跳转到首页
                router.push('/')
              })
            }
          })
        }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  // 切换表单(0为登录，1为注册)
  const formType = ref(0)
  const handleChange = () => {
    formType.value = formType.value ? 0 : 1
  }

  // 发送短信
  let flag = false
  const countdown = reactive({
    validText: '获取验证码',
    time: 60,
  })
  const countdownChange = () => {
    // 已经发送的不处理
    if (flag) return
    // 手机号正则
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    // 判断手机号是否正确
    if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
      return ElMessage({
        message: '请检查手机号是否正确',
        type: 'warning',
      })
    }
    // 倒计时
    const time = setInterval(() => {
      if (countdown.time <= 0) {
        countdown.validText = '获取验证码'
        countdown.time = 60
        flag = false
        // 清除定时器
        clearInterval(time)
      } else {
        countdown.time -= 1
        countdown.validText = `剩余${countdown.time}s`
      }
    }, 1000)
    flag = true
    console.log('发送短信')
    getCode({
      tel: loginForm.userName,
    }).then(({ data }) => {
      console.log(data, 'data')
      if (data.code === 10000) {
        ElMessage.success('发送成功')
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
