import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import date from '@/utils/date'
import tooltipDirective from '@/directives/tooltip.directive'
import 'bootstrap'
import '@/assets/css/main.css'

createApp(App)
  .use(store)
  .use(router)
  .use(date)
  .directive('tooltip', tooltipDirective)
  .mount('#app')
