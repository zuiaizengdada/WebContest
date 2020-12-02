<template>
  <div class="page-goodList container-fluid" id="GoodsIndex">
    <div class="container">
      <!-- 商品列表头部 -->
      <TopBar></TopBar>
      <!-- //商品列表头部 -->

      <!-- 商品列表主体 -->
      <main class="goodList-main">
        <!-- 当前水果分类 -->
        <div class="classification flex-row-centerX">
          <span>当前分类:&nbsp;&nbsp;</span>
          <span>{{ nowTitle }}</span>
        </div>
        <!-- //当前水果分类 -->

        <!-- 商品展示 -->
        <div class="goodsBox row">
          <!-- 商品列表 -->
          <div class="col-12 col-md-3 goodsList">
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <span class="nav-link" id="v-pills-classification-tab" role="tab"
                >分类</span
              >
              <a
                class="nav-link"
                id="v-pills-fruit-tab"
                data-toggle="pill"
                href="#v-pills-fruit"
                role="tab"
                v-for="(item, index) in GoodsData"
                :key="index"
                aria-controls="v-pills-fruit"
                aria-selected="true"
                @click="switchCondition(item)"
                >{{ item.name }}</a
              >
            </div>
          </div>
          <!-- //商品列表 -->

          <!-- 商品 -->
          <div class="col-12 col-md-9 goodsItem">
            <div class="tab-content" id="v-pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="v-pills-fruit"
                role="tabpanel"
                aria-labelledby="v-pills-fruit-tab"
              >
                <div class="row">
                  <div
                    class="col-6 col-md-3"
                    v-for="(item, index) in productList"
                    :key="index"
                    @click="toDetail(item.id)"
                  >
                    <div class="imgbox">
                      <img
                        :src="
                          'http://39.101.160.5:8080/Shopping' + item.defaultImg
                        "
                      />
                    </div>
                    <p class="goodsDesc">{{ item.explain }}</p>
                    <div class="goodsPrice flex-row-centerX">
                      <del class="oldPrice">￥{{ item.price.toFixed(1) }}</del>
                      <span class="newPrice"
                        >￥{{ item.shopPrice.toFixed(1) }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- //商品 -->

          <!-- 分页 -->
          <nav aria-label="Page navigation" class="goodsPeddle">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" v-for="(item, index) in 9" :key="index">
                <a class="page-link" href="#" @click="pageSize(index + 1)">{{
                  index + 1
                }}</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
          <!-- //分页 -->
        </div>
        <!-- //商品展示 -->
      </main>
      <!-- //商品列表主体 -->

      <!-- 商品列表底部 -->
      <Footer></Footer>
      <!-- //商品列表底部 -->
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";
import {
  getAllCondition,
  getNowConditionGoodsList,
  getUserInfoById,
} from "@/network/GoodsIndex";

import { getAllProductList } from "@/network/GoodsCart";
// import $ from 'jquery'
export default {
  name: "GoodsIndex",
  data() {
    return {
      // 商品分类数据
      GoodsData: [],
      nowTitle: "家电类",
      currentPage: 1,
      categoryId: 1,
      productList: [],
    };
  },

  created() {
    this.getAllCondition();
    this.getUserInfoById(this.$route.params.userId);
    this.getAllProductList(this.$route.params.userId);
  },

  components: {
    TopBar,
    Footer,
  },
  methods: {
    // 获取全部商品分类
    getAllCondition() {
      getAllCondition().then((res) => {
        this.GoodsData = res.data;
        this.getNowConditionGoodsList(
          (this.currentPage = 1),
          (this.categoryId = this.GoodsData[0].id)
        );
      });
    },
    // 获取当前分类商品列表
    getNowConditionGoodsList(currentPage, categoryId) {
      getNowConditionGoodsList(currentPage, categoryId).then((res) => {
        this.productList = res.data.productList;
      });
    },

    //获取第index+1页商品数据
    pageSize(currentPage) {
      this.getNowConditionGoodsList(currentPage);
    },
    // 切换分类
    switchCondition(item) {
      this.nowTitle = item.name;
      this.categoryId = item.id;
      this.getNowConditionGoodsList(this.currentPage, this.categoryId);
    },
    // 跳转商品详情页面
    toDetail(id) {
      this.$router.push({
        path: "/goodsdetail",
        query: {
          productId: id,
        },
      });
    },
    // 根据用户id查询用户信息
    getUserInfoById(id) {
      getUserInfoById(id).then((res) => {
        const { data: userData } = res;
        this.userDataId = userData.id;
        sessionStorage.setItem("userId", this.userDataId);
      });
    },
    // 获取购物车商品列表
    getAllProductList(userId) {
      getAllProductList(userId).then((res) => {
        let { data: List } = res;
        sessionStorage.setItem("productCount", List.orderItemList.length);
      });
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

.container main .classification {
  background-color: #f2f2f2;
  height: 100px;
  padding-left: 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.container main .classification span {
  font-size: 25px;
}
.container main .goodsBox {
  margin-top: 50px;
}
.container main .goodsBox .goodsList {
  padding: 0 40px;
}
.container main .goodsBox .goodsList #v-pills-classification-tab {
  font-weight: 600;
  text-indent: -9px;
  margin-bottom: 8px;
  font-size: 15px;
}
.container main .goodsBox .goodsList .nav-link {
  padding: 5px 10px;
  margin-bottom: 5px;
  font-size: 14px;
}
.container main .goodsBox .goodsItem #v-pills-fruit {
  padding: 0 30px;
}
.container main .goodsBox .goodsItem #v-pills-vegetables-egg {
  padding: 0 30px;
}
.container main .goodsBox .goodsItem #v-pills-meat {
  padding: 0 30px;
}
.container main .goodsBox .goodsItem #v-pills-test {
  padding: 0 30px;
}

