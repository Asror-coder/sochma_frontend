<template>
  <main class="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 pt-10 pb-20 sm:pt-14">
    <!-- Hero Section -->
    <section class="w-full max-w-3xl flex flex-col items-center px-4">
      <h1 class="text-3xl leading-tight sm:text-5xl font-extrabold text-blue-700 text-center mb-4 drop-shadow-sm">{{$t('HomePage.heroTitle', { name: userFullName })}}</h1>
      <p class="text-base sm:text-xl text-gray-700 text-center mb-6 max-w-2xl">{{ $t('HomePage.welcomeMessage') }}</p>
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center mb-10">
        <router-link :to="{name: 'newDeal'}" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md shadow-blue-200 text-center transition">{{$t('HomePage.createDealBtn')}}</router-link>
        <router-link :to="{name: 'currentDeals'}" class="w-full sm:w-auto bg-white/90 backdrop-blur border border-blue-600 text-blue-700 font-semibold py-3.5 px-6 rounded-xl shadow text-center transition hover:bg-blue-50">{{$t('HomePage.openMyDealsBtn')}}</router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="w-full max-w-5xl px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
        <h2 class="font-bold text-lg mb-2 text-blue-700">{{$t('HomePage.features.investorsTitle')}}</h2>
        <p class="text-gray-600 text-sm sm:text-base">{{$t('HomePage.features.investorsDesc')}}</p>
      </div>
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow p-6 flex flex-col items-center text-center border border-blue-100">
        <h2 class="font-bold text-lg mb-2 text-blue-700">{{$t('HomePage.features.dealTitle')}}</h2>
        <p class="text-gray-600 text-sm sm:text-base">{{$t('HomePage.features.dealDesc')}}</p>
      </div>
      <div class="bg-white/90 backdrop-blur rounded-2xl shadow p-6 flex flex-col items-center text-center border border-blue-100 lg:col-span-1">
        <h2 class="font-bold text-lg mb-2 text-blue-700">{{$t('HomePage.features.dashboardTitle')}}</h2>
        <p class="text-gray-600 text-sm sm:text-base">{{$t('HomePage.features.dashboardDesc')}}</p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'HomeView',
  computed: {
    userFullName() {
      const user = this.$store.getters['user/getUser'];
      return user ? `${user.firstName} ${user.lastName}` : 'Guest';
    }
  }
}
</script>
 
