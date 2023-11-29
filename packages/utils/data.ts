type TDataType = 'Number' | 'String' | 'Boolean' | 'Symbol' | 'Null' | 'Undefined' | 'Array' | 'Object' | 'Function' | 'Set' | 'Map';
type TFormatType<T extends TDataType = TDataType> = `is${Capitalize<T>}`;
export const getDataType = (data: any): TDataType => {
  return Object.prototype.toString.call(data).replace(/\[object (.*)\]/, '$1') as TDataType;
};

export const DataUtil: Record<TFormatType<TDataType>, (data: any) => boolean> = {
  isNumber(data) {
    return getDataType(data) === 'Number';
  },
  isString(data) {
    return getDataType(data) === 'String';
  },
  isBoolean(data) {
    return getDataType(data) === 'Boolean';
  },
  isSymbol(data) {
    return getDataType(data) === 'Symbol';
  },
  isNull(data) {
    return getDataType(data) === 'Null';
  },
  isUndefined(data) {
    return getDataType(data) === 'Undefined';
  },
  isArray(data) {
    return getDataType(data) === 'Array';
  },
  isObject(data) {
    return getDataType(data) === 'Object';
  },
  isFunction(data) {
    return getDataType(data) === 'Function';
  },
  isSet(data) {
    return getDataType(data) === 'Set';
  },
  isMap(data) {
    return getDataType(data) === 'Map';
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
