<template>
    <SiteHeader />
    <div class="pt-8">
    <router-view />
  </div>
</template>

<script setup>
import SiteHeader from './Header/Header.vue';
</script>