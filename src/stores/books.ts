import type { Book } from "@/type/book";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooks = defineStore('books', {
    state: () => ({
        books: ref<Book[]>([]),
        loading: ref(false),
    }),

    actions: {
        async fetchBooks() {
            this.loading = true
            await fetch( import.meta.env.VITE_API_URL)
            .then(response => response.json())
            .then(data => this.books = data.books)
            .finally(() => this.loading = false)
        }
    }
})