<template>
  <div class="mt-20">
    <main class="grid grid-cols-5">
      <LeftMenuView />

      <div class="col-start-2 col-span-4 flex-grow bg-gray-100 h-screen">
        <div class="flex justify-center">
          <div class="bg-white p-6 rounded-lg">
            <h1 class="text-2xl text-center pb-5">{{ $t('DealsPage.Deals') }}</h1>
            <div class="mt-6 flex flex-row space-x-2 justify-center">
              <button
                :class="section === 'current' ? activeClass : inactiveClass"
                @click="section = 'current'"
                class="whitespace-nowrap"
              >
                {{ $t('DealsPage.CurrentDeals') }}
              </button>
              <button
                :class="section === 'past' ? activeClass : inactiveClass"
                @click="section = 'past'"
                class="whitespace-nowrap"
              >
                {{ $t('DealsPage.PastDeals') }}
              </button>
              <button
                :class="section === 'new' ? activeClass : inactiveClass"
                @click="section = 'new'"
                class="whitespace-nowrap"
              >
                {{ $t('DealsPage.NewDeal') }}
              </button>
            </div>
            <div class="mt-8">
              <div v-if="section === 'current'">
                <CurrentDealsView />
              </div>
              <div v-else-if="section === 'past'">
                <PastDealsView />
              </div>
              <div v-else-if="section === 'new'">
                <NewDealView />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LeftMenuView from '../Menu/LeftMenuView.vue';
import CurrentDealsView from './CurrentDealsView.vue';
import PastDealsView from './PastDealsView.vue';
import NewDealView from './NewDeal/NewDealView.vue';

export default {
  name: 'DealsView',
  components: {
    LeftMenuView,
    CurrentDealsView,
    PastDealsView,
    NewDealView
  },
  data() {
    return {
      section: 'current',
      activeClass: 'bg-blue-500 text-white px-4 py-2 rounded font-medium',
      inactiveClass: 'bg-gray-200 text-gray-700 px-4 py-2 rounded font-medium'
    }
  }
}
</script>
