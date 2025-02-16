import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import ListView from './components/ListView.vue'
import BookView from './components/BookView.vue'

import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            component: ListView
        },

        { 
            path: '/book/:id',
            name: 'details',
            component: BookView
        },
    ]
});

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
