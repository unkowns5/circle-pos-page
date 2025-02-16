import { createRouter, createWebHistory } from "vue-router";
import ListView from "@/components/ListView.vue";
import BookView from "@/components/BookView.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { 
            path: '/', 
            name: 'bookstore',
            component: ListView
        },

        { 
            path: '/book/:id',
            name:'details',
            component: BookView
        },
    ]
});

export default router
