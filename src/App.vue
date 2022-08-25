<template>
  <div id="app">
    <button @click="handleAddToast">
      add {{ $toast.items }}
    </button>

    <div>
      <TransitionGroup
        tag="div"
        name="fade"
        class="toast-container"
      >
        <div
          v-for="toast in $toasts"
          :key="toast._id"
          class="toast"
          :class="[`toast--${toast.type}`]"
        >
          <div class="toast__aside">
            <div class="toast__bar--vertical"></div>

            <img
              v-if="toast.type === 'success'"
              src="@/assets/icons/checked.png"
              alt=""
            >

            <img
              v-if="toast.type === 'redo'"
              src="@/assets/icons/redo.png"
              alt=""
            >
          </div>

          <div class="toast__body">
            <div
              class="toast__title"
              v-html="toast.title"
            >
            </div>

            <div
              class="toast__subtitle"
              v-html="toast.body"
            >
            </div>

            <div class="toast__actions">
              <button
                v-if="toast.type === 'redo'"
                class="btn btn--redo"
              >
                Redo
              </button>
            </div>
          </div>

          <div class="toast__footer">
            <img
              src="@/assets/icons/close.png"
              alt=""
              class="close"
              @click="$toastClose(toast)"
            >
          </div>

          <div
            class="toast__progress"
            :style="{
              animation: `move ${toast.timeout}ms linear`
            }"
          ></div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
// import Toast from './components/Toast'

export default {
  name: 'App',

  // components: {
  //   Toast
  // },

  created () {
    console.log(this.$toasts)
    console.log(this.$toast)
  },

  methods: {
    handleAddToast () {
      console.log('asd')
      this.$toast({
        timeout: 5000,
        type: 'success',
        title: 'Redo your changes',
        body: 'You are now <b style="font-weight: 900">Banned</b>',
        onTimeout: () => {
          console.log(this)
        },
        onRedo: () => {
          console.log('redo')
        }
      })
    }
  }
}
</script>
