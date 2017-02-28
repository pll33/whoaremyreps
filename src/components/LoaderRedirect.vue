<template>
  <clip-loader :color="color"></clip-loader>
</template>
<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'loader-redirect',
  props: ['color', 'timeout'],
  components: { ClipLoader },
  mounted () {
    let time = this.timeout || 2000
    setTimeout(() => {
      this.$router.replace('/all')
    }, time)
  }
}
</script>
