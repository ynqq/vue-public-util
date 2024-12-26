import { IPLContainerValues } from '@app/components/type';
import { TOpenBucket, TOpenBucketType } from '@app/types';
import { ComponentInternalInstance, Ref, getCurrentInstance, inject, onBeforeUnmount, ref, watchEffect } from 'vue';

const getBucket = (instance: ComponentInternalInstance | null | undefined): TOpenBucket | null => {
  if (instance) {
    if (instance.openBucket) {
      return instance.openBucket;
    }
    if (instance.parent) {
      return getBucket(instance.parent);
    }
  }
  return null;
};

function useFun(isRoot: boolean | string = false, ctx?: ComponentInternalInstance | null) {
  const instance = getCurrentInstance();
  let confirmKey: Symbol, closeKey: Symbol, exposeKey: Symbol;
  const start = () => {
    if (isRoot) {
      if (instance) {
        const bucket: TOpenBucket = new Map();
        Object.values(TOpenBucketType).forEach(val => {
          bucket.set(val, new Map());
        });
        instance.openBucket = bucket;
      }
    }
  };
  start();

  const regEffect = (type: TOpenBucketType, key: Symbol, fun: Function) => {
    const rootBucket = getBucket(isRoot ? instance : instance?.parent);
    if (rootBucket) {
      rootBucket.get(type)!.set(key, fun);
    }
    return key;
  };

  const getEffectByType = (type: TOpenBucketType) => {
    if (instance?.openBucket) {
      return instance.openBucket.get(type);
    }
    return null;
  };

  const checkHas = (type: TOpenBucketType) => {
    const effects = getEffectByType(type);
    if (effects?.size) {
      return new Error(`[${type}]类型只能注册一个`);
    }
  };

  const onConfirmEffect = <T = Record<string, any>>(fun: (options: IPLContainerValues & T) => Promise<any>, key = Symbol()) => {
    checkHas(TOpenBucketType.confirm);
    confirmKey = key;
    return regEffect(TOpenBucketType.confirm, key, fun);
  };

  const onExposeEffect = (fun: Function, key = Symbol()) => {
    checkHas(TOpenBucketType.expose);
    exposeKey = key;
    return regEffect(TOpenBucketType.expose, key, fun);
  };

  /**
   * 内部调用 处理close事件
   * @param fun
   * @param key
   * @returns
   */
  const onCancelEffect = (fun: Function, key = Symbol()) => {
    checkHas(TOpenBucketType.close);
    closeKey = key;
    return regEffect(TOpenBucketType.close, key, fun);
  };
  /**
   * 关闭之后的回调
   * @param fun 回调函数
   * @param key key
   */
  const onClosedEffect = (fun: Function, key = Symbol()) => {
    return regEffect(TOpenBucketType.closed, key, fun);
  };

  /**
   * 显示的回调
   * @param fun  回调函数
   * @param key  key
   * @returns
   */
  const onShowEffect = (fun: Function, key = Symbol()) => {
    return regEffect(TOpenBucketType.show, key, fun);
  };

  // 特殊的confirm 返回一个函数
  const runConfirm = <T = Record<any, any>>(effects?: Map<Symbol, Function> | null) => {
    effects = effects || getEffectByType(TOpenBucketType.confirm);
    if (effects?.size) {
      return (options: T) => {
        try {
          const fun = Array.from(effects.values())[0];
          return fun && fun(options);
        } catch (error) {
          //
        }
      };
    }
    return null;
  };

  const runClose = (effects?: Map<Symbol, Function> | null) => {
    effects = effects || getEffectByType(TOpenBucketType.close);
    if (effects?.size) {
      return () => {
        try {
          const fun = Array.from(effects.values())[0];
          return fun && fun();
        } catch (error) {
          //
        }
      };
    }
    return null;
  };

  const runExpose = <T = Record<any, any>>(effects?: Map<Symbol, Function> | null) => {
    effects = effects || getEffectByType(TOpenBucketType.confirm);
    if (effects?.size) {
      return (options: T) => {
        try {
          const fun = Array.from(effects.values())[0];
          return fun && fun(options);
        } catch (error) {
          //
        }
      };
    }
    return null;
  };

  const runClosed = (effects?: Map<Symbol, Function> | null) => {
    effects = effects || getEffectByType(TOpenBucketType.closed);
    if (effects?.size) {
      const funs = Array.from(effects.values());
      funs.forEach(fun => {
        try {
          fun && fun();
        } catch (error) {
          //
        }
      });
    }
  };

  const runShow = (effects?: Map<Symbol, Function> | null) => {
    effects = effects || getEffectByType(TOpenBucketType.show);
    if (effects?.size) {
      const funs = Array.from(effects.values());

      funs.forEach(fun => {
        try {
          fun && fun();
        } catch (error) {
          //
        }
      });
    }
  };

  const deleteEffect = (type: TOpenBucketType, key: Symbol) => {
    const rootBucket = getBucket(instance);
    if (rootBucket) {
      return rootBucket.get(type)?.delete(key);
    }
    return false;
  };

  const deleteConfirmEffect = (key: Symbol) => {
    return deleteEffect(TOpenBucketType.confirm, key);
  };

  const deleteExposeEffect = (key: Symbol) => {
    return deleteEffect(TOpenBucketType.expose, key);
  };

  const deleteCloseEffect = (key: Symbol) => {
    return deleteEffect(TOpenBucketType.close, key);
  };

  const getInstanceEffects = (instance: ComponentInternalInstance, type: TOpenBucketType) => {
    if (instance.openBucket) {
      return instance.openBucket.get(type);
    }
    return null;
  };

  const runInstanceExpose = <T = Record<string, any>>(optioins: Partial<T>) => {
    const effects = ctx!.openBucket.get(TOpenBucketType.expose);
    return runExpose<Partial<T>>(effects)?.(optioins);
  };

  const runInstanceClose = () => {
    const effects = getInstanceEffects(ctx!, TOpenBucketType.close);
    if (effects) {
      return runClose(effects)?.();
    }
    return null;
  };

  const checkIsReg = (type: TOpenBucketType) => {
    return !!getEffectByType(type)?.size;
  };
  // 获取业务组件暴露出的属性
  const childExposeData = ref<any>({});
  const getChildExpose = <T = Record<string, any>>() => {
    const childRef = inject<Ref<T>>('childRef');
    watchEffect(() => {
      if (childRef?.value) {
        childExposeData.value = childRef.value;
      }
    });
    return childExposeData as Ref<T>;
  };

  onBeforeUnmount(() => {
    if (confirmKey) {
      deleteConfirmEffect(confirmKey);
    }
    if (exposeKey) {
      deleteExposeEffect(exposeKey);
    }
    if (closeKey) {
      deleteCloseEffect(closeKey);
    }
  });

  return {
    onConfirmEffect,
    onExposeEffect,
    onCancelEffect,
    onClosedEffect,
    onShowEffect,

    runConfirm,
    runClose,
    runExpose,
    runClosed,
    runShow,

    runInstanceExpose,
    runInstanceClose,

    checkIsReg,
    getChildExpose,
  };
}

/**
 * openHooks
 * @param isRoot 是否是根组件(组件库用，业务中不需要传递)
 */
export function useOpen(isRoot: true): ReturnType<typeof useFun>;
export function useOpen(isRoot: false, ctx: ComponentInternalInstance | null): ReturnType<typeof useFun>;
export function useOpen(isRoot?: string): ReturnType<typeof useFun>;
export function useOpen(isRoot: boolean | string = false, ctx?: ComponentInternalInstance | null) {
  return useFun(isRoot, ctx);
}
