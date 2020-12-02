<template>
  <div id="TopBar">
    <!-- 商品列表头部 -->
    <header class="goodList-header">
      <!-- 顶部区域 -->
      <div class="goodList-header-top">
        <ul class="flex-row-centerX">
          <li style="margin-right: 10px; font-size: 13px">
            欢迎{{ nickname }}
          </li>
          <li>
            <div class="dropdown">
              <a
                class="btn dropdown-toggle"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                会员中心
              </a>

              <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a class="dropdown-item" href="#" @click.prevent="toorder"
                  >历史订单</a
                >
                <a class="dropdown-item" href="#" @click.prevent="tocollection"
                  >收藏夹</a
                >
                <a class="dropdown-item" href="#" @click.prevent="tocontact"
                  >常用联系人</a
                >
                <a class="dropdown-item" href="#" @click.prevent="tosetting"
                  >个人设置</a
                >
                <a class="dropdown-item" href="#" @click.prevent="torecharge"
                  >充值</a
                >
                <a class="dropdown-item" href="#" @click.prevent="exit">退出</a>
              </div>
            </div>
          </li>
          <!-- <li><a href="#">注册</a></li>
          <li><a href="#"
               id="login"
               style="border-right: none">登录</a></li> -->
        </ul>
      </div>
      <!-- //顶部区域 -->

      <!-- 搜索区域 -->
      <div class="search-box flex-row-centerX">
        <!-- logo -->
        <div class="logo">
          <a href="#">
            <img src="@/assets/images/logo.gif" alt="" />
          </a>
        </div>
        <!-- //logo -->

        <!-- 搜索框 -->
        <div class="search input-group flex-row-centerX">
          <input
            type="text"
            class="form-control"
            placeholder="请输入查询关键字"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <div class="input-group-append">
            <button class="btn" type="button" id="button-addon2">搜索</button>
          </div>
        </div>
        <!-- //搜索框 -->

        <!-- 购物车 -->
        <div class="shopping-cart" @click="toGoodsCart">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            class="bi bi-cart3"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
            />
          </svg>
          <span class="badge badge-danger">{{ productCount }}</span>
        </div>
        <!-- //购物车 -->
      </div>
      <!-- //搜索区域 -->
    </header>
    <!-- //商品列表头部 -->
  </div>
</template>

<script>
import { getNickName } from "@/network/TopBar";
export default {
  name: "TopBar",
  data() {
    return {
      nickname: "",
      productCount: sessionStorage.getItem("productCount"),
    };
  },

  methods: {
    // 跳转购物车页面
    toGoodsCart() {
      this.$router.push({
        path: "/goodscart",
      });
    },
    //跳转历史订单的不同栏目

    toorder() {
      this.$router.push({
        name: "personalcenter",
        params: { curr: 0 },
      });
    },
    tocollection() {
      this.$router.push({
        name: "personalcenter",
        params: { curr: 1 },
      });
    },
    tocontact() {
      this.$router.push({
        name: "personalcenter",
        params: { curr: 2 },
      });
    },
    tosetting() {
      this.$router.push({
        name: "personalcenter",
        params: { curr: 3 },
      });
    },
    torecharge() {
      this.$router.push({
        name: "personalcenter",
        params: { curr: 4 },
      });
    },

    // 退出登录
    exit() {
      sessionStorage.clear();
      this.$router.push({
        path: "/login",
      });
    },
    // 获取昵称
    getNickName(userId) {
      getNickName(userId).then((res) => {
        let { data: userData } = res;
        this.nickname = userData.nickname;
      });
    },
  },
  created() {
    this.getNickName(Number(sessionStorage.getItem("token")));
  },
};
</script>

<style scoped>
.container header {
  width: 100%;
  height: 150px;
}
.container header .goodList-header-top {
  border-bottom: 1px solid #ccc;
}
.container header .goodList-header-top ul {
  height: 40px;
  justify-content: flex-end;
}
.container header .goodList-header-top ul a {
  text-decoration: none;
  font-size: 0.5em;
  padding: 5px 10px;
  border-right: 1px solid #ccc;
  color: black;
}
.container header .goodList-header-top ul #usericon {
  margin-right: -6px;
}
.container header .search-box {
  justify-content: space-between;
}
.container header .search-box .logo {
  margin-left: 20px;
}
.container header .search-box .logo img {
  width: 200px;
}
.container header .search-box .search {
  width: 50%;
  height: 100px;
  margin-right: 100px;
}
.container header .search-box .search input {
  padding: 0 10px;
  width: 50%;
  height: 40px;
  font-size: 15px;
  border-radius: 2px;
}
.container header .search-box .search button {
  background-color: orangered;
  width: 50px;
  height: 40px;
  font-size: 15px;
  border-radius: 2px;
  line-height: 0;
  color: white;
  padding: 0;
}
.container header .search-box .shopping-cart {
  margin-right: 15px;
}
.dropdown-menu {
  min-width: 0;
}
</style>
