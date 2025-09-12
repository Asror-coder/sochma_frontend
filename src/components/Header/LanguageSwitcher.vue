<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      class="bg-white border border-gray-300 rounded px-4 py-2 shadow-sm flex items-center"
    >
      {{ currentLabel }}
      <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-10"
    >
      <ul>
        <li>
          <button @click="selectLanguage('en')" class="w-full text-left px-4 py-2 hover:bg-gray-100">Eng</button>
        </li>
        <li>
          <button @click="selectLanguage('uz')" class="w-full text-left px-4 py-2 hover:bg-gray-100">O'zb</button>
        </li>
        <li>
          <button @click="selectLanguage('ru')" class="w-full text-left px-4 py-2 hover:bg-gray-100">Рус</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const dropdownOpen = ref(false);

const labels = {
  en: 'Eng',
  uz: "O'zb",
  ru: 'Рус'
};

const currentLabel = computed(() => labels[locale.value] || 'Eng');

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function selectLanguage(lang) {
  locale.value = lang;
  localStorage.setItem('lang', lang);
  dropdownOpen.value = false;
}

// Close dropdown when clicking outside
function handleClickOutside(event) {
  if (!event.target.closest('.relative.inline-block')) {
    dropdownOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside);
});
</script>