import type { ValueOf } from 'element-plus/es/components/table/src/table-column/defaults.mjs';

export const LANGUAGE = {
  zhcn: 'zh-cn',
  enus: 'en-us',
} as const;
export type TLANGUAGE = ValueOf<typeof LANGUAGE>;
export const CANCEL_ERROR = 'CANCEL_ERROR';
