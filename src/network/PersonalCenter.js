import {
    request
} from './request'

// 新增常用收货地址
export function addCommonAddress(userId, name, mobile, contactFlag, address) {
    return request({
        url: '/user/add/contect',
        method: 'post',
        data: {
            "userId": userId,
            "name": name,
            "mobile": mobile,
            "contactFlag": contactFlag,
            "address": address
        }
    })
}
// 删除常用收货地址
export function delCommonAddress(userId, id) {
    return request({
        url: '/user/remove/contect',
        method: 'post',
        data: {
            "userId": userId,
            "id": id
        }
    })
}
// 修改常用收货地址
export function editCommonAddress(userId, name, mobile, contactFlag, address) {
    return request({
        url: '/user/update/contect',
        method: 'post',
        data: {
            "userId": userId,
            "name": name,
            "mobile": mobile,
            "contactFlag": contactFlag,
            "address": address
        }
    })
}

// 获取常用收货地址列表
export function getCommonAddress(userId) {
    return request({
        url: '/contect',
        method: 'post',
        data: {
            "userId": userId

        }
    })
}

// 设置默认收货地址
export function defaultCommonAddress(userId, id) {
    return request({
        url: '/user/contect/default',
        method: 'post',
        data: {
            "userId": userId,
            "id": id
        }
    })
}

// 修改用户信息
export function editUserInfo(userId, nickname, email) {
    console.log(nickname, email)
    return request({
        url: '/user/update/customer',
        method: 'post',
        data: {
            "id": userId,
            "nickname": nickname,
            "email": email
        }
    })
}

// 更新用户密码
export function undateUserPassword(userId, rpassword, oldpassword) {
    return request({
        url: '/user/change/password',
        method: 'post',
        data: {
            "userId": userId,
            "rpassword": rpassword,
            "oldpassword": oldpassword
        }
    })
}

// 获取电子钱包对象
export function getWallet(userId) {
    return request({
        url: '/account/userAccount',
        method: 'post',
        data: {
            "userId": userId
        }
    })
}

// 电子钱包充值
export function walletRecharge(userId, amount, source, updtime) {
    return request({
        url: '/account/recharge',
        method: 'post',
        data: {
            "userId": userId,
            "amount": amount,
            "source": source,
            "updtime": updtime
        }
    })
}

// 新增商品收藏
export function addwishList(productId, userId) {
    return request({
        url: '/user/add/wishlist',
        method: 'post',
        data: {
            "productId": productId,
            "userId": userId
        }
    })
}

// 删除商品收藏
export function delwishList(userId, wishlisId) {
    return request({
        url: '/user/remove/wishlist',
        method: 'post',
        data: {
            "userId": userId,
            "wishlisId": wishlisId
        }
    })
}

// 获取收藏列表
export function getwishList(userId) {
    return request({
        url: '/user/wishlist',
        method: 'post',
        data: {
            "userId": userId
        }
    })
}