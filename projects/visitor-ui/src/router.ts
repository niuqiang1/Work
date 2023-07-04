import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      name: 'visitor',
    },
  },
  {
    name: 'user',
    path: '/user',
    component: () => import('@/view/user/index.vue'),
    meta: {
      title: '用户登录',
    },
  },
  {
    name: 'check',
    path: '/check/:username',
    component: () => import('@/view/user/check.vue'),
    meta: {
      title: '预约用户',
    },
  },
  {
    name: 'visitor-register',
    path: '/visitor-register',
    component: () => import('@/view/visitor/index.vue'),
    meta: {
      title: '访客预约',
    },
  },
  {
    name: 'visitor',
    path: '/visitor',
    component: () => import('@/view/visitor/home.vue'),
    meta: {
      title: '访客预约',
    },
  },
  {
    name: 'visitor-search',
    path: '/visitor-search',
    component: () => import('@/view/visitor/search.vue'),
    meta: {
      title: '访客预约',
    },
  },
  {
    name: 'visiteState',
    path: '/state',
    component: () => import('@/view/visitor/state.vue'),
    meta: {
      title: '预约状态',
    },
  },
  {
    name: 'visitor-result',
    path: '/visitor-result',
    component: () => import('@/view/visitor/result.vue'),
    meta: {
      title: '预约成功',
    },
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
  const title = to?.meta?.title;
  if (title) {
    document.title = title as string;
  }
  next();
});

export default router;
