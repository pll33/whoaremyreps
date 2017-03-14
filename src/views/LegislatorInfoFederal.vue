<template>
  <div class="legislator-info">
    <div v-if="info">
      <h3 class="text-center" v-if="info.resources.term_end">Next election: {{ info.resources.term_end }}</h3>

      <h3>Resources</h3>
      <ul class="resources">
        <li v-if="info.resources.contact_form">
          <a :href="info.resources.contact_form" target="_blank" rel="noopener"><i class="fa fa-comment-o"></i>Contact Form</a>
        </li>
        <li v-if="info.resources.govtrack_id">
          <a :href="'https://www.govtrack.us/congress/members/' + info.resources.govtrack_id" target="_blank" rel="noopener"><i class="fa fa-university"></i>GovTrack.us</a>
        </li>
        <li v-if="info.resources.crp_id">
          <a :href="'http://www.opensecrets.org/politicians/summary.php?cid=' + info.resources.crp_id" target="_blank" rel="noopener"><i class="fa fa-money"></i>OpenSecrets</a>
        </li>
        <li v-if="info.resources.ballotpedia_url">
          <a :href="'https://ballotpedia.org/' + info.resources.ballotpedia_url" rel="noopener"><i class="fa fa-check-square-o"></i>Ballotpedia</a>
        </li>
        <li v-if="info.resources.votesmart_id">
          <a :href="'http://votesmart.org/candidate/' + info.resources.votesmart_id" target="_blank" rel="noopener"><i class="fa fa-th-list"></i>VoteSmart</a>
        </li>
        <li v-if="info.resources.fax">
          <span style="padding: 4px"><i class="fa fa-fax" title="Fax"></i>{{ info.resources.fax }} (Fax)</span>
        </li>
      </ul>

      <div class="committees" v-if="info && info.committees">
        <h3>Committee Positions</h3>
        <ul v-if="info.committees">
          <li v-for="com in info.committees">{{ com.title }}, <span class="text-italic">{{ com.committee }}</span></li>
        </ul>
      </div>

      <div class="bills-sponsor">
        <h3>Sponsored Bills <span class="heading-desc">(last 10 bills)</span></h3>
        <table class="td-left-3" v-if="info && info.sponsored.length > 0">
          <tr>
            <th>Date Introduced</th>
            <th>Bill #</th>
            <th>Description</th>
          </tr>
          <tr v-for="bill in info.sponsored">
            <td>{{ bill.date }}</td>
            <td><a :href="bill.urls.congress" target="_blank" rel="noopener">{{ bill.id }}</a></td>
            <td><span class="fw-600" v-if="bill.short_title">{{ bill.short_title }}: </span>{{ bill.official_title }}</td>
          </tr>
        </table>
        <p v-else>No recently sponsored bills.</p>
      </div>

      <div class="bills-cosponsor">
        <h3>Co-Sponsored Bills <span class="heading-desc">(last 10 bills)</span></h3>
        <table class="td-left-3 td-sm-hide-4" v-if="info && info.cosponsored.length > 0">
          <tr>
            <th>Date Introduced</th>
            <th>Bill #</th>
            <th>Description</th>
            <th>Introduced By</th>
          </tr>
          <tr v-for="bill in info.cosponsored">
            <td>{{ bill.date }}</td>
            <td><a :href="bill.urls.congress" target="_blank" rel="noopener">{{ bill.id }}</a></td>
            <td><span class="fw-600" v-if="bill.short_title">{{ bill.short_title }}: </span>{{ bill.official_title }}</td>
            <td class="ws-pre">{{ bill.sponsor }}</td>
          </tr>
        </table>
        <p v-else>No recently co-sponsored bills.</p>
      </div>
    </div>
    <div class="loading-info" v-else>
      <p>Loading additional information...</p>
      <loader-default style="padding: 10px 0;"></loader-default>
    </div>
  </div>
</template>
<script>
import LoaderDefault from '../components/LoaderDefault.vue'

export default {
  name: 'legislator-info-federal',
  props: ['slug', 'role', 'name', 'party', 'ocd'],
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
      this.$store.dispatch('fetchLegislatorInfoFederal', {
        slug: this.slug,
        role: this.role,
        name: this.name,
        party: this.party,
        ocdId: this.ocd
      })
      let self = this
      setTimeout(function () {
        self.info = self.$store.getters.getRepresentativeInfo
        self.loaded = true
      }, 2500)
    }
  }
}
</script>
<style lang="scss">
ul.resources {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

ul.resources li {
  list-style-type: none;
  display: inline-block;
}

ul.resources li a {
  padding: 4px;

  &:hover {
    background-color: #EEE;
  }
}

ul.resources i {
  width: 20px;
  margin-right: 6px;
  text-align: center;
}

@media screen and (max-width: 680px) {
  .legislator-info {
    .bills-sponsor table,
    .bills-cosponsor table {
      font-size: 12px;
    }
  }

  ul.resources li {
    margin: 4px 0;
    flex: 1 0 50%;
  }
}

@media screen and (min-width: 681px) {
  ul.resources li {
    margin: 4px 8px;
    flex: auto;
  }
}
</style>
