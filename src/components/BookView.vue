<script lang="ts" setup>

import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useToast } from 'vue-toast-notification';

const route = useRoute()
const book = ref()
const $toast = useToast()
const loading = ref(false)
const purchasing = ref(false)

async function getBook() {
    loading.value = true
    await axios
        .get(import.meta.env.VITE_API_URL +'/'+ route.params.id)
        .then(response => book.value = response.data.book)
        .catch(error => console.error(error))
        .finally(() => {
            document.title = book.value.title
            loading.value = false
        })
}

async function buy() {
    purchasing.value = true
    await axios
        .post(import.meta.env.VITE_API_URL +'/'+ route.params.id + '/purchase')
        .then(async () => {
            book.value.availableStock--
            $toast.success(
                book.value.title + ' is purchased', 
                { 
                    duration: 500,
                    position: 'top-right'
                })
        })
        .catch(() => 
            $toast.error('Network error, please try again.', 
            { 
                duration: 500,
                position: 'top-right'
            }))
        .finally(() => purchasing.value = false)
}



onMounted(async() => {
    await getBook()
})
</script>

<template>
    <div v-if="!loading" class="book-details">
        <div class="details-cover">
            <img class="w-auto h-auto object-contain" src="https://picsum.photos/350/500">
        </div>
        <div class="details-text">
            <p class="text-3xl">{{ book?.title }}</p>
            <p class="text-md pl-0.5">by {{ book?.author }}</p>
            <div class="flex flex-wrap items-center justify-between py-4 text-xl">
                <p>$ {{ book?.price }}</p>
                <button 
                    role="button" 
                    v-bind:disabled="book?.availableStock <= 0 || purchasing"
                    @click="buy()">
                    <p v-if="book?.availableStock > 0">Buy</p>
                    <p v-else>Out of stock</p>
                </button>
            </div>
            <p class="pt-2 text-base/8">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p class="text-sm pt-6">ISBN: {{ book?.isbn }}</p>
        </div>
    </div>

    <div v-else class="book-details">
        <div class="details-cover">
            <div class="w-[350px] h-[500px] placeholder"></div>
        </div>
        <div class="details-text">
            <div class="w-[250px] h-[36px] placeholder"></div>
            <div class="w-[150px] h-[32px] placeholder"></div>
            <div class="w-[450px] h-[45px] placeholder"></div>
            <div class="w-[450px] h-[350px] placeholder"></div>
        </div>
    </div>
</template>

