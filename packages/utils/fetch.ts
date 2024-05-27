import { IUseFetchOnceOptions } from '@app/types';
import { onUnmounted } from 'vue';
import { deleteQueryData, getQueryData, getRouterFromPlugins, setQueryData } from '@app/utils/index';

/**
 * 只请求一次接口
 * @description 例如： 下拉框需要请求接口。该下拉框需要循环创建。同一次创建只会请求一次接口
 * @param options {@link IUseFetchOnceOptions}
 * @returns fetch: (options.query.options) => Promise<options.query.result> 调用本方法执行请求
 * @returns reset: () => void 重置该组件状态
 */
export const useFetchOnce = <F extends (...args: any[]) => any, R = ReturnType<F>, FN = (...args: Parameters<F>) => R>(
  options: IUseFetchOnceOptions<F>
): {
  reset: () => void;
  fetch: FN;
} => {
  const { name, query, uninstall } = options;
  const runAll = () => {
    const queryDataItem = getQueryData(name);
    queryDataItem?.queue?.forEach(fun => {
      fun && fun(queryDataItem.result as R);
    });
    // 没有引入路由插件 还是完事就重置
    if (!getRouterFromPlugins()) {
      reset();
    }
  };
  const fetch = (async (...args: Parameters<F>) => {
    const cacheQueryData = getQueryData(name);
    if (cacheQueryData?.result) {
      return cacheQueryData.result;
    } else {
      let queryDataItem = getQueryData(name)!;
      if (!cacheQueryData) {
        queryDataItem = setQueryData(name, {
          pending: null,
          queue: [],
        });
      }
      return (() =>
        new Promise(async resolve => {
          queryDataItem.queue.push(resolve);
          if (!queryDataItem.pending) {
            queryDataItem.pending = true;
            try {
              const data = await query(...args);
              queryDataItem.result = data;
              runAll();
            } catch (error) {
              queryDataItem.result = queryDataItem.failData || [];
              runAll();
            }
          }
        }))();
    }
  }) as FN;
  const reset = () => {
    deleteQueryData(name);
  };

  onUnmounted(() => {
    uninstall && reset();
  });

  return {
    fetch,
    reset,
  };
};
