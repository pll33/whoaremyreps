<template>
  <clip-loader :color="color"></clip-loader>
</template>
<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'loader-redirect',
  props: ['color'],
  components: { ClipLoader },
  mounted: function () {
    setTimeout(() => {
      this.$router.replace('/all')
    }, 1500)
  }
}
</script>

<style>
</style>