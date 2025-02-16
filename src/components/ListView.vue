<script lang="ts" setup>

import { useBooks } from '@/stores/books';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const { loading, books } = storeToRefs(useBooks());
const { fetchBooks } = useBooks()

document.title = 'Bookstore'

onMounted(() => {
    fetchBooks()
})

const router = useRouter()

function viewBook(id: number){
    router.push({ name:'details', params: {id} })
}

</script>

<template>
    <div v-show="!loading" class="flex flex-wrap gap-8 justify-center">
        <div class="w-[200px] h-[260px] border border-transparent hover:cursor-pointer hover:border-gray-700 rounded-md group" 
            v-for="book in books" :key="book.id"
            @click="viewBook(book.id)">
            <div class="flex flex-col p-5 overflow-hidden">
                <img class="w-[150px] h-[200px] group-hover:opacity-10 transition
                            group-hover:relative duration-400 group-hover:scale-110 self-center" 
                    v-bind:src="'https://picsum.photos/150/200?random=' + book.id">
                <div class="inline-block group-hover:absolute m-2 w-[160px]">
                    <p class="text-center group-hover:text-left">{{ book.title }}</p>
                    <p class="pt-2 text-xs invisible group-hover:visible">{{ book.author }}</p>
                    <p class="pt-4 text-xs invisible group-hover:visible">{{ '$ ' + book.price.toFixed(2) }}</p>
                    <div class="pt-4 text-xs invisible group-hover:visible overflow-hidden w-[160px] h-[120px]">{{ 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' }}</div>
                </div>
            </div>
        </div>
    </div>
    <div v-show="loading" class="flex flex-wrap gap-12 justify-center m-3">
        <div class="w-[200px] h-[260px] flex flex-col p-5" v-for="index in 20" :key="index">
            <div class="w-[150px] h-[200px] bg-gray-400 rounded-md animate-pulse"></div>
        </div>
    </div>
</template>