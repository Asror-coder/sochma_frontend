<template>
    <div>
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800">{{ $t('PaymentsView.PaymentHistory') }}</h2>
            <div class="flex items-center gap-2">
                <span class="font-semibold text-blue-700">${{ payPerMonth }}</span>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition" @click="onCreatePayment">
                    {{ $t('PaymentsView.Create') || 'Create' }}
                </button>
            </div>
        </div>
        <div v-if="loading" class="text-center text-gray-500">{{ $t('Common.Loading') }}</div>
        <div v-else>
            <div v-if="payments.length === 0" class="text-center text-gray-500">{{ $t('PaymentsView.NoPayments') }}</div>
            <table v-else class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-600">{{ $t('Common.Date') }}</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-600">{{ $t('Common.Amount') }}</th>
                        <th class="py-3 px-6 text-right text-sm font-medium text-gray-600">{{ $t('Common.Actions') || 'Actions' }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="payment in payments" :key="payment.id" class="border-t border-gray-200 hover:bg-gray-50">
                            <td class="py-4 px-6 text-sm text-gray-700">{{ formatDate(payment.createdAt) }}</td>
                        <td class="py-4 px-6 text-sm text-gray-700">${{ payment.amount }}</td>
                        <td class="py-4 px-6 text-sm text-right">
                            <button
                                class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded shadow text-xs font-semibold"
                                @click="onDeletePayment(payment.id)"
                            >
                                {{ $t('Common.Delete') || 'Delete' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'PaymentsView',
    computed: {
        ...mapState('deal', ['loading']),
        ...mapGetters('deal', ['payments', 'deal']),
        payPerMonth() {
            if (!this.deal || this.deal.periodMonth === 0) return 0;
            return Math.round((this.deal.price - this.deal.downpayment + this.deal.totalProfit) / this.deal.periodMonth);
        }
    },
    methods: {
    ...mapActions('deal', ['fetch_payments', 'create_payment', 'delete_payment']),
        async onDeletePayment(paymentId) {
            if (confirm(this.$t('Common.ConfirmDelete') || 'Are you sure you want to delete this payment?')) {
                await this.delete_payment(paymentId);
            }
        },
            formatDate(dateStr) {
                if (!dateStr) return '';
                const d = new Date(dateStr);
                const day = String(d.getDate()).padStart(2, '0');
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const year = d.getFullYear();
                return `${day}-${month}-${year}`;
            },
        async onCreatePayment() {
            if (!this.deal) {
                console.error('Deal information is not available.');
                return;
            }
            await this.create_payment({ dealId: this.deal.dealId, amount: this.payPerMonth });
        }
    }
}
</script>