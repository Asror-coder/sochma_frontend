<template>
  <main class="flex justify-center mt-28">
    <div class="flex flex-col">
      <h1 class="text-3xl pb-5 text-gray-500">{{ $t('DealsPage.CurrentDeals') }}</h1>

      <div v-if="loading" class="text-gray-400 animate-pulse">
        {{ $t('Common.Loading') }}
      </div>
      
      <div v-else>
        
        <div v-if="deals.length === 0" class="text-gray-400 italic">
          {{ $t('Common.NoDealsFound') }}
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
        <!-- Pagination Controls -->
        <div v-if="pagination.totalPages > 1" class="flex justify-center mt-8 gap-2">
          <button
            class="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
            :disabled="pagination.pageNumber === 1"
            @click="changePage(pagination.pageNumber - 1)"
          >
            {{ $t('Common.Previous') }}
          </button>
          <span class="px-4 py-2 text-gray-600 font-medium">
            {{ $t('Common.Page') }} {{ pagination.pageNumber }} / {{ pagination.totalPages }}
          </span>
          <button
            class="px-4 py-2 rounded bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300"
            :disabled="pagination.pageNumber === pagination.totalPages"
            @click="changePage(pagination.pageNumber + 1)"
          >
            {{ $t('Common.Next') }}
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'CurrentDealsView',
  computed: {
    ...mapState('deal', ['deals', 'loading']),
    ...mapGetters('deal', ['pagination'])
  },
  async mounted() {
    await this.$store.dispatch('deal/fetchDeals', { pageNumber: 1, pageSize: this.pagination.pageSize });
  },
  methods: {
    goToDealDetail(deal) {
      this.$router.push({ name: 'dealDetail', params: { id: deal.dealId } });
    },
    async changePage(page) {
      if (page < 1 || page > this.pagination.totalPages) return;
      await this.$store.dispatch('deal/fetchDeals', { pageNumber: page, pageSize: this.pagination.pageSize });
    }
  }
}
</script>