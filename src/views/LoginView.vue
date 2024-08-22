<template>
    <main class="flex-grow">
        <div class="flex justify-center">
            <div class="w-4/12 bg-white p-6 rounded-lg">
                <h1 class="text-2xl text-center pb-5"><p>{{ $t('login') }}</p></h1>

                <form action="" @submit.prevent="">
                    <div class="mb-4">
                        <label for="email" class="sr-only">Email</label>
                        <input type="text" name="email" id="email" placeholder="Your email"
                        class="bg-white border-2 w-full p-4 rounded-lg">
                    </div>

                    <div class="mb-4">
                        <label for="password" class="sr-only">Password</label>
                        <input type="password" name="password" id="password" placeholder="Your password"
                        class="bg-white border-2 w-full p-4 rounded-lg">
                    </div>

                    <div>
                        <button type="submit" class="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full">{{ $t('login') }}</button>
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
        name: 'LoginView'
    }
</script>