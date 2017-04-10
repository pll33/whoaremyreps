<template>
  <p><i class="fa fa-exclamation-triangle"></i><span class="text-italic">{{ message }}</span></p>
</template>

<script>
export default {
  name: 'error-message',
  props: ['message']
}
</script>

<style>
  .fa-exclamation-triangle {
    color: #E74C3C;
    margin-right: 4px;
  }
</style>