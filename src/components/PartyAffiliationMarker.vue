<template>
  <i class="fa fa-square" v-bind:class="iconClass" v-bind:title="party"><span v-if="display_bool">{{ party }}</span></i>
</template>

<script>
// TO-DO: css-only rectangle (with padding for display_bool)

// TO-DO create a toggle based on display_bool to display marker with party name inside (no icon), or marker w/o title (icon)
export default {
  props: ['party', 'display_bool'],
  computed: {
    iconClass () {
      if (!this.party) return 'party-unknown'

      let party = this.party.toLowerCase()
      switch (party) {
        case 'democratic':
        case 'democrat':
        case 'd':
          return 'party-democratic'
        case 'republican':
        case 'r':
          return 'party-republican'
        case 'libertarian':
          return 'party-libertarian'
        case 'green':
          return 'party-green'
        case 'socialist':
          return 'party-socialist'
        case 'progressive/democratic':
          return 'party-vpp'
        case 'independent':
          return 'party-independent'
        case 'unknown':
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
.party-independent { color: darken(#ECF0F1,10%); }
.party-unknown { color: #2c3e50; }
.party-vacant { color: #EEE; }
</style>
