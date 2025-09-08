<template class="relative">
  <header class="fixed grid grid-cols-6 py-5 shadow-md bg-white top-0 left-0 right-0">

    <div class="flex justify-center text-green-800 font-bold">
      <router-link :to="{name: 'home' }">SOCHMA</router-link>
    </div>

    <div class="col-span-3"></div>

    <div class="flex justify-center">
      <LanguageSwitcher />
    </div>

    <div class="grid grid-cols-2 pr-4">
      <template v-if="isLoggedIn">
        <div class="flex justify-center border-white border-2 mr-1 rounded-md">
        </div>
        <div class="flex justify-center border-gray-300 border-2 mr-1 rounded-md">
          <button @click="logout">{{ $t('Auth.logout') }}</button>
        </div>
      </template>
      <template v-else>
        <div class="flex justify-center border-gray-300 border-2 mr-1 rounded-md">
          <router-link :to="{name: 'signup' }">{{ $t('Auth.signup') }}</router-link>
        </div>
        <div class="flex justify-center bg-blue-500 text-white ml-1 rounded-md">
          <router-link :to="{name: 'login' }">{{ $t('Auth.login') }}</router-link>
        </div>
      </template>
    </div>

  </header>

  <router-view />
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LanguageSwitcher from './LanguageSwitcher.vue';

const router = useRouter();
const isLoggedIn = ref(!!localStorage.getItem('token'));

function logout() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  router.push({ name: 'login' });
}

// Listen for changes to localStorage (optional, for multi-tab support)
window.addEventListener('storage', () => {
  isLoggedIn.value = !!localStorage.getItem('token');
});
</script>