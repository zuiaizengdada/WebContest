<template>
  <div class="page-goodCart container-fluid"
       id="GoodsCart">
    <div class="container">
      <!-- 购物车头部 -->
      <TopBar></TopBar>
      <!-- //购物车头部 -->

      <!-- 购物车主体 -->
      <main class="cart-main">
        <!-- 我的购物车 -->
        <div class="cart-title flex-row-centerX">
          <span>我的购物车</span>

          <!-- 面包屑导航 -->
          <nav aria-label="breadcrumb"
               id="nav">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/">首页</a></li>
              <li class="breadcrumb-item active"
                  aria-current="page">购物车</li>
            </ol>
          </nav>
          <!-- //面包屑导航 -->
        </div>
        <!-- 我的购物车 -->

        <!-- 购物车商品列表 -->
        <div class="cart-list flex-row">
          <!-- 购物车商品详情 -->
          <table class="table">
            <thead>
              <tr>
                <th scope="col">产品名称</th>
                <th scope="col">数量</th>
                <th scope="col">合计价格</th>
                <th scope="col">操作</th>
              </tr>
            </thead>
            <tbody>
              <!--eslint-disable-next-line-->
              <template v-for="orderItemList in GoodsCartList">
                <!--eslint-disable-next-line-->
                <tr v-for="item in orderItemList.productList">
                  <td>
                    <img :src="
                        'http://39.101.160.5:8080/Shopping' + item.defaultImg
                      "
                         alt="" />
                    <span>{{ item.name }}</span>
                  </td>
                  <td>
                    <span>{{ orderItemList.quantity }}x￥{{ item.price }}</span>
                  </td>
                  <td>
                    <span>￥{{
                        parseInt(orderItemList.quantity) * parseInt(item.price)
                      }}</span>
                  </td>
                  <td>
                    <button type="button"
                            class="btn btn-sm btn-danger del"
                            @click="removeProductListItem(userId, orderItemList.id)">
                      删除
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
            <div class="btn-group">
              <button type="button"
                      class="btn btn-sm btn-danger"
                      id="clearAll"
                      @click="removeAllProductList(userId)">
                清空购物车
              </button>
              <button type="button"
                      class="btn btn-sm btn-success"
                      id="update">
                更新购物车
              </button>
            </div>
          </table>
          <!-- //购物车商品详情 -->

          <!-- 商品结算 -->
          <div class="settlement">
            <div class="settlement-t">
              <div class="price flex-row-centerX">
                <span>商品总价：</span>
                <div>￥{{ price }}</div>
              </div>
              <div class="logistics flex-row-centerX">
                <span>物流费用：</span>
                <div>包邮</div>
              </div>
            </div>
            <div class="settlement-b">
              <div class="total flex-row-centerX">
                <span>合计金额：</span>
                <div id="big">￥{{ price }}</div>
              </div>
            </div>
            <button type="button"
                    class="btn btn-success"
                    @click="toOrderPayment(userId, GoodsCartList)">
              立即支付
            </button>
          </div>
          <!-- //商品结算 -->
        </div>
        <!-- //购物车商品列表 -->
      </main>
      <!-- //购物车主体 -->

      <!-- 购物车底部 -->
      <Footer></Footer>
      <!-- //购物车底部 -->
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";
import {
  getAllProductList,
  removeProductListItem,
  removeAllProductList,
} from "@/network/GoodsCart";
export default {
  data () {
    return {
      // 用户id
      userId: sessionStorage.getItem("userId"),
      //购物车商品列表
      GoodsCartList: [],
      //购物车商品数量
    };
  },
  components: {
    TopBar,
    Footer,
  },
  created () {
    this.getAllProductList(this.userId);
  },
  methods: {
    // 获取购物车商品列表
    getAllProductList (userId) {
      getAllProductList(userId).then((res) => {
        let { data: List } = res;
        this.GoodsCartList = List.orderItemList;
      });
    },

    // 移除购物车子项
    removeProductListItem (userId, id) {
      removeProductListItem(userId, id).then(() => {
        alert("移除成功");
        this.getAllProductList(userId);
      });
    },

    // 清空购物车
    removeAllProductList (userId) {
      removeAllProductList(userId).then(() => {
        this.getAllProductList(userId);
        alert("清空购物车成功");
      });
    },

    // 跳转订单支付界面
    toOrderPayment (userId, GoodsCartList) {
      if (GoodsCartList.length == 0) {
        alert("请先添加购物车")
        return false
      }
      this.$router.push({
        name: "orderpayment",
        params: {
          userId: userId,
          GoodsCartList: GoodsCartList,
        },
      });
    },
  },
  computed: {
    // 购物车商品总价
    price () {
      let price = this.GoodsCartList.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
      return price;
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  padding: 0;
  border: 1px solid #cccccc;
}

.container main .cart-title {
  background-color: #f2f2f2;
  height: 100px;
  padding-left: 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}

#nav {
  font-size: 10px;
}
.breadcrumb {
  margin-top: 15px;
  background-color: #f2f2f2;
}
.container main .cart-title span {
  font-size: 25px;
}

.container main .cart-list {
  margin-top: 50px;
  font-size: 14px;
}

.container main .cart-list .table {
  flex: 3;
}

.container main .cart-list .table thead tr th {
  padding: 0.65rem;
}

.container main .cart-list .table tbody tr td:not(:first-child) {
  line-height: 60px;
}
.container main .cart-list .table tbody tr td img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}

.container main .cart-list .settlement {
  flex: 1;

  height: 100%;
  padding: 5px 20px;
}
.container main .cart-list .settlement .settlement-t {
  margin-bottom: 50px;
}
.container main .cart-list .settlement .settlement-t .price {
  margin-bottom: 10px;
  justify-content: space-between;
}
.container main .cart-list .settlement .settlement-t .logistics {
  justify-content: space-between;
}

.container main .cart-list .settlement .settlement-b .total {
  justify-content: space-between;
}
.container main .cart-list .settlement .settlement-b .total span {
  font-weight: 700;
}
.container main .cart-list .settlement .settlement-b .total div {
  font-weight: 700;
  font-size: 20px;
}
.container main .cart-list .settlement button {
  display: block;
  margin: 20px auto 0;
}
.btn-group {
  margin-left: 100px;
}
.btn-group button {
  margin: 0 10px;
}
</style>
