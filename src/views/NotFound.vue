<template>
  <div class="page">
    <h2>404 Not Found</h2>
    <loader-redirect :timeout="5000" color="#3C4E6F"></loader-redirect>
    <span>Redirecting in 5 seconds...</span>
  </div>
</template>

<script>
import LoaderRedirect from '../components/LoaderRedirect'

export default {
  name: 'not-found',
  components: { LoaderRedirect },
  beforeRouteLeave (to, from, next) {
    console.log(to, from)
    next()
  }
}
</script>
