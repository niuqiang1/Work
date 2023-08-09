<template>
  <QRCodeVue3
    :width="200"
    :height="200"
    :value="content"
    :qrOptions="{
      typeNumber: 0,
      mode: 'Byte',
      errorCorrectionLevel: 'H',
    }"
    :imageOptions="{
      hideBackgroundDots: true,
      imageSize: 0.4,
      margin: 0,
    }"
    :dotsOptions="{
      type: 'square',
      color: qrColor,
      gradient: {
        type: 'linear',
        rotation: 0,
        colorStops: [
          { offset: 0, color: qrColor },
          { offset: 1, color: qrColor },
        ],
      },
    }"
    :backgroundOptions="{ color: '#ffffff' }"
    :cornersSquareOptions="{ type: 'square', color: qrColor }"
    :cornersDotOptions="{ type: 'square', color: qrColor }"
    fileExt="png"
    myclass="my-qur"
    imgclass="img-qr"
    :downloadOptions="{ name: 'vqr', extension: 'png' }"
  />
</template>

<script setup>
import QRCodeVue3 from 'qrcode-vue3';
import { watchEffect } from 'vue';
const props = defineProps({
  qrColor: {
    type: String,
  },
  content: {
    type: String,
    default: 'key',
  },
});

watchEffect(() => {
  console.log(props.content, 'pwpep');
});
</script>

<style></style>
