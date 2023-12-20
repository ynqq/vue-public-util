import { EActionEnum, TActionConfig, TActionValue, TOtherAction } from '@app/types';

/**
 * 判断操作类型
 * @param action {@link EActionEnum} | {@link TOtherAction}
 * @param config {@link TActionConfig}
 * @returns actions {@link TActionValue}
 */
export const useAction = <T extends TActionConfig = TActionConfig, K extends string | number | symbol = keyof T>(
  action: EActionEnum | TOtherAction,
  config?: T
): TActionValue<K> => {
  const result = {
    isCreate: action === EActionEnum.isCreate,
    isUpdate: action === EActionEnum.isUpdate,
    isCopy: action === EActionEnum.isCopy,
    isView: action === EActionEnum.isView,
  };
  const configResult = {} as { [k: string]: boolean };
  if (config) {
    Object.keys(config).forEach(key => {
      configResult[key] = config[key] === action;
    });
  }
  return { ...result, ...configResult } as TActionValue<K>;
};
