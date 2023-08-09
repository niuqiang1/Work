<template>
  <div>
    <div v-show="!dataList.length">
      <van-empty description="暂无数据" />
    </div>
    <div v-for="visitor in props.dataList" :key="visitor.id" class="ss-item">
      <div class="ss-left">
        <van-image
          round
          width="40px"
          height="40px"
          :src="
            visitor.headUrl ||
            'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
          "
        />
        <div class="ss-mid">
          <p class="ss-name">
            {{ visitor.name }} <span>{{ visitor.phone }}</span>
          </p>
          <p class="ss-remark">{{ visitor.cause }}</p>
        </div>
      </div>

      <div class="ss-button" @click="checkVisit(visitor)">
        <span>{{ props.checkType == 1 ? '审核' : '查看' }} </span>
      </div>
    </div>
    <van-dialog
      v-model:show="showCheck"
      show-cancel-button
      :show-confirm-button="props.checkType == 1"
      confirmButtonText="通过"
      cancelButtonText="关闭"
      @confirm="confirm"
      @cancel="reject"
    >
      <user-card :user-info="state.currentUser"></user-card>
    </van-dialog>
  </div>
</template>
<script setup>
import { showSuccessToast } from 'vant';
import userCard from './userCard.vue';
import { reactive, ref, defineEmits, watchEffect, nextTick } from 'vue';
import http from '@/utils/request';
import dayjs from 'dayjs';
const showCheck = ref(false);
const emit = defineEmits(['success']);
const state = reactive({
  currentUser: {},
});
const props = defineProps({
  dataList: {
    type: Array,
    default() {
      return [];
    },
  },
  checkType: {
    type: String,
    default() {
      return '1';
    },
  },
});

watchEffect(() => {});

function checkVisit(visitor) {
  state.currentUser = visitor;
  showCheck.value = true;
}
function reject() {
  console.log(32323);
  changeStatus(2);
}
function confirm() {
  changeStatus(1);
}
function changeStatus(status) {
  if (status == 1) {
    http
      .put('visit/visitordetail', {
        id: state.currentUser.id,
        status,
        auditTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
      .then((res) => {
        emit('success');
      });
  }
  return;
}
</script>
<style lang="scss" scoped>
.ss-item {
  display: flex;
  justify-content: space-between;
  .ss-button {
    display: flex;
    color: var(--van-primary-color);
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding-right: var(--van-padding-sm);
    font-weight: 500;
  }
  .ss-left {
    flex: 1;
    padding: var(--van-padding-sm);
    display: flex;
    .van-image {
      flex-shrink: 0;
    }
  }
  .ss-mid {
    padding-left: var(--van-padding-md);

    .ss-name {
      font-size: 18px;
      color: var(--van-text-color-1);

      span {
        font-size: 14px;
        color: var(--van-text-color-2);
      }
    }
    .ss-remark {
      font-size: 14px;
      color: var(--van-text-color-1);
    }
  }
  p {
    padding: 0;
    margin: 0;
  }
  & + .ss-item {
    border-top: 1px solid var(--van-gray-2);
  }
}
</style>
