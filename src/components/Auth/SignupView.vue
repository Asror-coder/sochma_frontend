<template>
    <div class="mt-20">
        <main class="flex-grow">
            <div class="flex justify-center">
                <div class="w-4/12 bg-white p-6 rounded-lg">
                    <h1 class="text-2xl text-center pb-5"><p>{{ $t('Auth.signup') }}</p></h1>

                    <form action="" @submit.prevent="validateForm">
                        <div class="mb-4">
                            <label for="firstName" class="sr-only">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                :placeholder="$t('Auth.first_name_placeholder')"
                                class="bg-white border-2 w-full p-4 rounded-lg"
                                v-model="firstName"
                                :class="{'border-red-500': errors.firstName}"
                            >
                            <span v-if="errors.firstName" class="text-red-500 text-sm">{{ errors.firstName }}</span>
                        </div>

                        <div class="mb-4">
                            <label for="lastName" class="sr-only">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                :placeholder="$t('Auth.last_name_placeholder')"
                                class="bg-white border-2 w-full p-4 rounded-lg"
                                v-model="lastName"
                                :class="{'border-red-500': errors.lastName}"
                            >
                            <span v-if="errors.lastName" class="text-red-500 text-sm">{{ errors.lastName }}</span>
                        </div>

                        <div class="mb-4">
                            <label for="birthDay" class="sr-only">Date of Birth</label>
                            <span class="block text-gray-500 text-sm mb-1">{{ $t('Auth.birth_day_placeholder') }}</span>
                            <input
                                type="date"
                                name="birthDay"
                                id="birthDay"
                                class="bg-white border-2 w-full p-4 rounded-lg"
                                v-model="birthDay"
                                :class="{'border-red-500': errors.birthDay}"
                            >
                            <span v-if="errors.birthDay" class="text-red-500 text-sm">{{ errors.birthDay }}</span>
                        </div>

                        <div class="mb-4">
                            <label for="phoneNumber" class="sr-only">Phone number</label>
                            <div class="flex">
                                <select
                                    v-model="countryCode"
                                    class="bg-white border-2 rounded-l-lg p-4 text-gray-700"
                                >
                                    <option value="998">+998</option>
                                    <!-- Add more country codes as needed, without '+' -->
                                </select>
                                <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    :placeholder="$t('Auth.phone_placeholder')"
                                    class="bg-white border-2 border-l-0 w-full p-4 rounded-r-lg"
                                    v-model="phoneNumber"
                                    :class="{'border-red-500': errors.phoneNumber}"
                                >
                            </div>
                            <span v-if="errors.phoneNumber" class="text-red-500 text-sm">{{ errors.phoneNumber }}</span>
                        </div>

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
                            <label for="password" class="sr-only">New password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                :placeholder="$t('Auth.password_new_placeholder')"
                                class="bg-white border-2 w-full p-4 rounded-lg"
                                v-model="password"
                                :class="{'border-red-500': errors.password}"
                            />
                            <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
                        </div>

                        <div class="mb-4">
                            <label for="repeat_password" class="sr-only">Repeat password</label>
                            <input
                                type="password"
                                name="repeat_password"
                                id="repeat_password"
                                :placeholder="$t('Auth.repeat_password_placeholder')"
                                class="bg-white border-2 w-full p-4 rounded-lg"
                                v-model="repeat_password"
                                :class="{'border-red-500': errors.repeat_password}"
                            >
                            <span v-if="errors.repeat_password" class="text-red-500 text-sm">{{ errors.repeat_password }}</span>
                        </div>

                        <div>
                            <button type="submit" class="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full">{{ $t('Auth.signup_button') }}</button>
                        </div>
                    </form>
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
                countryCode: '+998',
                errors: {}
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
                        "firstName": this.firstName,
                        "lastName": this.lastName,
                        "birthDay": this.birthDay,
                        "phoneNumber": this.countryCode + this.phoneNumber, // countryCode without '+'
                        "login": this.login,
                        "password": this.password,
                        "isBroker": true
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