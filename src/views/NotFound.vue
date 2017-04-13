<template>
  <div class="container">
    <h2>404 Page Not Found</h2>
    <span>Redirecting to <router-link to="/all">/all</router-link> in 5 seconds...</span>
    <loader-redirect :timeout="5000" color="#455A80"></loader-redirect>
  </div>
</template>

<script>
import LoaderRedirect from '../components/LoaderRedirect'
export default {
  name: 'not-found',
  components: { LoaderRedirect }
}
</script>
