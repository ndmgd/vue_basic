import request from '../utils/test'

// 登录测试接口
export const logintest = (data: any) => { 
    return request.post('user/logintest', data)
}

// 获取用户级信息
export const getuser = (data: any) => {
    return request.get('user/getuser', data)
}

// 查询全部用户级数据
export const getUserScoreList = (params: any) => {
  return request.get('feellist/userscore', params  // 明确指定params为URL参数（axios标准写法）
  )
}

