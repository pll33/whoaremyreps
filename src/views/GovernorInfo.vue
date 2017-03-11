<template>
  <div class="governor-info">
    <div v-if="info">
      <div class="recent-bills">
        <h3>Recent bills signed into law</h3>
        <table class="td-left-3" v-if="info && info.laws">
          <tr>
            <th>Date signed</th>
            <th>Bill #</th>
            <th>Description</th>
          </tr>
          <tr v-for="bill in info.laws">
            <td>{{ bill.signed_date }}</td>
            <td><a :href="bill.versions.url" rel="nofollow noreferrer" target="_blank">{{ bill.bill_id }}</a></td>
            <td>{{ bill.title }}</a></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="loading-info" v-else>
      <p>Loading additional information...</p>
      <clip-loader color="#3C4E6F"></clip-loader>
    </div>
  </div>
</template>
<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'governor-info',
  props: ['slug'],
  components: { ClipLoader },
  data () {
    return {
      info: null,
      loaded: false
    }
  },
  mounted () {
    let self = this
    this.$store.dispatch('fetchGovernorInfo', this.slug)
    setTimeout(function () {
      self.info = self.$store.getters.getRepresentativeInfo
      self.loaded = true
    }, 3000)
  }
}
</script>
<style lang="scss">
</style>