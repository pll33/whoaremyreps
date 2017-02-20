<template>
  <div class="app">
    <header>
      <div class="header">
        <h1>Who Are My Representatives?</h1>
        <location-input></location-input>
      </div>
      <ul class="nav">
        <li><router-link to="/all">All</router-link></li>
        <li v-if="federalList"><router-link to="/federal">Federal</router-link></li>
        <li v-if="stateList"><router-link to="/state">State</router-link></li>
        <li v-if="localList"><router-link to="/local">Local</router-link></li>
      </ul>
    </header>
    <main>
      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </main>
    <footer>
        <router-link to="/about">About</router-link> |
        <router-link to="/privacy">Privacy Policy</router-link>
    </footer>
  </div>
</template>

<script>
import store from './store'
import LocationInput from './components/LocationInput'

export default {
  name: 'app',
  components: {
    LocationInput
  },
  computed: {
    federalList: function () {
      return store.state.apiData.levels.federal.length > 0
    },
    stateList: function () {
      return store.state.apiData.levels.state.length > 0
    },
    localList: function () {
      return store.state.apiData.levels.local.length > 0
    }
  }
}
</script>

<style lang="scss">
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
  /*background-color: #ECF0F1;*/
}

header {
  background-color: #ECF0F1;
  /*color: #FFF;*/
}

.nav {
  background-color: darken(#ECF0F1, 5%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
}

#app {
  color: #2c3e50;
}

h1 {
  margin: 0;
}

.header {
  padding: 10px 0;
}

ul.nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  /*border-bottom: 1px solid black;*/
  font-size: 0;
}

ul.nav li a {
  font-size: 24px;
  display: block;
  color: black;
  text-decoration: none;
  padding: 10px 0;
  width: 120px;
}

ul.nav li:hover {
  background: darken(#ECF0F1, 10%);
}

ul.nav .router-link-active {
  background: darken(#ECF0F1, 20%);
}

.fade-enter-active {
  transition: all .2s ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0;
}
</style>
