// import './assets/main.css'
import axios from 'axios'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './components/App.vue'
import router from './router'
import './index.css'

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

axios.defaults.baseURL = 'http://157.173.198.177:5115/'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.config.globalProperties.$axios = axios

app.mount('#app')
