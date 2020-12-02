<template>
  <div class="page-goodDetail container-fluid" id="GoodsDetail">
    <div class="container">
      <!-- 商品详情头部 -->
      <TopBar></TopBar>
      <!-- //商品详情头部 -->

      <!-- 商品详情主体 -->
      <main class="shopDetail-main">
        <!-- 商品标签 -->
        <div class="productLabels flex-row-centerX">
          <span>{{ goodsDetailData.name }}</span>
        </div>
        <!-- //商品标签 -->

        <!-- 商品详情 -->
        <div class="goodsDetailBox row">
          <!-- 图片轮播 -->
          <div id="img-carousel" class="carousel" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                data-target="#img-carousel"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#img-carousel" data-slide-to="1"></li>
              <li data-target="#img-carousel" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div
                :class="{ 'carouse-item': true, active: index == 1 }"
                v-for="(item, index) in goodsDetailData.productImageList"
                :key="index"
              >
                <img
                  :src="'http://39.101.160.5:8080/Shopping' + item.defaultImg"
                  class="d-block"
                  alt="..."
                />
              </div>
            </div>
          </div>

          <!-- //图片轮播 -->

          <!-- 商品购买 -->
          <div class="goodsBuy">
            <!-- 价格 -->
            <div class="goods-price flex-row-centerX">
              <!-- 旧价格 -->
              <div class="oldPrice">
                <del>市场价:￥{{ goodsDetailData.price }}</del>
              </div>
              <!-- //旧价格 -->

              <!-- 新价格 -->
              <div class="newPrice">￥{{ goodsDetailData.shopPrice }}</div>
              <!-- //新价格 -->

              <!-- 收藏 -->
              <div class="collection" @click="addwishList(productId, userId)">
                <svg
                  width="1em"
                  height="1em"
                  viewBox="0 0 16 16"
                  class="bi bi-heart-fill"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  />
                </svg>
              </div>
              <!-- //收藏 -->
            </div>
            <!-- //价格 -->

            <!-- 简介 -->
            <div class="goods-desc">
              <span class="desc">商品简介：</span>
              <p>{{ goodsDetailData.explain }}</p>
            </div>
            <!-- //简介 -->

            <!-- 数量 -->
            <div class="goods-count flex-row-centerX justify-content-around">
              <span class="title">购买数量</span>
              <div class="counter">
                <button class="sub" @click="sub">-</button>
                <span class="num">{{ count }}</span>
                <button class="add" @click="add">+</button>
              </div>
            </div>
            <!-- //数量 -->

            <!-- 商品操作 -->
            <div class="goods-option flex-row-centerX justify-content-center">
              <button
                class="addCart text-center"
                @click="addProductListItem(userId, productId, count)"
              >
                加入购物车
              </button>
              <button class="buyNow text-center">立即购买</button>
            </div>
            <!-- //商品操作 -->
          </div>
          <!-- //商品购买 -->

          <!-- 热销商品 -->
          <div class="goods-hot">
            <div class="goods-hot-title">热销商品</div>
            <!-- 商品展示 -->
            <ul class="list-unstyled goods-thumbnails">
              <li
                class="media"
                v-for="(item, index) in HotGoodsData"
                :key="index"
              >
                <img
                  :src="'http://39.101.160.5:8080/Shopping' + item.defaultImg"
                  alt="..."
                />
                <div class="media-body">
                  <h5 class="mt-0 mb-3">
                    {{ item.name }}
                  </h5>
                  <span class="newPrice">￥{{ item.shopPrice }}</span>
                  <del class="oldPrice">市场价￥￥{{ item.price }}</del>
                </div>
              </li>
            </ul>
            <!-- //商品展示 -->
          </div>
          <!-- //热销商品 -->
        </div>
        <!-- //商品详情 -->

        <!-- 商品tab栏 -->
        <ul class="nav nav-tabs" id="goodsTab" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              id="desc-tab"
              data-toggle="tab"
              href="#desc"
              role="tab"
              aria-controls="desc-tab"
              aria-selected="true"
              >商品描述</a
            >
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="comment-tab"
              data-toggle="tab"
              href="#comment"
              role="tab"
              aria-controls="comment-tab"
              aria-selected="false"
              >商品评论({{ goodsDetailComment.length }})</a
            >
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="desc"
            role="tabpanel"
            aria-labelledby="desc-tab"
          >
            {{ goodsDetailData.explain }}
          </div>
          <div
            class="tab-pane fade"
            id="comment"
            role="tabpanel"
            aria-labelledby="comment-tab"
          >
            <div
              v-for="(item, index) in goodsDetailComment"
              :key="index"
              class="comment-box"
            >
              <div style="display: flex" class="info">
                <div class="username">{{ item.user.nickname }}</div>
                <div class="datetime">{{ item.createTime }}</div>
              </div>

              <div class="comment">{{ item.content }}</div>
            </div>
          </div>
        </div>
        <!-- //商品tab栏 -->
      </main>
      <!-- //商品详情主体 -->

      <!-- 商品详情底部 -->
      <Footer></Footer>
      <!-- //商品详情底部 -->
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import Footer from "@/components/Footer.vue";

