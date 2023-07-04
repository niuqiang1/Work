<template>
  <div class="state-content">
    <div class="state-info">
      <p class="title">程建</p>
      <p class="mobile">18888888888</p>
      <QRCodeVue3
        :width="200"
        :height="200"
        value="https://www.baidu.com"
        :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'H' }"
        :imageOptions="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
        :dotsOptions="{
          type: 'square',
          color: '#8C52FF',
          gradient: {
            type: 'linear',
            rotation: 0,
            colorStops: [
              { offset: 0, color: '#8C52FF' },
              { offset: 1, color: '#8C52FF' }
            ]
          }
        }"
        :backgroundOptions="{ color: '#ffffff' }"
        :cornersSquareOptions="{ type: 'square', color: '#8C52FF' }"
        :cornersDotOptions="{ type: 'square', color: '#8C52FF' }"
        fileExt="png"
        myclass="my-qur"
        imgclass="img-qr"
        :downloadOptions="{ name: 'vqr', extension: 'png' }"
      />
      <p class="time">预约时间：2023-10-10</p>
      <p class="state">预约成功</p>
      <p class="tips">进入学校请出示二维码</p>
    </div>
  </div>
  <div class="state-back">
    <van-button plain type="primary" @click="toHome"> 返回首页</van-button>
  </div>
</template>
<script setup lang="ts">
import QRCodeVue3 from 'qrcode-vue3';
import { useRouter } from 'vue-router';
const router = useRouter();
function toHome() {
  router.push('/visitor');
}
</script>
<style lang="scss">
.state-content {
  height: 100vh;
  padding: 0 var(--van-padding-md);
  background: url('@/assets/bg.png') no-repeat;
  position: relative;
}
.state-back {
  text-align: center;
  bottom: 40px;
  position: absolute;
  border-radius: 5px;
  width: 100%;
  text-align: center;
}
.state-info {
  text-align: center;
  background-color: #ffffff;
  top: 10vh;
  position: relative;
  padding: var(--van-padding-md) 0;
  border-radius: 5px;
  p {
    margin: 0;
    &.title {
      color: #333333;
      font-weight: 600;
      margin: 0;
      padding-top: 15px;
      font-size: 30px;
    }
    &.mobile {
      color: #333333;
      font-weight: 500;
      margin: 0;
      font-size: 14px;
      margin-bottom: var(--van-padding-md);
    }
    &.time {
      color: #8c52ff;
      font-weight: 600;
      margin: 0;
      padding-top: var(--van-padding-md);
      font-size: 20px;
    }
    &.state {
      color: #72c748;
      font-weight: 600;
      margin: 0;
      padding-top: var(--van-padding-md);
      font-size: 28px;
    }
    &.tips {
      color: #999;
      font-weight: 400;
      margin: 0;
      padding-top: var(--van-padding-md);
      font-size: 14px;
    }
  }
}
.img-qr {
  border-radius: 5px;
}
</style>
