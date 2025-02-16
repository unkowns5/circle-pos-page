import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css';

createApp(App)
    .use(router)
    .use(createPinia())
    .use(ToastPlugin)
    .mount('#app')
