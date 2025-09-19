<template>
  <main class="flex justify-center my-28">
    <div class="flex flex-col">
      <div v-if="successMessage" class="mb-4 p-3 rounded bg-green-100 text-green-700 text-center font-semibold">
        {{ successMessage }}
      </div>
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
            v-for="deal in deals"
            :key="deal.dealId || deal.id"
            class="cursor-pointer bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl p-6 transition-all"
            @click="goToDealDetail(deal)"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between md:gap-x-32">
              <!-- Left column (md+): Payment info -->
              <div class="flex-1 order-1 md:order-1 md:mt-0">
                <div class="bg-gray-50 rounded-lg p-4 flex flex-col gap-2">
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.Investment') }}</span>
                    <span></span>
                    <span class="font-semibold text-gray-700 text-right">${{ deal.investmentAmount }}</span>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.PayedUpAmount') }}</span>
                    <span></span>
                    <span class="font-semibold text-gray-700 text-right">${{ deal.payedUpAmount }}</span>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.PeriodMonth') }}</span>
                    <span></span>
                    <span class="font-semibold text-gray-700 text-right">{{ deal.periodMonth }}</span>
                  </div>
                  <div class="grid grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.PayedMonths') }}</span>
                    <span></span>
                    <span class="font-semibold text-gray-700 text-right">{{ deal.payedMonths }}</span>
                  </div>
                  <!-- Repayment progress: dashed line per month -->
                  <div class="mt-3">
                    <div class="flex gap-1 w-full" :title="`${deal.payedMonths}/${deal.periodMonth}`">
                      <span
                        v-for="n in deal.periodMonth"
                        :key="`${deal.dealId || deal.id}-dash-${n}`"
                        class="h-1.5 rounded-full flex-1 basis-0"
                        :class="n <= deal.payedMonths ? 'bg-green-500' : 'bg-red-300'"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right column (md+): Product info -->
              <div class="flex-1 order-2 md:order-2 mt-6 md:mt-0 md:ml-4">
                <div class="mb-1">
                  <span class="font-bold text-2xl text-gray-800">{{ deal.brand }} {{ deal.model }}</span>
                </div>
                <div class="mb-2">
                  <span class="text-base text-gray-500">{{ deal.year }}</span>
                </div>
                <div class="text-xs text-gray-400">{{ $t('DealsPage.Price') }}: ${{ deal.price }}</div>
                <div class="mt-3 text-sm text-gray-700">
                  <div><span class="text-gray-500">{{ $t('DealsPage.Investor') }}:</span> <span class="font-medium">{{ deal.investorFullName }}</span></div>
                  <div><span class="text-gray-500">{{ $t('DealsPage.Buyer') }}:</span> <span class="font-medium">{{ deal.buyerFullName }}</span></div>
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
  data() {
    return {
      successMessage: this.$route.query.message || ''
    }
  },
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