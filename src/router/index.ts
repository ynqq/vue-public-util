import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login/index.vue'),
    },
  ],
});

export default router;
