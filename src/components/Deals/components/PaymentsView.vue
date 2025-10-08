<template>
    <div>
        <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold text-gray-800">{{ $t('PaymentsView.PaymentHistory') }}</h2>
            <button
                :class="[
                    'ml-4 font-semibold px-4 py-2 rounded-lg transition',
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
            <div class="flex flex-col md:flex-row md:items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                <div class="text-sm text-gray-700">
                    <span class="text-gray-500">{{ $t('Common.Amount') }}</span>:
                    <span class="font-semibold text-blue-700">${{ payPerMonth }}</span>
                </div>
                <input
                    type="date"
                    v-model="dayOfPayment"
                    class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    :placeholder="$t('PaymentsView.DateOfPayment') || 'Date of payment'"
                />
                <input
                    type="text"
                    v-model="newPaymentComments"
                    class="border border-gray-300 rounded px-2 py-1 text-sm md:flex-1 w-full md:w-auto focus:outline-none focus:ring-2 focus:ring-blue-400"
                    :placeholder="$t('Common.Comments') || 'Comments'"
                />
                <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition" @click="onCreatePayment">
                    {{ $t('Common.Create') || 'Create' }}
                </button>
            </div>
        </div>
        <div v-if="loading" class="text-center text-gray-500 mt-4">{{ $t('Common.Loading') }}</div>
        <div v-else class="mt-6">
            <div v-if="payments.length === 0" class="text-center text-gray-500">{{ $t('PaymentsView.NoPayments') }}</div>
            <table v-else class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead>
                    <tr class="bg-gray-100">
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-600">{{ $t('PaymentsView.Date') || 'Date of payment' }}</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-600">{{ $t('Common.Amount') }}</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-600">{{ $t('Common.Comments') || 'Comments' }}</th>
                        <th class="py-3 px-6 text-left text-sm font-medium text-gray-600">{{ $t('Common.Status') || 'Status' }}</th>
                        <th class="py-3 px-6 text-right text-sm font-medium text-gray-600">{{ $t('Common.Actions') || 'Actions' }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="payment in payments" :key="payment.id" class="border-t border-gray-200 hover:bg-gray-50">
                        <td class="py-4 px-6 text-sm text-gray-700">{{ payment.paymentDate }}</td>
                        <td class="py-4 px-6 text-sm text-gray-700">${{ payment.amount }}</td>
                        <td class="py-4 px-6 text-sm text-gray-700">{{ payment.comments || '-' }}</td>
                        <td class="py-4 px-6 text-sm">
                            <span :class="(payment.status || '').toLowerCase() === 'created' ? 'text-red-600 font-semibold' : 'text-green-600 font-semibold'">
                                {{ (payment.status || '').toLowerCase() === 'created' ? ($t('Common.NotVerified') || 'Not verified') : ($t('Common.Verified') || 'Verified') }}
                            </span>
                        </td>
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