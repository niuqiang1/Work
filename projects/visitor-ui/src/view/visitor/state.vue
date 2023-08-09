<template>
  <div class="state-content">
    <div class="state-info">
      <p class="title">{{ state.visitor.name }}</p>
      <p class="mobile">{{ state.visitor.phone }}</p>
      <Qr v-if="!loading" :content="state.content" :qr-color="qrColor"></Qr>
      <p class="time">预约时间：{{ reqTimestr }}</p>
      <p class="state">{{ qrState.msg }}</p>
      <p class="tips">{{ qrState.tips }}</p>
    </div>
  </div>
  <div class="state-back">
    <van-button plain type="primary" @click="toHome"> 返回首页</van-button>
  </div>
</template>
<script setup>
import QRCodeVue3 from 'qrcode-vue3';
import { useRouter, useRoute } from 'vue-router';
import { encrypt, decrypt } from '@/utils/crypto';
import { reactive, computed, onBeforeUnmount, onMounted, ref } from 'vue';
import dayjs from 'dayjs';
import http from '@/utils/request';
import Qr from './qr.vue';
const router = useRouter();
const route = useRoute();
const { id, status, name, phone, reqTime, idNo, deptId } = JSON.parse(
  decrypt(route.query.code)
);
const loading = ref(false);
const reqTimestr = dayjs(reqTime).format('YYYY-MM-DD');
const state = reactive({
  visitor: {
    state: '1',
    name,
    phone,
  },
  content: encrypt(`${name}|${id}|${{ 1: 3, 3: 4, 4: 4 }[status]}`),
});

const qrColor = computed(() => {
  return {
    1: '#07c160',
    3: '#1989fa',
    4: '#666666',
    0: '#333333',
  }[state.visitor.state];
});

const qrState = computed(() => {
  return {
    1: { msg: '预约成功', tips: '进入学校请出示二维码' },
    3: { msg: '已进校', tips: '离开学校请重新扫码' },
    4: { msg: '离校', tips: '离校学校' },
    0: { msg: '错误', tips: '未审核' },
  }[state.visitor.state];
});

function toHome() {
  router.push('/visitor/' + deptId);
}
const timer = setInterval(getStatus, 3000);

getStatus();

function getStatus() {
  http({
    url: 'visit/front/visitordetail/page',
    method: 'get',
    params: {
      phone,
      idno: idNo,
      deptId: deptId,
      reqTime: dayjs().format('YYYYMMDD'),
    },
  })
    .then((res) => {
      if (res.data.data && res.data.data.length > 0) {
        const { status: state1 } = res.data.data[0];

        if (state1 != state.visitor.state) {
          loading.value = true;
          state.visitor.state = state1;
          state.content = encrypt(
            `${name}|${id}|${{ 1: 3, 3: 4, 4: 4 }[state1]}`
          );
        }
      } else {
        showFailToast(
          '未查询到您' + dayjs().format('YYYY-MM-DD') + '的申请记录'
        );
        router.push('/visitor/' + deptId);
      }
    })
    .finally((_) => {
      loading.value = false;
    });
}
onBeforeUnmount((_) => {
  clearInterval(timer);
});
</script>
<style lang="scss" scoped>
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
      color: v-bind(qrColor);
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
