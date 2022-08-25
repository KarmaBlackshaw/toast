function triggerFunction (fn) {
  return typeof fn === 'function' && fn()
}

export default {
  install (Vue) {
    const state = Vue.observable({
      items: []
    })

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

      state.items.unshift(item)

      setTimeout(() => {
        close(item)

        triggerFunction(item.onTimeout)
      }, item.timeout)
    }

    function close ({ _id }) {
      const index = state.items.findIndex(x => _id == x._id)

      if (index > -1) {
        state.items.splice(index, 1)
      }
    }

    toast.close = close

    Vue.prototype.$toast = toast

    Object.defineProperty(Vue.prototype.$toast, 'items', {
      get: () => state.items
    })
  }
}