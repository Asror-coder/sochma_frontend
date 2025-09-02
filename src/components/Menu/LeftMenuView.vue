<template>
    <div class="fixed py-5 px-7">
        <menu class="flex-grow bg-blue-200 shadow-md rounded-md py-2 px-6 space-y-3">
            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'home' }">{{ $t('HomePage.Home') }}</router-link>
            </div>

            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'deals' }">{{ $t('DealsPage.Deals') }}</router-link>
            </div>

            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'calculator' }">{{ $t('CalculatorPage.Calculator') }}</router-link>
            </div>

            <!-- <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'pastTrips' }">Past Trips</router-link>
            </div> -->
        </menu>
    </div>
</template>

<script>
export default {
    name: 'LeftMenuView',
}
</script>