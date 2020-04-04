const getters = {

  // 当前选中的主菜单索引
  currentMenuIndex: state => state.app.currentMenuIndex,

  // 浏览器窗口宽度
  screenWidth: state => state.app.screenWidth,
  // 浏览器窗口高度
  screenHeight: state => state.app.screenHeight,

  // 标识全局是否提示错误信息
  promptErrorMsg: state => state.app.promptErrorMsg,

  // 用户组
  userGroup: state => state.user.userGroup,

  // 标识用户是否已完成登录初始化、路由权限信息是否已加载
  loginInit: state => state.user.loginInit,

  // 用户 token
  token: state => state.user.token,

  // 管理员模式, 标识后台管理页面的表单是否可编辑
  adminMode: state => state.user.userGroup === 'admin',

  // 是否全屏显示加载动画
  loading: state => state.app.loadingCount > 0

};

export default getters
