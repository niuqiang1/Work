import axios from 'axios';
import router from '@/router';
import qs from 'qs';
import { merge } from 'lodash';
import { clearLoginInfo } from '@/utils';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const http = axios.create({
  timeout: 1000 * 30,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  baseURL: import.meta.env.BASE_URL,
});

/**
 * 请求拦截
 */
http.interceptors.request.use(
  (config) => {
    config.headers['token'] = cookies.get('token'); // 请求头带上token
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
      router.replace({ name: 'user' });
      return Promise.reject(response.data.msg);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName) => {
  // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
  return import.meta.env.MODE !== 'production' && import.meta.env.OPEN_PROXY
    ? '/proxyApi/'
    : import.meta.env.VITE_API_BASE_URL + actionName;
};

/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefaultParams 是否开启默认参数?
 */
http.adornParams = (params = {}, openDefaultParams = true) => {
  var defaults = {
    t: new Date().getTime(),
  };
  return openDefaultParams ? merge(defaults, params) : params;
};

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefaultData 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefaultData = true, contentType = 'json') => {
  var defaults = {
    t: new Date().getTime(),
  };
  data = openDefaultData ? merge(defaults, data) : data;
  return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data);
};

export default http;
