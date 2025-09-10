<template>
  <div class="mt-20">
    <main class="grid grid-cols-5">

      <LeftMenuView />

      <div class="col-start-2 col-span-4 flex-grow bg-gray-100 h-screen">
        <div class="flex justify-center">
          <div class="w-4/12 bg-white p-6 rounded-lg">
            <h1 class="text-2xl text-center pb-5">
              <p>{{ userFullName }}</p>
            </h1>
            <p class="text-center">{{ $t('HomePage.welcomeMessage') }}</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import LeftMenuView from '../Menu/LeftMenuView.vue';

export default {
  name: 'HomeView',
  components: {
    LeftMenuView,
  },
  computed: {
    userFullName() {
      const user = this.$store.getters['user/getUser'];
      console.log('User: ');
      if (user) {
        return `${user.firstName} ${user.lastName}`;
      }
      return '';
    }
  }
}
</script>
