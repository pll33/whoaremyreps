<template>
  <div class="legislator-info">
    <div v-if="info">
      <div class="committees">
        <div v-if="info && info.resources">
          <div class="offices">
            <div class="office" v-for="office in info.resources.offices">
              <h4>{{ office.name }}</h4>
              <span class="address" v-bind:class="checkForNewline(office.address)">{{ office.address }}</span>
              <span v-if="office.phone"><br><i class="fa fa-phone"></i> {{ office.phone }} (Office)</span>
              <span v-if="office.fax"><br><i class="fa fa-fax"></i> {{ office.fax }} (Fax)</span>
              <span v-if="office.email"><br><i class="fa fa-envelope"></i> {{ office.email }}</span>
            </div>
          </div>
          
          <h3>Resources</h3>
          <ul class="resources">
            <li v-if="info.resources.ballotpedia_url">
              <a :href="'https://ballotpedia.org/' + info.resources.ballotpedia_url" title="Ballotpedia" target="_blank" rel="noopener"><i class="fa fa-check-square-o"></i>Ballotpedia</a>
            </li>
            <li v-if="info.resources.votesmart_id">
              <a :href="'https://votesmart.org/candidate/' + info.resources.votesmart_id" title="VoteSmart" target="_blank" rel="noopener"><i class="fa fa-list"></i>VoteSmart</a>
            </li>
          </ul>

          <h3>Committee Positions</h3>
          <ul v-if="info.resources.roles.length > 0">
            <li v-for="role in info.resources.roles">{{ role }}</li>
          </ul>
          <p v-else>No committee positions.</p>
        </div>
      </div>
      <div class="recent-bills">
        <h3>Sponsored Bills <span class="heading-desc">(last 10 bills)</span></h3>
        <table class="td-left-3 td-sm-hide-4" v-if="info && info.sponsored.length > 0">
          <tr>
            <th>Date Updated</th>
            <th>Bill #</th>
            <th>Description</th>
            <th>Date Created</th>
          </tr>
          <tr v-for="bill in info.sponsored">
            <td>{{ bill.updated_at }}</td>
            <td>
              <span v-if="bill.versions"><a :href="bill.versions.url" target="_blank" >{{ bill.bill_id }}</a></span>
              <span v-else>{{ bill.bill_id }}</span>
            </td>
            <td>{{ bill.title }}</td>
            <td>{{ bill.created_at }}</td>
          </tr>
        </table>
        <p v-else>No recently sponsored bills.</p>
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
  name: 'legislator-info-state',
  props: ['slug', 'role', 'name', 'party'],
  components: { LoaderDefault },
  data () {
    return {
      info: null,
      loaded: false
    }
  },
  mounted () {
    let rep = this.$store.state.apiData.representatives[this.$store.state.route.params.rep]
    if (rep && rep.info && rep.info.resources) {
      this.info = rep.info
      this.loaded = true
    } else {
      let self = this
      this.$store.dispatch('fetchLegislatorInfoState', {
        slug: this.slug,
        role: this.role,
        name: this.name,
        party: this.party
      })
      setTimeout(function () {
        self.info = self.$store.getters.getRepresentativeInfo
        self.loaded = true
      }, 2500)
    }
  },
  methods: {
    checkForNewline (address) {
      if (address.indexOf('\n') >= 0 || address.indexOf('\r') >= 0) {
        return 'ws-pre'
      }
    }
  }
}
</script>
<style lang="scss">
.legislator-info {
  .office {
    display: inline-block;
    vertical-align: top;

    h4 { margin-bottom: 0; }
    i.fa {
      width: 20px;
      text-align: center;
    }
  }
}

@media screen and (max-width: 680px) {
  .legislator-info .office {
    padding: 0;
  }
}

@media screen and (min-width: 681px) {
  .legislator-info .office {
    padding: 10px;
  }
}
</style>
