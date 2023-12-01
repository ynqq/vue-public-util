import { IConfigOptions } from '@app/types';
import { deepObjectAssign } from '.';
import { LANGUAGE } from '@app/enums';

const config: IConfigOptions = {
  locel: LANGUAGE.zhcn,
};

export const getConfigLanguages = () => {
  const { langus } = config;
  return langus;
};
export const getConfigLoading = () => {
  const { loading } = config;
  return loading;
};

export const setConfig = (options: Partial<IConfigOptions> = {}) => {
  deepObjectAssign(config, options);
  return config;
};
export const getConfig = () => config;
