type TDataType = 'Number' | 'String' | 'Boolean' | 'Symbol' | 'Null' | 'Undefined' | 'Array' | 'Object' | 'Function' | 'Set' | 'Map';
// type TFormatType<T extends TDataType = TDataType> = `is${Capitalize<T>}`;
export const getDataType = (data: any): TDataType => {
  return Object.prototype.toString.call(data).replace(/\[object (.*)\]/, '$1') as TDataType;
};

export const DataUtil = {
  isNumber(data: any): data is number {
    return getDataType(data) === 'Number';
  },
  isString(data: any): data is string {
    return getDataType(data) === 'String';
  },
  isBoolean(data: any): data is boolean {
    return getDataType(data) === 'Boolean';
  },
  isSymbol(data: any): data is symbol {
    return getDataType(data) === 'Symbol';
  },
  isNull(data: any): data is null {
    return getDataType(data) === 'Null';
  },
  isUndefined(data: any): data is undefined {
    return getDataType(data) === 'Undefined';
  },
  isArray(data: any): data is any[] {
    return getDataType(data) === 'Array';
  },
  isObject(data: any): data is object {
    return getDataType(data) === 'Object';
  },
  isFunction(data: any): data is (...args: any[]) => any {
    return getDataType(data) === 'Function';
  },
  isSet(data: any): data is object {
    return getDataType(data) === 'Set';
  },
  isMap(data: any): data is object {
    return getDataType(data) === 'Map';
  },
  isNaN(data: any): data is number {
    return data !== data;
  },
  /**
   * 判断数据是否是合法数据
   * 数据不是 null undefined '' NaN
   * @param data any
   * @returns boolean
   */
  isDef(data: any) {
    return !this.isNull(data) && !this.isUndefined(data) && data !== '' && !this.isNaN(data);
  },
  /**
   * 判断数据是否是非法数据
   * 数据是 null || undefined || '' || NaN
   * @param data any
   * @returns boolean
   */
  isNDef(data: any) {
    return !this.isDef(data);
  },
};

export const deepObjectAssign = <T extends Record<string, any> = {}>(obj1: T, obj2: Partial<T>) => {
  for (const i in obj2) {
    const data = obj2[i];
    if (DataUtil.isObject(data)) {
      deepObjectAssign((obj1[i] = obj1[i] || ({} as any)), data!);
    } else {
      obj1[i] = data!;
    }
  }
  return obj1;
};
