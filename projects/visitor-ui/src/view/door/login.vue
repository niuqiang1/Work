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
          v-model="formData.password"
          name="password"
          label="密码"
          type="password"
          placeholder="密码"
          :rules="[
            {
              required: true,
              message: '请填写密码',
            },
          ]"
        />
        <van-field
          v-model="formData.captcha"
          name="captcha"
          label="验证码"
          placeholder="验证码"
          :rules="[
            {
              required: true,
              message: '请输入验证码',
            },
          ]"
        >
          <template #right-icon>
            <img
              width="100"
              :src="formData.captchaPath"
              @click="getCaptcha()"
              alt=""
            />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import Banner from '@/assets/bg-login.png';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import http from '@/utils/request';
import { getUUID } from '@/utils/index';
import { showToast } from 'vant';
import Cookies from 'js-cookie';
const router = useRouter();
const formData = reactive({
  username: '',
  password: '',
  captcha: '',
  uuid: '',
  captchaPath: '',
});

const onSubmit = (values) => {
  http.post('/login', formData).then(({ data: res }) => {
    if (res.code !== 0) {
      getCaptcha();
      return showToast(res.msg);
    }
    Cookies.set('tks', res.data.token);
    router.push({
      path: '/door/',
    });
  });
};

function getCaptcha() {
  console.log(import.meta.env, 'import.meta.env.BASE_URL');
  formData.uuid = getUUID();
  formData.captchaPath = `${import.meta.env.VITE_API_BASE_URL}/captcha?uuid=${
    formData.uuid
  }`;
}
getCaptcha();
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
