<template>
  <div v-for="visitor in data" class="v-item">
    <div class="v-left">
      <van-image
        round
        width="40px"
        height="40px"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <div class="v-mid">
      <p class="v-name">
        {{ visitor.name }} <span>{{ visitor.mobile }}</span>
      </p>
      <p class="v-remark">{{ visitor.remark }}</p>
    </div>
    <div class="v-button" @click="checkVisit(visitor)">
      <span>审核</span>
    </div>
  </div>
</template>
<script setup>
import { showDialog } from 'vant';

const props = defineProps({
  checkType: {
    type: Number,
  },
});

console.log(props.checkType);

const data = [
  {
    carNo: '进A11122',
    idNo: '1212121212',
    mobile: '13333333333',
    name: '这种',
    remark: '来访事由来访事由来访事由来访事由',
    visitId: 0,
  },
  {
    carNo: '进A11122',
    idNo: '1212121212',
    mobile: '13333333333',
    name: '这种',
    remark: '来访事由来访事由来访事由来访事由',
    visitId: 0,
  },
  {
    carNo: '进A11122',
    idNo: '1212121212',
    mobile: '13333333333',
    name: '这种',
    remark: '来访事由来访事由来访事由来访事由',
    visitId: 0,
  },
  {
    carNo: '进A11122',
    idNo: '1212121212',
    mobile: '13333333333',
    name: '这种',
    remark: '来访事由来访事由来访事由来访事由',
    visitId: 0,
  },
  {
    carNo: '进A11122',
    idNo: '1212121212',
    mobile: '13333333333',
    name: '这种',
    remark: '来访事由来访事由来访事由来访事由',
    visitId: 0,
  },
  {
    carNo: '进A11122',
    idNo: '1212121212',
    mobile: '13333333333',
    name: '这种',
    remark: '来访事由来访事由来访事由来访事由',
    visitId: 0,
  },
  {
    carNo: '进A11122',
    idNo: '1212121212',
    mobile: '13333333333',
    name: '这种',
    remark: '来访事由来访事由来访事由来访事由',
    visitId: 0,
  },
  {
    carNo: '进A11122',
    idNo: '1212121212',
    mobile: '13333333333',
    name: '这种',
    remark: '来访事由来访事由来访事由来访事由',
    visitId: 0,
  },
];

function checkVisit(visitor) {
  showDialog({
    message: '确定审核通过' + visitor.name + '?',
  });
}
</script>
<style lang="scss" scoped>
.v-item {
  display: flex;
  justify-content: space-between;
  .v-button {
    display: flex;
    color: var(--van-primary-color);
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding-right: var(--van-padding-sm);
    font-weight: 500;
  }
  .v-left {
    flex-shrink: 0;
    padding: var(--van-padding-sm);
  }
  .v-mid {
    padding: var(--van-padding-sm);
    padding-left: 0;

    .v-name {
      font-size: 18px;
      color: var(--van-text-color-1);

      span {
        font-size: 14px;
        color: var(--van-text-color-2);
      }
    }
    .v-remark {
      font-size: 14px;
      color: var(--van-text-color-1);
    }
  }
  p {
    padding: 0;
    margin: 0;
  }
  & + .v-item {
    border-top: 1px solid var(--van-gray-2);
  }
}
</style>
