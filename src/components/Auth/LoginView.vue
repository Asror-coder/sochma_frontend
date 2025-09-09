<template>
    <div class="mt-20">
        <main class="flex-grow">
            <div class="flex justify-center">
                <div class="w-4/12 bg-white p-6 rounded-lg">
                    <h1 class="text-2xl text-center pb-5"><p>{{ $t('Auth.login') }}</p></h1>

                    <span v-if="$route.query.registered === 'true'" class="text-green-500 text-sm mb-4">
                        Registration successful! You can now log in.
                    </span>

                    <form action="" @submit.prevent="validateLogin">
                        <div class="mb-4">
                            <label for="login" class="sr-only">Login</label>
                            <input
                                type="text"
                                name="login"
                                id="login"
                                :placeholder="$t('Auth.login_placeholder')"
                                class="bg-white border-2 w-full p-4 rounded-lg"
                                v-model="login"
                                :class="{'border-red-500': errors.login}"
                            >
                            <span v-if="errors.login" class="text-red-500 text-sm">{{ errors.login }}</span>
                        </div>

                        <div class="mb-4">
                            <label for="password" class="sr-only">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                :placeholder="$t('Auth.password_placeholder')"
                                class="bg-white border-2 w-full p-4 rounded-lg"
                                v-model="password"
                                :class="{'border-red-500': errors.password}"
                            >
                            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
                        </div>

                        <div>
                            <button type="submit" class="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full">{{ $t('Auth.login') }}</button>
                        </div>
                    </form>

                    <div class="mt-4 flex justify-center">
                        <button
                            type="button"
                            class="text-blue-500 underline hover:text-blue-700"
                            @click="forgotPassword"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    export default {
        name: 'LoginView',
        data() {
            return {
                login: '',
                password: '',
                errors: {}
            }
        },
        mounted() {
            if (localStorage.getItem('token')) {
                this.$router.push({ name: 'home' });
            }
        },
        methods: {
            validateLogin() {
                this.errors = {};
                if (!this.login) {
                    this.errors.login = 'Login is required';
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
                        "login": this.login,
                        "password": this.password
                    });
                    // Save JWT token to localStorage
                    localStorage.setItem('token', response.data.token);
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