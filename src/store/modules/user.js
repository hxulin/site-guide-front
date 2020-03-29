import {login, getInfo} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    loginInit: false,  // 标识用户是否已完成登录初始化、菜单信息是否已加载
    userGroup: 'default'  // 用户组: default, user, admin
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_LOGIN_INIT: (state, loginInit) => {
      state.loginInit = loginInit;
    },
    SET_USER_GROUP: (state, groupName) => {
      state.userGroup = groupName;
    }
  },

  actions: {

    // 获取用户信息
    getInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo(user.state.token).then(({data}) => {
          commit('SET_USER_GROUP', data.group);
          commit('SET_LOGIN_INIT', true);  // 登录初始化完成
          resolve();
        }).catch(error => {
          reject(error);
        })
      });
    },

    // 退出登录
    logOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_USER_GROUP', 'default');
        commit('SET_LOGIN_INIT', false);  // 重置登录初始化信息
        removeToken();
        resolve();
      });
    },

    // 用户登录
    login({commit}, password) {
      return new Promise((resolve, reject) => {
        login({password}).then(({data}) => {
          commit('SET_TOKEN', data.token);
          setToken(data.token);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
};

export default user
