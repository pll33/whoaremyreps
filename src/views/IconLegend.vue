<template>
  <div>
    <h3>Icon Legend <span class="heading-desc">(parties with elected officials)</span></h3>
    <ul class="legend">
      <li><party-affiliation-marker party="Democratic"></party-affiliation-marker>Democratic</li>
      <li><party-affiliation-marker party="Republican"></party-affiliation-marker>Republican</li>
      <li><party-affiliation-marker party="Independent"></party-affiliation-marker>Independent</li>
      <li><party-affiliation-marker party="Libertarian"></party-affiliation-marker>Libertarian</li>
      <li><party-affiliation-marker party="Green"></party-affiliation-marker>Green</li>
      <li><party-affiliation-marker party="Progressive"></party-affiliation-marker>Progressive</li>
      <li><party-affiliation-marker party="Socialist"></party-affiliation-marker>Socialist</li>
      <li><party-affiliation-marker party="Unknown"></party-affiliation-marker>Unknown/Nonpartisan</li>
    </ul>
  </div>
</template>
<script>
import PartyAffiliationMarker from '../components/PartyAffiliationMarker'

export default {
  name: 'icon-legend',
  components: { PartyAffiliationMarker }
}
</script>
<style>
ul.legend {
  margin: 0;
  padding: 0;
}

ul.legend li {
  list-style-type: none;
}

ul.legend li i {
  width: 20px;
}
</style>
