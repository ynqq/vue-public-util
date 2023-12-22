import { IUseFetchOnceOptions } from '@app/types';
import { onUnmounted } from 'vue';

interface IUseFetchOnceQueryData {
  pending: null | boolean;
  queue: ((...args: any[]) => any)[];
  result?: any;
  failData?: any;
}
const queryData: Record<string, IUseFetchOnceQueryData> = {};
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
  const { name, query } = options;
  const runAll = () => {
    const queryDataItem = queryData[name];
    queryDataItem?.queue?.forEach(fun => {
      fun && fun(queryDataItem.result as R);
    });
    reset();
  };
  const fetch = (async (...args: Parameters<F>) => {
    if (queryData[name]?.result) {
      return queryData[name].result;
    } else {
      if (!queryData[name]) {
        queryData[name] = {
          pending: null,
          queue: [],
        };
      }
      const queryDataItem = queryData[name];
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
    delete queryData[name];
  };

  onUnmounted(() => {
    reset();
  });

  return {
    fetch,
    reset,
  };
};
