import { expect, test, describe } from 'vitest';
import { mount } from '@vue/test-utils';
import PlButton from '../index.vue';
import { VNode, nextTick } from 'vue';
import { sleep } from '@app/utils';
import { ButtonProps } from 'element-plus';

const _mount = (render: () => VNode) => {
  return mount(render, {
    attachTo: document.body,
  });
};

const plBtnClassName = '.pl-btn';
const typeConfig: Partial<Record<ButtonProps['type'], string>> = {
  primary: 'el-button--primary',
  danger: 'el-button--danger',
  warning: 'el-button--warning',
  success: 'el-button--success',
  info: 'el-button--info',
};
describe('PlButton.vue', () => {
  test('按钮样式', async () => {
    const allKeys = Object.keys(typeConfig) as ButtonProps['type'][];
    for (let i = 0; i < allKeys.length; i++) {
      const primaryWrapper = _mount(() => <PlButton type={allKeys[i]}></PlButton>);
      await nextTick();
      const primaryPl = primaryWrapper.find(plBtnClassName);
      expect(primaryPl.classes()).contain(typeConfig[allKeys[i]]);
    }
  });

  test('按钮事件', async () => {
    let count = 0;
    let submit = () => {
      count++;
    };
    const wrapper = _mount(() => (
      <PlButton
        type="primary"
        onClick={() => {
          return submit();
        }}
      ></PlButton>
    ));
    await nextTick();
    const plBtnWrapper = wrapper.find(plBtnClassName);
    await plBtnWrapper.trigger('click');
    await plBtnWrapper.trigger('click');
    expect(count).toBe(1);
    await sleep(600);
    await plBtnWrapper.trigger('click');
    await plBtnWrapper.trigger('click');
    expect(count).toBe(2);
    submit = async () => {
      count++;
      await sleep(200);
    };
    const wrapper2 = _mount(() => (
      <PlButton
        duration={100}
        type="primary"
        onClick={() => {
          return submit();
        }}
      ></PlButton>
    ));
    const plBtn2Wrapper = wrapper2.find(plBtnClassName);
    await plBtn2Wrapper.trigger('click');
    await plBtn2Wrapper.trigger('click');
    expect(count).toBe(3);
    await sleep(50);
    await plBtn2Wrapper.trigger('click');
    expect(count).toBe(3);
    await sleep(210);
    await plBtn2Wrapper.trigger('click');
    expect(count).toBe(4);
  });
});
