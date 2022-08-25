import Vue from 'vue'
import App from './App.vue'

import './assets/scss/main.scss'

// plugins
import toast from './plugins/toast'

Vue.config.productionTip = false

Vue.use(toast)

new Vue({
  render: h => h(App)
}).$mount('#app')
