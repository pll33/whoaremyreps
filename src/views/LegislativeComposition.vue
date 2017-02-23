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

TABLE

      |   US Senate   |   US House    |   State Senate    |   State House     |
===============================================================================
      |               |               |                   |
YOUR  |   [Dem] 1     |   [Rep] 13    |     [Rep] 34      |     [Rep] 121
STATE |   [Rep] 1     |   [Dem] 5     |     [Dem] 16      |     [Dem] 82
      |               |               |                   |
_______________________________________________________________________________
         (majority)      (majority)        (majority)         (majority)

possibly include president / governor for party affiliation
-->

<template>
  <div>
    <h2>Legislative Composition</h2>

    <div class="federal"> <!-- v-if="composition.federal" -->
      <h3>Federal</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>President</th>
            <th>Senate</th>
            <th>House</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>State</td>
            <td>1
              <span></span>
            </td>
            <td>2
             <!-- <span v-for="party in federal.senate"></span> -->
            </td>
            <td>3
             <!-- <span v-for="party in federal.house"></span> -->
            </td>
          </tr>
          <tr>
            <td>Total</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div class="state"><!-- v-if="composition.state" -->
      <h3>State</h3>
      <table>
        <thead>
          <tr>
            <th>Governor</th>
            <th>State Upper</th><!-- State Upper -->
            <th>State Lower</th><!-- State Lower -->
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2
             <!-- <span v-for="party in state.upper"></span> -->
            </td>
            <td>3
             <!-- <span v-for="party in state.lower"></span> -->
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'

export default {
  name: 'legislative-composition',
  components: { ClipLoader },
  computed: {
    composition () {
      return this.$store.getters.getLegislativeComposition
    }
  }
}
</script>

<style scoped>
  h3 {
    margin-top: 15px;
    margin-bottom: 0;
  }

  table {
    margin: 0 auto;
  }
</style>