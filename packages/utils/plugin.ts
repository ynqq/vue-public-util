import { Plugin } from 'vue';

// 项目所使用插件 modal/drawer 需要用
const plugins: Plugin[] = [];
export const setPlugins = (pluginList: Plugin[]) => {
  plugins.push(...pluginList);
  return plugins;
};
export const getPlugins = () => plugins;
