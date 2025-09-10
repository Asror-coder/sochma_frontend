<template>
  <div class="p-6 w-full max-w-screen-2xl mx-auto">
    <div class="flex flex-row gap-8 w-full">
      <!-- Left side: Product Section -->
      <div class="flex-1">
        <h2 class="text-lg font-semibold mb-2">Product</h2>
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <span class="w-32">Brand:</span>
            <input v-model="product.brand" type="text" placeholder="Brand" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">Model:</span>
            <input v-model="product.model" type="text" placeholder="Model" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">Year:</span>
            <input v-model="product.year" type="text" placeholder="Year" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">Serial Number:</span>
            <input v-model="product.serialNumber" type="text" placeholder="Serial Number" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">Price:</span>
            <input v-model.number="product.price" type="numbers" placeholder="Price" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-32">Description:</span>
            <textarea
              v-model="product.description"
              placeholder="Description"
              class="flex-1 p-2 border rounded h-20 resize-none"
            ></textarea>
          </div>
        </div>
      </div>
      <!-- Right side: Payment Information and Deal Payment Information -->
      <div class="flex-1">
        <h2 class="text-lg font-semibold mb-2">Payment Information</h2>
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <span class="w-40">Downpayment:</span>
            <input v-model.number="payment.downpayment" type="numbers" placeholder="Downpayment" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-40">Period (Months):</span>
            <input v-model.number="payment.periodMonth" type="numbers" placeholder="Period (Months)" class="flex-1 p-2 border rounded" />
          </div>
          <div class="flex items-center mb-2">
            <span class="w-40">Profit Margin (%):</span>
            <input v-model.number="payment.profit_margin" type="numbers" placeholder="Profit Margin (%)" class="flex-1 p-2 border rounded" />
          </div>
        </div>

        <h2 class="text-lg font-semibold mb-2">Investment return</h2>
        <div class="mb-4">
          <div class="flex items-center mb-2">
            <span class="w-48">Investment:</span>
            <strong>{{ priceAfterDownPayment }}</strong>
          </div>
          <div class="flex items-center mb-2">
            <span class="w-48">Total return:</span>
            <strong>{{ priceAfterProfitMargin }}</strong>
          </div>
          <div class="flex items-center mb-2">
            <span class="w-48">Payment per month:</span>
            <div class="flex-1 flex items-center" style="min-width: 300px; max-width: 350px;">
              <template v-if="isEditingPayment">
                <input
                  v-model.number="editablePaymentPerMonth"
                  type="number"
                  class="p-2 border rounded"
                  style="width: 120px;"
                />
                <div class="flex ml-2">
                  <button
                    @click="savePaymentPerMonth"
                    class="px-2 py-1 bg-green-500 text-white rounded"
                  >Save</button>
                  <button
                    @click="cancelEditPayment"
                    class="ml-2 px-2 py-1 bg-gray-300 text-black rounded"
                  >Cancel</button>
                </div>
              </template>
              <template v-else>
                <strong style="width: 120px; display: inline-block;">{{ paymentPerMonth }}</strong>
                <button
                  @click="editPaymentPerMonth"
                  class="ml-auto px-2 py-1 bg-blue-500 text-white rounded"
                  style="margin-left: auto;"
                >Edit</button>
              </template>
            </div>
          </div>
          <div class="flex items-center mb-2">
            <span class="w-48">Profit:</span>
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
        Create New Deal
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
      // Use manual value if set, else calculate
      if (this.manualPriceAfterProfitMargin !== null) {
        return this.manualPriceAfterProfitMargin;
      }
      const margin = this.priceAfterDownPayment * (this.payment.profit_margin / 100);
      return Math.round(this.priceAfterDownPayment + margin);
    },
    paymentPerMonth() {
      // Use manual value if set, else calculate
      if (this.manualPaymentPerMonth !== null) {
        return this.manualPaymentPerMonth;
      }
      if (this.payment.periodMonth > 0) {
        return Math.round(this.priceAfterProfitMargin / this.payment.periodMonth);
      }
      return 0;
    },
    profit() {
      // Use manual value if set, else calculate
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
        // Set manual payment per month
        this.manualPaymentPerMonth = this.editablePaymentPerMonth;
        // Calculate manual price after profit margin and profit based on new payment per month and periodMonth
        this.manualPriceAfterProfitMargin = this.editablePaymentPerMonth * this.payment.periodMonth;
        this.manualProfit = this.manualPriceAfterProfitMargin - this.priceAfterDownPayment;
      }
    },
    cancelEditPayment() {
      this.isEditingPayment = false;
      this.editablePaymentPerMonth = this.paymentPerMonth;
      // Reset manual overrides
      this.manualPaymentPerMonth = null;
      this.manualPriceAfterProfitMargin = null;
      this.manualProfit = null;
    },
    createDeal() {
      // Implement your deal creation logic here
      alert('New deal created!');
    }
  }
}
</script>