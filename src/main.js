import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import date from '@/use/date-format'
import currency from '@/use/currency-format'
import tooltipDirective from '@/directives/tooltip.directive'
import globalComponents from '@/components/globals'
import 'bootstrap'
import '@/assets/css/main.css'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const app = createApp(App)
app
  .use(store)
  .use(router)
  .use(date)
  .use(currency)
  .directive('tooltip', tooltipDirective)
  .mount('#app')

globalComponents.forEach(component => {
  app.component(component.name, component)
})
