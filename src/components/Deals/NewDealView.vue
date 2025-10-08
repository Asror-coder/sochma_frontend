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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              <input v-model.number="product.price" type="numbers" :placeholder="$t('DealsPage.Price')" 
              class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.Description') }}</label>
              <textarea v-model="product.description" :placeholder="$t('DealsPage.Description')" 
              class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg h-20 resize-none focus:ring-2 focus:ring-blue-300"></textarea>
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
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.PaymentDayOfMonth') }}</label>
              <input
                v-model.number="payment.paymentDayOfMonth"
                type="numbers"
                min="1"
                max="31"
                :placeholder="$t('DealsPage.PaymentDayOfMonthPlaceholder')"
                class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
              />
              <p class="text-xs text-gray-500 mt-1">{{ $t('DealsPage.PaymentDayOfMonthHelper') }}</p>
            </div>
          </div>

          <!-- Results Area: add mt-16 for extra top margin -->
          <div class="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4">
            <h2 class="text-lg font-semibold mb-4 text-blue-600">{{ $t('DealsPage.InvestmentReturn') }}</h2>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">{{ $t('Common.NasiyaPrice') }}</span>
                <span class="text-xl font-semibold text-blue-700">{{ nasiyaPrice }}</span>
              </div>
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

      <!-- Participant section -->
      <div class="mb-8">
        <h2 class="text-lg font-semibold mb-2 text-blue-600">{{ $t('DealsPage.Participants') }}</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <!-- Investor phone field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.InvestorPhone') }}</label>
            <div class="flex gap-2 items-center">
              <span class="px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 select-none">+{{ defaultPhoneCode }}</span>
              <input v-model.number="investorPhone" type="numbers" inputmode="numeric" :placeholder="$t('DealsPage.InvestorPhonePlaceholder')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
              <button @click="addInvestorByPhone" type="button" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{{ $t('Common.Add') }}</button>
            </div>
            <p v-if="investorLookupError" class="text-xs text-red-600 mt-1">{{ investorLookupError }}</p>
            <p v-if="investorUser" class="text-sm text-green-600 mt-1">{{ formatUser(investorUser) }}</p>
          </div>

          <!-- Buyer phone field -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">{{ $t('DealsPage.BuyerPhone') }}</label>
            <div class="flex gap-2 items-center">
              <span class="px-3 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700 select-none">+{{ defaultPhoneCode }}</span>
              <input v-model.number="buyerPhone" type="numbers" inputmode="numeric" :placeholder="$t('DealsPage.BuyerPhonePlaceholder')" class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300" />
              <button @click="addBuyerByPhone" type="button" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{{ $t('Common.Add') }}</button>
            </div>
            <p v-if="buyerLookupError" class="text-xs text-red-600 mt-1">{{ buyerLookupError }}</p>
            <p v-if="buyerUser" class="text-sm text-green-600 mt-1">{{ formatUser(buyerUser) }}</p>
          </div>
        </div>
      </div>

      <!-- Create Deal Button -->
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
        profit_margin: 0,
        paymentDayOfMonth: null
      },
      investorPhone: '',
      buyerPhone: '',
      investorUser: null,
      buyerUser: null,
      defaultPhoneCode: '998',
      investorLookupError: '',
      buyerLookupError: '',
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
    },
    nasiyaPrice() {
      // total return + downpayment
      return Math.round(this.priceAfterProfitMargin + this.payment.downpayment);
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
    formatUser(user) {
      if (!user) return '';
      const first = user.firstName || user.firstname || '';
      const last = user.lastName || user.lastname || '';
      const phone = user.phone || user.phoneNumber || '';
      const name = `${first} ${last}`.trim();
      return [name || undefined, phone || undefined].filter(Boolean).join(' • ');
    },
    async addInvestorByPhone() {
      if (!this.investorPhone) {
        this.investorLookupError = this.$t('DealsPage.PhoneRequired');
        return;
      }
      this.investorLookupError = '';
      const user = await this.lookupUserByPhone(this.investorPhone, 'Investor');
      if (user) {
        this.investorUser = user;
        this.investorLookupError = '';
      } else {
        this.investorUser = null;
        this.investorLookupError = this.$t('DealsPage.UserNotFound');
      }
    },
    async addBuyerByPhone() {
      if (!this.buyerPhone) {
        this.buyerLookupError = this.$t('DealsPage.PhoneRequired');
        return;
      }
      this.buyerLookupError = '';
      const user = await this.lookupUserByPhone(this.buyerPhone, 'Buyer');
      if (user) {
        this.buyerUser = user;
        this.buyerLookupError = '';
      } else {
        this.buyerUser = null;
        this.buyerLookupError = this.$t('DealsPage.UserNotFound');
      }
    },
    async lookupUserByPhone(phone, role) {
      const token = localStorage.getItem('token');
      try {
        const fullPhone = `${this.defaultPhoneCode}${String(phone)}`;
        const encodedPhone = encodeURIComponent(fullPhone);
        const base = role === 'Investor' ? '/api/Investor/by-phone' : '/api/Buyer/by-phone';
        const url = `${base}/${encodedPhone}`;
        const response = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data || null;
      } catch (e) {
        return null;
      }
    },
    async createDeal() {
      const token = localStorage.getItem('token');

      // Validate paymentDayOfMonth if provided
      if (this.payment.paymentDayOfMonth !== null) {
        const day = Number(this.payment.paymentDayOfMonth);
        if (!(day >= 1 && day <= 31)) {
          this.errorMessage = this.$t('DealsPage.PaymentDayOfMonthInvalid');
          return;
        }
      }

      const requestBody = {
        investorId: (this.investorUser && this.investorUser.id) || 0,
        buyerId: (this.buyerUser && this.buyerUser.id) || 0,
        brand: this.product.brand,
        model: this.product.model,
        year: this.product.year,
        serialNumber: this.product.serialNumber,
        description: this.product.description,
        price: this.product.price,
        downpayment: this.payment.downpayment,
        periodMonth: this.payment.periodMonth,
        totalPayment: this.priceAfterProfitMargin,
        paymentDayOfMonth: this.payment.paymentDayOfMonth
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