<template>
  <div>
    <h2 style="text-transform:capitalize">{{ level }}</h2>
    <representative-list :level="level" :reps-data="repsData"></representative-list>
  </div>
</template>
<script>
import RepresentativeList from '../components/RepresentativeList'
import store from '../store'

/* get reps data from store for $route.params.level */
export default {
  name: 'representative-level',
  components: {
    RepresentativeList
  },
  data: function () {
    return {
      level: this.$route.params.level
    }
  },
  computed: {
    repsData () {
      console.log(store.state)
      return store.state.apiData.levels[this.level]
    }
  }
}
</script>
