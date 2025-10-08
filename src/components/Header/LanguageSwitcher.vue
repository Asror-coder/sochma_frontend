<template>
  <div :class="rootClasses" ref="rootEl">
    <button
      @click="toggleDropdown"
      :class="buttonClasses"
    >
      <span>{{ currentLabel }}</span>
      <svg class="ml-2 w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div
      v-if="dropdownOpen"
      :class="['absolute', dropdownPositionClasses, 'bg-white/95 backdrop-blur border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden']"
    >
      <ul class="py-1">
        <li>
          <button @click="selectLanguage('en')" class="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-sm transition">Eng</button>
        </li>
        <li>
          <button @click="selectLanguage('uz')" class="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-sm transition">O'zb</button>
        </li>
        <li>
          <button @click="selectLanguage('ru')" class="w-full text-left px-4 py-2.5 hover:bg-blue-50 text-sm transition">Рус</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps({
  fullWidth: { type: Boolean, default: false }
});

const { locale } = useI18n();
const dropdownOpen = ref(false);

const labels = {
  en: 'Eng',
  uz: "O'zb",
  ru: 'Рус'
};

const currentLabel = computed(() => labels[locale.value] || 'Eng');

const rootClasses = computed(() => [
  'language-switcher-root relative text-left',
  props.fullWidth ? 'w-full' : 'inline-block'
]);

const buttonClasses = computed(() => [
  'border rounded-lg px-4 py-2.5 shadow-sm flex items-center justify-between text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1',
  'bg-white/90 backdrop-blur border-gray-300 hover:border-blue-400 hover:text-blue-700',
  props.fullWidth ? 'w-full' : ''
]);

// Dropdown positioning: if fullWidth (mobile drawer bottom) we drop upwards to remain visible.
const dropdownPositionClasses = computed(() => {
  if (props.fullWidth) {
    return 'left-0 bottom-full mb-2 w-full';
  }
    // default desktop style
  return 'right-0 mt-2 w-40';
});

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
  if (!(event.target instanceof Element)) return;
  // If click is not inside our root element, close
  if (!event.target.closest('.language-switcher-root')) {
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

<style scoped>
/* (Optional) spacing tweak when fullWidth inside stacked layouts */
</style>