<template>
  <div class="executive-info">
    <div v-if="info">
      <div class="info-section">
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
        <p v-else><i class="fa fa-exclamation-circle"></i> Up-to-date information available at <a :href="legiscan_url" rel="noopener" target="_blank">LegiScan.com</a></p>
      </div>

      <div class="info-error" v-if="info.error && info.error.message">
        <error-message :message="info.error.message"></error-message>
      </div>
    </div>
    <div class="info-loading" v-else>
      <p>Loading additional information...</p>
      <loader-default></loader-default>
    </div>
  </div>
</template>
<script>
import ErrorMessage from '../components/ErrorMessage'
import LoaderDefault from '../components/LoaderDefault'

export default {
  name: 'governor-info',
  props: ['slug'],
  components: { ErrorMessage, LoaderDefault },
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
      this.$store.dispatch('getGovernorInfo', { slug: this.slug })
        .then(() => {
          this.info = this.$store.getters.getRepresentativeInfo
          this.loaded = true
        })
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
