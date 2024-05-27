import { sleep } from '@app/utils';

let num = 0;
export const fetchAction = async (nums: number, time: number) => {
  // eslint-disable-next-line no-console
  console.log('模拟查询接口');

  await sleep(time);
  num++;
  return {
    code: 1,
    data: new Array(nums).fill('').map((_, index) => {
      return { label: '测试' + index, value: 'id' + index };
    }),
  };
};
export const getNum = () => {
  return num;
};
