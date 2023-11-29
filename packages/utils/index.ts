export * from './router';
export * from './plugin';
export * from './data';
export * from './loading';
/**
 * 等待一段时间
 * @param time 等待时间
 * @author ynqq
 * @returns Promise
 */
export function sleep(time: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
