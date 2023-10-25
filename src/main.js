import { createApp } from 'vue';
import './style.css';
import router from "@/Router/index.js";
import App from './Layouts/AppLayout.vue';

createApp(App)
    .use(router)
    .mount('#app');
