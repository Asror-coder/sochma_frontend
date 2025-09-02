<template>
  <div class="mt-20">
    <main class="grid grid-cols-5">

      <LeftMenuView />

      <div class="col-start-2 col-span-4 flex-grow bg-gray-100 h-screen">
        <div class="flex justify-center">
          <div class="w-4/12 bg-white p-6 rounded-lg">
            <h1 class="text-2xl text-center pb-5"><p>{{ $t('CalculatorPage.Calculator') }}</p></h1>

            <form  @submit.prevent="calculate">
              <div class="mb-4">
                <label for="price" class="sr-only">Product price</label>
                <input type="numbers" name="price" id="price" placeholder="Product price"
                class="bg-white border-2 w-full p-4 rounded-lg" v-model="form.price">
              </div>

              <div class="mb-4">
                <label for="downpayment" class="sr-only">Downpayment</label>
                <input type="numbers" name="downpayment" id="downpayment" placeholder="Downpayment"
                class="bg-white border-2 w-full p-4 rounded-lg" v-model="form.downpayment">
              </div>

              <div class="mb-4">
                <label for="period" class="sr-only">Period</label>
                <input type="numbers" name="period" id="period" placeholder="Period (in months)"
                class="bg-white border-2 w-full p-4 rounded-lg" v-model="form.period">
              </div>

              <div class="mb-4">
                <label for="profit" class="sr-only">Profit margin</label>
                <input type="numbers" name="profit" id="profit" placeholder="Profit margin (%)"
                class="bg-white border-2 w-full p-4 rounded-lg" v-model="form.profit">
              </div>

              <div>
                <button class="bg-blue-500 text-white px-4 py-3 rounded font-medium w-full">
                  {{ $t('CalculatorPage.Calculate') }}
                </button>
              </div>
            </form>

            <div class="pt-5">
              <h2 class="text-xl text-center pb-5" v-if="result.investment">
                <p>{{ $t('CalculatorPage.Investment') }}: {{result.investment}} </p>
              </h2>

              <h2 class="text-xl text-center pb-5" v-if="result.totalPayment">
                <p>Total payment: {{result.totalPayment}} </p>
              </h2>

              <h2 class="text-xl text-center pb-5" v-if="result.monthlyPayment">
                <p>Monthly payment: {{result.monthlyPayment}} </p>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import LeftMenuView from '../Menu/LeftMenuView.vue';

  export default {
    name: 'CalculatorView',
    components: {
      LeftMenuView,
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
