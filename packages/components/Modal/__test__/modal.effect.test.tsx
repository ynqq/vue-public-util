import { PlButton, sleep } from '@app/index';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { showAddModel } from './modal_effect';
import { nextTick, ref } from 'vue';

describe('usePlModal 测试', () => {
  it('普通显示', async () => {
    const title = '新增xxx';
    const wrapper = mount(
      {
        setup() {
          const inputVal = ref('');
          const onAdd = async () => {
            const { data } = await showAddModel({ title: title });
            inputVal.value = data.inputVal;
          };

          return () => (
            <div>
              <PlButton type="primary" onClick={onAdd} class="addBtn">
                新增xxx
              </PlButton>
              <div class="inputVal">{inputVal.value}</div>
            </div>
          );
        },
      },
      { attachTo: document.body }
    );
    await nextTick();
    wrapper.find('.addBtn').find('.pl-btn').trigger('click');
    await sleep(100);
    expect(document.body.querySelectorAll('.inputEl').length).toBe(1);
    expect(document.body.querySelector<HTMLDivElement>('.title')?.innerHTML).toBe(title);
    const inputEl = document.body.querySelector<HTMLInputElement>('.inputEl')!;
    expect(inputEl).not.toBe(null);
    inputEl.value = 'no money';
    inputEl.dispatchEvent(new Event('input'));
    expect(document.querySelector('.pl-default-btn')).not.toBe(null);

    document.querySelector('.pl-default-btn')!.querySelector<HTMLButtonElement>('.pl-btn')!.click();
    await sleep(500);

    expect(wrapper.find('.inputVal').text()).toBe('no money');
  });
});
