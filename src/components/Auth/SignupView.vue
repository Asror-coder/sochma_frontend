<template>
    <div class="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <main class="flex-grow flex items-center justify-center px-4 py-12 sm:py-16">
            <div class="w-full max-w-lg bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8 sm:p-10 border border-blue-100">
                <div class="mb-8 text-center">
                    <h1 class="text-3xl font-extrabold tracking-tight text-blue-700">{{ $t('Auth.signup') }}</h1>
                    <!-- <p class="mt-2 text-sm text-gray-500">{{ $t('Auth.signup_button') }} &middot; {{ $t('Auth.login') }}</p> -->
                </div>

                <form @submit.prevent="validateForm" novalidate class="space-y-6">
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="firstName" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.first_name_placeholder') }}</label>
                            <input id="firstName" v-model.trim="firstName" type="text" autocomplete="given-name" :placeholder="$t('Auth.first_name_placeholder')" class="bg-white border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 placeholder-gray-400" :aria-invalid="!!errors.firstName" />
                            <span v-if="errors.firstName" class="mt-1 block text-xs text-red-600">{{ errors.firstName }}</span>
                        </div>
                        <div>
                            <label for="lastName" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.last_name_placeholder') }}</label>
                            <input id="lastName" v-model.trim="lastName" type="text" autocomplete="family-name" :placeholder="$t('Auth.last_name_placeholder')" class="bg-white border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 placeholder-gray-400" :aria-invalid="!!errors.lastName" />
                            <span v-if="errors.lastName" class="mt-1 block text-xs text-red-600">{{ errors.lastName }}</span>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="birthDay" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.birth_day_placeholder') }}</label>
                            <input id="birthDay" v-model="birthDay" type="date" class="bg-white border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 placeholder-gray-400" :aria-invalid="!!errors.birthDay" />
                            <span v-if="errors.birthDay" class="mt-1 block text-xs text-red-600">{{ errors.birthDay }}</span>
                        </div>
                        <div>
                            <label for="login" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.login_placeholder') }}</label>
                            <input id="login" v-model.trim="login" type="text" autocomplete="username" :placeholder="$t('Auth.login_placeholder')" class="bg-white border w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 placeholder-gray-400" :aria-invalid="!!errors.login" />
                            <span v-if="errors.login" class="mt-1 block text-xs text-red-600">{{ errors.login }}</span>
                        </div>
                    </div>

                    <div>
                        <label for="phoneNumber" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.phone_placeholder') }}</label>
                        <div class="flex rounded-lg border bg-white focus-within:ring-2 focus-within:ring-blue-400 focus-within:border-blue-400 transition overflow-hidden">
                            <select v-model="countryCode" class="bg-white px-3 py-3 text-gray-700 border-r outline-none">
                                <option value="998">+998</option>
                            </select>
                            <input id="phoneNumber" v-model.trim="phoneNumber" type="tel" inputmode="numeric" autocomplete="tel" class="flex-1 px-4 py-3 outline-none placeholder-gray-400" :placeholder="$t('Auth.phone_placeholder')" :aria-invalid="!!errors.phoneNumber" />
                        </div>
                        <span v-if="errors.phoneNumber" class="mt-1 block text-xs text-red-600">{{ errors.phoneNumber }}</span>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label for="password" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.password_new_placeholder') }}</label>
                            <div class="relative">
                                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" autocomplete="new-password" :placeholder="$t('Auth.password_new_placeholder')" class="bg-white border w-full px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 placeholder-gray-400" :aria-invalid="!!errors.password" />
                                <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600" :aria-label="showPassword ? 'Hide password' : 'Show password'">
                                    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.523 10.523 0 01-1.409 2.888M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                                </button>
                            </div>
                            <span v-if="errors.password" class="mt-1 block text-xs text-red-600">{{ errors.password }}</span>
                        </div>
                        <div>
                            <label for="repeat_password" class="block text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{{ $t('Auth.repeat_password_placeholder') }}</label>
                            <div class="relative">
                                <input :type="showRepeatPassword ? 'text' : 'password'" id="repeat_password" v-model="repeat_password" autocomplete="new-password" :placeholder="$t('Auth.repeat_password_placeholder')" class="bg-white border w-full px-4 py-3 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition text-gray-800 placeholder-gray-400" :aria-invalid="!!errors.repeat_password" />
                                <button type="button" @click="showRepeatPassword = !showRepeatPassword" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600" :aria-label="showRepeatPassword ? 'Hide password' : 'Show password'">
                                    <svg v-if="!showRepeatPassword" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.5a10.523 10.523 0 01-1.409 2.888M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
                                </button>
                            </div>
                            <span v-if="errors.repeat_password" class="mt-1 block text-xs text-red-600">{{ errors.repeat_password }}</span>
                        </div>
                    </div>

                    <div class="pt-2">
                        <button type="submit" class="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg px-5 py-3 shadow-md shadow-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition">
                            <span>{{ $t('Auth.signup_button') }}</span>
                        </button>
                    </div>
                </form>

                <!-- Mobile-only quick access to login -->
                <div class="mt-6 sm:hidden">
                    <router-link
                        :to="{ name: 'login' }"
                        class="w-full inline-flex items-center justify-center gap-2 border border-blue-300 text-blue-700 bg-white hover:bg-blue-50 active:bg-blue-100 font-semibold rounded-lg px-5 py-3 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        {{ $t('Auth.login') }}
                    </router-link>
                </div>

                <div class="mt-10 text-center">
                    <p class="text-xs text-gray-500">&copy; {{ new Date().getFullYear() }} Sochma. All rights reserved.</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'SignupView',
        data() {
            return {
                firstName: '',
                lastName: '',
                login: '',
                phoneNumber: '',
                birthDay: '',
                password: '',
                repeat_password: '',
                countryCode: '998',
                errors: {},
                showPassword: false,
                showRepeatPassword: false
            }
        },
        methods: {
            validateForm() {
                this.errors = {};

                if (!this.firstName) {
                    this.errors.firstName = 'First name is required';
                }
                if (!this.lastName) {
                    this.errors.lastName = 'Last name is required';
                }
                if (!this.login) {
                    this.errors.login = 'Login is required';
                }
                if (!this.phoneNumber) {
                    this.errors.phoneNumber = 'Phone number is required';
                }
                if (!this.birthDay) {
                    this.errors.birthDay = 'Date of birth is required';
                }
                if (!this.password) {
                    this.errors.password = 'Password is required';
                } else if (this.password.length < 8) {
                    this.errors.password = 'Password must be at least 8 characters';
                }
                if (!this.repeat_password) {
                    this.errors.repeat_password = 'Please repeat your password';
                } else if (this.password !== this.repeat_password) {
                    this.errors.repeat_password = 'Passwords do not match';
                }

                if (Object.keys(this.errors).length === 0) {
                    this.handleSignup();
                }
            },
            async handleSignup() {
                try {
                    const response = await axios.post('/api/Auth/signup', {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        birthDay: this.birthDay,
                        phoneNumber: this.countryCode + this.phoneNumber,
                        login: this.login,
                        password: this.password,
                        isBroker: true
                    });
                    console.log('Signup successful:', response.data);
                    // Redirect to LoginView with success message
                    this.$router.push({
                        name: 'login',
                        query: { registered: 'true' }
                    });
                } catch (error) {
                    if (error.response && error.response.data) {
                        console.error('Signup failed: ', error.response.data);
                        // Display error message to user
                    } else {
                        console.error('Signup failed: ', error.message || error);
                        // Display generic error message to user
                    }
                }
            }
        }
    }
</script>