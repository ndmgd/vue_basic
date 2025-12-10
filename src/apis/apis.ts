import request from '../utils/test'

export const logintest = (data: any) => { 
    return request.post('user/logintest', data)
}