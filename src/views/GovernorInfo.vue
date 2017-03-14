<template>
  <div class="executive-info">
    <div v-if="info">
      <div class="recent-bills">
        <h3>Bills signed into law <span class="heading-desc">(last 10 bills)</span></h3>
        <table class="td-left-3" v-if="info && info.laws">
          <tr>
            <th>Date signed</th>
            <th>Bill #</th>
            <th>Description</th>
          </tr>
          <tr v-for="bill in info.laws">
            <td>{{ bill.signed_date }}</td>
            <td>
              <span v-if="bill.versions"><a :href="bill.versions.url" rel="noopener" target="_blank">{{ bill.bill_id }}</a></span>
              <span v-else>{{ bill.bill_id }}</span>
            </td>
            <td>{{ bill.title }}</a></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="loading-info" v-else>
      <p>Loading additional information...</p>
      <loader-default></loader-default>
    </div>
  </div>
</template>
<script>
import LoaderDefault from '../components/LoaderDefault'

export default {
  name: 'governor-info',
  props: ['slug'],
  components: { LoaderDefault },
  data () {
    return {
      info: null,
      loaded: false
    }
  },
  mounted () {
    let rep = this.$store.state.apiData.representatives[this.$store.state.route.params.rep]
    if (rep && rep.info && rep.info.laws) {
      this.info = rep.info
      this.loaded = true
    } else {
      let self = this
      this.$store.dispatch('fetchGovernorInfo', this.slug)
      setTimeout(function () {
        self.info = self.$store.getters.getRepresentativeInfo
        self.loaded = true
      }, 2500)
    }
  }
}
</script>
