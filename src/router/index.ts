import { createRouter, createWebHistory } from 'vue-router'
import { id } from 'element-plus/es/locales.mjs'
import Layout from '@/views/Main.vue'
import Login from '@/views/login/index.vue'
import Admin from '@/views/auth/admin/index.vue'
import Group from '@/views/auth/group/index.vue'
import Order from '@/views/vppz/order/index.vue'
import Staff from '@/views/vppz/staff/index.vue'
import Dashboard from '@/views/dashboard/index.vue'

const localData = localStorage.getItem('pz_vuex')

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
    // 重定向第一个页面显示
    // redirect: (to: any) => {
    //   if (localData) {
    //     try {
    //       const { menu } = JSON.parse(localData)
    //       if (!menu?.routerList?.length) return '/login'
    //       const firstRoute = menu.routerList[0]
    //       const targetPath = firstRoute.children?.[0]?.meta.path || firstRoute.meta.path
    //       // 关键：校验目标路径是否存在于路由表中
    //       const isRouteExist = router.getRoutes().some((item) => item.path === targetPath)
    //       return isRouteExist ? targetPath : '/login'
    //     } catch (e) {
    //       return '/login'
    //     }
    //   }
    //   return '/login'
    // },
    // children: mockRoutes,//静态路由
    children: [], //动态渲染子路由
  },
  {
    path: '/login',
    component: Login,
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

// // 标记：是否已挂载动态路由
// let hasAddedDynamicRoutes = false

// // 封装：挂载动态路由 + 获取第一个页面路径
// const initDynamicRoutes = () => {
//   try {
//     const localData = localStorage.getItem('pz_vuex')
//     if (!localData) return null

//     const { menu } = JSON.parse(localData)
//     if (!menu?.routerList?.length) return null

//     // 新增：检查每个菜单的 meta.path 是否存在
//     const invalidMenus = menu.routerList.filter((route) => !route.meta?.path)
//     if (invalidMenus.length > 0) {
//       console.warn('以下菜单缺失 meta.path：', invalidMenus)
//       // 可选：过滤掉无效菜单，避免后续报错
//       menu.routerList = menu.routerList.filter((route) => route.meta?.path)
//     }

//     // 步骤1：转换菜单为动态路由规则（按你的菜单格式调整）
//     const dynamicRoutes = menu.routerList.map((route) => {
//       // 处理子菜单
//       const childrenRoutes =
//         route.children?.map((child) => ({
//           path: child.meta.path.replace(/^\//, ''), // 去掉开头的/，避免嵌套路径错误
//           name: child.name,
//           component: () => import(`@/views/${child.component}.vue`), // 按实际组件路径改
//         })) || []

//       // 父菜单路由
//       return {
//         path: route.meta.path.replace(/^\//, ''),
//         name: route.name,
//         component: () => import(`@/views/${route.component}.vue`),
//         children: childrenRoutes,
//       }
//     })

//     // 步骤2：挂载动态路由到 main 路由下
//     dynamicRoutes.forEach((route) => {
//       router.addRoute('main', route) // Vue3 写法；Vue2 用 router.addRoutes([route])
//     })

//     hasAddedDynamicRoutes = true

//     // 步骤3：返回第一个页面的路径（重定向目标）
//     const firstRoute = menu.routerList[0]
//     return firstRoute.children?.[0]?.meta.path || firstRoute.meta.path
//   } catch (e) {
//     console.error('初始化动态路由失败：', e)
//     return null
//   }
// }

// // 全局前置守卫（核心：先挂载路由，再重定向）
// router.beforeEach(async (to, from, next) => {
//   const token = localStorage.getItem('token')

//   // 场景1：未登录 → 跳登录页
//   if (!token) {
//     return to.path === '/login' ? next() : next('/login')
//   }

//   // 场景2：已登录 → 先挂载动态路由
//   if (!hasAddedDynamicRoutes) {
//     const firstPagePath = initDynamicRoutes()
//     // 挂载成功 + 目标路径存在 + 当前是跳 / → 直接重定向到第一个页面
//     if (firstPagePath && to.path === '/') {
//       return next(firstPagePath)
//     }
//     // 挂载失败 → 跳登录页
//     if (!firstPagePath) {
//       return next('/login')
//     }
//   }

//   // 场景3：已挂载路由 → 正常放行
//   next()
// })

export default router
