<template>
  <div class="legislator-info legislator-federal">
    <div v-if="info">
      <h3 class="text-center" v-if="info.resources && info.resources.term_end">Next election: {{ info.resources.term_end }}</h3>

      <div class="info-section" v-if="info.resources">
        <h3>Resources</h3>
        <ul class="resources">
          <li v-if="info.resources.contact_form">
            <a :href="info.resources.contact_form" target="_blank" title="Contact Form" rel="noopener"><i class="fa fa-comment-o"></i>Contact Form</a>
          </li>
          <li v-if="info.resources.govtrack_id">
            <a :href="'https://www.govtrack.us/congress/members/' + info.resources.govtrack_id" title="GovTrack.us" target="_blank" rel="noopener"><i class="fa fa-university"></i>GovTrack.us</a>
          </li>
          <li v-if="info.resources.crp_id">
            <a :href="'http://www.opensecrets.org/politicians/summary.php?cid=' + info.resources.crp_id" title="OpenSecrets" target="_blank" rel="noopener"><i class="fa fa-money"></i>OpenSecrets</a>
          </li>
          <li v-if="info.resources.ballotpedia_url">
            <a :href="'https://ballotpedia.org/' + info.resources.ballotpedia_url" title="Ballotpedia" rel="noopener"><i class="fa fa-check-square-o"></i>Ballotpedia</a>
          </li>
          <li v-if="info.resources.votesmart_id">
            <a :href="'http://votesmart.org/candidate/' + info.resources.votesmart_id" title="VoteSmart" target="_blank" rel="noopener"><i class="fa fa-list"></i>VoteSmart</a>
          </li>
          <li v-if="info.resources.fax">
            <span><i class="fa fa-fax" title="Fax"></i>{{ info.resources.fax }} (Fax)</span>
          </li>
        </ul>
      </div>

      <div class="info-section" v-if="info.committees">
        <h3>Committee Positions</h3>
        <ul class="committees" v-if="info.committees">
          <li v-for="com in info.committees">{{ com.title }}, <span class="text-italic">{{ com.committee }}</span></li>
        </ul>
        <error-message v-else-if="info.errors && info.errors.committees" message="There was an issue loading committee positions."></error-message>
        <p v-else>No committee positions.</p>
      </div>

      <div class="info-section">
        <h3>Recent Votes <span class="heading-desc" v-if="info.votes && info.votes.length > 0">(last {{ info.votes.length }} votes)</span></h3>
        <table class="td-left-2" v-if="info.votes && info.votes.length > 0">
         <tr>
          <th>Position</th>
          <th>Description</th>
          <th>Result</th>
         </tr>
         <tr v-for="vote in info.votes">
          <td v-bind:class="votePositionClass(vote.position)">{{ vote.position }}</td>
          <td><span class="fw-600">{{ vote.title }}</span><span v-if="vote.description"> - {{ vote.description }}</span></td>
          <td v-bind:class="voteResultClass(vote.result)">{{vote.result}}</span><br><span class="small-text ws-pre">({{ vote.total }})</span></td>
         </tr>
        </table>
        <error-message v-else-if="info.errors && info.errors.votes" message="There was an issue loading recent votes."></error-message>
        <p v-else>No recent votes.</p>
      </div>

      <div class="info-section">
        <h3>Sponsored Bills <span class="heading-desc" v-if="info.sponsored && info.sponsored.length > 0">(last {{ info.sponsored.length }} bills)</span></h3>
        <table class="td-left-3" v-if="info.sponsored && info.sponsored.length > 0">
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
        <error-message v-else-if="info.errors && info.errors.sponsored" message="There was an issue loading recently sponsored bills."></error-message>
        <p v-else>No recently sponsored bills.</p>
      </div>

      <div class="info-section">
        <h3>Co-Sponsored Bills <span class="heading-desc"  v-if="info.cosponsored && info.cosponsored.length > 0">(last {{ info.cosponsored.length }} bills)</span></h3>
        <table class="td-left-3 td-sm-hide-4" v-if="info.cosponsored && info.cosponsored.length > 0">
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
        <error-message v-else-if="info.errors && info.errors.sponsored" message="There was an issue loading recently co-sponsored bills."></error-message>
        <p v-else>No recently co-sponsored bills.</p>
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
  name: 'legislator-info-federal',
  props: ['slug', 'role', 'name', 'party', 'ocd'],
  components: { ErrorMessage, LoaderDefault },
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
      this.$store.dispatch('getLegislatorInfoFederal', {
        slug: this.slug,
        role: this.role,
        name: this.name,
        party: this.party,
        ocdId: this.ocd
      }).then(() => {
        this.info = this.$store.getters.getRepresentativeInfo
        this.loaded = true
      })
    }
  },
  methods: {
    votePositionClass (position) {
      switch (position) {
        case 'Yes':
          return 'vote-yes'
        case 'No':
          return 'vote-no'
      }
    },
    voteResultClass (result) {
      switch (result) {
        case 'Passed':
        case 'Confirmed':
        case 'Agreed to':
          return 'vote-pass'
        case 'Failed':
        case 'Rejected':
          return 'vote-fail'
      }
    }
  }
}
</script>
<style lang="scss">
ul.resources {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

ul.resources li {
  list-style-type: none;
  display: inline-block;
  padding: 4px 8px;

  &:hover {
    background-color: #EEE;
  }

  a {
    display: block;
    text-decoration: none;
  }
}

ul.resources i {
  width: 20px;
  margin-right: 6px;
  text-align: center;

  &:before {
    vertical-align: top;
  }
}

.vote-yes, .vote-pass { background: #EFE; }
.vote-no, .vote-fail { background: #FEE; }

@media screen and (max-width: 640px) {
  .legislator-info {
    ul.committees {
      font-size: 15px;
    }
  }

  ul.resources li {
    flex: 1 0 45%;
  }
}

@media screen and (min-width: 641px) and (max-width: 1220px) {
  ul.resources li {
    flex-basis: 30%;
  }
}
</style>
