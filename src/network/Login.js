import {
    request
} from './request'

// 登录请求
export function getLogin(userName, pwd) {
    return request({
        url: '/login',
        method: 'post',
        data: {
            'userName': userName,
            'pwd': pwd
        }
    })
}

// 注册请求
export function getRegister(userName, pwd) {
    return request({
        url: '/register',
        method: 'post',
        data: {
            'userName': userName,
            'pwd': pwd
        }
    })
}