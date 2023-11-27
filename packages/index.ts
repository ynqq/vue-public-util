import { App } from 'vue';
import VuePublicButton from './components/Button/index.vue';
export { default as PLButton } from './components/Button/index.vue';

export const install = (app: App) => {
  app.component(VuePublicButton.name, VuePublicButton);
  return app;
};

export default {
  install: install,
};

export * from './types';
export * from './utils';
