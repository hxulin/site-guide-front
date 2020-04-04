import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import router from '../router'
import store from '../store'
import theme from './theme'
import {getToken} from '@/utils/auth'

/**
 * 主菜单路由
 */
const MAIN_MENU_ROUTE = [
  '/home', '/download', '/about', '/admin'
];

/**
 * @Author: HuangXuLin
 * @Description: 路由守卫
 */
function routeGuard() {

  NProgress.configure({showSpinner: false});

  const whiteList = ['/login', '/404', '/exit'];

  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    if (getToken()) {
      if (to.path === '/login') {
        // 如果用户已登录跳转主页面
        next({path: '/'});
        NProgress.done()
      } else {
        if (!store.getters.loginInit) {  // 判断当前是否已拉取用户信息
          store.dispatch('getInfo').then(() => {
            next({to, replace: true});
          }).catch(err => {
            store.dispatch('logOut').then(() => {
              if (err) {
                console.error(err);
              }
              next({path: '/'});
            });
          });
        } else {
          next();
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next(); // 白名单页面, 可直接访问
      } else {
        // 无权限访问, 跳转登录页
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });

  router.afterEach(to => {
    // 检测当前访问的页面是否是主菜单下的页面
    let mainMenuIndex = -1;
    for (let i = 0; i < MAIN_MENU_ROUTE.length; i++) {
      if (to.path.startsWith(MAIN_MENU_ROUTE[i])) {
        mainMenuIndex = i;
        break;
      }
    }
    // 处理当前选中页
    store.dispatch('changeMainMenu', mainMenuIndex);
    NProgress.done();
  });
}

/**
 * @Author: HuangXuLin
 * @Description: 注册窗口大小重绘事件
 */
function windowResize() {
  window.onresize = () => store.dispatch('screenResize');
}

/**
 * @Author: HuangXuLin
 * @Description: 初始化操作
 */
export function init() {
  theme.init();
  routeGuard();
  windowResize();
}
