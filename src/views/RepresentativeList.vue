<template>
  <ul class="rep-list">
    <representative-item v-for="rep in repsData" :rep="rep"></representative-item>
    <clip-loader v-if="!repsData" :loading="loading" :color="loader.color" :size="loader.size"></clip-loader>
  </ul>
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
    // TO-DO: return to /all if nothing loads
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
ul.rep-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
