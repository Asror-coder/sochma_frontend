<template>
  <main class="flex justify-center my-12 sm:my-16">
    <div class="flex flex-col w-full max-w-screen-md px-4 sm:px-0">
      <div v-if="successMessage" class="mb-4 p-3 rounded bg-green-100 text-green-700 text-center font-semibold">
        {{ successMessage }}
      </div>
  <div class="flex items-center justify-between pb-5 gap-4 flex-wrap w-full">
        <h1 class="text-2xl sm:text-3xl text-gray-500">{{ $t('DealsPage.Deals') }}</h1>
        <router-link
          :to="{ name: 'oldDeals' }"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 text-blue-700 bg-white hover:bg-blue-50 font-medium shadow-sm transition text-sm md:text-base"
        >
          {{ $t('DealsPage.PastDeals') }}
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </router-link>
      </div>

      <div v-if="loading" class="text-gray-400 animate-pulse">
        {{ $t('Common.Loading') }}
      </div>
      
      <div v-else>
        
        <div v-if="deals.length === 0" class="text-gray-400 italic">
          {{ $t('Common.NoDealsFound') }}
        </div>

        <!-- Deal Cards -->
        <div class="grid gap-6 w-full">
          <div
            v-for="deal in deals"
            :key="deal.dealId || deal.id"
            class="cursor-pointer w-full bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl p-4 sm:p-6 transition-all"
            @click="goToDealDetail(deal)"
          >
            <div class="flex flex-col md:flex-row md:items-center md:justify-between md:gap-x-32">
              <!-- Product info first on mobile -->
              <div class="flex-1 order-1 md:order-2 md:mt-0 md:ml-4">
                <div class="mb-1">
                  <span class="font-bold text-xl sm:text-2xl text-gray-800">{{ deal.brand }} {{ deal.model }}</span>
                </div>
                <div class="mb-2 flex items-center gap-3">
                  <span class="text-sm sm:text-base text-gray-500">{{ deal.year }}</span>
                  <span class="text-xs text-gray-400">{{ $t('DealsPage.Price') }}: ${{ deal.price }}</span>
                </div>
                <div class="text-xs sm:text-sm text-gray-700 flex flex-col gap-1 sm:mt-3">
                  <div><span class="text-gray-500">{{ $t('DealsPage.Investor') }}:</span> <span class="font-medium">{{ deal.investorFullName }}</span></div>
                  <div><span class="text-gray-500">{{ $t('DealsPage.Buyer') }}:</span> <span class="font-medium">{{ deal.buyerFullName }}</span></div>
                </div>
              </div>

              <!-- Payment info -->
              <div class="flex-1 order-2 md:order-1 md:mt-0 mt-4">
                <div class="bg-gray-50 rounded-lg p-4 flex flex-col gap-2">
                  <div class="grid grid-cols-2 sm:grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.Investment') }}</span>
                    <span class="font-semibold text-gray-700 text-right col-start-2 sm:col-start-auto">${{ deal.investmentAmount }}</span>
                    <span class="hidden sm:inline-block"></span>
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.PayedUpAmount') }}</span>
                    <span class="font-semibold text-gray-700 text-right col-start-2 sm:col-start-auto">${{ deal.payedUpAmount }}</span>
                    <span class="hidden sm:inline-block"></span>
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.PeriodMonth') }}</span>
                    <span class="font-semibold text-gray-700 text-right col-start-2 sm:col-start-auto">{{ deal.periodMonth }}</span>
                    <span class="hidden sm:inline-block"></span>
                  </div>
                  <div class="grid grid-cols-2 sm:grid-cols-3 items-center gap-0">
                    <span class="text-gray-500 whitespace-nowrap">{{ $t('DealsPage.PayedMonths') }}</span>
                    <span class="font-semibold text-gray-700 text-right col-start-2 sm:col-start-auto">{{ deal.payedMonths }}</span>
                    <span class="hidden sm:inline-block"></span>
                  </div>
                  <!-- Repayment progress: dashed line per month -->
                  <div class="mt-3">
                    <div class="flex gap-1 w-full" :title="`${deal.payedMonths}/${deal.periodMonth}`">
                      <span
                        v-for="n in deal.periodMonth"
                        :key="`${deal.dealId || deal.id}-dash-${n}`"
                        class="h-1 sm:h-1.5 rounded-full flex-1 basis-0"
                        :class="n <= deal.payedMonths ? 'bg-green-500' : 'bg-red-300'"
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination Controls (Enhanced) -->
        <div v-if="pagination.totalPages > 1" class="flex justify-center mt-10">
          <nav class="flex items-center gap-2 select-none" aria-label="Pagination">
            <!-- Previous -->
            <button
              class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="pagination.pageNumber === 1"
              @click="changePage(pagination.pageNumber - 1)"
              aria-label="Previous page"
            >
              <span class="text-lg">&lt;</span>
            </button>

            <!-- Page Items -->
            <template v-for="(item, idx) in pageItems" :key="`pg-${idx}-${item.number || item.type}`">
              <button
                v-if="item.type === 'page'"
                @click="changePage(item.number)"
                :aria-current="item.number === pagination.pageNumber ? 'page' : undefined"
                class="w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-medium transition
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       "
                :class="item.number === pagination.pageNumber
                  ? 'bg-blue-600 border-blue-600 text-white shadow'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'"
              >
                {{ item.number }}
              </button>
              <span v-else class="w-10 h-10 flex items-center justify-center text-gray-400">…</span>
            </template>

            <!-- Next -->
            <button
              class="w-10 h-10 flex items-center justify-center rounded-lg border text-gray-500 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
              :disabled="pagination.pageNumber === pagination.totalPages"
              @click="changePage(pagination.pageNumber + 1)"
              aria-label="Next page"
            >
              <span class="text-lg">&gt;</span>
            </button>
          </nav>
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
    ...mapGetters('deal', ['pagination']),
    pageItems() {
      const current = this.pagination.pageNumber;
      const total = this.pagination.totalPages;
      const items = [];

      // Helper to push page
      const pushPage = (n) => items.push({ type: 'page', number: n });

      if (total <= 7) {
        for (let i = 1; i <= total; i++) pushPage(i);
        return items;
      }

      // Case: near start
      if (current <= 3) {
        pushPage(1); pushPage(2); pushPage(3); pushPage(4);
        items.push({ type: 'ellipsis' });
        pushPage(total);
        return items;
      }

      // Case: near end
      if (current >= total - 2) {
        pushPage(1);
        items.push({ type: 'ellipsis' });
        for (let i = total - 3; i <= total; i++) pushPage(i);
        return items;
      }

      // Middle
      pushPage(1);
      items.push({ type: 'ellipsis' });
      pushPage(current - 1); pushPage(current); pushPage(current + 1);
      items.push({ type: 'ellipsis' });
      pushPage(total);
      return items;
    }
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