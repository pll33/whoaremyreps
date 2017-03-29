<template>
  <div class="app" v-bind:class="{ start: landingPage }">
    <header>
      <div class="header">
        <h1>Who Are My Representatives?</h1>
        <location-input></location-input>
        <clip-loader v-once v-if="allList && landingPage" :color="loader.color_white"></clip-loader>
      </div>
      <ul class="nav navbar" v-if="!landingPage">
        <li v-if="allList"><router-link to="/all">All</router-link></li>
        <li v-if="federalList"><router-link to="/federal">Federal</router-link></li>
        <li v-if="stateList"><router-link to="/state">State</router-link></li>
        <li v-if="localList"><router-link to="/local">Local</router-link></li>
      </ul>
    </header>
    <main class="content" v-if="!landingPage">
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
        color_blue: '#455A80',
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
$foot-font-size: 15px;
$base-font-weight: 300;
$bold-font-weight: 600;

$color-light-navy: #455A80;

html, body {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: $base-font-size;
  font-weight: $base-font-weight;
  margin: 0;
}

.app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  padding: 25px 0;
}

.footer {
  padding: 15px 0;
}

.start {
  header {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
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
  text-align: center;

  .header { padding: 15px 0; }
  h1 { font-weight: 600; }
}

ul.nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-size: 0;
}

ul.navbar {
  display: flex;
  justify-content: center;
  background-color: lighten($color-light-navy, 8%);
}

ul.navbar li a {
  display: block;
  text-decoration: none;
  color: white;

  @media screen and (max-width: 680px) {
    font-size: 20px;
    padding: 10px 25px;
  }

  @media screen and (min-width: 681px) {
    width: 125px;
    font-size: 24px;
    padding: 8px 0;
  }
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

.container {
  max-width: 680px;
  margin: 0 auto;
}

h1, h2 {
  margin: 0;
}

.footer a {
  color: black;
}

ul.nav-simple {
  text-align: center;
  padding: 0 10px;
}

ul.nav-simple li {
  display: inline-block;
}

ul.nav-simple li a {
  font-size: $foot-font-size;
  padding: 0 5px;
}

.fade-enter-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}

.text-bold { font-weight: bold; }
.text-italic { font-style: italic; }
.text-center { text-align: center; }
.ws-pre { white-space: pre; }
.fw-500 { font-weight: 500; }
.fw-600 { font-weight: 600; }
.heading-desc {
  font-size: 14px;
  font-weight: normal;
  font-style: italic;
}

@media screen and (max-width: 680px) {
  .start {
    header h1 {
      font-size: 2.75em;
    }
  }

  header {
    h1 {
      font-size: 1.6em;
    }
  }

  .container {
    max-width: 90%;
  }
}

@media print {
  header, ul.navbar {
    background: none;
    color: #000;
  }

  ul.navbar li a {
    background: none;
    color: #000;
    width: 125px;
    font-size: 24px;
    padding: 10px 0;
  }

  ul.navbar .router-link-active {
    font-weight: bold;
    background: none;
  }

  .content {
    padding: 0;
  }

  .locate-inputs input {
    outline: none;
    border: 0;
    border-radius: 0;
    width: 60vw;
    text-align: center;
  }

  .locate-inputs button,
  .locate-inputs .search-icon,
  footer {
    display: none;
  }
}
</style>
