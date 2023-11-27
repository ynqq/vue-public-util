import { createApp } from 'vue';
import App from './App.vue';
// import VuePublicUtil from '../';
import VuePublicUtil from '@app/index';
import 'element-plus/dist/index.css';
import '../dist/style.css';

const app = createApp(App);
app.use(VuePublicUtil);
app.mount('#app');
