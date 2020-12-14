import {
    request
} from './request'

// 获取购物车商品列表 
export function getAllProductList(userId) {
    return request({
        url: '/cart',
        method: 'post',
        data: {
            "userId": userId

        }
    })
}

// 移除购物车子项
export function removeProductListItem(userId, id) {
    return request({
        url: '/cart/items/remove',
        method: 'post',
        data: {
            "userId": userId,
            "orderItem": {
                "id": id
            }
        }
    })
}

// 清空全部购物车 
export function removeAllProductList(userId) {
    return request({
        url: '/cart/items/removeall',
        method: 'post',
        data: {
            'userId': userId
        }
    })
}

// 新增购物车
export function addProductListItem(userId, productId, quantity) {
    return request({
        url: '/cart/add',
        methods: 'post',
        data: {
            'userId': userId,
            'orderItem': {
                'productId': productId,
                'quantity': quantity
            }
        }
    })
}