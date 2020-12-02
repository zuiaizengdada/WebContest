import {
    request
} from './request'

// 全部商品分类
export function getAllCondition() {
    return request({
        url: '/catalog/category/condition'
    })
}

// 获取分类商品列表
export function getNowConditionGoodsList(categoryId, currentPage) {
    return request({
        url: '/catalog/product',
        method: 'post',
        data: {
            'currentPage': currentPage,
            'categoryId': categoryId
        }
    })
}

export function getUserInfoById(userId) {
    return request({
        url: '/get/user/basic',
        method: 'post',
        data: {
            'userId': userId
        }
    })
}