import { createApp } from 'vue';
import App from './App.vue';
import 'vant/lib/index.css';
import router from './router';
import VConsole from 'vconsole';
// if (import.meta.env.MODE !== 'production') {
//   const vConsole = new VConsole();
// }

const app = createApp(App);
app.use(router);
app.mount('#app');
