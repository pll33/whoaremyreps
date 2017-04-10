<template>
  <router-link tag="li" v-bind:to="rep.slug" class="rep-item" append>
    <span class="rep-item-party"><party-affiliation-marker :party="rep.party"></party-affiliation-marker></span>
    <span class="rep-item-info">
      <span class="rep-item-name">{{ rep.name }}</span>
      <span class="rep-item-position">{{ rep.position }}</span>
    </span>
    <span class="rep-item-detail-icon" v-if="!!rep.hasInfo" title="Additional information available"><i class="fa fa-info-circle"></i></span>
  </router-link>
</template>

<script>
import PartyAffiliationMarker from './PartyAffiliationMarker'

export default {
  name: 'representative-item',
  components: { PartyAffiliationMarker },
  props: ['rep']
}
</script>

<style lang="scss">
.rep-item {
  display: flex;
  padding: 4px 8px;
  border-bottom: 1px solid #CCC;
  cursor: pointer;
  text-align: left;

  &:last-child {
    border-bottom: 0;
  }

  &:hover {
    background-color: #EEE;
  }
}

.rep-item-party,
.rep-item-detail-icon {
  align-self: center;
}

.rep-item-party i.fa {
  margin-right: 8px;
}

.rep-item-name {
  font-size: 18px;
  font-weight: bold;
}

.rep-item-position {
  font-size: 16px;
  font-style: italic;
}

.rep-item-detail-icon {
  margin-left: auto;

  .fa-info-circle {
    color: #444;
  }
}

@media screen and (max-width: 640px) {
  .rep-item-info {
    display: inline-block;
  }

  .rep-item-info span {
    display: block;
  }

  .rep-item-name {
    font-size: 16px;
  }

  .rep-item-position {
    font-size: 14px;
  }
}

@media print {
  .rep-item-detail-icon {
    display: none;
  }
}

</style>