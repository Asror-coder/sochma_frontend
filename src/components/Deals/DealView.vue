<template>
    <main class="flex justify-center my-16 sm:my-24">
        <div class="flex flex-col w-full max-w-screen-md px-4 sm:px-0">

            <!-- Deal Details Section -->
            <div class="w-full rounded-2xl shadow-lg p-6 sm:p-10 bg-white">
                <h1 class="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-blue-700 leading-snug">
                    {{ $t('DealsPage.DealDetails') }}
                </h1>
                <div v-if="loading" class="text-gray-400 animate-pulse text-center">
                    {{ $t('Common.Loading') }}
                </div>
                <div v-else-if="!deal" class="text-gray-400 italic text-center">
                    {{ $t('Common.DealNotFound') }}
                </div>
                <div v-else-if="deal">
                    <div class="">
                        <div class="flex flex-col md:flex-row md:justify-between md:gap-x-12">
                            <!-- Left: Product information -->
                            <div class="flex-1 mb-6 md:mb-0 min-w-0">
                                <div class="flex items-center mb-2">
                                    <span class="font-bold text-xl sm:text-2xl text-gray-800 break-words">{{ deal.brand }} {{ deal.model }}</span>
                                </div>
                                <div class="text-sm sm:text-base text-gray-600 mb-1 whitespace-pre-line break-words">{{ deal.description }}</div>
                                <div class="text-[11px] sm:text-xs text-gray-400">{{ $t('DealsPage.SerialNumber') }}: {{ deal.serialNumber }}</div>
                                <div class="text-[11px] sm:text-xs text-gray-400">{{ $t('DealsPage.Year') }}: {{ deal.year }}</div>
                                <div class="mt-4 text-sm text-gray-500 flex flex-wrap items-baseline gap-1">
                                    {{ $t('DealsPage.Price') }}:
                                    <span class="font-semibold text-gray-800">${{ deal.price }}</span>
                                </div>
                            </div>
                            <!-- Right: Payment information -->
                            <div class="md:ml-12 w-full md:w-80">
                                <div class="bg-gray-50 rounded-lg p-4 flex flex-col gap-2 text-sm">
                                    <div class="flex items-start justify-between gap-4">
                                        <span class="text-gray-500 leading-snug">{{ $t('Common.NasiyaPrice') }}</span>
                                        <span class="font-bold text-base sm:text-xl text-blue-700 text-right">${{ nasiyaPrice }}</span>
                                    </div>
                                    <div class="flex items-start justify-between gap-4">
                                        <span class="text-gray-500 leading-snug">{{ $t('DealsPage.Downpayment') }}</span>
                                        <span class="font-semibold text-gray-700 text-right">${{ deal.downpayment }}</span>
                                    </div>
                                    <div class="flex items-start justify-between gap-4">
                                        <span class="text-gray-500 leading-snug">{{ $t('DealsPage.Investment') }}</span>
                                        <span class="font-semibold text-gray-700 text-right">${{ investment }}</span>
                                    </div>
                                    <div class="flex items-start justify-between gap-4">
                                        <span class="text-gray-500 leading-snug">{{ $t('DealsPage.TotalReturn') }}</span>
                                        <span class="font-semibold text-green-700 text-right">${{ deal.totalPayment }}</span>
                                    </div>
                                    <div class="flex items-start justify-between gap-4">
                                        <span class="text-gray-500 leading-snug">{{ $t('DealsPage.PeriodMonth') }}</span>
                                        <span class="font-semibold text-gray-700 text-right">{{ deal.periodMonth }}</span>
                                    </div>
                                    <div v-if="deal.paymentDayOfMonth" class="mt-1 text-[12px] sm:text-[14px] text-gray-400 text-right italic">
                                        {{ $t('DealsPage.PaymentDayOfMonth') }}: <span class="not-italic font-medium">{{ deal.paymentDayOfMonth }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Participants Section -->
                        <div class="mt-8 border-t pt-6">
                            <h3 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4">{{ $t('DealsPage.Participants') }}</h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <!-- Investor -->
                                <div class="bg-gray-50 rounded-lg p-4 text-sm sm:text-base">
                                    <div class="text-sm text-gray-500 mb-1">{{ $t('DealsPage.Investor') }}</div>
                                    <div class="text-base font-semibold text-gray-800">{{ deal.investorFullName || '-' }}</div>
                                    <div class="text-sm text-gray-600 mt-1">
                                        {{ $t('DealsPage.InvestorPhone') }}: <span class="font-medium">+{{ deal.investorPhoneNumber || '-' }}</span>
                                    </div>
                                </div>
                                <!-- Buyer -->
                                <div class="bg-gray-50 rounded-lg p-4 text-sm sm:text-base">
                                    <div class="text-sm text-gray-500 mb-1">{{ $t('DealsPage.Buyer') }}</div>
                                    <div class="text-base font-semibold text-gray-800">{{ deal.buyerFullName || '-' }}</div>
                                    <div class="text-sm text-gray-600 mt-1">
                                        {{ $t('DealsPage.BuyerPhone') }}: <span class="font-medium">+{{ deal.buyerPhoneNumber || '-' }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payments Section -->
            <div class="w-full rounded-2xl shadow-lg p-6 sm:p-10 bg-white mt-8 sm:mt-10">
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
        ...mapState('deal', ['deal', 'loading']),
        nasiyaPrice() {
            if (!this.deal) return 0;
            const total = Number(this.deal.totalPayment) || 0;
            const down = Number(this.deal.downpayment) || 0;
            // Return integer value (remove fractional part)
            return Math.round(total + down);
        },
        investment() {
            if (!this.deal) return 0;
            const price = Number(this.deal.price) || 0;
            const down = Number(this.deal.downpayment) || 0;
            return Math.round(price - down);
        }
    },
    async mounted() {
        const { id } = this.$route.params;
        await this.$store.dispatch('deal/fetchDeal', id);
    }
}
</script>