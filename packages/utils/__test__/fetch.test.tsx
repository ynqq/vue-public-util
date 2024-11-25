import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppCom from './fetch/app.vue';
import { nextTick } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { setPlugins } from '../plugin';
import { listenRouter } from '../router';
import { getNum } from './fetch/api';

describe(
  'useFetchOnce 测试',
  () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: '/', name: 'home', component: { template: 'home' } },
        { path: '/login', name: 'login', component: { template: 'login' } },
      ],
    });
    it('字典组件测试', async () => {
      router.push({ path: '/' });
      await router.isReady();

      setPlugins([router]);
      listenRouter();

      const app = mount(AppCom, { global: { plugins: [router] }, attachTo: document.body });
      app.vm.setNums(4);

      // 模拟同时多次创建组件
      await nextTick();
      await app.vm.next();
      expect(document.querySelectorAll('.item').length).toBe(3 * 4);
      expect(app.vm.getNum()).toBe(1);

      // 模拟再次添加组件
      app.vm.setNums(1);
      await app.vm.next();
      expect(document.querySelectorAll('.item').length).toBe(3 * 5);
      expect(app.vm.getNum()).toBe(1);

      // 模拟路由跳转后再次使用该组件
      router.push({ path: '/login' });
      await app.vm.next();
      await router.isReady();
      await nextTick();
      app.vm.setNums(1);
      await app.vm.next();
      await app.vm.next();
      expect(getNum()).toBe(2);
      expect(document.querySelectorAll('.item').length).toBe(3 * 6);
    });
  },
  {
    // timeout: 10000,
  }
);
