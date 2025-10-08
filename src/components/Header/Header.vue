<template>
    <header class="fixed top-0 inset-x-0 z-40">
        <div class="bg-white/70 backdrop-blur border-b border-blue-100/60 shadow-sm">
            <div class="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
                <!-- Left: Logo + Desktop Nav -->
                <div class="flex items-center gap-8">
                    <router-link :to="{ name: 'home' }" class="flex items-center group">
                        <span class="text-blue-700 group-hover:text-blue-800 font-extrabold text-2xl tracking-tight">SOCHMA</span>
                    </router-link>
                    <nav v-if="isLoggedIn" class="hidden md:flex items-center gap-6 text-sm font-medium">
                        <router-link :to="{ name: 'currentDeals' }" class="text-gray-700 hover:text-blue-700 transition-colors">{{ $t('DealsPage.Deals') }}</router-link>
                        <router-link :to="{ name: 'newDeal' }" class="text-gray-700 hover:text-blue-700 transition-colors">{{ $t('DealsPage.NewDeal') }}</router-link>
                        <router-link :to="{ name: 'calculator' }" class="text-gray-700 hover:text-blue-700 transition-colors">{{ $t('CalculatorPage.Calculator') }}</router-link>
                    </nav>
                </div>
                <!-- Right actions (desktop) -->
                <div class="hidden md:flex items-center gap-4">
                    <template v-if="isLoggedIn">
                        <span class="text-gray-700 font-semibold truncate max-w-[140px]">{{ userName }}</span>
                        <LanguageSwitcher />
                        <button @click="logout" class="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-700 font-medium text-sm transition">{{ $t('Auth.logout') }}</button>
                    </template>
                    <template v-else>
                        <LanguageSwitcher />
                        <router-link :to="{ name: 'login' }" class="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 active:bg-blue-800 shadow-sm transition">{{ $t('Auth.login') }}</router-link>
                        <router-link :to="{ name: 'signup' }" class="inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 font-medium text-sm transition">{{ $t('Auth.signup') }}</router-link>
                    </template>
                </div>
                <!-- Mobile controls: hamburger (logged in) OR language switcher (logged out) -->
                <template v-if="isLoggedIn">
                    <button @click="toggleMobile" class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-blue-200 bg-white/70 backdrop-blur text-blue-600 hover:bg-blue-50 active:scale-95 transition" :aria-expanded="mobileOpen" aria-label="Toggle navigation">
                        <svg v-if="!mobileOpen" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>
                </template>
                <template v-else>
                    <div class="md:hidden">
                        <LanguageSwitcher />
                    </div>
                </template>
            </div>
        </div>

        <!-- Mobile menu (only if logged in) -->
        <template v-if="isLoggedIn">
            <transition name="fade-overlay">
                <div v-if="mobileOpen" class="md:hidden fixed inset-0 top-16 bg-black/35 backdrop-blur-sm z-30" @click="closeMobile" aria-hidden="true"></div>
            </transition>
            <transition name="drawer">
                <div v-if="mobileOpen" class="md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 max-w-full z-40 px-5 pb-8 pt-5 bg-white/95 backdrop-blur border-l border-blue-100 shadow-xl flex flex-col overflow-y-auto">

                <!-- Navigation links -->
                <nav v-if="isLoggedIn" class="flex flex-col gap-3 text-lg font-medium mb-6">
                    <router-link @click="closeMobile" :to="{ name: 'currentDeals' }" class="px-4 py-2.5 rounded-lg bg-white/70 hover:bg-blue-50 text-gray-700 transition">{{ $t('DealsPage.Deals') }}</router-link>
                    <router-link @click="closeMobile" :to="{ name: 'newDeal' }" class="px-4 py-2.5 rounded-lg bg-white/70 hover:bg-blue-50 text-gray-700 transition">{{ $t('DealsPage.NewDeal') }}</router-link>
                    <router-link @click="closeMobile" :to="{ name: 'calculator' }" class="px-4 py-2.5 rounded-lg bg-white/70 hover:bg-blue-50 text-gray-700 transition">{{ $t('CalculatorPage.Calculator') }}</router-link>
                </nav>

                <!-- Mobile menu actions -->
                <div class="mt-auto flex flex-col gap-3">
                    <LanguageSwitcher fullWidth />
                    <template v-if="isLoggedIn">
                        <button @click="logoutAndClose" class="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-md hover:bg-blue-700 active:bg-blue-800 shadow-sm transition">{{ $t('Auth.logout') }}</button>
                    </template>
                    <template v-else>
                        <router-link @click="closeMobile" :to="{ name: 'login' }" class="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-blue-600 text-white font-semibold text-md hover:bg-blue-700 active:bg-blue-800 shadow-sm transition text-center">{{ $t('Auth.login') }}</router-link>
                        <router-link @click="closeMobile" :to="{ name: 'signup' }" class="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 font-medium text-md transition text-center">{{ $t('Auth.signup') }}</router-link>
                    </template>
                </div>
                </div>
            </transition>
        </template>
    </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import LanguageSwitcher from '../Header/LanguageSwitcher.vue';

const router = useRouter();
const store = useStore();
const isLoggedIn = ref(!!localStorage.getItem('token'));
const mobileOpen = ref(false);

const userName = computed(() => {
    const user = store.getters['user/getUser'];
    return user ? `${user.firstName} ${user.lastName}` : '';
});

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    isLoggedIn.value = false;
    mobileOpen.value = false;
    router.push({ name: 'login' });
}
function logoutAndClose() { logout(); }
function toggleMobile() { mobileOpen.value = !mobileOpen.value; }
function closeMobile() { mobileOpen.value = false; }
function handleResize() { if (window.innerWidth >= 768 && mobileOpen.value) mobileOpen.value = false; }

onMounted(() => {
    window.addEventListener('storage', () => { isLoggedIn.value = !!localStorage.getItem('token'); });
    window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => { window.removeEventListener('resize', handleResize); });
</script>

<style scoped>
/* Overlay fade */
.fade-overlay-enter-active, .fade-overlay-leave-active { transition: opacity .25s ease; }
.fade-overlay-enter-from, .fade-overlay-leave-to { opacity: 0; }

/* Drawer slide from right */
.drawer-enter-active, .drawer-leave-active { transition: transform .32s cubic-bezier(.4,.0,.2,1), opacity .25s ease; }
.drawer-enter-from, .drawer-leave-to { transform: translateX(100%); opacity: 0; }
</style>