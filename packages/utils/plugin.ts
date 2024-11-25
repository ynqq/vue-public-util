import { Plugin } from 'vue';
import i18n from '@app/locales/index';
import { Router } from 'vue-router';

// 项目所使用插件 modal/drawer 需要用
const plugins: Plugin[] = [i18n];
export const setPlugins = (pluginList: Plugin[]) => {
  plugins.push(...pluginList);
  return plugins;
};
export const getPlugins = () => plugins;

export const getRouterFromPlugins = () => {
  return plugins.find(plugin => {
    return plugin && 'hasRoute' in plugin && 'go' in plugin;
  }) as Router | undefined;
};
