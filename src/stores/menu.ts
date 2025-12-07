const localData = localStorage.getItem('pz_vuex')

const state = localData
  ? localData.menu
  : {
      isCollapse: false, // 是否折叠
      selectMenu: [], // 当前选中的菜单
      routerList: [], // 路由列表
      menuActive: '1-1', // 当前激活的菜单
    }
// 改变菜单状态
const mutations = {
  // 折叠菜单
  collapseMenu(state: any) {
    state.isCollapse = !state.isCollapse
  },
  // 添加菜单
  addMenu(state: any, palyload: any) {
    //   对数据进行判断，防止重复添加
    if (state.selectMenu.findIndex((item: any) => item.path === palyload.path) === -1) {
      state.selectMenu.push(palyload)
    }
  },
  // 关闭菜单
  closeMenu(state: any, item: any) {
    //找到当前点击的菜单索引
    const index = state.selectMenu.findIndex((val: any) => val.name === item.name)
    //通过索引删除当前菜单
    state.selectMenu.splice(index, 1)
  },

  // 动态添加路由
  dynamicMenu(state: any, palyload: any) {
    console.log('动态添加路由', palyload)
    // 通过vit中import.meta.global函数从文件系统中动态导入路由模块
    const modules = import.meta.glob('../views/**/**.vue')
    console.log('文件系统中的路由模块', modules)
    // 通过权限拼接路由路径
    function routerSet(router: any) {
      router.forEach((item: any) => {
        // 判断有没有子菜单，拼接路由数据
        if (item.children) {
          // 递归调用，继续拼接
          routerSet(item.children)
        } else {
          console.log('拼接路由路由详情', item)
          // 拼接路由路劲
          // const path = `../main/${item.path}`
          // 将路由模块赋值给路由对象，方便后续使用
          item.component = modules[`../views${item.meta.path}/index.vue`]
          // 创建路由对象
          // const route = {
          //   path,
          // }
        }
      })
    }
    // 拿到完整的路由路径
    routerSet(palyload)
    // 添加到路由列表中
    state.routerList = palyload
  },
  // 更新选中菜单激活状态位置
  updateMenuActive(state: any, palyload: any) {
    state.menuActive = palyload
  },
}

// 将数据存储到vuex中，方便全局使用
export default {
  state,
  mutations,
  // 命名空间，防止命名冲突
  namespaced: true,
}
