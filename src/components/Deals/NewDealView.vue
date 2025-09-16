<template>
  <main class="flex justify-center my-20">
    <!-- Increased max-w-5xl for wider card -->
    <div class="w-full max-w-5xl rounded-2xl shadow-lg p-8">
      <div v-if="errorMessage" class="mb-4 p-3 rounded bg-red-100 text-red-700 text-center font-semibold">
        {{ errorMessage }}
      </div>
      <h1 class="text-3xl font-bold text-center mb-8 text-blue-700">
        {{ $t('DealsPage.NewDeal') }}
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
        <!-- Product Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4 text-blue-600">{{ $t('DealsPage.Product') }}</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Brand') }}</label>
              <input v-model="product.brand" type="text" :placeholder="$t('DealsPage.Brand')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Model') }}</label>
              <input v-model="product.model" type="text" :placeholder="$t('DealsPage.Model')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Year') }}</label>
              <input v-model="product.year" type="text" :placeholder="$t('DealsPage.Year')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.SerialNumber') }}</label>
              <input v-model="product.serialNumber" type="text" :placeholder="$t('DealsPage.SerialNumber')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Price') }}</label>
              <input v-model.number="product.price" type="numbers" :placeholder="$t('DealsPage.Price')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Description') }}</label>
              <textarea v-model="product.description" :placeholder="$t('DealsPage.Description')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg h-20 resize-none focus:ring-2 focus:ring-blue-300"></textarea>
            </div>
          </div>
        </div>
        <!-- Payment Section -->
        <div>
          <h2 class="text-lg font-semibold mb-4 text-blue-600">{{ $t('DealsPage.PaymentInformation') }}</h2>
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Downpayment') }}</label>
              <input v-model.number="payment.downpayment" type="numbers" :placeholder="$t('DealsPage.Downpayment')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.PeriodMonth') }}</label>
              <input v-model.number="payment.periodMonth" type="numbers" :placeholder="$t('DealsPage.PeriodMonth')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.ProfitMargin') }}</label>
              <input v-model.number="payment.profit_margin" type="numbers" :placeholder="$t('DealsPage.ProfitMargin')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
          </div>
          <!-- Results Area: add mt-16 for extra top margin -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 mt-10">
            <h2 class="text-lg font-semibold mb-4 text-blue-600">{{ $t('DealsPage.InvestmentReturn') }}</h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ $t('DealsPage.Investment') }}</span>
                <span class="text-xl font-semibold text-blue-700">{{ priceAfterDownPayment }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ $t('DealsPage.TotalReturn') }}</span>
                <span class="text-xl font-semibold text-blue-700">{{ priceAfterProfitMargin }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600 flex items-center">
                  {{ $t('DealsPage.PaymentPerMonth') }}
                  <template v-if="!isEditingPayment">
                    <!-- Edit button right next to the label -->
                    <button @click="editPaymentPerMonth" class="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
                      {{ $t('DealsPage.Edit') }}
                    </button>
                  </template>
                </span>
                <div class="flex items-center gap-2 justify-end w-1/2">
                  <template v-if="isEditingPayment">
                    <input v-model.number="editablePaymentPerMonth" type="numbers" class="p-1 border rounded w-24" :placeholder="$t('DealsPage.PaymentPerMonth')" />
                    <button @click="savePaymentPerMonth" class="px-2 py-1 bg-green-500 text-white rounded">{{ $t('DealsPage.Save') }}</button>
                    <button @click="cancelEditPayment" class="px-2 py-1 bg-gray-300 text-black rounded">{{ $t('DealsPage.Cancel') }}</button>
                  </template>
                  <template v-else>
                    <span class="text-xl font-semibold text-blue-700 w-24 text-right">{{ paymentPerMonth }}</span>
                  </template>
                </div>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ $t('DealsPage.Profit') }}</span>
                <span class="text-xl font-semibold text-blue-700">{{ profit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <button
          @click="createDeal"
          class="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 text-lg transition"
        >
          {{ $t('DealsPage.CreateNewDeal') }}
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'NewDealView',
  components: {
  },
  data() {
    return {
      product: {
        brand: '',
        model: '',
        description: '',
        year: '',
        serialNumber: '',
        price: 0
      },
      payment: {
        downpayment: 0,
        periodMonth: 0,
        profit_margin: 0
      },
      isEditingPayment: false,
      editablePaymentPerMonth: 0,
      manualPaymentPerMonth: null,
      manualPriceAfterProfitMargin: null,
      manualProfit: null,
      errorMessage: ''
    }
  },
  computed: {
    priceAfterDownPayment() {
      return Math.max(this.product.price - this.payment.downpayment, 0);
    },
    priceAfterProfitMargin() {
      if (this.manualPriceAfterProfitMargin !== null) {
        return this.manualPriceAfterProfitMargin;
      }
      const margin = this.priceAfterDownPayment * (this.payment.profit_margin / 100);
      return Math.round(this.priceAfterDownPayment + margin);
    },
    paymentPerMonth() {
      if (this.manualPaymentPerMonth !== null) {
        return this.manualPaymentPerMonth;
      }
      if (this.payment.periodMonth > 0) {
        return Math.round(this.priceAfterProfitMargin / this.payment.periodMonth);
      }
      return 0;
    },
    profit() {
      if (this.manualProfit !== null) {
        return this.manualProfit;
      }
      return Math.round(this.priceAfterProfitMargin - this.priceAfterDownPayment);
    }
  },
  methods: {
    editPaymentPerMonth() {
      this.isEditingPayment = true;
      this.editablePaymentPerMonth = this.paymentPerMonth;
    },
    savePaymentPerMonth() {
      this.isEditingPayment = false;
      if (this.editablePaymentPerMonth > 0) {
        this.manualPaymentPerMonth = this.editablePaymentPerMonth;
        this.manualPriceAfterProfitMargin = this.editablePaymentPerMonth * this.payment.periodMonth;
        this.manualProfit = this.manualPriceAfterProfitMargin - this.priceAfterDownPayment;
      }
    },
    cancelEditPayment() {
      this.isEditingPayment = false;
      this.editablePaymentPerMonth = this.paymentPerMonth;
      this.manualPaymentPerMonth = null;
      this.manualPriceAfterProfitMargin = null;
      this.manualProfit = null;
    },
    async createDeal() {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      const requestBody = {
        brokerId: user.id,
        investorId: user.id,
        buyerId: user.id,
        brand: this.product.brand,
        model: this.product.model,
        year: this.product.year,
        serialNumber: this.product.serialNumber,
        description: this.product.description,
        price: this.product.price,
        downpayment: this.payment.downpayment,
        periodMonth: this.payment.periodMonth,
        totalProfit: this.profit,
        brokerProfit: 0
      };

      this.errorMessage = '';
      try {
        const response = await axios.post('/api/Deal', requestBody, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 201 || response.status === 200) {
          this.$router.push({
            name: 'currentDeals',
            query: { message: this.$t('DealsPage.DealCreated') }
          });
        } else {
          this.errorMessage = this.$t('DealsPage.DealCreateFailed');
        }
      } catch (error) {
        this.errorMessage = this.$t('DealsPage.DealCreateFailed');
      }
    }
  }
}
</script>