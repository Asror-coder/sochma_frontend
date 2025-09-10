<template>
  <div class="p-6 w-full max-w-screen-2xl mx-auto">
    <div class="flex flex-row gap-8 w-full">
      <!-- Left side: Product Section -->
      <div class="flex-1">
        <h2 class="text-lg font-semibold mb-2">{{ $t('NewDeal.Product') }}</h2>
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <span class="w-32">{{ $t('NewDeal.Brand') }}:</span>
            <input v-model="product.brand" type="text" :placeholder="$t('NewDeal.Brand')" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">{{ $t('NewDeal.Model') }}:</span>
            <input v-model="product.model" type="text" :placeholder="$t('NewDeal.Model')" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">{{ $t('NewDeal.Year') }}:</span>
            <input v-model="product.year" type="text" :placeholder="$t('NewDeal.Year')" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">{{ $t('NewDeal.SerialNumber') }}:</span>
            <input v-model="product.serialNumber" type="text" :placeholder="$t('NewDeal.SerialNumber')" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">{{ $t('NewDeal.Price') }}:</span>
            <input v-model.number="product.price" type="number" :placeholder="$t('NewDeal.Price')" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">{{ $t('NewDeal.Description') }}:</span>
            <textarea
              v-model="product.description"
              :placeholder="$t('NewDeal.Description')"
              class="flex-1 p-2 border rounded h-20 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
      <!-- Right side: Payment Information and Deal Payment Information -->
      <div class="flex-1">
        <h2 class="text-lg font-semibold mb-2">{{ $t('NewDeal.PaymentInformation') }}</h2>
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <span class="w-40">{{ $t('NewDeal.Downpayment') }}:</span>
            <input v-model.number="payment.downpayment" type="number" :placeholder="$t('NewDeal.Downpayment')" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-40">{{ $t('NewDeal.PeriodMonth') }}:</span>
            <input v-model.number="payment.periodMonth" type="number" :placeholder="$t('NewDeal.PeriodMonth')" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-40">{{ $t('NewDeal.ProfitMargin') }}:</span>
            <input v-model.number="payment.profit_margin" type="number" :placeholder="$t('NewDeal.ProfitMargin')" class="flex-1 p-2 border rounded" />
          </div>
        </div>

        <h2 class="text-lg font-semibold mb-2">{{ $t('NewDeal.InvestmentReturn') }}</h2>
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <span class="w-48">{{ $t('NewDeal.Investment') }}:</span>
            <strong>{{ priceAfterDownPayment }}</strong>
          </div>
          <div class="flex items-center mb-2">
            <span class="w-48">{{ $t('NewDeal.TotalReturn') }}:</span>
            <strong>{{ priceAfterProfitMargin }}</strong>
          </div>
          <div class="flex items-center mb-2">
            <span class="w-48">{{ $t('NewDeal.PaymentPerMonth') }}:</span>
            <div class="flex-1 flex items-center" style="min-width: 300px; max-width: 350px;">
              <template v-if="isEditingPayment">
                <input
                  v-model.number="editablePaymentPerMonth"
                  type="number"
                  class="p-2 border rounded"
                  style="width: 120px;"
                  :placeholder="$t('NewDeal.PaymentPerMonth')"
                />
                <div class="flex ml-2">
                  <button
                    @click="savePaymentPerMonth"
                    class="px-2 py-1 bg-green-500 text-white rounded"
                  >{{ $t('NewDeal.Save') }}</button>
                  <button
                    @click="cancelEditPayment"
                    class="ml-2 px-2 py-1 bg-gray-300 text-black rounded"
                  >{{ $t('NewDeal.Cancel') }}</button>
                </div>
              </template>
              <template v-else>
                <strong style="width: 120px; display: inline-block;">{{ paymentPerMonth }}</strong>
                <button
                  @click="editPaymentPerMonth"
                  class="ml-auto px-2 py-1 bg-blue-500 text-white rounded"
                  style="margin-left: auto;"
                >{{ $t('NewDeal.Edit') }}</button>
              </template>
            </div>
          </div>
          <div class="flex items-center mb-2">
            <span class="w-48">{{ $t('NewDeal.Profit') }}:</span>
            <strong>{{ profit }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-8">
      <button
        @click="createDeal"
        class="px-6 py-3 bg-green-600 text-white rounded font-semibold shadow hover:bg-green-700 transition"
      >
        {{ $t('NewDeal.CreateNewDeal') }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewDealView',
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
      manualProfit: null
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
    createDeal() {
      alert(this.$t('NewDeal.DealCreated'));
    }
  }
}
</script>