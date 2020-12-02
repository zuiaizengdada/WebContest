import {
  request
} from './request'

// 商品详情数据
export function getGoodsDetail(productId) {
  return request({
    url: '/catalog/product/details',
    method: 'post',
    data: {
      'productId': parseInt(productId)
    }
  })
}

// 商品评论数据
export function getGoodsDetailComment(productId) {
  return request({
    url: '/catalog/product/reviews',
    method: 'post',
    data: {
      'productId': parseInt(productId)
    }
  })
}

// 热销商品数据
export function getHotGoodsData(productId) {
  return request({
    url: '/catalog/product/hot',
    method: 'post',
    data: {
      'productId': parseInt(productId)
    }
  })
}