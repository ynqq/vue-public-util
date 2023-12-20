import { ValueOf } from '..';

export const LANGUAGE = {
  zhcn: 'zh-cn',
  enus: 'en-us',
} as const;
export type TLANGUAGE = ValueOf<typeof LANGUAGE>;
export const CANCEL_ERROR = 'CANCEL_ERROR';
