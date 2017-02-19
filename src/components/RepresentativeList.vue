<template>
  <div class="rep-list" v-bind:class="'rep-list-'+level">
    <representative v-for="rep in repsData" :rep="rep"></representative>
  </div>
</template>

<script>
import Representative from './Representative'
export default {
  components: {
    Representative
  },
  props: ['level', 'repsData']
}
</script>

<style type="text/css">

</style>