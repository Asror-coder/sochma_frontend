<template class="relative">
  <header class="fixed flex items-center justify-between py-5 shadow-md bg-white top-0 left-0 right-0 w-full">

    <!-- Left side: Logo -->
    <div class="flex items-center text-green-800 font-bold pl-6">
      <router-link :to="{name: 'home' }">SOCHMA</router-link>
    </div>

    <!-- Right side: All items in one line -->
    <div class="flex flex-row items-center gap-4 pr-6">
      <template v-if="isLoggedIn">
        <span class="text-green-800 font-semibold">{{ userName }}</span>
        <LanguageSwitcher />
        <button
          @click="logout"
          class="border-gray-300 border-2 rounded px-4 py-2 bg-gray-200 text-gray-900 hover:bg-gray-300 transition"
        >
          {{ $t('Auth.logout') }}
        </button>
      </template>
      
      <template v-else>
        <LanguageSwitcher />
        <router-link :to="{name: 'signup' }" class="border-gray-300 border-2 rounded px-4 py-2">{{ $t('Auth.signup') }}</router-link>
        <router-link :to="{name: 'login' }" class="bg-blue-500 text-white rounded px-4 py-2">{{ $t('Auth.login') }}</router-link>
      </template>
    </div>

  </header>

  <router-view />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import LanguageSwitcher from './LanguageSwitcher.vue';

const router = useRouter();
const store = useStore();
const isLoggedIn = ref(!!localStorage.getItem('token'));

// Get user's full name from Vuex user module
const userName = computed(() => {
  const user = store.getters['user/getUser'];
  return user ? `${user.firstName} ${user.lastName}` : '';
});

function logout() {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  router.push({ name: 'login' });
}

window.addEventListener('storage', () => {
  isLoggedIn.value = !!localStorage.getItem('token');
});
</script>