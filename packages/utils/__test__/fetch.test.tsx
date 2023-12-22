import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FetchVue from './fetch/select.vue';
import { nextTick } from 'vue';

describe('useFetchOnce 测试', () => {
  it('字典组件测试', async () => {
    const wrapper1 = mount(FetchVue, { attachTo: document.body });
    mount(FetchVue, { attachTo: document.body });
    mount(FetchVue, { attachTo: document.body });
    const wrapper4 = mount(FetchVue, { attachTo: document.body });

    await wrapper1.vm.next();
    await nextTick();
    expect(document.querySelectorAll('.item').length).toBe(3 * 4);
    expect(wrapper1.vm.getNum()).toBe(1);
    expect(wrapper4.vm.getNum()).toBe(1);
    mount(FetchVue, { attachTo: document.body });
    await wrapper1.vm.next();
    expect(wrapper1.vm.getNum()).toBe(2);
    expect(wrapper4.vm.getNum()).toBe(2);
  });
});
