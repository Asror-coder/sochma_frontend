<template>
  <main class="flex justify-center my-28">
    <div class="w-full max-w-xl rounded-2xl shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-6 text-blue-700">
        {{ $t('CalculatorPage.Calculator') }}
      </h1>
      <!-- Display Area -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 mb-6">
        <div class="flex flex-col md:flex-row md:justify-between gap-4">
          <div v-if="result.investment" class="flex-1 text-center">
            <div class="text-xs text-gray-500">{{ $t('CalculatorPage.Investment') }}</div>
            <div class="text-2xl font-semibold text-blue-700">${{ result.investment }}</div>
          </div>
          <div v-if="result.totalPayment" class="flex-1 text-center">
            <div class="text-xs text-gray-500">{{ $t('CalculatorPage.TotalPayment') }}</div>
            <div class="text-2xl font-semibold text-blue-700">${{ result.totalPayment }}</div>
          </div>
          <div v-if="result.monthlyPayment" class="flex-1 text-center">
            <div class="text-xs text-gray-500">{{ $t('CalculatorPage.MonthlyPayment') }}</div>
            <div class="text-2xl font-semibold text-blue-700">${{ result.monthlyPayment }}</div>
          </div>
        </div>
      </div>
      <!-- Input Fields -->
      <form @submit.prevent="calculate">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('CalculatorPage.ProductPrice') }}
            </label>
            <input type="numbers" name="price" id="price"
              :placeholder="$t('CalculatorPage.ProductPricePlaceholder')"
              class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
              v-model="form.price">
          </div>
          <div>
            <label for="downpayment" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('CalculatorPage.Downpayment') }}
            </label>
            <input type="numbers" name="downpayment" id="downpayment"
              :placeholder="$t('CalculatorPage.DownpaymentPlaceholder')"
              class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
              v-model="form.downpayment">
          </div>
          <div>
            <label for="period" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('CalculatorPage.Period') }}
            </label>
            <input type="numbers" name="period" id="period"
              :placeholder="$t('CalculatorPage.PeriodPlaceholder')"
              class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
              v-model="form.period">
          </div>
          <div>
            <label for="profit" class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t('CalculatorPage.ProfitMargin') }}
            </label>
            <input type="numbers" name="profit" id="profit"
              :placeholder="$t('CalculatorPage.ProfitMarginPlaceholder')"
              class="bg-gray-50 border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-300"
              v-model="form.profit">
          </div>
        </div>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-lg w-full transition-colors duration-150"
          type="submit"
        >
          {{ $t('CalculatorPage.Calculate') }}
        </button>
      </form>
    </div>
</main>
</template>

<script>
export default {
  name: 'CalculatorView',
  components: {
  },
  data(){
    return {
      form: {
        price: '',
        downpayment: '',
        period: '',
        profit: ''
      },
      result: {
        totalPayment: '',
        monthlyPayment: '',
        investment: ''
      }
    }
  },
  methods: {
    calculate() {
      var profit = this.form.profit / 100 + 1
      this.result.investment = this.form.price - this.form.downpayment
      this.result.totalPayment = this.result.investment * profit
      this.result.monthlyPayment = Math.ceil(this.result.totalPayment / this.form.period)
    }
  }
}
</script>
