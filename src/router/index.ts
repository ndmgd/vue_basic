import { createRouter, createWebHistory } from 'vue-router'
import { id } from 'element-plus/es/locales.mjs'
import Layout from '@/views/Main.vue'
import Login from '@/views/login/index.vue'
import Admin from '@/views/auth/admin/index.vue'
import Group from '@/views/auth/group/index.vue'
import Order from '@/views/vppz/order/index.vue'
import Staff from '@/views/vppz/staff/index.vue'
import Dashboard from '@/views/dashboard/index.vue'

// ✅ 正确：需要用缓存时「实时读取」（写在使用的函数内部）；❌ 错误：提前把缓存存在变量里（外层赋值），尤其是依赖登录状态的缓存。
// const localData = localStorage.getItem('pz_vuex')

// 静态路由，页面加载时就存在
const mockRoutes = [
  {
    path: 'dashboard',
    meta: {
      id: '1',
      name: '控制台',
      icon: 'Platform',
      path: '/dashboard',
      describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据',
    },
    component: Dashboard,
  },
  {
    path: 'auth',
    meta: { id: '2', name: '权限管理', icon: 'Grid' },
    children: [
      {
        path: '',
        alias: ['admin'],
        meta: {
          id: '1',
          name: '账号管理',
          icon: 'Avatar',
          path: '/auth/admin',
          describe: '管理员可以进行编辑，权限修改后需要登出才会生效',
        },
        component: Admin,
      },
      {
        path: 'group',
        meta: {
          id: '2',
          name: '菜单管理',
          icon: 'Menu',
          path: '/auth/group',
          describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取',
        },
        component: Group,
      },
    ],
  },
  {
    path: 'vppz',
    meta: { id: '3', name: 'DIDI陪诊', icon: 'BellFilled' },
    children: [
      {
        path: '',
        alias: ['staff'],
        meta: {
          id: '1',
          name: '陪护管理',
          icon: 'Checked',
          path: '/vppz/staff',
          describe: '陪护师可以进行创建和修改，设置对应生效状态控制C端选择',
        },
        component: Staff,
      },
      {
        path: 'order',
        meta: {
          id: '2',
          name: '订单管理',
          icon: 'List',
          path: '/vppz/order',
          describe: 'C端下单后可以查看所有订单状态，已支付的订单可以完成陪护状态修改',
        },
        component: Order,
      },
    ],
  },
]
const routes = [
  {
    path: '/',
    name: 'main',
    component: Layout,

    redirect: (to: any) => {
      console.log('==== 根路由redirect函数执行了 ====')
      let finalPath = '/login' // 默认返回登录页
      const localData = localStorage.getItem('pz_vuex') // 替换为实际key
      if (localData) {
        try {
          const { menu } = JSON.parse(localData)
          if (menu?.routerList?.length) {
            const firstRoute = menu.routerList[0]
            // 1. 打印所有解析环节的关键值
            console.log('firstRoute:', firstRoute) // 看是否有meta.path
            console.log('firstRoute.children:', firstRoute.children) // 看子路由
            // 2. 解析目标路径
            const targetPath = firstRoute.children?.[0]?.meta.path || firstRoute.meta.path
            console.log('解析出的targetPath:', targetPath) // 重点：看是否是预期路径（如/dashboard）
            // 3. 校验路由表是否存在该路径
            const isRouteExist = router.getRoutes().some((item) => item.path === targetPath)
            console.log(
              '路由表是否包含targetPath:',
              isRouteExist,
              '路由表:',
              router.getRoutes().map((i) => i.path),
            )

            // 4. 确定最终返回值
            finalPath = isRouteExist ? targetPath : '/login'
          }
        } catch (e) {
          console.error('redirect解析报错:', e)
        }
      }
      console.log('redirect最终返回路径:', finalPath) // 关键：看最终返回的是啥
      return finalPath
    },

    // 加这行：确认路由被注册
    // beforeEnter: (to: any, from: any, next: any) => {
    //   console.log('根路由beforeEnter执行了')
    //   next()
    // },
    //   // children: mockRoutes,//静态路由
    children: [], //动态渲染子路由
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/test',
    component: () => import('@/views/corstest.vue'),
  },
  {
    path: '/logintest',
    component: () => import('@/views/test/loginTest.vue'),
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
