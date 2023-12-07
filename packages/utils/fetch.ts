import { onUnmounted } from 'vue';

interface IUseFetchOnceOptions {
  name: string;
  query: (...args: any[]) => any;
}
interface IUseFetchOnceQueryData {
  pending: null | boolean;
  queue: ((...args: any[]) => any)[];
  result?: any;
  failData?: any;
}
const queryData: Record<string, IUseFetchOnceQueryData> = {};
export const useFetchOnce = (options: IUseFetchOnceOptions) => {
  const { name, query } = options;
  const runAll = () => {
    const queryDataItem = queryData[name];
    queryDataItem?.queue?.forEach(fun => {
      fun && fun(queryDataItem.result);
    });
    reset();
  };
  const fetch = async (...args: any[]) => {
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
  };
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
