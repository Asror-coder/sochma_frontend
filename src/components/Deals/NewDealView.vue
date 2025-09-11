<template>
  <main class="grid grid-cols-5 mt-20">
    <LeftMenuView />
    
    <div class="col-start-2 col-span-4 flex-grow bg-gray-100 h-screen">
      <div class="flex justify-center">
        <div class="bg-white p-6 rounded-lg mt-5">
            <h1 class="text-3xl ml-5 pb-5 text-gray-500">{{ $t('DealsPage.NewDeal') }}</h1>

            <div class="p-6 w-full max-w-screen-2xl mx-auto">
              <div class="flex flex-row gap-8 w-full">
                <!-- Left side: Product Section -->
                <div class="flex-1">
                  <h2 class="text-lg font-semibold mb-2">{{ $t('DealsPage.Product') }}</h2>
                  <div class="mb-4">
                    <div class="flex items-center mb-2">
                      <span class="w-32">{{ $t('DealsPage.Brand') }}:</span>
                      <input v-model="product.brand" type="text" :placeholder="$t('DealsPage.Brand')" class="flex-1 p-2 border rounded" />
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-32">{{ $t('DealsPage.Model') }}:</span>
                      <input v-model="product.model" type="text" :placeholder="$t('DealsPage.Model')" class="flex-1 p-2 border rounded" />
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-32">{{ $t('DealsPage.Year') }}:</span>
                      <input v-model="product.year" type="text" :placeholder="$t('DealsPage.Year')" class="flex-1 p-2 border rounded" />
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-32">{{ $t('DealsPage.SerialNumber') }}:</span>
                      <input v-model="product.serialNumber" type="text" :placeholder="$t('DealsPage.SerialNumber')" class="flex-1 p-2 border rounded" />
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-32">{{ $t('DealsPage.Price') }}:</span>
                      <input v-model.number="product.price" type="numbers" :placeholder="$t('DealsPage.Price')" class="flex-1 p-2 border rounded" />
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-32">{{ $t('DealsPage.Description') }}:</span>
                      <textarea
                        v-model="product.description"
                        :placeholder="$t('DealsPage.Description')"
                        class="flex-1 p-2 border rounded h-20 resize-none"
                      ></textarea>
                    </div>
                  </div>
                </div>

                
                <div class="flex-1">
                  <h2 class="text-lg font-semibold mb-2">{{ $t('DealsPage.PaymentInformation') }}</h2>
                  <div class="mb-4">
                    <div class="flex items-center mb-2">
                      <span class="w-40">{{ $t('DealsPage.Downpayment') }}:</span>
                      <input v-model.number="payment.downpayment" type="numbers" :placeholder="$t('DealsPage.Downpayment')" class="flex-1 p-2 border rounded" />
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-40">{{ $t('DealsPage.PeriodMonth') }}:</span>
                      <input v-model.number="payment.periodMonth" type="numbers" :placeholder="$t('DealsPage.PeriodMonth')" class="flex-1 p-2 border rounded" />
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-40">{{ $t('DealsPage.ProfitMargin') }}:</span>
                      <input v-model.number="payment.profit_margin" type="numbers" :placeholder="$t('DealsPage.ProfitMargin')" class="flex-1 p-2 border rounded" />
                    </div>
                  </div>

                  <h2 class="text-lg font-semibold mb-2">{{ $t('DealsPage.InvestmentReturn') }}</h2>
                  <div class="mb-4">
                    <div class="flex items-center mb-2">
                      <span class="w-48">{{ $t('DealsPage.Investment') }}:</span>
                      <strong>{{ priceAfterDownPayment }}</strong>
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-48">{{ $t('DealsPage.TotalReturn') }}:</span>
                      <strong>{{ priceAfterProfitMargin }}</strong>
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-48">{{ $t('DealsPage.PaymentPerMonth') }}:</span>
                      <div class="flex-1 flex items-center" style="min-width: 300px; max-width: 350px;">
                        <template v-if="isEditingPayment">
                          <input
                            v-model.number="editablePaymentPerMonth"
                            type="numbers"
                            class="p-2 border rounded"
                            style="width: 120px;"
                            :placeholder="$t('DealsPage.PaymentPerMonth')"
                          />
                          <div class="flex ml-2">
                            <button
                              @click="savePaymentPerMonth"
                              class="px-2 py-1 bg-green-500 text-white rounded"
                            >{{ $t('DealsPage.Save') }}</button>
                            <button
                              @click="cancelEditPayment"
                              class="ml-2 px-2 py-1 bg-gray-300 text-black rounded"
                            >{{ $t('DealsPage.Cancel') }}</button>
                          </div>
                        </template>
                        <template v-else>
                          <strong style="width: 120px; display: inline-block;">{{ paymentPerMonth }}</strong>
                          <button
                            @click="editPaymentPerMonth"
                            class="ml-auto px-2 py-1 bg-blue-500 text-white rounded"
                            style="margin-left: auto;"
                          >{{ $t('DealsPage.Edit') }}</button>
                        </template>
                      </div>
                    </div>
                    <div class="flex items-center mb-2">
                      <span class="w-48">{{ $t('DealsPage.Profit') }}:</span>
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
                  {{ $t('DealsPage.CreateNewDeal') }}
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import LeftMenuView from '../Menu/LeftMenuView.vue';
import axios from 'axios';

export default {
  name: 'NewDealView',
  components: {
    LeftMenuView
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

      try {
        const response = await axios.post('/api/Deal', requestBody, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 201 || response.status === 200) {
          alert(this.$t('DealsPage.DealCreated'));
        } else {
          alert(this.$t('DealsPage.DealCreateFailed'));
        }
      } catch (error) {
        alert(this.$t('DealsPage.DealCreateFailed'));
      }
    }
  }
}
</script>