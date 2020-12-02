import {
    request
} from './request'

export function getNickName(userId) {
    return request({
        url: '/get/user/basic',
        methods: 'post',
        data: {
            'userId': userId
        }
    })
}