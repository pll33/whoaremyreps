<template>
  <div class="president-info">
    <div v-if="info">
      <div>
        <h3>Executive Orders</h3>
        <table v-if="info && info.orders" class="td-left-3">
          <tr>
            <th>Date</th>
            <th>Number</th>
            <th>Title</th>
          </tr>
          <tr v-for="eo in info.orders">
            <td>{{ eo.signing_date }}</td>
            <td>{{ eo.executive_order_number }}</td>
            <td><a :href="eo.html_url">{{ eo.title }}</a></td>
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
            <td><a :href="doc.html_url" target="_blank" rel="nofollow noreferrer">{{ doc.title }}</a></td>
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
            <td><a :href="doc.html_url" target="_blank" rel="nofollow noreferrer">{{ doc.title }}</a></td>
          </tr>
        </table>
      </div>

      <div v-if="info && info.notices">
        <h3>Presidential Notices</h3>
        <table class="table-left-2">
          <tr>
            <th>Date</th>
            <th>Title</th>
          </tr>
          <tr v-for="doc in info.notices">
            <td>{{ doc.publication_date }}</td>
            <td><a :href="doc.html_url" target="_blank" rel="nofollow noreferrer">{{ doc.title }}</a></td>
          </tr>
        </table>
      </div>

      <div v-if="info && info.determinations">
        <h3>Presidential Determinations</h3>
        <table class="table-left-2">
          <tr>
            <th>Date</th>
            <th>Title</th>
          </tr>
          <tr v-for="doc in info.determinations">
            <td>{{ doc.publication_date }}</td>
            <td><a :href="doc.html_url" target="_blank" rel="nofollow noreferrer">{{ doc.title }}</a></td>
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
  name: 'president-info',
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
    this.$store.dispatch('fetchPresidentInfo', this.slug)
    setTimeout(function () {
      self.info = self.$store.getters.getRepresentativeInfo
      self.loaded = true
    }, 3000)
    // TO-DO: temporary fix to resolve initial loading issue
  }
}
</script>
<style lang="scss">
.president-info {
}
</style>
