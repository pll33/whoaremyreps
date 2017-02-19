<template>
  <i class="fa fa-square" v-bind:class="iconClass" v-bind:title="party"></i>
</template>

<script>
export default {
/* TODO: on hover, display tooltip with party name */
  props: ['party'],
  computed: {
    iconClass: function () {
      switch (this.party) {
        case 'Democratic':
          return 'party-democratic'
        case 'Republican':
          return 'party-republican'
        case 'Libertarian':
          return 'party-libertarian'
        case 'Green':
          return 'party-green'
        case 'Socialist':
          return 'party-socialist'
        case 'Progressive/Democratic':
          return 'party-vpp'
        case 'Independent':
          return 'party-independent'
        case 'Unknown':
        default:
          return 'party-unknown'
      }
    }
  }
}
</script>

<style lang="scss">
.party-democratic { color: #3498DB; }
.party-republican { color: #E74C3C; }
.party-libertarian { /* color: gold; */ }
.party-green { /* green */ }
.party-socialist { /* */ }
.party-vpp { /* pink */ } /* Vermont Progressive Party */
.party-independent { color: #ECF0F1; }
.party-unknown { color: #2c3e50; }
</style>