<template>
  <div class="legislator-info legislator-state">
    <div v-if="info && !info.error">
      <div class="info-section">
        <div v-if="info.resources">
          <div class="offices">
            <div class="office" v-for="office in info.resources.offices">
              <h4>{{ office.name }}</h4>
              <div class="office-info" v-bind:class="{ inline: !checkForNewline(office.address) }">
                <span class="address" v-bind:class="{ 'ws-pre': checkForNewline(office.address) }">{{ office.address }}</span>
                <span v-if="office.phone"><br><i class="fa fa-phone"></i> <a v-bind:href="'tel:'+office.phone.replace(/ /g,'')">{{ office.phone }}</a> (Office)</span>
                <span v-if="office.fax"><br><i class="fa fa-fax"></i> {{ office.fax }} (Fax)</span>
                <span v-if="office.email"><br><i class="fa fa-envelope"></i> {{ office.email }}</span>
              </div>
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
          <ul class="committees" v-if="info.resources.roles && info.resources.roles.length > 0">
            <li v-for="role in info.resources.roles">{{ role }}</li>
          </ul>
          <p v-else>No committee positions.</p>
        </div>
        <error-message v-else message="There was an issue loading resources and committee positions."></error-message>
      </div>
      <div class="info-section">
        <h3>Sponsored Bills <span class="heading-desc">(last 10 bills)</span></h3>
        <table class="td-left-3 td-sm-hide-4" v-if="info.sponsored && info.sponsored.length > 0">
          <tr>
            <th>Date Updated</th>
            <th>Bill #</th>
            <th>Description</th>
            <th>Date Created</th>
          </tr>
          <tr v-for="bill in info.sponsored">
            <td>{{ bill.updated_at }}</td>
            <td>
              <span v-if="bill.url"><a :href="bill.url" target="_blank" >{{ bill.bill_id }}</a></span>
              <span v-else>{{ bill.bill_id }}</span>
            </td>
            <td>{{ bill.title }}</td>
            <td>{{ bill.created_at }}</td>
          </tr>
        </table>
        <p v-else-if="info.sponsored && info.sponsored.length === 0">No recently sponsored bills.</p>
        <error-message v-else message="There was an issue loading sponsored bills."></error-message>
      </div>
    </div>

    <div class="info-error" v-else-if="info && info.error">
      <error-message :message="'Encountered an issue while loading additional information: ' + info.error"></error-message>
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
  name: 'legislator-info-state',
  props: ['slug', 'role', 'name', 'party'],
  components: { ErrorMessage, LoaderDefault },
  data () {
    return {
      info: null
    }
  },
  mounted () {
    let rep = this.$store.state.apiData.representatives[this.$store.state.route.params.rep]
    if (rep && rep.info && rep.info.resources) {
      this.info = rep.info
    } else {
      this.$store.dispatch('getLegislatorInfoState', {
        slug: this.slug,
        role: this.role,
        name: this.name,
        party: this.party
      })
      .then(() => {
        this.info = this.$store.getters.getRepresentativeInfo
      })
    }
  },
  methods: {
    checkForNewline (address) {
      return (address.indexOf('\n') >= 0 || address.indexOf('\r') >= 0)
    }
  }
}
</script>
<style lang="scss">
.legislator-state {
  .office {
    display: inline-block;
    vertical-align: top;

    h4 {
      font-weight: 600;
      margin: 1.33em 0 0.33em;
    }

    i.fa {
      width: 20px;
      text-align: center;
    }
  }
}

@media screen and (max-width: 640px) {
  .legislator-state {
    .offices {
      text-align: center;
    }

    .office {
      padding: 0 20px;
    }

    .office-info {
      text-align: left;
      font-size: 15px;
    }

    .office-info.inline {
      display: inline;
    }

    ul.resources li {
      text-align: center;
    }
  }
}

@media screen and (min-width: 641px) {
  .legislator-state .office {
    padding: 10px;
  }
}
</style>