import {
  getGoodsDetail,
  getGoodsDetailComment,
  getHotGoodsData,
} from "@/network/GoodsDetail";

import { addwishList } from "@/network/PersonalCenter";

import { addProductListItem } from "@/network/GoodsCart";
export default {
  name: "GoodsDetail",
  data() {
    return {
      // 商品数量
      count: 1,
      //商品id
      productId: null,
      flag: false,
      // 商品详情数据
      goodsDetailData: [],
      // 商品评论
      goodsDetailComment: [],
      // 热门商品数据
      HotGoodsData: [],
      // 用户id
      userId: sessionStorage.getItem("userId"),
    };
  },
  components: {
    TopBar,
    Footer,
  },
  created() {
    this.getId();
    this.getGoodsDetail(this.productId);
    this.getGoodsDetailComment(this.productId);
    this.getHotGoodsData(this.productId);
  },
  methods: {
    // 获取id
    getId() {
      let id = this.$route.query.productId;
      this.productId = id;
    },
    // 商品详情数据
    getGoodsDetail(productId) {
      getGoodsDetail(productId).then((res) => {
        this.goodsDetailData = res.data;
      });
    },

    // 商品评论数据
    getGoodsDetailComment(productId) {
      getGoodsDetailComment(productId).then((res) => {
        this.goodsDetailComment = res.data;
      });
    },

    // 热销商品数据
    getHotGoodsData(productId) {
      getHotGoodsData(productId).then((res) => {
        this.HotGoodsData = res.data;
      });
    },
    add() {
      this.count++;
    },

    sub() {
      if (this.count == 0) {
        this.count = 1;
      }
      this.count--;
    },
    // 添加购物车
    addProductListItem(userId, productId, count) {
      addProductListItem(userId, productId, count).then(() => {
        alert("添加购物车成功");
      });
    },
    // 商品收藏
    addwishList(productId, userId) {
      addwishList(productId, userId).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
* {
  font-size: 14px;
}
.container main .productLabels {
  background-color: #f2f2f2;
  height: 100px;
  padding-left: 30px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.container main .productLabels span {
  font-size: 25px;
}
.container main .goodsDetailBox {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-around;
  margin-top: 50px;
}
.container main .goodsDetailBox .carousel {
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-left: 50px;
}
.container main .goodsDetailBox .carousel img {
  border-radius: 4px;
}
.container main .goodsDetailBox .carousel li {
  background-color: #ccc;
}
.container main .goodsDetailBox .carousel li:active {
  background-color: orangered !important;
}
.container main .goodsDetailBox .carousel .carousel-inner .carousel-item {
  width: 30%;
}
.container main .goodsDetailBox .goodsBuy {
  width: 30%;
  height: 220px;
}
.container main .goodsDetailBox .goodsBuy .goods-price {
  position: relative;
}
.container main .goodsDetailBox .goodsBuy .goods-price::before {
  content: "";
  background: url("../assets/images/分割线.png") no-repeat center;
  background-size: cover;
  height: 2px;
  width: 100%;
  position: absolute;
  bottom: -30px;
  left: 0;
}
.container main .goodsDetailBox .goodsBuy .goods-price .oldPrice {
  color: #ccc;
}
.container main .goodsDetailBox .goodsBuy .goods-price .newPrice {
  font-weight: 600;
  font-size: 16px;
  margin-left: 10px;
}
.container main .goodsDetailBox .goodsBuy .goods-price .collection {
  position: absolute;
  top: -7px;
  right: 0;
  border: 2px solid #ccc;
  border-radius: 2px;
  padding: 7px;
}
.container main .goodsDetailBox .goodsBuy .goods-desc {
  margin-top: 40px;
  position: relative;
}
.container main .goodsDetailBox .goodsBuy .goods-desc .desc {
  font-weight: 600;
}
.container main .goodsDetailBox .goodsBuy .goods-desc .desc::before {
  content: "";
  background: url("../assets/images/分割线.png") no-repeat center;
  background-size: cover;
  height: 2px;
  width: 100%;
  position: absolute;
  bottom: -45px;
  left: 0;
}
.container main .goodsDetailBox .goodsBuy .goods-count {
  margin-top: 60px;
}
.container main .goodsDetailBox .goodsBuy .goods-count .counter .num {
  padding: 8px 20px;
  border: 1px solid #ccc;
}
.container main .goodsDetailBox .goodsBuy .goods-count .counter button {
  padding: 8px;
  outline: none;
  border: 2px solid #ccc;
}
.container main .goodsDetailBox .goodsBuy .goods-option {
  margin-top: 25px;
}
.container main .goodsDetailBox .goodsBuy .goods-option .addCart,
.container main .goodsDetailBox .goodsBuy .goods-option .buyNow {
  padding: 10px;
  color: white;
  border: none;
  outline: none;
}
.container main .goodsDetailBox .goodsBuy .goods-option .addCart {
  background-color: #ffaa48;
  margin-right: 5px;
}
.container main .goodsDetailBox .goodsBuy .goods-option .buyNow {
  background-color: #ff674c;
}
.container main .goodsDetailBox .goods-hot {
  position: relative;
  width: 30%;
  height: 100%;
}
.container main .goodsDetailBox .goods-hot .goods-hot-title {
  font-weight: 600;
  font-size: 14px;
}
.container main .goodsDetailBox .goods-hot .goods-hot-title::before {
  content: "";
  width: 100%;
  height: 1px;
  border: 1px dashed #ccc;
  position: absolute;
  top: 20px;
  left: 0px;
}
.container main .goodsDetailBox .goods-hot .goods-thumbnails {
  margin-top: 20px;
}
.container main .goodsDetailBox .goods-hot .goods-thumbnails li {
  margin-bottom: 10px;
}
.container main .goodsDetailBox .goods-hot .goods-thumbnails li img {
  width: 100px;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.container main .goodsDetailBox .goods-hot .goods-thumbnails li h5 {
  color: red;
  font-size: 14px;
}
.container main .goodsDetailBox .goods-hot .goods-thumbnails li .newPrice,
.container main .goodsDetailBox .goods-hot .goods-thumbnails li .oldPrice {
  font-size: 14px;
}
.container main .nav .nav-item {
  border-radius: 0;
}
.container main .nav .nav-item .nav-link {
  padding: 7px;
  font-weight: 600;
}
.container main .tab-content {
  padding: 20px 0;
}
.container main .tab-content .comment-box {
  margin-bottom: 20px;
}

.container main .tab-content .comment-box .info {
  margin-bottom: 15px;
}

.container main .tab-content .comment-box .info .username {
  margin-right: 20px;
}
</style>
