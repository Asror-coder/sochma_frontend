<script setup>
import { RouterLink, RouterView } from 'vue-router'

import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './components/LanguageSwitcher.vue';

const { t } = useI18n();

</script>

<template>
  <header>
    <div>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
      <div>
        <LanguageSwitcher />
      </div>
    </div>
  </header>

  <RouterView />
</template>
