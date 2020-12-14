<template>
  <div class="orderpayment container-fluid">
    <div class="container">
      <!-- 订单支付头部 -->
      <TopBar></TopBar>
      <!-- //订单支付头部 -->
      <!-- 订单支付主体 -->
      <main class="orderpayment-main">
        <!-- 订单支付标题 -->
        <div class="orderpayment-title flex-row-centerX">
          <span>订单支付</span>
        </div>
        <!-- //订单支付标题 -->
        <!-- 商品支付列表 -->
        <div class="orderpayment-list flex-row">
          <!-- 商品详情 -->
          <table class="table">
            <thead>
              <tr>
                <th scope="col">产品名称</th>
                <th scope="col">数量</th>
                <th scope="col">合计价格</th>
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
                </tr>
              </template>
            </tbody>
          </table>
          <!-- //商品详情 -->

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
                    @click="settlement(userId, orderNum, paymentType, contectId)">
              立即结算
            </button>
          </div>
          <!-- //商品结算 -->
        </div>
        <!-- //订单支付列表 -->
        <!-- 常用联系人列表 -->
        <div class="contacts">
          <div class="tag">选择常用联系人</div>
          <div class="img-box">
            <img src="../assets/images/分割线.png"
                 alt="" />
          </div>
          <div class="contactslist">
            <div class="contactslistitem"
                 v-for="(item, index) in addressList"
                 :key="index">
              <input type="radio"
                     :value="item.id"
                     name="name"
                     @change="getContectId"
                     v-model="contectId" />
              姓名：{{ item.name }} 联系电话：{{ item.mobile }} 地址：{{
                item.address
              }}
            </div>
          </div>
        </div>
        <!-- //常用联系人列表 -->
        <!-- 支付方式 -->
        <div class="paymentmethod">
          <span @click="weixin"
                ref="weixin">微信支付</span>
          <span @click="zhifubao"
                ref="zhifubao">支付宝支付</span>
        </div>
        <!-- //支付方式 -->
      </main>
      <!-- //订单支付主体 -->
      <!-- 个人中心尾部 -->
      <Footer></Footer>
      <!-- //个人中心尾部 -->
    </div>
  </div>
</template>
<script>
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";
import { getCommonAddress } from "@/network/PersonalCenter";
import { settlement } from "@/network/Settlement";
export default {
  name: "orderpayment",
  data () {
    return {
      userId: "",
      GoodsCartList: [],
      addressList: [],
      paymentType: 2,
      orderNum: "",
      contectId: ""
    };
  },
  components: {
    TopBar,
    Footer,
  },

  created () {
    this.userId = this.$route.params.userId;
    this.GoodsCartList = this.$route.params.GoodsCartList;
    this.getCommonAddress(this.userId);
    console.log(this.GoodsCartList)
  },
  computed: {
    // 商品总价
    price () {
      let price = this.GoodsCartList.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity;
      }, 0);
      return price;
    },
  },
  methods: {
    getOderNum () {
      this.orderNum = this.GoodsCartList[0].orderNum
    },
    getContectId () {
      console.log(this.contectId)
    },
    // 获取常用收货地址列表
    getCommonAddress (userId) {
      getCommonAddress(userId).then((res) => {
        const { data: addressList } = res.data;
        this.addressList = addressList;
        console.log(this.addressList)
      });
    },
    // 商品结算
    settlement (userId, orderNum, paymentType, contectId) {
      settlement(userId, orderNum, paymentType, contectId).then(() => {
        alert("支付成功")
        this.$router.push({
          path: "/personalcenter"
        })
      });
    },
    // 微信支付
    weixin () {
      this.paymentType = 1;
      this.$refs.weixin.style.color = "red";
      this.$refs.zhifubao.style.color = "black";
    },
    // 支付宝支付
    zhifubao () {
      this.paymentType = 2;
      this.$refs.zhifubao.style.color = "red";
      this.$refs.weixin.style.color = "black";
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
.container main .orderpayment-title {
  background-color: #f2f2f2;
  height: 100px;
  padding-left: 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
.container main .orderpayment-title span {
  font-size: 25px;
}
.container main .orderpayment-list {
  margin-top: 50px;
  font-size: 14px;
}
.container main .orderpayment-list .table {
  flex: 3;
  background-color: #fdfdfd;
}
.container main .orderpayment-list .table thead tr th {
  padding: 0.65rem;
}
.container main .orderpayment-list .table tbody tr td:not(:first-child) {
  line-height: 60px;
}
.container main .orderpayment-list .table tbody tr td img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}

.container main .orderpayment-list .settlement {
  flex: 1;
  background-color: #fdfdfd;
  height: 100%;
  padding: 5px 20px;
  margin-left: 20px;
}
.container main .orderpayment-list .settlement .settlement-t {
  margin-bottom: 50px;
}
.container main .orderpayment-list .settlement .settlement-t .price {
  margin-bottom: 10px;
  justify-content: space-between;
}
.container main .orderpayment-list .settlement .settlement-t .logistics {
  justify-content: space-between;
}

.container main .orderpayment-list .settlement .settlement-b .total {
  justify-content: space-between;
}
.container main .orderpayment-list .settlement .settlement-b .total span {
  font-weight: 700;
}
.container main .orderpayment-list .settlement .settlement-b .total div {
  font-weight: 700;
  font-size: 20px;
}
.container main .orderpayment-list .settlement button {
  display: block;
  margin: 20px auto 0;
}
.container main .contacts {
  width: 71%;
}
.container main .contacts .tag {
  font-size: 20px;
  padding: 20px 10px;
}
.container main .contacts .img-box {
  width: 100%;
  padding: 0 10px;
}
.container main .contacts .img-box img {
  width: 100%;
}
.container main .contacts .contactslist {
  padding: 20px 10px;
}
.container main .contacts .contactslist .contactslistitem {
  font-size: 14px;
}
.container main .paymentmethod {
  padding: 20px 10px;
}

.container main .paymentmethod span {
  font-size: 25px;
  margin: 0 20px;
}
.container main .paymentmethod span:hover {
  font-size: 30px;
  color: red;
}
</style>