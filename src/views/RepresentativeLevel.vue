<template>
  <div>
    <div class="rep-list" v-bind:class="'rep-list-'+level">
      <representative v-for="rep in repsData" :rep="rep"></representative>
    </div>
  </div>
</template>

<script>
import store from '../store'
import Representative from '../components/Representative'

export default {
  name: 'representative-level',
  components: {
    Representative
  },
  computed: {
    level () {
      return this.$route.params.level
    },
    repsData () {
      return store.state.apiData.levels[this.level]
    }
  }
}
</script>
