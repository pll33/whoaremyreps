<template>
  <div class="app" v-bind:class="{ start: landingPage }">
    <header>
      <div class="header">
        <h1>Who Are My Representatives?</h1>
        <location-input></location-input>
        <clip-loader v-once v-if="allList && landingPage" :loading="loading" :color="loader.color_white" :size="loader.size"></clip-loader>
      </div>
      <ul class="nav navbar" v-if="!landingPage">
        <li v-if="allList"><router-link to="/all">All</router-link></li>
        <li v-if="federalList"><router-link to="/federal">Federal</router-link></li>
        <li v-if="stateList"><router-link to="/state">State</router-link></li>
        <li v-if="localList"><router-link to="/local">Local</router-link></li>
      </ul>
    </header>
    <main class="container">
      <loader-redirect v-if="!landingPage && homePage" :color="loader.color_blue"></loader-redirect>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <footer class="footer">
      <ul class="nav nav-simple">
        <li><router-link to="/about">About</router-link></li>
        <li v-if="!landingPage && allList"><router-link to="/composition">Legislative Composition</router-link></li>
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
        color_blue: '#3C4E6F',
        color_white: '#ECF0F1'
      }
    }
  },
  computed: {
    landingPage () {
      // TO-DO: rewrite to make use of navigation guards
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
$color-light-navy: #3C4E6F;
$color-dark-navy: #2C3E50;
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

    a {
      color: white;
    }
  }
}

header {
  background-color: $color-light-navy;
  color: #FFF;
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
  background-color: lighten($color-light-navy, 8%);
}

ul.navbar li a {
  width: 125px;
  font-size: 24px;
  display: block;
  text-decoration: none;
  color: white;
  padding: 10px 0;
}

ul.navbar li:hover {
  background: lighten($color-light-navy, 12%);
}

ul.navbar .router-link-active {
  background: lighten($color-light-navy, 20%);
}

ul.nav-simple .router-link-active {
  font-weight: bold;
}

main {
  padding: 25px 0;
}
.container {
  max-width: 640px;
  margin: 0 auto;
}

#app {
  color: $color-dark-navy;
}

h1, h2 {
  margin: 0;
}

.header,
.footer {
  padding: 15px 0;
}

.footer a {
  color: black;
}

ul.nav-simple li a {
  font-size: $base-font-size;
  padding: 0 4px;
}

.btn {
  display: block;
  margin: 0;
  padding: 10px 15px;
  outline: none;
  border: 1px solid darken($color-off-white, 20%);
  background: $color-off-white;
  transition: background-color 0.2s ease;
  font-size: 14px;
  margin: 10px auto;

  &:hover {
    background: darken($color-off-white, 10%);
  }

  &:active {
    background: darken($color-off-white, 20%);
  }
}

.fade-enter-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
