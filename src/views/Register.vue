<template>
  <div class="login container-fluid">
    <!-- 注册登录 -->
    <div class="login-register flex-row-centerX">
      <div class="btn-group flex-row-centerX">
        <div class="login"><a href="login">登录</a></div>
        <div class="register"><a href="register">注册</a></div>
      </div>
    </div>
    <!-- //注册登录 -->

    <!-- 导航注册 -->
    <div class="nav flex-row-centerX">
      <div class="container">
        <div class="login">用户注册</div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="#">首页</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">注册</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- //导航注册 -->

    <!-- 注册主体 -->
    <div class="login-box">
      <div class="container flex-row-centerX">
        <div class="img-box col-md-6">
          <img
            class="img-responsive"
            src="@/assets/images/login-png.png"
            alt=""
          />
        </div>
        <div class="login-main col-md-6">
          <div class="title">注册</div>
          <form>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                id="username"
                placeholder="手机号码"
                v-model="userName"
              />
            </div>
            <div class="form-group">
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="密码"
                v-model="pwd"
              />
            </div>

            <button
              class="btn btn-primary btn-block"
              @click.prevent="Register(userName, pwd)"
            >
              注册
            </button>
            <div class="other flex-row-centerX">
              <a href="#">忘记密码</a>
              <a href="#">注册新用户</a>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- //注册主体 -->

    <!-- 注册页面底部 -->
    <Footer></Footer>
    <!-- //注册页面底部 -->
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import { getRegister } from "@/network/Login";

export default {
  name: "login",
  data() {
    return {
      userName: "",
      pwd: "",
    };
  },
  components: {
    Footer,
  },
  created() {},
  methods: {
    // 注册
    Register(userName, pwd) {
      getRegister(userName, pwd)
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          alert("注册失败！");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  //注册登录
  .login-register {
    justify-content: flex-end;
    .btn-group {
      font-size: 15px;
      .login {
        padding: 20px;
        &:hover {
          border-bottom: 2px solid #409EFF;
        }
        a {
          color: #7e8c8d;
          text-decoration: none;
          &:hover {
            color: black;
          }
        }
      }
      .register {
        padding: 20px;
        &:hover {
          border-bottom: 2px solid #409EFF;
        }
        a {
          color: #7e8c8d;
          text-decoration: none;
          &:hover {
            color: black;
          }
        }
      }
    }
  }
  //注册登录
  .nav {
    background-color: #F2F2F2;
    padding: 20px 0;
    .login {
      font-size: 25px;
    }
    .breadcrumb {
      background-color: #F2F2F2;
      font-size: 15px;
      margin-bottom: 0;
      padding-left: 0;
      padding-bottom: 0;
    }
  }
  //注册主体
  .login-box {
    padding: 70px 0 350px 0;
    .container {
      padding: 0 70px;
      .img-box {
        flex: 4;
        img {
          width: 100%;
        }
      }
      .login-main {
        flex: 3;
        .title {
          margin-bottom: 30px;
          font-weight: 700;
        }
        form {
          width: 350px;
          .form-group {
            input {
              padding: 15px;
            }
            ::-webkit-input-placeholder {
              font-size: 14px;
              color: #CED4DA;
            }
          }
          button {
            font-size: 13px;
            padding: 10px 0;
          }
          .other {
            justify-content: center;
            margin-top: 10px;
            a {
              color: orangered;
              text-decoration: none;
              font-size: 14px;
              margin: 0 10px;
              &:hover {
                color: black;
              }
            }
          }
        }
      }
    }
  }
}
</style>