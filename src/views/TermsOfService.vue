<template>
  <div class="container" v-once>
    <h2>Terms of Service</h2>

    <p><span class="heading-desc">Last updated: {{ lastUpdatedDate }}</span></p>

    <!-- TO-DO:
        (terms of service page required by Google Maps API terms of service)
    -->
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
