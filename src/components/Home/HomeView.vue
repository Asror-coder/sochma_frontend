<template>
    <main class="flex justify-center mt-24">
      <div class="flex flex-col">
        <h1 class="text-2xl text-center pb-5">
          <p>{{ userFullName }}</p>
        </h1>
        <p class="text-center">{{ $t('HomePage.welcomeMessage') }}</p>
      </div>
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
      return '';
    }
  }
}
</script>
