<template>
  <main class="grid grid-cols-5 mt-20">
    <LeftMenuView />
    
    <div class="col-start-2 col-span-4 flex-grow bg-gray-100 h-screen">
      <div class="flex justify-center">
        <div class="bg-white p-6 rounded-lg mt-5 w-full max-w-3xl">
          <h1 class="text-3xl ml-5 pb-5 text-gray-500">{{ $t('DealsPage.CurrentDeals') }}</h1>
          <div v-if="loading" class="text-center text-gray-400 py-10">
            {{ $t('Common.Loading') }}
          </div>
          <div v-else>
            <div v-if="deals.length === 0" class="text-center text-gray-400 py-10">
              {{ $t('DealsPage.NoDealsFound') }}
            </div>
            <div class="grid gap-4">
              <div
                v-for="(deal, idx) in deals"
                :key="idx"
                class="cursor-pointer transition-shadow hover:shadow-lg bg-blue-50 border border-blue-200 rounded-lg p-5"
                @click="goToDealDetail(deal)"
              >
                <div class="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <span class="font-semibold text-lg">{{ deal.brand }} {{ deal.model }}</span>
                    <span class="ml-2 text-gray-500">({{ deal.year }})</span>
                    <div class="text-sm text-gray-600 mt-1">{{ deal.description }}</div>
                    <div class="text-xs text-gray-400">Serial: {{ deal.serialNumber }}</div>
                  </div>
                  <div class="mt-2 md:mt-0 text-right">
                    <div class="text-sm">Price: <span class="font-bold">${{ deal.price }}</span></div>
                    <div class="text-sm">Downpayment: ${{ deal.downpayment }}</div>
                    <div class="text-sm">Period: {{ deal.periodMonth }} months</div>
                    <div class="text-sm">Total Profit: ${{ deal.totalProfit }}</div>
                    <div class="text-sm">Broker Profit: ${{ deal.brokerProfit }}</div>
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
import LeftMenuView from '../Menu/LeftMenuView.vue';

export default {
  name: 'CurrentDealsView',
  components: {
    LeftMenuView
  },
  data() {
    return {
      deals: [],
      loading: true
    }
  },
  async mounted() {
    try {
      // Get user from localStorage and extract brokerId
      const user = JSON.parse(localStorage.getItem('user'));

      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/Deal/broker/${user.id}`, {
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