import { describe, expect, it } from 'vitest';
import { useExecOnUse } from '../execOnce';

interface ComTypes {
  isMenu: boolean;
  isInput: boolean;
  isNumber: boolean;
  isRadio: boolean;
}
let num = 0;

const config = {
  isMenu: () => {
    num++;
    return true;
  },
  isInput: () => {
    num++;
    return true;
  },
  isNumber: () => {
    num++;
    return true;
  },
  isRadio: () => {
    num++;
    return true;
  },
};

describe('execOnce 测试', () => {
  it('useExecOnce', () => {
    const getType = useExecOnUse<ComTypes>(config);
    expect(num).toBe(0);
    const { isMenu } = getType();
    expect(isMenu).toBe(true);
    expect(num).toBe(1);
    const { isInput } = getType();
    expect(isInput).toBe(true);
    expect(num).toBe(2);
    const { isNumber } = getType();
    expect(isNumber).toBe(true);
    expect(num).toBe(3);
    const { isRadio } = getType();
    expect(isRadio).toBe(true);
    expect(num).toBe(4);
    const { isInput: _isInput, isMenu: _isMenu, isNumber: _isNumber, isRadio: _isRadio } = getType();
    expect(num).toBe(4);
    getType.reset();
    const { isInput: _isInput2, isMenu: _isMenu2, isNumber: _isNumber2, isRadio: _isRadio2 } = getType();
    expect(num).toBe(8);
  });
});
