<template>
  <!-- 商品列表底部 -->
  <footer
    class="goodList-footer flex-row-centerX justify-content-center"
    id="Footer"
  >
    <div class="footer-title">
      <span>湖南省高职院校Web应用软件开发技能竞赛</span>
    </div>
  </footer>
  <!-- //商品列表底部 -->
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
};
</script>

<style scoped>
.goodList-footer {
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, #555555, #313131);
}
.goodList-footer .footer-title {
  color: white;
}
</style>
