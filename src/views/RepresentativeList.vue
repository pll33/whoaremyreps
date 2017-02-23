<template>
  <div class="rep-list" v-bind:class="'rep-list-'+level">
    <representative-item v-for="rep in repsData" :rep="rep"></representative-item>
    <clip-loader v-if="!repsData" :loading="loading" :color="loader.color" :size="loader.size"></clip-loader>
  </div>
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import RepresentativeItem from '../components/RepresentativeItem'

export default {
  name: 'representative-list',
  components: {
    ClipLoader, RepresentativeItem
  },
  mounted: function () {
    // return to /all if nothing loads
  },
  data: function () {
    return {
      loader: {
        color: '#3C4E6F'
      }
    }
  },
  computed: {
    repsData () {
      return this.$store.getters.getRepresentativesByLevel
    }
  }
}
</script>

<style>
</style>