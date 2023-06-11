import { createApp } from 'vue'
import '@/assets/styles/main.scss'
import '@/assets/fonts/roboto/roboto.scss'
import { createHead } from '@vueuse/head'
import { createI18n } from 'vue-i18n'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import components from '@/components/UI'
import customComponents from '@/components/custom'
import { languages } from '@/i18n'
import { defaultLocale } from '@/i18n'
const test: boolean = 5
console.log('123', test)
const head = createHead()
const messages = Object.assign(languages)

const localStorageLang = localStorage.getItem('lang')
const i18n = createI18n({
  legacy: false, //for composition api
  locale: localStorageLang || defaultLocale,
  fallbackLocale: 'en',
  messages
})
const app = createApp(App)

components.forEach((component) => {
  app.component(component.name, component)
})
customComponents.forEach((component) => {
  app.component(component.name, component)
})
app.use(router).use(store).use(head).use(i18n).mount('#app')
