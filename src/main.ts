import { createApp } from 'vue';
import App from './App.vue';
import VuePublicUtil from '../';
// import VuePublicUtil from '@app/index';
import 'element-plus/dist/index.css';
import '../dist/style.css';
import ElementPlus from 'element-plus';

const app = createApp(App);
app
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
