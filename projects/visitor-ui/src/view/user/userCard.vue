<template>
  <section class="card">
    <div class="user-info">
      <van-image
        width="80"
        height="80"
        round
        fit="cover"
        :src="
          userInfo.headUrl ||
          'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
        "
      />
      <div class="user-info-detail">
        <p class="p1">
          <b>{{ userInfo.name }}</b>
        </p>
        <p class="p2">手机号：{{ userInfo.phone || 16555535553 }}</p>
        <p class="p3">身份证：{{ userInfo.idNo || 142211111111111112 }}</p>
        <p class="p4">
          预约日期：{{ dayjs(userInfo.reqTime).format('YYYY-MM-DD') }}
        </p>
      </div>
    </div>
    <span>事由</span>

    <div class="case-info">
      <span class="case-detail" style="color: var(--van-gray-8)">{{
        userInfo.cause || '预约日期预约日期预约日期预约日期'
      }}</span>
    </div>
  </section>
</template>
<script setup>
import dayjs from 'dayjs';
import { defineProps } from 'vue';

const props = defineProps({
  userInfo: {
    type: Object,
    default() {
      return {};
    },
  },
});
</script>

<style scoped lang="scss">
.card {
  padding: var(--van-padding-md);
  .user-info {
    display: flex;
    gap: 20px;
    padding-bottom: var(--van-padding-md);

    &-detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      p {
        font-size: var(--van-font-size-sm);
        color: var(--van-gray-8);
        &.p1 {
          font-size: var(--van-font-size-lg);
          font-weight: var(--van-font-blod);
        }
      }
    }
  }
  .case-info {
    border: 1px dashed var(--van-orange-dark);
    padding: var(--van-padding-sm);
    .case-detail {
      font-size: var(--van-font-size-md);
      color: var(--van-gray-8);
    }
  }
}
</style>
