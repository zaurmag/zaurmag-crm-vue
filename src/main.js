import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import date from '@/use/date-format'
import currency from '@/use/currency-format'
import tooltipDirective from '@/directives/tooltip.directive'
import { QuillEditor } from '@vueup/vue-quill'
import 'bootstrap'
import '@/assets/css/main.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

createApp(App)
  .use(store)
  .use(router)
  .use(date)
  .use(currency)
  .directive('tooltip', tooltipDirective)
  .component('quillEditor', QuillEditor)
  .mount('#app')
