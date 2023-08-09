<template>
  <div class="content">
    <div v-show="!openScan" class="title">访客核验</div>
    <section v-show="!openScan">
      <div class="first" @click="changeOpen">
        <van-icon name="scan" />
        扫一扫
      </div>
    </section>

    <!-- <button @click="switchCamera">相机反转</button>
  <button @click="ClickFlash">打开手电筒</button> -->
    <div v-show="openScan" class="scan-box">
      <p class="tt">扫码验证</p>
      <qrcode-drop-zone @decode="onDecode">
        <qrcode-stream
          @decode="onDecode"
          :torch="torchActive"
          @init="onInit"
          :camera="camera"
          :track="track"
        >
          <div class="action-btn">
            <div>
              <span @click="switchCamera">相机反转</span>
              <span @click="turnCameraOff">关闭相机</span>
            </div>
          </div>
        </qrcode-stream>
      </qrcode-drop-zone>
    </div>
  </div>

  <!-- <van-dialog v-model:show="showModal" @close="close">
    <p>{{ state.visitor.username }}</p>
    <p>{{ state.visitor.phone }}</p>
    <p>{{ state.visitor.idNo }}</p>
    <p>{{ state.visitor.status }}</p>
  </van-dialog> -->
</template>

<script setup>
import { QrcodeStream, QrcodeDropZone } from 'qrcode-reader-vue3';
import { decrypt } from '@/utils/crypto';
import { showToast, showLoadingToast, showSuccessToast } from 'vant';
import { reactive } from 'vue';
import http from '@/utils/request';
import dayjs from 'dayjs';

import { ref } from 'vue';
let openScan = ref(false);
let camera = ref('rear');
let torchActive = ref(false);
let finished = ref(false);
let results = ref('');
let errorMessage = ref('');
let showModal = ref(false);

let state = reactive({
  visitor: {},
});
function track(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height },
    } = detectedCode;

    ctx.lineWidth = 2;
    ctx.strokeStyle = '#007bff';
    ctx.strokeRect(x, y, width, height);
  }
}

function changeOpen() {
  openScan.value = true;
  camera.value = 'rear';
}
function onDecode(result) {
  // result, 扫描结果，可以根据自己的需求来实现相应的功能
  let res = decrypt(result);
  res = res.split('|');
  console.log(res);
  state.visitor = {
    id: res[1],
    state: res[2],
    username: res[0],
  };
  showModal.value = true;
  //   turnCameraOff();
  getVisitorInfo();
}
function getVisitorInfo() {
  const loadingTst = showLoadingToast({
    message: '处理中...',
    forbidClick: true,
  });

  let params = {
    id: state.visitor.id,
    status: state.visitor.state,
  };
  if (state.visitor.state == 3) {
    params.comeTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }
  if (state.visitor.state == 4) {
    params.leaveTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
  }

  http
    .put('visit/visitordetail', params)
    .then((res) => {
      showSuccessToast({
        message: `访客：${state.visitor.username} ${
          { 3: '已通过', 4: '已离校' }[state.visitor.state]
        }`,
        duration: 3000,
      });
      // showSuccessToast('申请已驳回');
    })
    .finally((_) => {
      loadingTst.close();
    });
}

function changeStatus(status) {}
function close() {
  showModal.value = false;
  camera.value = 'rear';
}
// 相机反转
function switchCamera() {
  switch (camera.value) {
    case 'front':
      camera.value = 'rear';
      break;
    case 'rear':
      camera.value = 'front';
      break;
    default:
  }
}
// 关闭相机？？？？？？
function turnCameraOff() {
  openScan.value = false;
  camera.value = 'off';
}
// 打开手电筒
function ClickFlash() {
  switch (torchActive.value) {
    case true:
      torchActive.value = false;
      break;
    case false:
      torchActive.value = true;
      break;
    default:
  }
}

async function onInit(promise) {
  try {
    await promise;
    finished.value = true;
  } catch (error) {
    finished.value = false;
    if (error.name === 'StreamApiNotSupportedError') {
    } else if (error.name === 'NotAllowedError') {
      errorMessage.value = 'Hey! I need access to your camera';
    } else if (error.name === 'NotFoundError') {
      errorMessage.value = 'Do you even have a camera on your device?';
    } else if (error.name === 'NotSupportedError') {
      errorMessage.value =
        'Seems like this page is served in non-secure context (HTTPS, localhost or file://)';
    } else if (error.name === 'NotReadableError') {
      errorMessage.value = "Couldn't access your camera. Is it already in use?";
    } else if (error.name === 'OverconstrainedError') {
      errorMessage.value =
        "Constraints don't match any installed camera. Did you asked for the front camera although there is none?";
    } else {
      errorMessage.value = 'UNKNOWN ERROR: ' + error.message;
    }
    showToast(errorMessage.value);
  }
}
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  height: 100vh;
  .title {
    height: 15%;
    font-weight: 500;
    background-image: var(--van-gradient-orange);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: x-large;
    color: #fff;
  }
}
.scan-box {
  padding: var(--van-padding-md);
  height: 100%;
  background-color: #fff;
  p {
    &.tt {
      text-align: center;
      font-size: 30px;
      margin-bottom: var(--van-padding-lg);
    }
  }
}
.action-btn {
  > div {
    padding: 0px 20px 0px 20px;
    display: flex;
    justify-content: space-between;
    span {
      font-weight: 600;
      padding: 4px 8px;
      color: #fff;
      border-radius: 3px;
      background-color: rgba($color: #8c52ff, $alpha: 0.3);
    }
  }
  position: absolute;

  width: 100%;
  top: 10px;
}
section {
  margin-top: 40px;
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
