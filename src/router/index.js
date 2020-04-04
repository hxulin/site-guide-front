import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'

/*
 * Vue-router 在 3.1 之后把 $router.push() 方法改为了 Promise
 * 所以 $router.push() 如果没有回调函数, 使用该方法做路由跳转时就会报错
 * [NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}]
 */
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/login',
    component: () => import('@/views/login')
  }, {
    path: '/exit',
    component: () => import('@/views/exit')
  }, {
    path: '/home',
    component: () => import('@/views/home')
  }, {
    path: '/download',
    component: () => import('@/views/download')
  }, {
    path: '/about',
    component: () => import('@/views/about')
  }, {
    path: '/404',
    component: () => import('@/views/error/404'),
  }, {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: '/admin/user-manage',
      component: () => import('@/views/admin/user-manage')
    }, {
      path: '/admin/project-manage',
      component: () => import('@/views/admin/project-manage')
    }, {
      path: '/admin/hot-pages',
      component: () => import('@/views/admin/hot-pages')
    }, {
      path: '/admin/client-settings',
      component: () => import('@/views/admin/client-settings')
    }]
  }, {
    path: '*',
    redirect: '/404'
  }]
});
