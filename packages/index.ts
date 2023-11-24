import { App } from 'vue';
import VuePublicButton from './components/Button';
export { default as PLButton } from './components/Button';

export default {
  install(app: App) {
    app.component(VuePublicButton.name, VuePublicButton);
  },
};

export * from './types';
export * from './utils';
