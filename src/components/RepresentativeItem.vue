<template>
  <router-link tag="li" v-bind:to="rep.slug" class="rep-item" append>
    <party-affiliation-marker :party="rep.party"></party-affiliation-marker>
    <span>
      <span class="rep-name">{{ rep.name }}</span>
      <span class="rep-position">{{ rep.position }}</span>
    </span>
    <span class="rep-info-icon" v-if="rep.extraInfo"><i class="fa fa-info-circle"></i></span>
  </router-link>
</template>

<script>
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

.rep-item {
  padding: 4px 8px;
  border-bottom: 1px solid $border-color;
  cursor: pointer;
  text-align: left;
}
.rep-item:last-child {
  border-bottom: 0;
}
.rep-item:hover {
  background-color: #EEE;
}
.rep-item i.fa-square {
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
.rep-info-icon {
  float: right;

  .fa {
    vertical-align: middle;
    color: #444;
  }
}
</style>