<template>
  <div class="flex flex-col">
    <div class="flex pb-6">
      <p class="text-lg cursor-pointer" @click="$router.push({name: 'home'})">Bookstore</p>
    </div>
    <RouterView />
  </div>
</template>
