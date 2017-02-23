<template>
  <i class="fa fa-square" v-bind:class="iconClass" v-bind:title="party"><span v-if="display_bool">{{ party }}</span></i>
</template>

<script>
// TO-DO: css-only rectangle (with padding for display_bool)

// TO-DO create a toggle based on display_bool to display marker with party name inside (no icon), or marker w/o title (icon)
export default {
  props: ['party', 'display_bool'],
  computed: {
    iconClass: function () {
      switch (this.party) {
        case 'Democratic':
        case 'Democrat':
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
.party-libertarian { color: #ffd700; /* color: gold; */ }
.party-green { color: #98db34; /* green */ }
.party-socialist { color: #972e1a; /* dark red */ }
.party-vpp { color: #ffa7b6; /* pink */ } /* Vermont Progressive Party */
.party-independent { color: #ECF0F1; }
.party-unknown { color: #2c3e50; }
.party-vacant { color: #EEE; }
</style>