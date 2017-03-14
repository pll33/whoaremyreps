<template>
  <div class="container">
    <ul class="rep-list">
      <representative-item v-for="rep in repsData" :rep="rep"></representative-item>
      <loader-default v-if="!repsData"></loader-default>
    </ul>
  </div>
</template>

<script>
import LoaderDefault from '../components/LoaderDefault'
import RepresentativeItem from '../components/RepresentativeItem'

export default {
  name: 'representative-list',
  components: {
    LoaderDefault, RepresentativeItem
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
