import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import date from '@/use/date-format'
import currency from '@/use/currency'
import tooltipDirective from '@/directives/tooltip.directive'
import 'bootstrap'
import '@/assets/css/main.css'

createApp(App)
  .use(store)
  .use(router)
  .use(date)
  .use(currency)
  .directive('tooltip', tooltipDirective)
  .mount('#app')
