<template>
  <div class="container">
    <ul class="rep-list">
      <representative-item v-for="slug in levelList" :rep="getItem(slug)"></representative-item>
      <loader-default v-if="!levelList"></loader-default>
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
  methods: {
    getItem (slug) {
      let reps = this.$store.getters.getRepresentatives
      let { name, party, position, hasInfo } = reps[slug]
      return { slug, name, party, position, hasInfo }
    }
  },
  computed: {
    levelList () {
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
