import Vue from 'vue'
import App from './App.vue'

import './assets/scss/main.scss'

// plugins
// import toast from './mixins/toast'

Vue.config.productionTip = false

// Vue.mixin(toast)

function triggerFunction (fn) {
  return typeof fn === 'function' && fn()
}

Vue.use({
  install (v) {
    const state = Vue.observable({ toasts: [] })

    function toast (options) {
      const item = {
        timeout: 5000,
        onTimeout: null,
        onRedo: null,
        type: 'primary',
        title: '',
        body: '',
        ...options,
        _id: Math.random() + new Date().getTime()
      }

      state.toasts.unshift(item)

      setTimeout(() => {
        toastClose(item)

        triggerFunction(item.onTimeout)
      }, item.timeout)
    }

    function toastClose ({ _id }) {
      const index = v.prototype.$toasts.findIndex(x => _id == x._id)

      if (index > -1) {
        v.prototype.$toasts.splice(index, 1)
      }
    }

    Object.defineProperty(v.prototype, '$toasts', {
      get: () => state.toasts
    })

    v.prototype.$toast = toast
    v.prototype.$toastClose = toastClose
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
