<template>
  <router-link tag="div" v-bind:to="rep.slug" class="representative" append>
    <party-affiliation-marker :party="rep.party"></party-affiliation-marker>
    <span class="rep-name">{{ rep.name }}</span>
    <span class="rep-position">{{ rep.position }}</span>
  </router-link>
</template>

<script>
import PartyAffiliationMarker from './PartyAffiliationMarker'

export default {
  name: 'representative',
  components: {
    PartyAffiliationMarker
  },
  props: ['rep']
}
</script>

<style>
.rep-list .representative:first-child {
  border-top: 1px solid black;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.rep-list .representative:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.representative {
  padding: 4px 8px;
  border: 1px solid black;
  border-top: 0;
  cursor: pointer;
  text-align: left;
}
.representative:hover {
  background-color: #DDD;
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
</style>