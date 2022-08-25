function triggerFunction (fn) {
  return typeof fn === 'function' && fn()
}

export default {
  install (Vue) {
    const state = Vue.observable({
      items: [],
      timeouts: {}
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

      state.timeouts[item._id] = setTimeout(() => {
        close(item)

        triggerFunction(item.onTimeout)
      }, item.timeout)
    }

    function close ({ _id }) {
      clearTimeout(state.timeouts[_id])

      delete state.timeouts[_id]

      const index = state.items.findIndex(x => _id == x._id)

      if (index > -1) {
        state.items.splice(index, 1)
      }
    }

    Object.defineProperty(toast, 'items', {
      get: () => state.items
    })

    Object.defineProperty(toast, 'close', {
      value: close
    })

    Vue.prototype.$toast = toast

  }
}