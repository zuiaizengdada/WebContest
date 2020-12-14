<template>
  <div class="info-box">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <slot name="box-main"></slot>
  </div>
</template>

<script>
export default {
  name: "info-box",
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
.info-box {
  width: 100%;
  border: 1px solid #e7e7e7;
  border-radius: 5px;

  .title {
    padding: 10px;
    border-bottom: 1px solid #e7e7e7;
    background-color: #f5f5f5;
  }
}
</style>