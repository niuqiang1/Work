<template>
  <div>
    <img class="user-poster" :src="Banner" />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="formData.username"
          name="username"
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
          v-model="formData.idno"
          name="idno"
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
const router = useRouter();
const route = useRoute();
const formData = reactive({
  username: unref(route).query.username,
  idno: unref(route).query.idno,
});

const onSubmit = (values) => {
  router.push({
    path: '/state',
    query: { ...values },
  });
};
</script>

<style lang="scss">
.user {
  &-poster {
    width: 100%;
    display: block;
    margin-bottom: 24px;
    height: 100%;
  }
}
</style>
