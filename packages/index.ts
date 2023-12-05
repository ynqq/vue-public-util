import { App } from 'vue';
import VuePublicButton from './components/Button/index.vue';
import { IConfigOptions } from './types';
import { setConfig } from './utils/config';
import { initI18n } from './locales';
export { default as PlButton } from './components/Button/index.vue';
import './assets/scss/style.scss';

const init = () => {
  initI18n();
};

export const install = (app: App, options?: Partial<IConfigOptions>) => {
  setConfig(options);
  init();
  app.component(VuePublicButton.name, VuePublicButton);
  return app;
};

export default {
  install: install,
};

export * from './types';
export * from './utils';
declare module 'vue' {
  export interface GlobalComponents {
    PlButton: typeof import('./components/Button/index.vue')['default'];
  }
}

export {};
