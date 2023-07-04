<template>
  <div>
    <img class="user-poster" :src="Banner" />
    <section>
      <div class="first" @click="toReg">前往预约</div>
      <div class="last" @click="toInfo">已有预约，前往查看</div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Banner from '@/assets/banner.png';
import { reactive, ref } from 'vue';
import router from '@/router';

function toReg() {
  router.push('visitor-register');
}
function toInfo() {
  router.push('visitor-search');
}
</script>

<style lang="scss" scoped>
.user {
  &-poster {
    width: 100%;
    display: block;
    margin-bottom: 24px;
    height: 100%;
  }
}
section {
  padding: var(--van-padding-md);
  > div {
    font-size: 20px;
    border-radius: 5px;
    text-align: center;
    height: 100px;
    line-height: 100px;
    font-weight: 600;
    font-size: 24px;
    &.first {
      background-color: #8c52ff;
      color: #fff;
    }
    &.last {
      margin-top: 32px;
      background-color: #72c748;
      color: #fff;
    }
  }
}
</style>
