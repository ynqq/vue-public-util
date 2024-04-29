import { IUseDeepFn } from '@app/types';
import { sleep } from '@app/utils/index';

export const useDeepFn: IUseDeepFn = (fun, { limit, checker, time } = { limit: 10, time: 300 }) => {
  let _fetchNum = 1;

  return function deepFun(...args: any[]) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await fun(...args);
        const success = checker ? checker(result) : !!result;
        if (success) {
          resolve(result);
        } else {
          if (_fetchNum < limit) {
            _fetchNum++;
            await sleep(time);
            const result = await deepFun(...args);
            resolve(result);
          } else {
            reject();
          }
        }
      } catch (error) {
        reject(error);
      }
    });
  };
};
