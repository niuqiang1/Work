<template>
  <div>
    <img class="user-poster" :src="Banner" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.name"
          name="name"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
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
              pattern:
                /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
              message: '请填正确的身份证',
            },
          ]"
        />

        <van-field
          readonly
          name="headUrlList"
          label="头像"
          placeholder="照片"
          :rules="[{ required: true, message: '请上传照片' }]"
        >
          <template #input>
            <van-uploader
              max-coun="1"
              :after-read="afterRead"
              v-model="formData.headUrlList"
            />
          </template>
        </van-field>
        <van-field
          v-model="formData.authCode"
          name="authCode"
          label="邀请码"
          placeholder="校内联系人邀请码"
          :rules="[{ required: true, message: '请填写校内联系人邀请码' }]"
        />

        <!-- <van-popup v-model:show="showPicker" round position="bottom">
          <van-picker
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup> -->
        <van-field
          v-model="formData.carNo"
          name="carNo"
          label="车牌号"
          placeholder="车牌号"
        >
        </van-field>
        <van-field
          v-model="formData.cause"
          rows="2"
          autosize
          label="事由"
          name="cause"
          type="textarea"
          maxlength="50"
          placeholder="请输入事由"
          show-word-limit
        />
        <van-field
          v-model="formData.reqTime"
          readonly
          label="预约日期"
          name="reqTime"
        />
        <!-- <van-field
         label="预约日期"
           name="reqTime"
         is-link
           readonly
           v-model="formData.reqTime"
           @click="showDate = true"
           :rules="[{ required: true, message: '请选择预约日期' }]"
         />
        <van-calendar v-model:show="showDate" @confirm="onDateConfirm" /> -->
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import Banner from '@/assets/banner.png';
import { UploaderFileListItem, showToast, showDialog } from 'vant';
import http from '@/utils/request';

import { reactive, ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import dayjs from 'dayjs';
const formData = reactive({
  authCode: '',
  carNo: '',
  cause: '',
  headUrl: '',
  idNo: '',
  name: '',
  phone: '',
  reqTime: dayjs().format('YYYY-MM-DD'),

  headUrlList: [],
});
const showPicker = ref(false);
const showDate = ref(false);
const router = useRouter();

const route = useRoute();
const deptId = route.params.deptId;
// const onConfirm = ({ selectedOptions }) => {
//   showPicker.value = false;
//   formData.contactPerson = selectedOptions[0].text;
// };

// const formatDate = (date) =>
//   `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const onDateConfirm = (value) => {
  showDate.value = false;
  formData.reqTime = dayjs(value).format('YYYYMMDD');
};

const headUrl = computed(() => {
  if (formData.headUrlList.length) {
    return formData.headUrlList[0]?.url || '';
  }

  return '';
});

const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  const form = new FormData();
  form.append('file', file.file);
  http
    .post('visit/front/visitordetail/upload', form)
    .then(({ data }) => {
      console.log(data, 'pp');
      if (data.code != 0) {
        return showToast(data.msg);
      }
      formData.headUrlList = [{ url: data.data }];
    })
    .catch((_) => {});
};

const onSubmit = (values) => {
  console.log('submit', values, headUrl.value);
  http
    .post('visit/front/visitordetail/save', {
      ...values,
      headUrl: headUrl.value,
      reqTime: dayjs(values.reqTime).format('YYYYMMDD'),
      deptId: deptId,
    })
    .then(({ data }) => {
      if (data.code != 0) {
        return showToast(data.msg);
      }

      showDialog({
        title: '提示',
        message:
          '预约信息已提交，请注意审核结果，可通过首页->已有预约，前往查看',
        theme: 'round-button',
        confirmButtonText: '前往查看',
      }).then(() => {
        router.push({
          name: 'visitor-search',
          query: {
            phone: values.phone,
            idNo: values.idNo,
          },
        });
        // on close
      });
    })
    .catch((_) => {});
};
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