.container main .goodsBox .goodsItem #v-pills-fruit div.row div.col-6,
.container main .goodsBox .goodsItem #v-pills-vegetables-egg div.row div.col-6,
.container main .goodsBox .goodsItem #v-pills-meatdiv div.row div.col-6,
.container main .goodsBox .goodsItem #v-pills-test div.row div.col-6 {
  width: 25%;
  cursor: pointer;
  float: left;
  margin-bottom: 40px;
}
.container main .goodsBox .goodsItem #v-pills-fruit div.row div.col-6 img,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-vegetables-egg
  div.row
  div.col-6
  img,
.container main .goodsBox .goodsItem #v-pills-meat div.row div.col-6 img,
.container main .goodsBox .goodsItem #v-pills-test div.row div.col-6 img {
  border: 1px solid #ccc;
  width: 100%;
  transition: all 0.3s;
}
.container main .goodsBox .goodsItem #v-pills-fruit div.row div.col-6 img:hover,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-vegetables-egg
  div.row
  div.col-6
  img:hover,
.container main .goodsBox .goodsItem #v-pills-meat div.row div.col-6 img:hover,
.container main .goodsBox .goodsItem #v-pills-test div.row div.col-6 img:hover {
  transform: scale(1.1);
}
.container main .goodsBox .goodsItem #v-pills-fruit div.row div.col-6 p,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-vegetables-egg
  div.row
  div.col-6
  p,
.container main .goodsBox .goodsItem #v-pills-meat div.row div.col-6 p,
.container main .goodsBox .goodsItem #v-pills-test div.row div.col-6 p {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 81%;
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
}
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-fruit
  div.row
  div.col-6
  .goodsPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-vegetables-egg
  div.row
  div.col-6
  .goodsPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-meat
  div.row
  div.col-6
  .goodsPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-test
  div.row
  div.col-6
  .goodsPrice {
  width: 80%;
  justify-content: space-around;
}
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-fruit
  div.row
  div.col-6
  .goodsPrice
  .oldPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-vegetables-egg
  div.row
  div.col-6
  .goodsPrice
  .oldPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-meat
  div.row
  div.col-6
  .goodsPrice
  .oldPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-test
  div.row
  div.col-6
  .goodsPrice
  .oldPrice {
  margin-left: 10px;
}
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-fruit
  div.row
  div.col-6
  .goodsPrice
  .newPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-vegetables-egg
  div.row
  div.col-6
  .goodsPrice
  .newPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-meat
  div.row
  div.col-6
  .goodsPrice
  .newPrice,
.container
  main
  .goodsBox
  .goodsItem
  #v-pills-test
  div.row
  div.col-6
  .goodsPrice
  .newPrice {
  font-size: 15px;
  font-weight: 600;
  margin-right: 10px;
}
.container main .goodsBox .goodsPeddle {
  margin: 60px auto;
}
.container main .goodsBox .goodsPeddle .page-link {
  padding: 10px;
  line-height: 10px;
  margin: 0 1px;
  color: black;
}
.container main .goodsBox .goodsPeddle .page-link:focus {
  box-shadow: none;
}
.container main .goodsBox .goodsPeddle .page-link:hover {
  background-color: orangered;
  color: white;
}
.container main .goodsBox .goodsPeddle .page-item:first-child .page-link {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.container main .goodsBox .goodsPeddle .page-item:last-child .page-link {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
