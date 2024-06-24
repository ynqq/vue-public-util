import { CANCEL_ERROR } from '@app/enums';

export * from './router';
export * from './plugin';
export * from './data';
export * from './loading';
export * from './fetch';
export * from './action';
export * from './provide';
export * from './cache';
export * from './deep';
export * from './open';
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

window.addEventListener('unhandledrejection', e => {
  if (e.reason === CANCEL_ERROR) {
    e.preventDefault();
  }
});
