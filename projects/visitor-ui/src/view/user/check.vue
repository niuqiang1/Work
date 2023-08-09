<template>
  <div class="check-content" :class="{ showbg: backC == '#f8f8f8' }">
    <div class="user-info">
      <div style="display: flex">
        <van-image
          round
          width="70px"
          height="70px"
          :src="
            userInfo.headUrl ||
            'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
          "
        />
        <div class="info">
          <p class="title">{{ userInfo.realName }}</p>
          <p class="mobile">{{ userInfo.username }}</p>
        </div>
      </div>
      <div class="code">
        <span>
          联系码：<b>{{ userInfo.authCode }}</b>
        </span>
      </div>
    </div>

    <div class="check-info">
      <van-tabs v-model:active="active" sticky border>
        <van-tab title="待审核">
          <CheckList
            :data-list="waitAuditList"
            checkType="1"
            @success="checkSuccess"
          ></CheckList
        ></van-tab>
        <van-tab title="已审核">
          <CheckList checkType="2" :data-list="auditedList"></CheckList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup>
import { showToast } from 'vant';
import CheckList from './checkList.vue';
import { nextTick, reactive, ref, shallowRef } from 'vue';
import { onMounted, unref } from 'vue';
import http from '@/utils/request';
import { useRoute } from 'vue-router';
import { showSuccessToast } from 'vant';
const route = useRoute();
let userInfo = shallowRef({
  authCode: '',
  deptId: 0,
  email: '',
  headUrl: '',
  idNo: '',
  mobile: '',
  realName: '',
  username: '',
});

let auditedList = ref();
let waitAuditList = ref();
const active = ref(0);
const backC = ref('#f8f8f8');
// const onClickTab = ({ title }) => showToast(title);
function handleScroll() {
  nextTick(() => {
    let scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;
    if (scrollTop > 100) {
      backC.value = '#6580ff';
    } else {
      backC.value = '#f8f8f8';
    }
    document.body.style.backgroundColor = backC.value;
  });
}
function getUserInfo() {
  http
    .get('/sys/user/info')
    .then(({ data }) => {
      if (data.code != 0) {
        return showToast(data.msg);
      }
      userInfo.value = data.data;
      getCheckList(userInfo.value.authCode);
    })
    .catch((_) => {});
}

function checkSuccess() {
  console.log(3);
  showSuccessToast({ message: '审核通过' });
  getCheckList(userInfo.value.authCode);
}

function getCheckList(authCode) {
  http.post('/visit/front/visitordetail/Tpage', { authCode }).then((res) => {
    auditedList.value = res.data.data.auditedList || [];
    waitAuditList.value = res.data.data.waitAuditList || [];
    console.log(auditedList.value, waitAuditList.value, 'pp');
  });
}
getUserInfo();

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

// 获取信息
</script>
<style lang="scss" scoped>
.user-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  :deep(.van-image) {
    border: 2px solid #fff !important;
  }
  .code {
    color: #fff;
  }
  :deep() .van-tabs--line .van-tabs__wrap {
    border-radius: 5px !important;
    background-color: #fff !important;
  }
  .info {
    padding-left: 20px;
  }
  p {
    color: #ffffff;
    margin: 0;
    &.title {
      font-weight: 600;
      margin: 0;
      padding-top: 15px;
      font-size: 24px;
    }
    &.mobile {
      font-weight: 500;
      margin: 0;
      font-size: 14px;
      margin-bottom: var(--van-padding-md);
    }
  }
}
.check-content {
  padding: 0 var(--van-padding-md);
  position: relative;
  transition: all 0.5s ease-in;
  &.showbg {
    background: url('@/assets/bg.png') no-repeat;
    background-size: cover;
  }
  padding-top: 34px;
  padding-bottom: 40px;
}
.check-back {
  text-align: center;
  bottom: 40px;
  position: absolute;
  border-radius: 5px;
  width: 100%;
  text-align: center;
}
.check-info {
  background-color: #ffffff;
  border-radius: 5px;
  margin-top: 20px;
}
.img-qr {
  border-radius: 5px;
}
</style>
