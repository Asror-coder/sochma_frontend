<template>
    <div class="w-full">
        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 class="text-xl sm:text-2xl font-bold text-gray-800">{{ $t('PaymentsPage.Payments') }}</h2>
            <button
                :class="[
                    'font-semibold px-4 py-2 rounded-lg transition text-sm sm:text-base',
                    showNewPaymentForm
                        ? 'bg-transparent text-red-600 hover:text-red-700 hover:bg-transparent'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow'
                ]"
                @click="toggleNewPaymentForm"
            >
                {{ showNewPaymentForm ? ($t('Common.Close') || 'Close') : ($t('PaymentsPage.NewPayment') || 'New Payment') }}
            </button>
        </div>
        <!-- Collapsible new payment form -->
        <div v-if="showNewPaymentForm" class="mb-6">
            <div class="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div class="text-sm text-gray-700 flex items-center">
                    <span class="text-gray-500 mr-1">{{ $t('Common.Amount') }}</span>
                    <span class="font-semibold text-blue-700">${{ payPerMonth }}</span>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 w-full">
                    <input
                        type="date"
                        v-model="dayOfPayment"
                        class="border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1"
                        :placeholder="$t('PaymentsView.DateOfPayment') || 'Date of payment'"
                    />
                    <input
                        type="text"
                        v-model="newPaymentComments"
                        class="border border-gray-300 rounded px-2 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        :placeholder="$t('Common.Comments') || 'Comments'"
                    />
                </div>
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition w-full sm:w-auto" @click="onCreatePayment">
                    {{ $t('Common.Create') || 'Create' }}
                </button>
            </div>
        </div>
        <div v-if="loading" class="text-center text-gray-500 mt-4">{{ $t('Common.Loading') }}</div>
        <div v-else class="mt-6">
            <div v-if="payments.length === 0" class="text-center text-gray-500">{{ $t('PaymentsView.NoPayments') }}</div>
            <div v-else>
                <!-- Mobile cards (no delete button) -->
                <div class="grid gap-3 sm:hidden">
                    <div
                        v-for="payment in payments"
                        :key="payment.id"
                        class="rounded-xl border shadow-sm p-4"
                        :class="(payment.status || '').toLowerCase() === 'created' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'"
                    >
                        <div class="flex items-start justify-between gap-3">
                            <div class="min-w-0">
                                <div class="text-gray-900 font-semibold">{{ payment.paymentDate }}</div>
                                <div class="text-xs text-gray-600 mt-1 break-words">{{ payment.comments || '-' }}</div>
                            </div>
                            <div class="shrink-0 text-base font-bold text-gray-900">${{ payment.amount }}</div>
                        </div>
                    </div>
                </div>

                <!-- Desktop/Table view -->
                <div class="hidden sm:block overflow-x-auto -mx-4 sm:mx-0">
                    <table class="min-w-[640px] w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm">
                        <thead>
                            <tr class="bg-gray-100">
                                <th class="py-3 px-4 sm:px-6 text-left font-medium text-gray-600 whitespace-nowrap">{{ $t('PaymentsView.Date') || 'Date of payment' }}</th>
                                <th class="py-3 px-4 sm:px-6 text-left font-medium text-gray-600 whitespace-nowrap">{{ $t('Common.Amount') }}</th>
                                <th class="py-3 px-4 sm:px-6 text-left font-medium text-gray-600 whitespace-nowrap">{{ $t('Common.Status') || 'Status' }}</th>
                                <th class="py-3 px-4 sm:px-6 text-left font-medium text-gray-600 whitespace-nowrap">{{ $t('Common.Comments') || 'Comments' }}</th>
                                <th class="py-3 px-4 sm:px-6 text-right font-medium text-gray-600 whitespace-nowrap">{{ $t('Common.Actions') || 'Actions' }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="payment in payments" :key="payment.id" class="border-t border-gray-200 hover:bg-gray-50">
                                <td class="py-3 px-4 sm:px-6 text-gray-700">{{ payment.paymentDate }}</td>
                                <td class="py-3 px-4 sm:px-6 text-gray-700">${{ payment.amount }}</td>
                                <td class="py-3 px-4 sm:px-6">
                                    <span class="inline-flex items-center gap-2">
                                        <svg v-if="(payment.status || '').toLowerCase() !== 'created'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <span :class="(payment.status || '').toLowerCase() === 'created' ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'">
                                            {{ (payment.status || '').toLowerCase() === 'created' ? ($t('Common.NotVerified') || 'Not verified') : ($t('Common.Verified') || 'Verified') }}
                                        </span>
                                    </span>
                                </td>
                                <td class="py-3 px-4 sm:px-6 text-gray-700">{{ payment.comments || '-' }}</td>
                                <td class="py-3 px-4 sm:px-6 text-right">
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
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'PaymentsView',
    data() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return {
            showNewPaymentForm: false,
            dayOfPayment: `${yyyy}-${mm}-${dd}`,
            newPaymentComments: ''
        };
    },
    computed: {
        ...mapState('deal', ['loading']),
        ...mapGetters('deal', ['payments', 'deal']),
        payPerMonth() {
            if (!this.deal || this.deal.periodMonth === 0) return 0;
            return Math.round(this.deal.totalPayment / this.deal.periodMonth);
        }
    },
    methods: {
    ...mapActions('deal', ['fetch_payments', 'create_payment', 'delete_payment']),
        formatToApiDate(dateStr) {
            // Convert from HTML date input (yyyy-MM-dd) to API expected (dd/MM/yyyy)
            if (!dateStr || typeof dateStr !== 'string') return dateStr;
            const parts = dateStr.split('-');
            if (parts.length === 3) {
                const [yyyy, mm, dd] = parts;
                return `${dd}/${mm}/${yyyy}`;
            }
            return dateStr;
        },
        toggleNewPaymentForm() {
            this.showNewPaymentForm = !this.showNewPaymentForm;
        },
        async onDeletePayment(paymentId) {
            if (confirm(this.$t('Common.ConfirmDelete') || 'Are you sure you want to delete this payment?')) {
                await this.delete_payment(paymentId);
            }
        },
        async onCreatePayment() {
            if (!this.deal) {
                console.error('Deal information is not available.');
                return;
            }
            await this.create_payment({
                dealId: this.deal.dealId,
                amount: this.payPerMonth,
                PaymentDate: this.formatToApiDate(this.dayOfPayment),
                comments: this.newPaymentComments
            });
            this.newPaymentComments = '';
            this.showNewPaymentForm = false;
        }
    }
}
</script>