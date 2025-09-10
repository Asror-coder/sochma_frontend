import { createApp } from 'vue'
import App from './components/App.vue'
import router from './router'
import './index.css'

// i18n setup for localization
import { createI18n } from 'vue-i18n'
import en from './lang/en/en.json';
import uz from './lang/uz/uz.json';
import ru from './lang/ru/ru.json';

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || 'en',
    fallbackLocale: 'en',
    messages: {
      en,
      uz,
      ru
    },
})

// Set the base URL for axios
import axios from 'axios'
axios.defaults.baseURL = 'http://157.173.198.177:5115/'

// Vuex store setup
import { createStore } from 'vuex'
import store from './stores'

const app = createApp(App)
app.use(router)
app.use(i18n)
app.use(store)

// Make axios available globally
app.config.globalProperties.$axios = axios

app.mount('#app')
