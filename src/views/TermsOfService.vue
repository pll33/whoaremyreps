<template>
  <div class="container" v-once>
    <h2>Terms of Service</h2>

    <p><span class="heading-desc">Last updated: {{ lastUpdatedDate }}</span></p>

  </div>
</template>

<script>
export default {
  name: 'terms-of-service',
  data () {
    return {
      lastUpdatedDate: 'March 12, 2017'
    }
  }
}
</script>
