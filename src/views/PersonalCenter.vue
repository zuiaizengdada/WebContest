<template>
  <div class="personalcenter container-fluid">
    <div class="container">
      <!-- 个人中心头部 -->
      <TopBar></TopBar>
      <!-- //个人中心头部 -->

      <!-- 个人中心主体 -->
      <main class="personalcenter-main">
        <!-- 个人中心 -->
        <div class="personalcenter-title">
          <div class="flex-row-centerX one">
            <span>个人中心</span>
            <!-- 面包屑导航 -->
            <nav aria-label="breadcrumb"
                 id="nav">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">首页</a></li>
                <li class="breadcrumb-item active"
                    aria-current="page">
                  个人中心
                </li>
                <li class="breadcrumb-item active"
                    aria-current="page"
                    ref="now_item">
                  我的订单
                </li>
              </ol>
            </nav>
            <!-- //面包屑导航 -->
          </div>
          <!-- tab栏切换 -->
          <ul class="nav nav-pills mb-3"
              id="pills-tab"
              role="tablist">
            <li class="nav-item"
                role="presentation">
              <a class="nav-link active"
                 id="pills-order-tab"
                 data-toggle="pill"
                 href="#pills-order"
                 role="tab"
                 aria-controls="pills-order"
                 aria-selected="true"
                 ref="order">我的订单</a>
            </li>
            <li class="nav-item"
                role="presentation"
                ref="contact">
              <a class="nav-link"
                 id="pills-contact-tab"
                 data-toggle="pill"
                 href="#pills-contact"
                 role="tab"
                 aria-controls="pills-contact"
                 aria-selected="false">常用联系人</a>
            </li>
            <li class="nav-item"
                role="presentation">
              <a class="nav-link"
                 id="pills-collection-tab"
                 data-toggle="pill"
                 href="#pills-collection"
                 role="tab"
                 aria-controls="pills-collection"
                 aria-selected="false"
                 ref="collection">我的收藏</a>
            </li>
            <li class="nav-item"
                role="presentation">
              <a class="nav-link"
                 id="pills-setting-tab"
                 data-toggle="pill"
                 href="#pills-setting"
                 role="tab"
                 aria-controls="pills-setting"
                 aria-selected="false"
                 ref="setting">个人设置</a>
            </li>
            <li class="nav-item"
                role="presentation">
              <a class="nav-link"
                 id="pills-recharge-tab"
                 data-toggle="pill"
                 href="#pills-recharge"
                 role="tab"
                 aria-controls="pills-recharge"
                 aria-selected="false"
                 ref="recharge">充值</a>
            </li>
            <li class="nav-item"
                role="presentation">
              <a class="nav-link"
                 id="pills-footprint-tab"
                 data-toggle="pill"
                 href="#pills-footprint"
                 role="tab"
                 aria-controls="pills-footprint"
                 aria-selected="false"
                 ref="footprint">我的足迹</a>
            </li>
          </ul>
          <!-- //tab栏切换 -->
        </div>
        <div class="tab-content"
             id="pills-tabContent">
          <!-- 我的订单 -->
          <div class="tab-pane fade show active"
               id="pills-order"
               role="tabpanel"
               aria-labelledby="pills-order-tab">
            <InformationBox>
              <span slot="title"
                    class="title5">我的订单</span>
              <div slot="box-main"
                   class="order">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">订单编号</th>
                      <th scope="col">联系人姓名</th>
                      <th scope="col">联系人电话</th>
                      <th scope="col">订单状态</th>
                      <th scope="col">订单金额</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in ordersList"
                        :key="index">
                      <td>{{item.orderNum}}</td>
                      <td>{{item.contactName}}</td>
                      <td>{{item.contactMobile}}</td>
                      <td>{{orderStatus(item.status)}}</td>
                      <td>{{item.price}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </InformationBox>
          </div>
          <!-- 常用联系人 -->
          <div class="tab-pane fade"
               id="pills-contact"
               role="tabpanel"
               aria-labelledby="pills-contact-tab">
            <InformationBox>
              <span slot="title"
                    class="title1">常用联系人</span>
              <div slot="box-main"
                   class="contact">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">默认联系人</th>
                      <th scope="col">联系人姓名</th>
                      <th scope="col">联系人电话</th>
                      <th scope="col">联系人地址</th>
                      <th scope="col">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in addressList"
                        :key="index">
                      <td>{{ item.contactFlag }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.mobile }}</td>
                      <td>{{ item.address }}</td>
                      <td>
                        <button type="button"
                                class="btn btn-sm btn-danger del"
                                @click="delCommonAddress(userId, item.id)">
                          删除</button><button type="button"
                                class="btn btn-sm btn-info edit"
                                data-toggle="modal"
                                data-target="#exampleModal"
                                data-whatever="@mdo">
                          修改
                        </button>
                        <button type="button"
                                class="btn btn-sm btn-secondary default"
                                @click="defaultCommonAddress(userId, item.id)">
                          设置默认地址
                        </button>
                        <div class="modal fade"
                             id="exampleModal"
                             tabindex="-1"
                             role="dialog"
                             aria-labelledby="exampleModalLabel"
                             aria-hidden="true">
                          <div class="modal-dialog">
                            <div class="modal-content">
                              <div class="modal-header">
                                <h5 class="modal-title"
                                    id="ModalLabel">
                                  修改地址
                                </h5>
                                <button type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                                </button>
                              </div>
                              <div class="modal-body">
                                <form>
                                  <div class="form-group">
                                    <label for="moren"
                                           class="col-form-label">默认联系人</label>
                                    <input type="text"
                                           class="form-control"
                                           id="moren"
                                           v-model="item.contactFlag" />
                                  </div>
                                  <div class="form-group">
                                    <label for="name"
                                           class="col-form-label">联系人姓名</label>
                                    <input type="text"
                                           class="form-control"
                                           id="name"
                                           v-model="item.name" />
                                  </div>
                                  <div class="form-group">
                                    <label for="phone"
                                           class="col-form-label">联系人电话</label>
                                    <input type="text"
                                           class="form-control"
                                           id="phone"
                                           v-model="item.mobile" />
                                  </div>
                                  <div class="form-group">
                                    <label for="address"
                                           class="col-form-label">联系人地址</label>
                                    <input type="text"
                                           class="form-control"
                                           id="address"
                                           v-model="item.address" />
                                  </div>
                                </form>
                              </div>
                              <div class="modal-footer">
                                <button type="button"
                                        class="btn btn-info"
                                        @click="editCommonAddress(userId, inputData)">
                                  保存修改
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="address">
                  <div class="address-t flex-row-centerX">
                    <div class="input1">
                      <label for="name">姓名 *</label>
                      <input type="text"
                             name="name"
                             id="name"
                             v-model="inputData.name" />
                    </div>
                    <div class="input2">
                      <label for="phone">电话 *</label>
                      <input type="text"
                             name="phone"
                             id="phone"
                             v-model="inputData.mobile" />
                    </div>
                  </div>
                  <div class="address-b">
                    <div class="input3">
                      <label for="address">地址 *</label>
                      <input type="text"
                             name="address"
                             id="address"
                             v-model="inputData.address" />
                    </div>
                  </div>
                </div>
                <div class="btn">
                  <button type="button"
                          class="btn btn-success"
                          @click="addCommonAddress(userId, inputData)">
                    保存联系人
                  </button>
                </div>
              </div>
            </InformationBox>
          </div>
          <!-- 我的收藏 -->
          <div class="tab-pane fade"
               id="pills-collection"
               role="tabpanel"
               aria-labelledby="pills-collection-tab">
            <InformationBox>
              <span slot="title"
                    class="title4">个人收藏</span>
              <div slot="box-main"
                   class="collection">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">商品名称</th>
                      <th scope="col">市场价格</th>
                      <th scope="col">店内价格</th>
                      <th scope="col">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!--eslint-disable-next-line-->

                    <!--eslint-disable-next-line-->
                    <tr v-for="(item, k) in wishlist">
                      <td>
                        <img :src="
                            'http://39.101.160.5:8080/Shopping' +
                            item.product.defaultImg
                          "
                             alt="" />
                        <span>{{ item.product.name }}</span>
                      </td>
                      <td>
                        <span>￥{{ item.product.price }}</span>
                      </td>
                      <td>
                        <span>￥{{ item.product.shopPrice }}</span>
                      </td>
                      <td>
                        <button type="button"
                                class="btn btn-sm btn-danger del"
                                @click="delwishList(userId, item.id)">
                          删除
                        </button>
                        <button type="button"
                                class="btn btn-sm btn-primary detail"
                                @click="toDetail(item.product.id)">
                          查看
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </InformationBox>
          </div>
          <!-- 个人设置 -->
          <div class="tab-pane fade"
               id="pills-setting"
               role="tabpanel"
               aria-labelledby="pills-setting-tab">
            <InformationBox>
              <span slot="title"
                    class="title2">个人信息设置</span>
              <div slot="box-main"
                   class="setting">
                <div class="setting-info">
                  <span>个人信息</span>
                  <div class="info flex-row-centerX">
                    <div class="input4">
                      <label for="nickname">昵称</label>
                      <input type="text"
                             name="nickname"
                             id="nickname"
                             v-model="userInfo.userInfo1.nickname" />
                    </div>
                    <div class="input5">
                      <label for="email">邮箱</label>
                      <input type="text"
                             name="email"
                             id="email"
                             v-model="userInfo.userInfo1.email" />
                    </div>
                    <div class="btn-box">
                      <button type="button"
                              class="btn btn-success btn1"
                              @click="editUserInfo(userId, userInfo.userInfo1)">
                        保存
                      </button>
                    </div>
                  </div>
                </div>
                <div class="setting-password">
                  <span>修改密码</span>
                  <div class="password-t">
                    <div class="input6">
                      <label for="nowpassword">输入当前密码</label>
                      <input type="text"
                             name="nowpassword"
                             id="nowpassword"
                             v-model="userInfo.userInfo2.oldpassword" />
                    </div>
                  </div>
                  <div class="password-b flex-row-centerX">
                    <div class="input7">
                      <label for="newpassword">新的密码</label>
                      <input type="text"
                             name="newpassword"
                             id="newpassword"
                             v-model="npassword" />
                    </div>
                    <div class="input8">
                      <label for="rnewpassword">确认密码</label>
                      <input type="text"
                             name="rnewpassword"
                             id="rnewpassword"
                             v-model="userInfo.userInfo1.rpassword" />
                    </div>
                  </div>
                  <div class="btn-box">
                    <button type="button"
                            class="btn btn-success btn2"
                            @click="undateUserPassword(userId, userInfo.userInfo2)">
                      保存
                    </button>
                  </div>
                </div>
              </div>
            </InformationBox>
          </div>
          <!-- 充值 -->
          <div class="tab-pane fade"
               id="pills-recharge"
               role="tabpanel"
               aria-labelledby="pills-recharge-tab">
            <InformationBox>
              <span slot="title"
                    class="title3">账户充值</span>
              <div slot="box-main"
                   class="wallet">
                <div class="balance">
                  当前电子钱包账户余额为：￥{{ balance }}
                </div>
                <div class="recharge">
                  <label for="recharge">请输入充值金额 *</label>
                  <input type="text"
                         name="recharge"
                         id="recharge"
                         placeholder="请输入充值金额"
                         v-model="walletList.amount" />
                  <div class="btn">
                    <button type="button"
                            class="btn btn-success"
                            @click="walletRecharge(userId, walletList)">
                      充值
                    </button>
                  </div>
                </div>
              </div>
            </InformationBox>
          </div>
          <!-- 我的足迹 -->
          <div class="tab-pane fade"
               id="pills-footprint"
               role="tabpanel"
               aria-labelledby="pills-footprint-tab">
            <InformationBox>
              <span slot="title"
                    class="title6">我的足迹</span>
              <div slot="box-main"
                   class="footprint">
                <!-- 今日历史 -->
                <HistoryList>
                  <span slot="date">{{tDate}}</span>
                  <span slot="num">{{todayHistoryList.length}}件商品</span>
                  <div class="item"
                       slot="item"
                       v-for="(item,index) in todayHistoryList"
                       :key="index"
                       style="margin-right: 20px">
                    <img :src="'http://39.101.160.5:8080/Shopping' + item.defaultImg"
                         alt="..."
                         slot="img"
                         width="200px">
                    <span slot="price-n"
                          style="font-size: 20px;
                          font-weight: 700;
                          margin-right: 10px;">¥{{item.shopPrice}}</span>
                    <span slot="price-o">¥{{item.price}}</span>
                    <p slot="desc"
                       style="margin-top:20px">{{item.name}}</p>
                  </div>
                </HistoryList>
                <!-- //今日历史 -->
                <!-- 历史足迹 -->
                <HistoryList>
                  <span slot="date">历史</span>
                  <span slot="num">{{allHistoryList.length}}件商品</span>
                  <div class="item"
                       slot="item"
                       v-for="(item,index) in allHistoryList"
                       :key="index"
                       style="margin-right: 20px">
                    <img :src="'http://39.101.160.5:8080/Shopping' + item.defaultImg"
                         alt="..."
                         slot="img"
                         width="200px">
                    <span slot="price-n"
                          style="font-size: 20px;
                          font-weight: 700;
                          margin-right: 10px;">¥{{item.shopPrice}}</span>
                    <span slot="price-o">¥{{item.price}}</span>
                    <p slot="desc"
                       style="margin-top:20px">{{item.name}}</p>
                  </div>
                </HistoryList>
                <!-- //历史足迹 -->
              </div>
            </InformationBox>
          </div>
        </div>
        <!-- //个人中心 -->
      </main>
      <!-- //个人中心主体 -->

      <!-- 个人中心尾部 -->
      <Footer></Footer>
      <!-- //个人中心尾部 -->
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";
import InformationBox from "@/components/InformationBox.vue";
import HistoryList from "@/components/HistoryList.vue";
import {
  addCommonAddress,
  getCommonAddress,
  delCommonAddress,
  editCommonAddress,
  defaultCommonAddress,
  editUserInfo,
  undateUserPassword,
  getWallet,
  walletRecharge,
  getwishList,
  delwishList,
  getOrdersList,
  getSameDayBrowse,
  getAllBrowse
} from "@/network/PersonalCenter";
export default {
  name: "personalcenter",
  data () {
    return {
      userId: parseInt(sessionStorage.getItem("userId")),
      curr: this.$route.params.curr,
      addressList: [],
      npassword: "",
      balance: "",
      wishlist: [],
      walletList: {
        amount: "",
        source: "充值",
        updtime: "",
      },
      userInfo: {
        userInfo1: {
          nickname: "",
          email: "",
        },
        userInfo2: {
          rpassword: "",
          oldpassword: "",
        },
      },
      inputData: {
        name: "",
        mobile: "",
        contactFlag: "",
        address: "",
      },
      ordersList: [],
      statusStr: ["订单编辑中", "已下单", "配送中", "配送完成", "订单取消"],
      allHistoryList: [],
      todayHistoryList: []
    };
  },
  components: {
    TopBar,
    Footer,
    InformationBox,
    HistoryList
  },
  mounted () {
    this.whichClick(this.curr);
    this.getCommonAddress(this.userId);
    this.getWallet(this.userId);
    this.walletList.updtime = this.updtime;
    this.getwishList(this.userId);
    this.getOrdersList(this.userId)
    this.getSameDayBrowse(this.userId)
    this.getAllBrowse(this.userId)
  },
  computed: {
    // 订单状态
    orderStatus () {
      return (statusNum) => {
        return this.statusStr[statusNum]
      }
    },
    // 时间
    updtime () {
      var date = new Date(); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let strDate = Y + M + D + h + m + s;
      return strDate;
    },
    // eslint-disable-next-line vue/return-in-computed-property
    tDate () {
      var date = new Date();
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + " ";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let strDate = M + D
      return strDate
    }
  },
  methods: {
    // 设置默认收货地址
    defaultCommonAddress (userId, id) {
      defaultCommonAddress(userId, id).then(() => { });
    },
    // 修改常用收货地址
    editCommonAddress (userId, inputData) {
      var list2 = [];
      for (let i in inputData) {
        list2.push(inputData[i]);
      }
      editCommonAddress(userId, ...list2).then(() => {
        alert("修改成功");
        this.getCommonAddress(this.userId);
      });
    },
    // 新增常用收货地址
    addCommonAddress (userId, inputData) {
      var list = [];
      for (let i in inputData) {
        list.push(inputData[i]);
      }
      addCommonAddress(userId, ...list).then(() => {
        alert("保存成功");
        this.getCommonAddress(this.userId);
      });
    },
    // 获取常用收货地址列表
    getCommonAddress (userId) {
      getCommonAddress(userId).then((res) => {
        const { data: addressList } = res.data;
        this.addressList = addressList;
      });
    },
    // 删除常用收货地址
    delCommonAddress (userId, id) {
      delCommonAddress(userId, id).then(() => {
        alert("移出购物车成功");
        this.getCommonAddress(this.userId);
      });
    },
    // 修改用户信息
    editUserInfo (userId, userInfo1) {
      var list3 = [];
      for (let i in userInfo1) {
        list3.push(userInfo1[i]);
      }
      console.log(list3);
      editUserInfo(userId, ...list3).then(() => {
        alert("修改成功");
      });
    },
    // 更新用户密码
    undateUserPassword (userId, userInfo2) {
      var list4 = [];
      for (let i in userInfo2) {
        list4.push(userInfo2[i]);
        if (this.npassword == userInfo2.rpassword) {
          userInfo2.rpassword = this.npassword;
        }
        return false;
      }
      undateUserPassword(userId, ...list4).then(() => {
        alert("修改成功");
      });
    },
    // 获取钱包对象
    getWallet (userId) {
      getWallet(userId).then((res) => {
        this.balance = res.data.amount;
      });
    },
    // 电子钱包充值
    walletRecharge (userid, walletList) {
      var list5 = [];
      for (let i in walletList) {
        list5.push(walletList[i]);
      }
      walletRecharge(userid, ...list5).then(() => {
        alert("充值成功");
        this.getWallet(userid);
      });
    },
    // 获取收藏列表
    getwishList (userId) {
      getwishList(userId).then((res) => {
        this.wishlist = res.data.wishlist;
      });
    },
    // 删除商品收藏
    delwishList (userId, wishlisId) {
      delwishList(userId, wishlisId).then(() => {
        alert("商品移除收藏成功");
        this.getwishList(userId);
      });
    },
    // 跳转商品详情页
    toDetail (id) {
      this.$router.push({
        path: "/goodsdetail",
        query: {
          productId: id,
        },
      });
    },
    // 获取订单列表
    getOrdersList (userId) {
      getOrdersList(userId).then((res) => {
        this.ordersList = res.data.orderListData
      })
    },
    // 获取当天历史记录
    getSameDayBrowse (userId) {
      getSameDayBrowse(userId).then((res) => {
        var todayHistoryList = []
        for (let i in res.data) {
          todayHistoryList.push(res.data[i].product)
        }
        this.todayHistoryList = todayHistoryList
        console.log(this.todayHistoryList)
      })
    },
    // 获取所有历史记录
    getAllBrowse (userId) {
      getAllBrowse(userId).then((res) => {

        var allHistoryList = []
        for (let i in res.data) {
          allHistoryList.push(res.data[i].product)
        }
        this.allHistoryList = allHistoryList

      })
    },
    // 下拉框选择
    whichClick (curr) {
      switch (curr) {
        case 0:
          document.getElementById("pills-order-tab").click();
          this.$refs.now_item.innerHTML = "个人中心"
          console.log(this.$refs.now_item)

          break;
        case 1:
          document.getElementById("pills-collection-tab").click();
          this.$refs.now_item.innerHTML = "常用联系人"
          console.log(this.$refs.now_item)

          break;
        case 2:
          document.getElementById("pills-contact-tab").click();
          this.$refs.now_item.innerHTML = "我的收藏"

          break;
        case 3:
          document.getElementById("pills-setting-tab").click();
          this.$refs.now_item.innerHTML = "个人设置"
          break;
        case 4:
          document.getElementById("pills-recharge-tab").click();
          this.$refs.now_item.innerHTML = "充值"
          break;
        case 5:
          document.getElementById("pills-footprint-tab").click();
          this.$refs.now_item.innerHTML = "我的足迹"
          break;
        default:
          break;
      }
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

.container main .personalcenter-title {
  background-color: #f2f2f2;
  height: 100px;
  padding-left: 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  height: 100%;
}
.container main .one {
  justify-content: space-between;
}
#nav {
  font-size: 10px;
}
.breadcrumb {
  margin-top: 15px;
  background-color: #f2f2f2;
}
.container main .personalcenter-title span {
  font-size: 25px;
}

.container main ul {
  margin-top: 20px;
}

.nav-pills .nav-link {
  color: black;
  background-color: #ededed;
  font-weight: 600;
  font-size: 14px;
}
.nav-pills .nav-link.active {
  background-color: #ffffff;
  color: black;
}
.tab-content {
  padding: 100px 30px;
}
.title1,
.title2,
.title3,
.title4,
.title5,
.title6 {
  font-weight: 700;
}
.wallet,
.footprint {
  width: 100%;
  padding: 20px 10px;
}
.balance {
  width: 250px;
  margin: 0 auto;
  font-weight: 700;
}
label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 15px;
}
#recharge {
  width: 100%;
  padding: 10px;
  border: 1px solid #e7e7e7;
}

