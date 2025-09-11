<template>
  <main class="grid grid-cols-5 mt-20">
    <LeftMenuView />
    
    <div class="col-start-2 col-span-4 flex-grow bg-gray-100 h-screen">
      <div class="flex justify-center">
        <div class="bg-white p-6 rounded-lg mt-5">
            <h1 class="text-3xl ml-5 pb-5 text-gray-500">{{ $t('DealsPage.PastDeals') }}</h1>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import LeftMenuView from '../Menu/LeftMenuView.vue';

export default {
  name: 'PastDealsView',
  components: {
    LeftMenuView
  }
}
</script>