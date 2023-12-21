import { describe, expect, it } from 'vitest';
import { useAction } from '../action';
import { EActionEnum, TOtherAction } from '@app/types';
describe('useAction 测试', () => {
  it('useAction 默认属性测试', () => {
    const { isCreate, isCopy, isUpdate, isView } = useAction(EActionEnum.isCreate);
    expect(isCreate).toBe(true);
    expect(isCopy).toBe(false);
    expect(isUpdate).toBe(false);
    expect(isView).toBe(false);
  });

  it('useAction 扩展属性测试', () => {
    const val: EActionEnum | TOtherAction = '10';
    const { isDelect } = useAction(val, { isDelect: '10' });
    expect(isDelect).toBe(true);
  });
});
