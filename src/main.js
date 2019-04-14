import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import { Loading, Radio, RadioGroup } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/styles/index.scss'

Vue.use(Radio)
Vue.use(VModal)
Vue.use(Loading)
Vue.use(RadioGroup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
