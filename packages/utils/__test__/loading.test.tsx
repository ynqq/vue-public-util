import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { sleep, useLoading } from '..';
import { Ref, nextTick, ref } from 'vue';

describe('loading', () => {
  let count = 0;
  const runTime = 500;
  const submit = useLoading(async (val: number) => {
    await sleep(runTime);
    count = val;
  });
  const msg = 'loading...';
  const modalRef = ref<HTMLDivElement>();

  it('loading 函数测试', async () => {
    submit(1);
    await nextTick();
    expect(count).toBe(0);
    await sleep(runTime);
    expect(count).toBe(1);
  });

  it('loading body dom测试', async () => {
    document.body.innerHTML = '';
    submit(1);
    await nextTick();
    expect(Array.from(document.body.children[0].classList)).contain('pl-loading-box');
    await sleep(runTime);
    expect(document.body.children.length).toBe(0);
  });

  it('loading stop测试', async () => {
    submit(3);
    await nextTick();
    submit.stop();
    await nextTick();
    expect(document.body.children.length).toBe(0);
  });

  it('loading modal dom测试', async () => {
    const wrapper = mount(
      () => (
        <div class={'el-dialog'}>
          <div>
            <div ref={modalRef} class={'box'}></div>
          </div>
        </div>
      ),
      { attachTo: document.body }
    );
    submit.setContainer(modalRef as Ref<HTMLDivElement>).setMsg(msg);
    submit(2);
    await nextTick();
    expect(wrapper.find('.pl-loading-spinner').exists()).toBe(true);
    expect(wrapper.find('.pl-loading-spinner-text').exists()).toBe(true);
    expect(wrapper.find<HTMLDivElement>('.pl-loading-spinner-text').element.innerText).toBe(msg);
  });

  it('loading drawer dom测试', async () => {
    const wrapper = mount(
      () => (
        <div class={'el-drawer'}>
          <div>
            <div ref={modalRef} class={'box'}></div>
          </div>
        </div>
      ),
      { attachTo: document.body }
    );
    submit.setContainer(modalRef as Ref<HTMLDivElement>).setMsg(msg);
    submit(2);
    await nextTick();
    expect(wrapper.find('.pl-loading-spinner').exists()).toBe(true);
    expect(wrapper.find('.pl-loading-spinner-text').exists()).toBe(true);
    expect(wrapper.find<HTMLDivElement>('.pl-loading-spinner-text').element.innerText).toBe(msg);
  });
});
