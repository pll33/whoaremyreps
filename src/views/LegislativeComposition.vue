<template>
  <div class="leg-composition">
    <h2>Legislative Composition</h2>
    <div v-if="composition">
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
                <div v-for="(value, key) in composition.federal.senate.parties">
                  <party-affiliation-marker :party="key"></party-affiliation-marker><span>{{ value }}</span>
                </div>
              </td>
              <td>
                <div v-for="(value, key) in composition.federal.house.parties">
                  <party-affiliation-marker :party="key"></party-affiliation-marker><span>{{ value }}</span>
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
                <div v-for="(value, key) in composition.state.upper.parties">
                  <party-affiliation-marker :party="key"></party-affiliation-marker><span>{{ value }}</span>
                </div>
              </td>
              <td v-if="composition.state.lower.count > 0">
                <div v-for="(value, key) in composition.state.lower.parties">
                  <party-affiliation-marker :party="key"></party-affiliation-marker><span>{{ value }}</span>
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
  mounted () {
    this.composition = this.$store.getters.getLegislativeComposition
  }
}
</script>

<style lang="scss">
.leg-composition {
  text-align: center;

  h3 {
    margin-top: 15px;
    margin-bottom: 5px;
  }

  table {
    margin: 0 auto;

    th {
      padding: 0 20px;
      font-weight: 500;
    }

    td {
      padding: 10px 20px;
    }

    div {
      text-align: left;
    }

    i {
      font-size: 24px;
      margin-right: 4px;
    }

    i:before {
      vertical-align: middle;
    }
  }
}
</style>
