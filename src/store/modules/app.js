import {MessageBox} from "element-ui";

// 系统全局相关的状态管理
const app = {
  state: {

    // 当前选中的主菜单索引
    currentMenuIndex: -1,

    // 浏览器窗口宽度
    screenWidth: document.documentElement.clientWidth,
    // 浏览器窗口高度
    screenHeight: document.documentElement.clientHeight,

    // 标识全局是否提示错误信息
    promptErrorMsg: true

  },
  mutations: {
    CHANGE_MAIN_MENU: (state, menuIndex) => {
      state.currentMenuIndex = menuIndex;
    },
    SCREEN_RESIZE: state => {
      state.screenWidth = document.documentElement.clientWidth;
      state.screenHeight = document.documentElement.clientHeight;
    },
    PROMPT_ERROR_MSG: (state, isPrompt) => {
      state.promptErrorMsg = isPrompt;
    }
  },
  actions: {
    changeMainMenu({ commit }, menuIndex) {
      commit('CHANGE_MAIN_MENU', menuIndex);
    },
    screenResize({ commit }) {
      commit('SCREEN_RESIZE');
    },
    promptErrorMsg({commit, state}, message) {
      if (state.promptErrorMsg) {
        commit('PROMPT_ERROR_MSG', false);
        MessageBox.alert(message, {
          type: 'error',
          confirmButtonText: '我知道了',
          callback: () => commit('PROMPT_ERROR_MSG', true)
        });
      }
    },
    promptWarningMsg({commit, state}, message) {
      if (state.promptErrorMsg) {
        commit('PROMPT_ERROR_MSG', false);
        MessageBox.alert(message, {
          type: 'warning',
          confirmButtonText: '我知道了',
          callback: () => commit('PROMPT_ERROR_MSG', true)
        });
      }
    }
  }
};

export default app
