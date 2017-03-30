<template>
  <i class="fa fa-square party-icon" v-bind:class="iconClass" v-bind:title="party"><span class="tooltip">{{ party }}</span></i>
</template>

<script>
export default {
  props: ['party'],
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
        case 'progressive':
        case 'progressive/democratic':
          return 'party-vpp'
        case 'common sense independent':
        case 'independent':
          return 'party-independent'
        case 'nonpartisan':
        case 'unknown':
        default:
          return 'party-unknown'
      }
    }
  }
}
</script>
<style>
.party-democratic { color: #3498DB; }
.party-republican { color: #E74C3C; }
.party-libertarian { color: #FFD700; /* color: gold; */ }
.party-green { color: #8CD125; /* green */ }
.party-socialist { color: #AD351E; /* dark red */ }
.party-vpp { color: #FFA7B6; /* pink */ } /* Vermont Progressive Party */
.party-independent { color: #CFD9DB; }
.party-unknown { color: #2C3E50; }
.party-vacant { color: #EEEEEE; }

.party-icon {
  position: relative;
}

.tooltip {
  position: absolute;
  display: none;
  z-index: 2;
  opacity: 0;
  font-family: 'Avenir';
  color: #000;
  user-select: none;
  cursor: default;
}

.rep-item .tooltip {
  right: 160%;
  padding: 0 8px 0 4px;
  line-height: 34px;
  margin-top: -5px;
  font-style: normal;
}

.rep-page .tooltip {
  right: 175%;
}

@media screen and (min-width: 681px) {
  .rep-item i:hover .tooltip,
  .rep-page i:hover .tooltip {
    opacity: 1;
    display: inline;
  }
}
</style>
