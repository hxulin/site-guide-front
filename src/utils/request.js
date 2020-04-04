/**
 * @Author: HuangXuLin
 * @Description: 网络请求工具类
 */
import axios from 'axios'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 30 * 1000
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    store.dispatch('loadingCountIncrease');  // 添加页面加载动画
    if (store.getters.token) {
      // 给每一个请求添加 Token
      config.headers['Authorization'] = store.getters.token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    store.dispatch('loadingCountReduce');  // 移除页面加载动画
    if (response.headers['content-type'] === 'application/json') {
      const result = response.data;
      if (result.code) {
        if (result.code !== 200) {
          switch (result.code) {
            case 401:
              // 退出登录
              router.replace('/exit');
              return Promise.reject('Token expired');
          }
          store.dispatch('promptErrorMsg', result.msg);
          return Promise.reject(new Error(result.msg));
        }
        return result;
      } else {  // Blob
        const reader = new FileReader();
        reader.onload = () => {
          store.dispatch('promptErrorMsg', JSON.parse(reader.result).msg);
        };
        reader.readAsText(result);
        return Promise.reject();
      }
    }
    return response;
  },
  error => {
    store.dispatch('loadingCountReduce');  // 移除页面加载动画
    const {response} = error;
    store.dispatch('promptErrorMsg', response ? '发生未知错误，请联系系统管理员' : '当前网络连接不可用');
    return Promise.reject(error);
  }
);

export default service
