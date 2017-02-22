<template>
  <div class="app" v-bind:class="{ start: landingPage }">
    <header>
      <div class="header">
        <h1>Who Are My Representatives?</h1>
        <location-input></location-input>
        <clip-loader v-once v-if="allList && landingPage" :loading="loading" :color="loader.color" :size="loader.size"></clip-loader>
      </div>
      <ul class="nav navbar" v-if="!landingPage">
        <li v-if="allList"><router-link to="/all">All</router-link></li>
        <li v-if="federalList"><router-link to="/federal">Federal</router-link></li>
        <li v-if="stateList"><router-link to="/state">State</router-link></li>
        <li v-if="localList"><router-link to="/local">Local</router-link></li>
      </ul>
    </header>
    <main class="container">
      <loader-redirect v-if="!landingPage && homePage" :color="loader.color"></loader-redirect>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <footer class="footer">
      <ul class="nav nav-simple">
        <li><router-link to="/about">About</router-link></li>
        <li v-if="allList"><router-link to="/composition">Legislative Composition</router-link></li>
        <li><router-link to="/privacy">Privacy Policy</router-link></li>
      </ul>
    </footer>
  </div>
</template>

<script>
import store from './store'
import ClipLoader from 'vue-spinner/src/ClipLoader.vue'
import LocationInput from './components/LocationInput'
import LoaderRedirect from './components/LoaderRedirect'

export default {
  name: 'app',
  components: {
    ClipLoader, LocationInput, LoaderRedirect
  },
  data: function () {
    return {
      landing: {
        landOnce: false
      },
      loader: {
        color: '#2C3E50'
      }
    }
  },
  computed: {
    landingPage () {
      if (!this.landing.landOnce) {
        let reps = this.allList
        let home = store.state.route.path === '/'
        if (!reps) {
          if (this.infoPage) return false
          return true
        } else if (reps && home) {
          this.landing.landOnce = true
          setTimeout(() => {
            if (store.state.route.path === '/') this.$router.push('/all')
          }, 2500)
          return true
        } else {
          let originalPath = store.state.route.path
          this.landing.landOnce = true
          this.$router.replace('/')
          setTimeout(() => {
            if (store.state.route.path === '/') this.$router.replace(originalPath)
          }, 2500)
          return true
        }
      } else return false
    },
    homePage () {
      return store.state.route.path === '/'
    },
    infoPage () {
      let path = store.state.route.path
      return path === '/about' || path === '/privacy' || path === '/resources'
    },
    allList () {
      return store.state.apiData.levels.all.length > 0
    },
    federalList () {
      return store.state.apiData.levels.federal.length > 0
    },
    stateList () {
      return store.state.apiData.levels.state.length > 0
    },
    localList () {
      return store.state.apiData.levels.local.length > 0
    }
  }
}
</script>

<style lang="scss">
$base-font-size: 16px;
$color-navy-blue: #2C3E50;
$color-dark-blue: #2980B9;
$color-blue: #3498DB;
$color-red: #E74C3C;
$color-off-white: #ECF0F1;

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: $base-font-size;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  /*background-color: #ECF0F1;*/
}

.start {
  header {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

  }

  h1 { 
    margin: 25px 0;
    font-size: 3em;
  }

  main.container {
    display: none;
  }

  .v-spinner {
    margin-top: 25px;
  }

  .footer {
    width: 100%;
    position: absolute;
    bottom: 1vh;
  }
}

header {
  background-color: $color-off-white;
  /*color: #FFF;*/
}

ul.nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  font-size: 0;
}

ul.navbar {
  background-color: darken($color-off-white, 5%);
}

ul.navbar li a {
  font-size: 24px;
  display: block;
  color: black;
  text-decoration: none;
  padding: 10px 0;
  width: 120px;
}

ul.navbar li:hover {
  background: darken($color-off-white, 10%);
}

ul.navbar .router-link-active {
  background: darken($color-off-white, 20%);
}

main {
  padding: 25px 0;
}
.container {
  max-width: 640px;
  margin: 0 auto;
}

#app {
  color: $color-navy-blue;
}

h1 {
  margin: 0;
}
h2 {
  margin: 0;
}

.header,
.footer {
  padding: 10px 0;
}

ul.nav-simple li a {
  font-size: $base-font-size;
  padding: 0 4px;
}

.fade-enter-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
