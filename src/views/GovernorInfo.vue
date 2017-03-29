<template>
  <div class="executive-info">
    <div v-if="info">
      <div class="recent-bills">
        <h3>Bills signed into law <span v-if="info.laws.length > 0" class="heading-desc">(last {{ info.laws.length }} bills)</span></h3>
        <table class="td-left-3" v-if="info.laws && info.laws.length > 0">
          <tr>
            <th>Date signed</th>
            <th>Bill #</th>
            <th>Description</th>
          </tr>
          <tr v-for="bill in info.laws">
            <td>{{ bill.signed_date }}</td>
            <td>
              <span v-if="bill.url"><a :href="bill.url" rel="noopener" target="_blank">{{ bill.bill_id }}</a></span>
              <span v-else>{{ bill.bill_id }}</span>
            </td>
            <td>{{ bill.title }}</a></td>
          </tr>
        </table>
        <p v-else>Up-to-date information available at <a :href="legiscan_url" rel="noopener" target="_blank">LegiScan.com</a></p>
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
      this.$store.dispatch('getGovernorInfo', { slug: this.slug })
      setTimeout(function () {
        self.info = self.$store.getters.getRepresentativeInfo
        self.loaded = true
      }, 2500)
    }
  },
  computed: {
    legiscan_url () {
      let stateAbbrev = this.$store.getters.getStateAbbreviation
      return 'https://legiscan.com/' + stateAbbrev.toUpperCase() + '/legislation?status=passed'
    }
  }
}
</script>
