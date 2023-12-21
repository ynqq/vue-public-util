import { mount } from '@vue/test-utils';
import { describe, it } from 'vitest';
import { VNode, nextTick, ref } from 'vue';
import { sleep, useFetchOnce } from '..';

const _mount = (render: () => VNode) => {
  return mount(render, { attachTo: document.body });
};

describe('useFetchOnce 测试', () => {
  it('字典组件测试', async () => {
    let num = 0;
    const fetchAction = async (nums: number) => {
      await sleep(500);
      num++;
      return {
        code: 1,
        data: new Array(nums).fill('').map((_, index) => {
          return { label: '测试' + index, value: 'id' + index };
        }),
      };
    };
    const wrapper = mount(
      {
        setup() {
          const { fetch } = useFetchOnce({ name: 'comName', query: fetchAction });
          const list = ref<{ label: string; value: string }[]>([{ label: 'a', value: 'a' }]);
          const fetchList = async () => {
            const { data } = await fetch(3);
            console.log(data, '2222');

            list.value = data;
          };
          fetchList();
          return () => (
            <div>
              22
              {list.value.map(item => (
                <div class={'item'} key={item.value}>
                  {item.label}
                </div>
              ))}
            </div>
          );
        },
      },
      { attachTo: document.body }
    );
    await nextTick();
    console.log(document.body.innerHTML);

    console.log(wrapper.findAll('.item').length);
  });
});
