import { App } from 'vue';
import VuePublicButton from './components/Button/index.vue';
import { IConfigOptions, TBucket } from './types';
import { setConfig } from './utils/config';
import { initI18n } from './locales';
export { default as PlButton } from './components/Button/index.vue';
export * from './components/Drawer/util';
export * from './components/Modal/util';
export * from './components/type';
import './assets/scss/style.scss';

const init = () => {
  initI18n();
};

export const install = (app: App, options?: Partial<IConfigOptions>) => {
  setConfig(options);
  init();
  app.component(VuePublicButton.name!, VuePublicButton);
  return app;
};

export default {
  install: install,
  ver: __APP_VERSION__,
};

export * from './types';
export * from './utils';
declare module 'vue' {
  export interface GlobalComponents {
    PlButton: typeof import('./components/Button/index.vue')['default'];
  }

  interface ComponentInternalInstance {
    bucket: TBucket;
  }
}

export {};
