<template>
  <main class="flex justify-center mt-28">
    <div class="flex flex-col">
      <h1 class="text-3xl pb-5 text-gray-500">{{ $t('DealsPage.CurrentDeals') }}</h1>

      <div v-if="loading" class="text-gray-400 animate-pulse">
        {{ $t('Common.Loading') }}
      </div>
      
      <div v-else>
        
        <div v-if="deals.length === 0" class="text-gray-400 italic">
          {{ $t('DealsPage.NoDealsFound') }}
        </div>

        <div class="grid gap-6">
          <div
            v-for="(deal, idx) in deals"
            :key="idx"
            class="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl p-4 transition-all"
            @click="goToDealDetail(deal)"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between md:gap-x-60">
              <div class="flex-1 ml-4">
                <div class="mb-1">
                  <span class="font-bold text-2xl text-gray-800">{{ deal.brand }} {{ deal.model }}</span>
                </div>
                <div class="mb-2">
                  <span class="text-base text-gray-500">{{ deal.year }}</span>
                </div>
                <div class="text-base text-gray-600 mb-1">{{ deal.description }}</div>
                <div class="text-xs text-gray-400">Serial: {{ deal.serialNumber }}</div>
              </div>
              <div class="flex-1 mt-6 md:mt-0">
                <div class="bg-gray-50 rounded-lg p-4 flex flex-col gap-2">
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.Price') }}</span>
                    <span></span>
                    <span class="font-bold text-xl text-blue-700 text-right">${{ deal.price }}</span>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.Downpayment') }}</span>
                    <span></span>
                    <span class="font-semibold text-gray-700 text-right">${{ deal.downpayment }}</span>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.PeriodMonth') }}</span>
                    <span></span>
                    <span class="font-semibold text-gray-700 text-right">{{ deal.periodMonth }}</span>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.TotalReturn') }}</span>
                    <span></span>
                    <span class="font-semibold text-green-700 text-right">${{ deal.totalProfit }}</span>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.Profit') }}</span>
                    <span></span>
                    <span class="font-semibold text-green-700 text-right">${{ deal.brokerProfit }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CurrentDealsView',
  components: {
  },
  data() {
    return {
      deals: [],
      loading: true
    }
  },
  async mounted() {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/Deal/broker/`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      this.deals = response.data;
    } catch (error) {
      this.deals = [];
    } finally {
      this.loading = false;
    }
  },
  methods: {
    goToDealDetail(deal) {
      // Assuming you have a route named 'dealDetail' and pass deal id or serialNumber
      console.log(deal);
      this.$router.push({ name: 'dealDetail', params: { id: deal.id } });
    }
  }
}
</script>