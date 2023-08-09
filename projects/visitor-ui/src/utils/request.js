import axios from 'axios';
import Cookies from 'js-cookie';
import router from '@/router';
import qs from 'qs';
import { clearLoginInfo } from '@/utils';
import { isPlainObject } from 'lodash';
import { showToast } from 'vant';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 1000 * 180,
  withCredentials: true,
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = Cookies.get('language') || 'zh-CN';
    config.headers['token'] = Cookies.get('tks') || '';
    // 默认参数
    console.log(config);

    var defaults = {};
    // 防止缓存，GET请求默认带_t参数
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        ...{ _t: new Date().getTime() },
      };
    }
    if (isPlainObject(config.params)) {
      config.params = {
        ...defaults,
        ...config.params,
      };
    }
    if (isPlainObject(config.data)) {
      config.data = {
        ...defaults,
        ...config.data,
      };
      if (
        /^application\/x-www-form-urlencoded/.test(
          config.headers['content-type']
        )
      ) {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截
 */
http.interceptors.response.use(
  (response) => {
    if (response.data.code === 401 || response.data.code === 10001) {
      clearLoginInfo();
      showToast(response.data.msg);
      setTimeout((_) => {
        router.replace({ name: 'user' });
      }, 500);
      return Promise.reject(response.data.msg);
    } else if (response.data.code != 0) {
      showToast(response.data.msg);
      return Promise.reject(response.data.msg);
    }
    return response;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export default http;
