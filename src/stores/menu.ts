const state = {
  isCollapse: false, // 是否折叠
  selectMenu: [], // 当前选中的菜单
}

const mutations = {
  collapseMenu(state: any) {
    state.isCollapse = !state.isCollapse
  },
  addMenu(state: any, palyload: any) {
    //   对数据进行判断，防止重复添加
    if (state.selectMenu.findIndex((item) => item.path === palyload.path) === -1) {
      state.selectMenu.push(palyload)
    }
  },

  closeMenu(state: any, item: any) {
    //找到当前点击的菜单索引
    const index = state.selectMenu.findIndex((val) => val.name === item.name)
    //通过索引删除当前菜单
    state.selectMenu.splice(index, 1)
  },
}

export default {
  state,
  mutations,
  namespaced: true,
}
