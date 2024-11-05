import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

// 路由守卫：在每次导航之前调用
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  NProgress.start(); // 开始进度条
  next(); // 继续导航
});

// 路由守卫：在每次成功完成导航后调用
router.afterEach(() => {
  NProgress.done(); // 结束进度条
});
