<template>
  <div>
    <img class="user-poster" :src="Banner" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.phone"
          name="phone"
          label="手机号"
          placeholder="手机号"
          :rules="[
            {
              message: '请填写正确的手机号',
              pattern:
                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            },
          ]"
        />
        <van-field
          v-model="formData.idNo"
          name="idNo"
          label="身份证"
          placeholder="身份证"
          :rules="[
            {
              required: false,
              pattern:
                /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '请填正确的身份证',
            },
          ]"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          查询
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import Banner from '@/assets/banner.png';
import { reactive, ref, unref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import http from '@/utils/request';
import { showFailToast, showToast } from 'vant';
import dayjs from 'dayjs';
import { encrypt } from '@/utils/crypto';

const router = useRouter();
const route = useRoute();

const showForm = ref(true);
const deptId = route.params.deptId;
const formData = reactive({
  phone: unref(route).query.phone,
  idNo: unref(route).query.idNo,
});

function onSubmit(values) {
  console.log(values);
  http({
    url: 'visit/front/visitordetail/page',
    method: 'get',
    params: {
      phone: values.phone,
      idno: values.idNo,
      deptId: deptId,
      reqTime: dayjs().format('YYYY-MM-DD'),
    },
  }).then((res) => {
    if (res.data.data && res.data.data.length > 0) {
      const { status } = res.data.data[0];
      console.log(status);

      switch (status) {
        case '0':
          showToast('您的申请正在审核中，请稍后再试。');
          break;
        case '2':
          showFailToast('您的申请被驳回，请联系审核人员！');
          break;

        default:
          router.push({
            path: '/state/' + deptId,
            query: {
              code: encrypt(JSON.stringify(res.data.data[0])),
            },
          });
          break;
      }
    } else {
      showFailToast('未查询到您' + dayjs().format('YYYY-MM-DD') + '的申请记录');
    }
  });
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
</style>
