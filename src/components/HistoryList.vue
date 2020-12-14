<template>
  <div class="history-list">
    <div class="history-list-t">
      <span class="date">
        <slot name="date"></slot>
      </span>
      <span class="num">
        <slot name="num"></slot>
      </span>
    </div>

    <div class="history-list-b">
      <div class="history-list-item">
        <slot name="item">
          <div class="img-box">
            <slot name="img"></slot>
          </div>
          <div class="price">
            <span class="price-n">
              <slot name="price-n"></slot>
            </span>
            <span class="price-o">
              <slot name="price-o"></slot>
            </span>
          </div>
          <div class="desc">
            <slot name="desc">
            </slot>
          </div>
        </slot>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "historyList"
}
</script>
 <style lang="less" scoped>
.history-list {
  width: 100%;

  .history-list-t {
    width: 100%;
    padding: 0 20px;
    .date {
      font-size: 25px;
      font-weight: 700;
      margin-right: 10px;
    }
    .num {
    }
  }
  .history-list-b {
    width: 100%;
    overflow-x: auto;

    .history-list-item {
      width: 24%;
      display: flex;
      flex-direction: row;
      .img-box {
      }
      .price {
        margin-bottom: 20px;
        .price-n {
        }
        .price-o {
        }
      }
      .desc {
      }
    }
  }
}
</style>