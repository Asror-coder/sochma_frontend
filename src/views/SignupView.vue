<template>
    <main class="flex-grow">
        <div class="flex justify-center">
            <div class="w-4/12 bg-white p-6 rounded-lg">
                <h1 class="text-2xl text-center pb-5"><p>{{ $t('signup') }}</p></h1>

                <form action="" @submit.prevent="">
                    <div class="mb-4">
                        <label for="f_name" class="sr-only">First Name</label>
                        <input type="text" name="f_name" id="f_name" placeholder="Your first name"
                        class="bg-white border-2 w-full p-4 rounded-lg">
                    </div>

                    <div class="mb-4">
                        <label for="l_name" class="sr-only">Last Name</label>
                        <input type="text" name="l_name" id="l_name" placeholder="Your last name"
                        class="bg-white border-2 w-full p-4 rounded-lg">
                    </div>

                    <div class="mb-4">
                        <label for="email" class="sr-only">Email</label>
                        <input type="text" name="email" id="email" placeholder="Your email"
                        class="bg-white border-2 w-full p-4 rounded-lg">
                    </div>

                    <div class="mb-4">
                        <label for="phone" class="sr-only">Phone number</label>
                        <input type="numbers" name="phone" id="phone" placeholder="Your phone number"
                        class="bg-white border-2 w-full p-4 rounded-lg">
                    </div>

                    <div class="mb-4">
                        <label for="password" class="sr-only">New password</label>
                        <input type="password" name="password" id="password" placeholder="Your new password"
                        class="bg-white border-2 w-full p-4 rounded-lg">
                    </div>

                    <div class="mb-4">
                        <label for="repeat_password" class="sr-only">Repeat password</label>
                        <input type="password" name="repeat_password" id="repeat_password" placeholder="Repeat password"
                        class="bg-white border-2 w-full p-4 rounded-lg">
                    </div>

                    <div>
                        <button type="submit" class="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full">{{ $t('signup_button') }}</button>
                    </div>
                </form>

                <!-- <div class="flex-none">
                    <router-link to='/newpassword/request' class="p-3">Forgot your password?</router-link>
                </div> -->
            </div>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'SignupView'
    }
</script>