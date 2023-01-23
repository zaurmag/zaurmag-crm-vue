import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import date from '@/plugins/date-format'
import currency from '@/plugins/currency-format'
import tooltipDirective from '@/directives/tooltip.directive'
import globalComponents from '@/components/globals'
import 'bootstrap'
import '@/assets/styles/main.scss'
import './registerServiceWorker'
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
  const name = component.name || component.__name
  app.component(name, component)
})
