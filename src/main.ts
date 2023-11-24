import { createApp } from 'vue';
import App from './App.vue';
import 'element-plus/dist/index.css';
import VuePublicUtil from '@app/index';

const app = createApp(App);
app.use(VuePublicUtil);
app.mount('#app');
