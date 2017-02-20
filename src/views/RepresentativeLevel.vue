<template>
  <div class="rep-list" v-bind:class="'rep-list-'+level">
    <representative v-for="rep in repsData" :rep="rep"></representative>
  </div>
</template>

<script>
// TO-DO: if "United States Senate" or contains "United States House of Representatives", pull up list of congressional bills
// if "PA State Senate" or "PA State House"
// look into other state legislative API endpoints
import Representative from '../components/Representative'

export default {
  name: 'representative-level',
  components: {
    Representative
  },
  computed: {
    level () {
      return this.$store.state.route.params.level
    },
    repsData () {
      // console.log('repsData level:', this.level)
      return this.$store.getters.getRepresentativesByLevel()
    }
  }
}
</script>

<style>
  .rep-list {
    margin: 25px 0;
  }
</style>