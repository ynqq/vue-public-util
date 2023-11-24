export * from './router';
/**
 * 等待一段时间
 * @param time 等待时间
 * @author ynqq
 * @returns Promise
 */
export const sleep = (time: number): Promise<void> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

export const useLoading = () => {
  //
};
