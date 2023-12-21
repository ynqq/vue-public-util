import { describe, expect, it } from 'vitest';
import { DataUtil, deepObjectAssign } from '..';

describe('DataUtil 测试', () => {
  it('dataUtil 数据类型测试', () => {
    const boo = false,
      str = 'str',
      num = 1,
      obj = {},
      arr = [1],
      nu = null,
      und = undefined,
      _set = new Set(),
      _map = new Map(),
      _nan = NaN;

    expect(DataUtil.isArray(arr)).toBe(true);
    expect(DataUtil.isBoolean(boo)).toBe(true);
    expect(DataUtil.isString(str)).toBe(true);
    expect(DataUtil.isNumber(num)).toBe(true);
    expect(DataUtil.isObject(obj)).toBe(true);
    expect(DataUtil.isNull(nu)).toBe(true);
    expect(DataUtil.isUndefined(und)).toBe(true);
    expect(DataUtil.isSet(_set)).toBe(true);
    expect(DataUtil.isMap(_map)).toBe(true);
    expect(DataUtil.isNaN(_nan)).toBe(true);
    expect(DataUtil.isDef(0)).toBe(true);
    expect(DataUtil.isDef(false)).toBe(true);
    expect(DataUtil.isDef('0')).toBe(true);
    expect(DataUtil.isNDef(null)).toBe(true);
    expect(DataUtil.isNDef(undefined)).toBe(true);
    expect(DataUtil.isNDef('')).toBe(true);
    expect(DataUtil.isNDef(NaN)).toBe(true);
  });
  it('对象深度合并方法测试', () => {
    const data1 = {
      name: '张三',
      age: 12,
      isBoy: true,
      address: {
        province: 'xxx省',
        city: 'xxx市',
        area: 'xxx区',
      },
    };
    const data2 = {
      age: 14,
      a: { b: { c: { d: { e: 1 } } } },
      address: {
        province: 666,
        longitudeAndLatitude: {
          lat: 30,
          lng: 100,
        },
      },
    };
    const data3 = deepObjectAssign(data1, data2);
    expect(DataUtil.isNumber(data3.address.province)).toBe(true);
    expect(DataUtil.isNumber(data3.address.longitudeAndLatitude.lng)).toBe(true);
    expect(DataUtil.isNumber(data3.address.longitudeAndLatitude.lat)).toBe(true);
    expect(DataUtil.isNumber(data3.a.b.c.d.e)).toBe(true);
  });
});
