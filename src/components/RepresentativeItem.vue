<template>
  <router-link tag="div" v-bind:to="rep.slug" class="representative" append>
    <party-affiliation-marker :party="rep.party"></party-affiliation-marker>
    <span class="rep-name">{{ rep.name }}</span>
    <span class="rep-position">{{ rep.position }}</span>
    <span class="rep-info" v-if="rep.extraInfo"><i class="fa fa-info-circle"></i></span>
  </router-link>
</template>

<script>
// TO-DO: extra info icon for Presidents and Legislators, float:right for icon
import PartyAffiliationMarker from './PartyAffiliationMarker'

export default {
  name: 'representative-item',
  components: {
    PartyAffiliationMarker
  },
  props: ['rep']
}
</script>

<style lang="scss">
$border-color: #CCC;

.rep-list .representative:last-child {
  border-bottom: 0;
}
.representative {
  padding: 4px 8px;
  border-bottom: 1px solid $border-color;
  cursor: pointer;
  text-align: left;
}
.representative:hover {
  background-color: #EEE;
}
.representative i.fa-square {
  margin-right: 2px;
}
.rep-name {
  font-size: 18px;
  font-weight: bold;
}
.rep-position {
  font-size: 16px;
  font-style: italic;
}
.rep-info {
  float: right;

  .fa {
    vertical-align: middle;
    color: #444;
  }
}
</style>