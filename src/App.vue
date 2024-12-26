<template class="relative">
  <header class="fixed grid grid-cols-6 py-5 shadow-md bg-white top-0 left-0 right-0">

    <div class="flex justify-center">
      <router-link :to="{name: 'home' }">Safar Agent</router-link>
    </div>

    <div class="col-span-3"></div>

    <div class="flex justify-center">
      <LanguageSwitcher />
    </div>

    <div class="grid grid-cols-2 pr-4">
      <div class="flex justify-center border-gray-300 border-2 mr-1 rounded-md">
        <router-link :to="{name: 'signup' }">{{ $t('signup') }}</router-link>
      </div>
      <div class="flex justify-center bg-blue-500 text-white ml-1 rounded-md">
        <router-link :to="{name: 'login' }">{{ $t('login') }}</router-link>
      </div>
    </div>

  </header>

  <router-view />
</template>

<script setup>
  import LanguageSwitcher from './components/LanguageSwitcher.vue';

</script>