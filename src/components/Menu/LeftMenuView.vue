<template>
    <div class="fixed py-5 px-7">
        <menu class="flex-grow bg-blue-200 shadow-md rounded-md py-2 px-6 space-y-3">
            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'home' }">{{ $t('HomePage.Home') }}</router-link>
            </div>

            <div class="">
                <div class="px-4 text-gray-600 pb-2">
                    {{ $t('DealsPage.Deals') }}
                </div>
                <div class="ml-4 space-y-2">
                    <div class="hover:bg-blue-300 hover:rounded-md px-2 text-gray-600">
                        <router-link :to="{name: 'currentDeals'}">{{ $t('DealsPage.CurrentDeals') }}</router-link>
                    </div>
                    <div class="hover:bg-blue-300 hover:rounded-md px-2 text-gray-600">
                        <router-link :to="{name: 'oldDeals'}">{{ $t('DealsPage.PastDeals') }}</router-link>
                    </div>
                    <div class="hover:bg-blue-300 hover:rounded-md px-2 text-gray-600">
                        <router-link :to="{name: 'newDeal'}">{{ $t('DealsPage.NewDeal') }}</router-link>
                    </div>
                </div>
            </div>

            <div class="hover:bg-blue-300 hover:rounded-md px-4 text-gray-600">
                <router-link :to="{name: 'calculator' }">{{ $t('CalculatorPage.Calculator') }}</router-link>
            </div>
        </menu>
    </div>
</template>

<script>
export default {
    name: 'LeftMenuView',
}
</script>