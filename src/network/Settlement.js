import {
  request
} from './request'
// 商品结算
export function settlement(userId, orderNum, paymentType, contectId) {
  return request({
    url: '/order/PayMent',
    method: 'post',
    data: {
      "userId": userId,
      "orderNum": orderNum,
      "paymentType": paymentType,
      "contect": {
        "id": contectId
      }
    }
  })
}