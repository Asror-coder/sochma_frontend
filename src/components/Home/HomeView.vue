<template>
    <main class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 pt-8 pb-16">
      <!-- Hero Section -->
      <section class="w-full max-w-2xl flex flex-col items-center px-4">
        <h1 class="text-3xl md:text-5xl font-extrabold text-blue-700 text-center mb-4 drop-shadow">{{$t('HomePage.heroTitle', { name: userFullName })}}</h1>
        <p class="text-lg md:text-xl text-gray-700 text-center mb-6">{{ $t('HomePage.welcomeMessage') }}</p>
        <div class="flex flex-col md:flex-row gap-4 w-full justify-center mb-8">
          <router-link :to="{name: 'newDeal'}" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow text-center transition">{{$t('HomePage.createDealBtn')}}</router-link>
          <router-link :to="{name: 'calculator'}" class="bg-white border border-blue-600 text-blue-700 font-semibold py-3 px-6 rounded-lg shadow text-center transition hover:bg-blue-50">{{$t('HomePage.openCalculatorBtn')}}</router-link>
        </div>
      </section>

      <!-- Features Section -->
      <section class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4">
        <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 class="font-bold text-lg mb-2 text-center">{{$t('HomePage.features.investorsTitle')}}</h2>
          <p class="text-gray-600 text-center">{{$t('HomePage.features.investorsDesc')}}</p>
        </div>
        <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 class="font-bold text-lg mb-2 text-center">{{$t('HomePage.features.dealTitle')}}</h2>
          <p class="text-gray-600 text-center">{{$t('HomePage.features.dealDesc')}}</p>
        </div>
        <div class="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 class="font-bold text-lg mb-2 text-center">{{$t('HomePage.features.dashboardTitle')}}</h2>
          <p class="text-gray-600 text-center">{{$t('HomePage.features.dashboardDesc')}}</p>
        </div>
      </section>
    </main>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
  },
  computed: {
    userFullName() {
      const user = this.$store.getters['user/getUser'];
      if (user) {
        return `${user.firstName} ${user.lastName}`;
      }
      return 'Guest';
    }
  }
}
</script>