::-webkit-input-placeholder {
  font-size: 14px;
}
.btn {
  margin-top: 60px;
  width: 100%;
}

table {
  width: 100%;
  margin-top: 40px;
}

table thead {
  width: 100%;

  background-color: #fcfbfb;
}

table thead tr th {
  font-size: 14px;
  font-weight: 700;
}

.address,
.setting {
  padding: 10px;
}
.address-t .input1,
.address-t .input2,
.setting-info .input4,
.setting-info .input5 {
  flex: 1;
}

.setting-info .input4,
.setting-info .input5 {
  margin-bottom: 50px;
}

.address-t .input1 input,
.address-t .input2 input,
.input3 input,
.setting-info .input4 input,
.setting-info .input5 input {
  width: 90%;
  border: 1px solid #f2f2f2;
  padding: 5px;
  margin-bottom: 20px;
}
.setting-info span,
.setting-password span {
  display: block;
  width: 100px;
  margin: 40px auto;
  font-weight: 700;
}

.address-b .input3 input {
  width: 100%;
  padding: 5px;
}
.del {
  margin-right: 10px;
}
.edit {
  margin-right: 10px;
}
.del,
.edit,
.default {
  margin-top: 0;
  width: auto;
}
.setting .btn {
  width: auto;
  float: right;
}
.password-t,
.password-t .input6,
.password-t .input6 input {
  width: 100%;
}

.password-b {
  justify-content: space-between;
  margin-top: 20px;
}

.input7,
.input8 {
  flex: 1;
}

.input7 input,
.input8 input {
  width: 90%;
}

.password-t .input6 input,
.password-b .input7 input,
.password-b .input8 input {
  border: 1px solid #f2f2f2;
  padding: 5px;
}

.table thead tr th {
  padding: 0.65rem;
}

.table tbody tr td img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  margin-right: 20px;
}
.collection .table tbody tr td .del,
.collection .table tbody tr td .detail {
  margin-top: 0;
  width: auto;
  float: none;
}
</style>