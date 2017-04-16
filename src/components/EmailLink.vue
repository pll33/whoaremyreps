<template>
  <a class="hidemail" href="#" :data-alias="alias" v-on:click="showEmail"></a>
</template>
<script>
export default {
  name: 'email-link',
  props: ['alias'],
  methods: {
    showEmail () {
      window.location.href = 'mailto:' + this.alias + '@whoaremyreps.com'
    }
  }
}
</script>
<style>
.hidemail:after {
  content: attr(data-alias) "@whoaremyreps.com";
}
</style>
