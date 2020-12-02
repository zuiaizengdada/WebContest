import Vue from 'vue'
import VueRouter from 'vue-router'

const GoodsIndex = () => import('@/views/GoodsIndex')
const GoodsDetail = () => import('@/views/GoodsDetail')
const GoodsCart = () => import('@/views/GoodsCart')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const PersonalCenter = () => import('@/views/PersonalCenter')

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: GoodsIndex
  }, {
    path: '/goodsdetail',
    component: GoodsDetail
  }, {
    path: '/goodscart',
    component: GoodsCart
  },
  {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Register
  }, {
    name: 'personalcenter',
    path: '/personalcenter',
    component: PersonalCenter
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router