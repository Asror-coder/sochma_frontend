<template class="relative">

  <header class="fixed top-0 left-0 right-0 w-full bg-white shadow z-20 border-b border-gray-100">
    <div class="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
      <!-- Logo -->
      <div class="flex items-center h-full">
        <router-link :to="{name: 'home'}" class="flex items-center h-full">
          <span class="text-blue-700 font-extrabold text-2xl tracking-tight">SOCHMA</span>
        </router-link>
      </div>

      <!-- Navigation -->
      <nav class="flex items-center h-full space-x-6" v-if="isLoggedIn">
        <router-link :to="{name: 'home'}" class="text-gray-700 hover:text-blue-700 font-medium text-base py-2">{{ $t('HomePage.Home') }}</router-link>

        <!-- Deals dropdown -->
        <div class="relative" @mouseenter="showDealsDropdown = true" @mouseleave="showDealsDropdown = false">
          <button class="text-gray-700 hover:text-blue-700 font-medium text-base py-2 flex items-center focus:outline-none">
            {{ $t('DealsPage.Deals') }}
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div
            v-if="showDealsDropdown"
            class="absolute left-0 top-full w-56 bg-white border border-gray-200 rounded-xl shadow-2xl z-30 flex flex-col py-2"
            style="pointer-events: auto;"
          >
            <router-link
              :to="{name: 'currentDeals'}"
              class="block px-6 py-3 text-gray-800 text-base font-medium hover:bg-blue-600 hover:text-white transition-all text-left rounded-lg"
            >{{ $t('DealsPage.CurrentDeals') }}</router-link>
            <router-link
              :to="{name: 'oldDeals'}"
              class="block px-6 py-3 text-gray-800 text-base font-medium hover:bg-blue-600 hover:text-white transition-all text-left rounded-lg"
            >{{ $t('DealsPage.PastDeals') }}</router-link>
            <router-link
              :to="{name: 'newDeal'}"
              class="block px-6 py-3 text-gray-800 text-base font-medium hover:bg-blue-600 hover:text-white transition-all text-left rounded-lg"
            >{{ $t('DealsPage.NewDeal') }}</router-link>
          </div>
        </div>

        <router-link :to="{name: 'calculator'}" class="text-gray-700 hover:text-blue-700 font-medium text-base py-2">{{ $t('CalculatorPage.Calculator') }}</router-link>
      </nav>

      <!-- User & Language -->
      <div class="flex items-center h-full space-x-4">
        <template v-if="isLoggedIn">
          <span class="text-gray-700 font-semibold">{{ userName }}</span>
          <LanguageSwitcher />
          <button
            @click="logout"
            class="border border-gray-300 rounded px-4 py-2 bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
          >
            {{ $t('Auth.logout') }}
          </button>
        </template>
        <template v-else>
          <LanguageSwitcher />
          <router-link :to="{name: 'signup' }" class="border border-gray-300 rounded px-4 py-2 text-gray-700 bg-white hover:bg-blue-50 hover:text-blue-700">{{ $t('Auth.signup') }}</router-link>
          <router-link :to="{name: 'login' }" class="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">{{ $t('Auth.login') }}</router-link>
        </template>
      </div>
    </div>
  </header>

  <router-view />
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import LanguageSwitcher from './Header/LanguageSwitcher.vue';

const router = useRouter();
const store = useStore();
const isLoggedIn = ref(!!localStorage.getItem('token'));
const showDealsDropdown = ref(false);

// Get user's full name from Vuex user module
const userName = computed(() => {
  const user = store.getters['user/getUser'];
  return user ? `${user.firstName} ${user.lastName}` : '';
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  isLoggedIn.value = false;
  router.push({ name: 'login' });
}

window.addEventListener('storage', () => {
  isLoggedIn.value = !!localStorage.getItem('token');
});
</script>