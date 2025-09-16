<template>
    <main class="flex justify-center my-28">
        <div class="flex flex-col">
            <div class="w-full max-w-3xl rounded-2xl shadow-lg p-10 bg-white">
                <h1 class="text-3xl font-bold text-center mb-8 text-blue-700">
                    {{ $t('DealsPage.DealDetails') }}
                </h1>
                <div v-if="loading" class="text-gray-400 animate-pulse text-center">
                    {{ $t('Common.Loading') }}
                </div>
                <div v-else-if="!deal" class="text-gray-400 italic text-center">
                    {{ $t('Common.DealNotFound') }}
                </div>
                <div v-else-if="deal">
                    <div class="mb-8">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between md:gap-x-12">
                            <div>
                                <div class="flex items-center mb-2">
                                    <span class="font-bold text-2xl text-gray-800">{{ deal.brand }} {{ deal.model }}</span>
                                    <span class="ml-3 text-base text-gray-500">({{ deal.year }})</span>
                                </div>
                                <div class="text-base text-gray-600 mb-1">{{ deal.description }}</div>
                                <div class="text-xs text-gray-400">{{ $t('DealsPage.SerialNumber') }}: {{ deal.serialNumber }}</div>
                            </div>
                            <div class="mt-6 md:mt-0">
                                <div class="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 min-w-[220px]">
                                    <div class="grid grid-cols-3 items-center gap-0">
                                        <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.Price') }}</span>
                                        <span></span>
                                        <span class="font-bold text-xl text-blue-700 text-right">${{ deal.price }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 items-center gap-0">
                                        <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.Downpayment') }}</span>
                                        <span></span>
                                        <span class="font-semibold text-gray-700 text-right">${{ deal.downpayment }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 items-center gap-0">
                                        <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.PeriodMonth') }}</span>
                                        <span></span>
                                        <span class="font-semibold text-gray-700 text-right">{{ deal.periodMonth }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 items-center gap-0">
                                        <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.TotalReturn') }}</span>
                                        <span></span>
                                        <span class="font-semibold text-green-700 text-right">${{ deal.totalProfit }}</span>
                                    </div>
                                    <div class="grid grid-cols-3 items-center gap-0">
                                        <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.Profit') }}</span>
                                        <span></span>
                                        <span class="font-semibold text-green-700 text-right">${{ deal.brokerProfit }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full max-w-3xl rounded-2xl shadow-lg p-10 bg-white mt-10">
                <PaymentsView />
            </div>
        </div>
    </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import PaymentsView from './components/PaymentsView.vue';

export default {
    name: 'DealView',
    components: {
        PaymentsView
    },
    computed: {
        ...mapState('deal', ['deal', 'loading'])
    },
    async mounted() {
        const { id } = this.$route.params;
        await this.$store.dispatch('deal/fetchDeal', id);
    }
}
</script>