import { describe, expect, it } from 'vitest';
import { useDeepFn } from '../deep';

const useDeepTest = () => {
  let num = 0;

  const setNum = (val: number) => {
    setTimeout(() => {
      num = val;
    }, 1000);
  };

  const getNum = () => num;

  return {
    setNum,
    getNum,
  };
};

describe('deep测试', () => {
  it('deep', async () => {
    const { setNum, getNum } = useDeepTest();
    const fetchNum0 = useDeepFn(() => getNum());
    setNum(1);
    await fetchNum0();
    setNum(3);
    const fetchNum = useDeepFn(() => getNum(), { limit: 10, time: 300, checker: num => num > 2 });
    const res = await fetchNum();
    expect(res).toBe(3);
  });
});
