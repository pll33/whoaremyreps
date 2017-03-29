<template>
  <div class="executive-info">
    <div v-if="info">
      <div class="recent-bills">
        <h3>Bills signed into law <span class="heading-desc" v-if="info.laws && info.laws.length > 0">(last {{ info.laws.length }} bills)</span></h3>
        <table v-if="info && info.laws" class="td-left-3 td-sm-hide-4">
          <tr>
            <th>Date signed</th>
            <th>Bill #</th>
            <th>Description</th>
            <th>Introduced By</th>
          </tr>
          <tr v-for="bill in info.laws">
            <td>{{ bill.signed_date }}</td>
            <td>
              <span v-if="bill.url"><a :href="bill.url" rel="noopener" target="_blank">{{ bill.id }}</a></span>
              <span v-else>{{ bill.id }}</span>
            </td>
            <td><span class="fw-600" v-if="bill.short_title">{{ bill.short_title }}: </span>{{ bill.official_title }}</td>
            <td class="ws-pre">{{ bill.sponsor }}</td>
          </tr>
          <tr class="tr-more-info">
            <td colspan="4">
              Up-to-date information available at <a href="https://www.congress.gov/search?q={%22source%22:%22legislation%22,%22congress%22:%22115%22,%22bill-status%22:%22law%22}">Congress.gov</a>
            </td>
          </tr>
        </table>
      </div>

      <div>
        <h3>Executive Orders <span class="heading-desc" v-if="info.orders && info.orders.length > 0">(last {{ info.orders.length }} orders)</span></h3>
        <table v-if="info && info.orders" class="td-left-3 td-sm-hide-2">
          <tr>
            <th>Date</th>
            <th>Number</th>
            <th>Title</th>
          </tr>
          <tr v-for="eo in info.orders">
            <td>{{ eo.signing_date }}</td>
            <td><a :href="eo.html_url" target="_blank" rel="noopener">{{ eo.executive_order_number }}</a></td>
            <td><a :href="eo.html_url" target="_blank" rel="noopener">{{ eo.title }}</a></td>
          </tr>
        </table>
      </div>

      <div v-if="info && info.proclamations">
        <h3>Proclamations</h3>
        <table class="td-left-2">
          <tr>
            <th>Date</th>
            <th>Title</th>
          </tr>
          <tr v-for="doc in info.proclamations">
            <td>{{ doc.publication_date }}</td>
            <td><a :href="doc.html_url" target="_blank" rel="noopener">{{ doc.title }}</a></td>
          </tr>
        </table>
      </div>

      <div v-if="info && info.memoranda">
        <h3>Presidential Memoranda</h3>
        <table class="td-left-2">
          <tr>
            <th>Date</th>
            <th>Title</th>
          </tr>
          <tr v-for="doc in info.memoranda">
            <td>{{ doc.publication_date }}</td>
            <td><a :href="doc.html_url" target="_blank" rel="noopener">{{ doc.title }}</a></td>
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
import LoaderDefault from '../components/LoaderDefault.vue'

export default {
  name: 'president-info',
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
    if (rep && rep.info && rep.info.orders) {
      this.info = rep.info
      this.loaded = true
    } else {
      let self = this
      this.$store.dispatch('getPresidentInfo', { slug: this.slug })
      setTimeout(function () {
        self.info = self.$store.getters.getRepresentativeInfo
        self.loaded = true
      }, 2500)
    }
  }
}
</script>
