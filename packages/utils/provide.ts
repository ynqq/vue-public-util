/**
 * 多层子组件场景时 提交/校验不需要通过ref
 */
import { TBucket, TBucketType } from '@app/types';
import { ComponentInternalInstance, getCurrentInstance, onBeforeUnmount } from 'vue';

const getBucket = (instance: ComponentInternalInstance | null | undefined): TBucket | null => {
  if (instance) {
    if (instance.bucket) {
      return instance.bucket;
    }
    if (instance.parent) {
      return getBucket(instance.parent);
    }
  }
  return null;
};

export const useProvideEffect = (isRoot = false, uninstall = true) => {
  const instance = getCurrentInstance();
  let checkKey: Symbol, dataKey: Symbol;

  const start = () => {
    if (isRoot) {
      if (instance) {
        const bucket: TBucket = new Map();
        Object.values(TBucketType).forEach(val => {
          bucket.set(val, new Map());
        });
        instance.bucket = bucket;
      }
    }
  };

  const regEffect = (type: TBucketType, key: Symbol, fun: Function) => {
    const rootBucket = getBucket(isRoot ? instance?.parent : instance);
    if (rootBucket) {
      rootBucket.get(type)!.set(key, fun);
    }
    return key;
  };

  const regCheckEffect = (fun: (...args: any[]) => boolean | Promise<boolean>, key = Symbol()) => {
    checkKey = key;
    return regEffect(TBucketType.check, key, fun);
  };

  const regDataEffect = (fun: (...args: any[]) => any, key = Symbol()) => {
    dataKey = key;
    return regEffect(TBucketType.data, key, fun);
  };

  const getEffectByType = (type: TBucketType) => {
    const rootBucket = getBucket(instance);
    if (rootBucket) {
      return rootBucket.get(type);
    }
    return null;
  };

  const runCheck = async (): Promise<boolean> => {
    const effects = getEffectByType(TBucketType.check);
    if (effects) {
      for (const fun of effects.values()) {
        const boo = await fun();
        if (!boo) {
          return boo;
        }
      }
      return true;
    }
    return true;
  };

  function runData<D = Record<any, any>>(resultType?: 'object'): Promise<D>;
  function runData<D = Record<any, any>>(resultType?: 'array'): Promise<D[]>;
  async function runData<D = Record<any, any>>(resultType = 'object') {
    const result = resultType === 'object' ? {} : [];
    const effects = getEffectByType(TBucketType.data);
    if (effects) {
      for (const fun of effects.values()) {
        const val = await fun();
        if (resultType === 'object') {
          Object.assign(result, val);
        } else if (resultType === 'array') {
          (result as D[]).push(val);
        }
      }
    }
    return result;
  }

  const deleteEffect = (type: TBucketType, key: Symbol) => {
    const rootBucket = getBucket(instance);
    if (rootBucket) {
      return rootBucket.get(type)?.delete(key);
    }
    return false;
  };

  const deleteCheckEffect = (key: Symbol) => {
    return deleteEffect(TBucketType.check, key);
  };

  const deleteDataEffect = (key: Symbol) => {
    return deleteEffect(TBucketType.data, key);
  };

  start();

  if (uninstall) {
    onBeforeUnmount(() => {
      if (checkKey) {
        deleteCheckEffect(checkKey);
      }
      if (dataKey) {
        deleteDataEffect(dataKey);
      }
    });
  }

  return {
    regEffect,
    regCheckEffect,
    regDataEffect,
    deleteEffect,
    deleteCheckEffect,
    deleteDataEffect,
    runCheck,
    runData,
  };
};
