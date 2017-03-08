<!--
Congress: https://propublica.github.io/congress-api-docs/#get-state-party-counts
State Legislatures: http://docs.openstates.org/en/latest/api/legislators.html#legislator-geo (count number of party occurrences)

US: https://congress.api.sunlightfoundation.com/legislators?per_page=all&fields=state,party,chamber
US (lower only): https://congress.api.sunlightfoundation.com/legislators?chamber=house&per_page=all&fields=state,party
State: https://openstates.org/api/v1/legislators/?state=pa&fields=party,chamber
State (upper only): https://openstates.org/api/v1/legislators/?state=pa&chamber=upper&fields=party

Possible page layout:

[Rep], [Dem], [Ind] == use PartyAffiliationMarker
[Vac] == vacant
(majority) = background color for majority party

-->

<template>
  <div class="leg-composition">
    <h2>Legislative Composition</h2>
    <div>
      <div class="federal" v-if="composition.federal">
        <h3>US Congress</h3>
        <table>
          <thead>
            <tr>
              <th>President</th>
              <th>Senate</th>
              <th>House</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <party-affiliation-marker :party="composition.federal.head"></party-affiliation-marker>
              </td>
              <td>
                <div>
                  <span v-for="(value, key) in composition.federal.senate.parties">
                    <party-affiliation-marker :party="key"></party-affiliation-marker> {{ value }}<br>
                  </span>
                </div>
              </td>
              <td>
                <div>
                  <span v-for="(value, key) in composition.federal.house.parties">
                    <party-affiliation-marker :party="key"></party-affiliation-marker> {{ value }}<br>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="state" v-if="composition.state">
        <h3>{{ composition.state.name }}</h3>
        <table>
          <thead>
            <tr>
              <th>Governor</th>
              <th>{{ composition.state.upper.name }}</th><!-- State Upper -->
              <th v-if="composition.state.lower.count > 0">{{ composition.state.lower.name }}</th><!-- State Lower -->
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <party-affiliation-marker :party="composition.state.head"></party-affiliation-marker>
              </td>
              <td>
                <div>
                  <span v-for="(value, key) in composition.state.upper.parties">
                    <party-affiliation-marker :party="key"></party-affiliation-marker> {{ value }}<br>
                  </span>
                </div>
              </td>
              <td v-if="composition.state.lower.count > 0">
                <div>
                  <span v-for="(value, key) in composition.state.lower.parties">
                    <party-affiliation-marker :party="key"></party-affiliation-marker> {{ value }}<br>
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import PartyAffiliationMarker from '../components/PartyAffiliationMarker'

export default {
  name: 'legislative-composition',
  components: { PartyAffiliationMarker },
  data () {
    return {
      composition: {},
      error: null
    }
  },
  // beforeRouteEnter (to, from, next) {
  // },
  // watch: {
  //   $route () {
  //     this.pageData = null
  //     api.get
  //   }
  // }
  // components: { ClipLoader },
  //
  //
  /* handle data load
   *    if store.apiData.composition exists, use store data
   *    else fetchComposition API data
   */
  mounted () {
    this.composition = this.$store.getters.getLegislativeComposition
  }
}
</script>

<style lang="scss">
.leg-composition {
  h3 {
    margin-top: 15px;
    margin-bottom: 5px;
  }

  table {
    margin: 0 auto;

    th {
      padding: 0 20px;
      font-weight: 600;
    }

    td {
      padding: 10px 20px;
    }

    div {
      text-align: left;
    }

    i {
      vertical-align: middle;
      font-size: 32px;
    }
  }
}
</style>