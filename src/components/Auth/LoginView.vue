<template>
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <main class="flex-grow flex items-center justify-center px-4 py-12 sm:py-16">
            <div class="w-full max-w-md bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 sm:p-10 border border-blue-100">
                <div class="mb-8 text-center">
                    <h1 class="text-3xl font-extrabold tracking-tight text-blue-700">{{ $t('Auth.login') }}</h1>
                    <p class="mt-2 text-sm text-gray-500" v-if="$route.query.registered === 'true'">
                        <span class="text-green-600 font-medium">{{ $t('Auth.signup') }} {{ $t('Common.Success') || 'Success' }}!</span>
                    </p>
                </div>

                <form @submit.prevent="validateLogin" novalidate class="space-y-5">
                    <div>
                        <label for="loginName" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.login') }}</label>
                        <div class="relative">
                            <input
                                type="text"
                                id="loginName"
                                autocomplete="username"
                                :placeholder="$t('Auth.login_placeholder')"
                                class="peer bg-white border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 placeholder-gray-400"
                                v-model.trim="loginName"
                                :aria-invalid="!!errors.loginName"
                            />
                            <span v-if="errors.loginName" class="absolute -bottom-5 left-0 text-xs text-red-600">{{ errors.loginName }}</span>
                        </div>
                    </div>

                        <div>
                            <label for="password" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.password_placeholder') }}</label>
                            <div class="relative">
                                <input
                                    :type="showPassword ? 'text' : 'password'"
                                    id="password"
                                    autocomplete="current-password"
                                    :placeholder="$t('Auth.password_placeholder')"
                                    class="peer bg-white border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 placeholder-gray-400 pr-10"
                                    v-model="password"
                                    :aria-invalid="!!errors.password"
                                />
                                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.523 10.523 0 01-1.409 2.888M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                                </button>
                                <span v-if="errors.password" class="absolute -bottom-5 left-0 text-xs text-red-600">{{ errors.password }}</span>
                            </div>
                        </div>

                    <div class="pt-4">
                        <button type="submit" class="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg px-5 py-3 shadow-md shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">
                            <span>{{ $t('Auth.login') }}</span>
                        </button>
                    </div>
                </form>

                <!-- Mobile-only quick access to signup -->
                <div class="mt-6 sm:hidden">
                    <router-link
                        :to="{ name: 'signup' }"
                        class="w-full inline-flex items-center justify-center gap-2 border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 active:bg-blue-100 font-semibold rounded-lg px-5 py-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {{ $t('Auth.signup') }}
                    </router-link>
                </div>

                <div class="flex justify-center pt-8">
                    <button type="button"  @click="forgotPassword"
                        class="text-sm text-blue-600 hover:text-blue-700 focus:outline-none focus:underline">
                        Forgot password?
                    </button>
                </div>

                <div class="mt-10 text-center">
                    <p class="text-xs text-gray-500">&copy; {{ new Date().getFullYear() }} Sochma. All rights reserved.</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'LoginView',
    data() {
        return {
            loginName: '',
            password: '',
            errors: {},
            showPassword: false
        }
    },
    mounted() {
        if (this.$store.getters['user/isAuthenticated']) {
            this.$router.push({ name: 'home' });
        }
    },
    methods: {
        ...mapActions('user', ['login']),
        validateLogin() {
            this.errors = {};
            if (!this.loginName) {
                this.errors.loginName = 'Login is required';
            }
            if (!this.password) {
                this.errors.password = 'Password is required';
            }
            if (Object.keys(this.errors).length === 0) {
                this.handleLogin();
            }
        },
        async handleLogin() {
            try {
                const response = await this.$axios.post('/api/Auth/login', {
                    "login": this.loginName,
                    "password": this.password
                });
                // Save user and token to Vuex store
                await this.$store.dispatch('user/login', {
                  user: response.data.user,
                  token: response.data.token
                });

                // Redirect to homepage and reload the app
                this.$router.push({ name: 'home' }).then(() => {
                    window.location.reload();
                });
            } catch (error) {
                if (error.response && error.response.data) {
                    // Handle API error
                } else {
                    // Handle generic error
                }
            }
        },
        forgotPassword() {
            alert('Forgot password feature coming soon!');
        }
    }
}
</script>