import { createApp } from 'vue';
import App from './App.vue';
// import VuePublicUtil from '../';
import VuePublicUtil, { setPlugins } from '@app/index';
import 'element-plus/dist/index.css';
// import '../dist/style.css';
import ElementPlus from 'element-plus';
import router from './router';

setPlugins([router]);

const app = createApp(App);
app
  .use(router)
  .use(VuePublicUtil, {
    locel: 'zh-cn',
    // langus: {
    //   'zh-cn': {
    //     confirm: 'asd',
    //   },
    //   'en-us': {},
    // },
  })
  .use(ElementPlus);
app.mount('#app');
