<template>
  <div class="app">
    <header>
      <div class="header">
        <h1>Who Are My Representatives?</h1>
        <!-- <location-input></location-input> -->
        <div class="locate-inputs">
          <span class="search-icon"><i class="fa" v-bind:class="iconType"></i></span>
          <input class="search-input" v-bind:class="{ error: locationInput.locateError }" v-on:keyup.enter="submit" type="text" v-bind:placeholder="locationInput.placeholder" v-model="locationInput.value" />
          <button v-on:click="locate"><i class="fa fa-map-marker"></i></button>
        </div>
      </div>
      <ul class="nav">
        <li><router-link to="/reps/all">All</router-link></li>
        <li v-if="federalList"><router-link to="/reps/federal">Federal</router-link></li>
        <li v-if="stateList"><router-link to="/reps/state">State</router-link></li>
        <li v-if="localList"><router-link to="/reps/local">Local</router-link></li>
      </ul>
    </header>
    <main>
      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view class="view"></router-view>
        </transition>
      </div>
      <div class="container">
        <h3>Federal</h3>
        <div class="rep-list rep-list-federal" v-if="apiData.civic.federal" style="text-align: left;">
          <router-link to="/reps/federal/rep" tag="div" class="representative" v-for="rep in apiData.civic.federal">
            <i class="fa fa-square" v-bind:class="'party-'+(rep.party).toLowerCase()" v-bind:title="rep.party"></i>
            <span class="name" style="font-size: 18px; font-weight: bold"> {{ rep.name }}</span>
            <span class="position" style="font-size:16px; font-style: italic">{{ rep.position }}<br></span>
          </router-link>
        </div>

        <h3>State</h3>
        <div class="rep-list rep-list-state" v-if="apiData.civic.state" style="text-align: left;">
          <div class="representative" v-for="rep in apiData.civic.state">
            <i class="fa fa-square" v-bind:class="'party-'+(rep.party).toLowerCase()" v-bind:title="rep.party"></i>
            <span class="name" style="font-size: 18px; font-weight: bold"> {{ rep.name }}</span>
            <span class="position" style="font-size:16px; font-style: italic">{{ rep.position }}<br></span>
          </div>
        </div>

        <h3>Local</h3>
        <div class="rep-list rep-list-local" v-if="apiData.civic.local" style="text-align:left">
          <div class="representative" v-for="rep in apiData.civic.local">
            <i class="fa fa-square" v-bind:class="'party-'+(rep.party).toLowerCase()" v-bind:title="rep.party"></i>
            <span class="name" style="font-size: 18px; font-weight: bold"> {{ rep.name }}</span>
            <span class="position" style="font-size:16px; font-style: italic">{{ rep.position }}<br></span>
          </div>
        </div>
      </div>
    </main>
    <!--<div>
      <img src="./assets/logo.png">
      <hello></hello>
    </div>-->
    <footer>
        <a href="#">Privacy Policy</a>
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
  mounted: function () {
    this._retrieveLocalStorage()
  },
  methods: {
    _retrieveLocalStorage: function () {
      // get saved address from local storage (prevents extra api call)
      if (typeof window.localStorage !== 'undefined') {
        var storedData = JSON.parse(window.localStorage.getItem('__whoaremyreps__userData'))
        if (storedData && storedData.userAddress) {
          this.locationInput.value = storedData.userAddress
          this.locationInput.searchType = 'locate'

          // load civic data with stored address
          // this.civicLookup(storedData.userAddress)
          store.dispatch('fetchRepresentatives', { address: storedData.userAddress })
        }
      }
    },
    _saveToLocalStorage: function (item) {
      if (typeof window.localStorage !== 'undefined') {
        var timestamp = new Date().getTime()
        var dataObj = { userAddress: item, timestamp }
        window.localStorage.setItem('__whoaremyreps__userData', JSON.stringify(dataObj))
      }
    },
    _locateError: function (err) {
      if (err) {
        this.locationInput.locateError = true
        this.locationInput.placeholder = 'Your address'
      }
    },
    _processCivicData: function (civicApiResponse) {
      var offices = civicApiResponse.body.offices
      var officials = civicApiResponse.body.officials
      var federal = []
      var state = []
      var local = []
      var all = []
      var repPaths = {}

      var createSlug = function (name) { /* url slug for representative */
        return name.toLowerCase().replace(/\./g, '').replace(/[^a-z0-9+]+/gi, '-')
      }

      var levelOfficials = function (level, title, idxs) {
        if (idxs) {
          for (let i of idxs) {
            let path = createSlug(officials[i].name)

            officials[i].position = title
            repPaths[path] = officials[i]
            level.push(officials[i])
            all.push(officials[i])
          }
        }
      }

      for (let office of offices) {
        let olv = office.levels
        let ooi = office.officialIndices
        let title = office.name
        console.log(office)
        if (olv) {
          if (olv.indexOf('country') >= 0) levelOfficials(federal, title, ooi)
          else if (olv.indexOf('administrativeArea1') >= 0) levelOfficials(state, title, ooi)
          else if (olv.indexOf('locality') >= 0) levelOfficials(local, title, ooi)
          else levelOfficials(local, title, ooi)
        } else {
          if (office.divisionId.search(/county|district|place/g) === -1) levelOfficials(state, title, ooi)
          else if (office.divisionId.search(/ward|place/g) >= 0) levelOfficials(local, title, ooi)
          else levelOfficials(local, title, ooi)
        }
      }
      // var federal = offices.filter(function (o) { if (o.levels) { return o.levels.indexOf('country') >= 0 } })
      // var state = offices.filter(function (o) { if (o.levels) { return o.levels.indexOf('administrativeArea1') >= 0 } else { return !o.levels && o.divisionId.search(/county|district|place/g) === -1 } })
      // var county = offices.filter(function (o) { return !o.levels && o.divisionId.search(/county/g) >= 0 })
      // var local = offices.filter(function (o) { if (o.levels) { return o.levels.indexOf('locality') >= 0 } })

      console.log('fed: ', federal.map(function (a) { console.log(a.name); return a }))
      console.log('state: ', state.map(function (a) { console.log(a.name); return a }))
      console.log('local: ', local.map(function (a) { console.log(a.name); return a }))
      console.dir(repPaths)
      this.apiData.civic = { federal, state, local, all }
      // store.commit('SET_REP_LEVELS', { federal, state, local })
    },
    _locateSuccess: function (pos) {
      if (this.locationInput.locateError) this.locationInput.locateError = false
      var locationInput = this.locationInput
      this.locationData.position = (pos) ? pos.coords : null
      this.locationInput.searchType = 'locate'

      // send user position request to server, server calls google geocoding api and responds w/ address
      // https://maps.googleapis.com/maps/api/geocode/json?latlng= &key=
      var latlng = pos.coords.latitude + ',' + pos.coords.longitude
      var apiCallUrl = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=' + this.apiKey

      this.$http.get(apiCallUrl).then(function (response) {
        // success
        console.log('success:', response)
        if (response && response.ok) {
          let results = response.body.results[0]
          if (results['formatted_address']) {
            var userAddress = results['formatted_address']
            locationInput.value = userAddress
            this._saveToLocalStorage(userAddress)
            // this.civicLookup(userAddress)
            console.log('address: ', results['formatted_address'])
          }
        } else {
          locationInput.value = pos.coords.latitude + ', ' + pos.coords.longitude
        }
      }, function (response) {
        // error
        console.log('error:', response)
      })
    },
    civicLookup: function (addr) {
      var encodedAddr = encodeURIComponent(addr).replace(/%20/g, '+')
      var apiCallUrl = 'https://www.googleapis.com/civicinfo/v2/representatives?address=' + encodedAddr + '&key=' + this.apiKey

      this.$http.get(apiCallUrl).then(function (response) {
        // success
        console.log('success:', response)
        if (response && response.ok) {
          // console.log('civic info: ', response)
          this._processCivicData(response)
        } else {

        }
      }, function (response) {
        // error
        console.log('error:', response)
      })
    },
    submit: function () {
      this.locationInput.searchType = 'search'
      this.civicLookup(this.locationInput.value)
    },
    locate: function () {
      navigator.geolocation.getCurrentPosition(this._locateSuccess, this._locateError)
      this.locationInput.placeholder = 'Loading address...'
    }
  },
  data: function () {
    return {
      locationInput: {
        placeholder: 'Your address',
        locateError: false,
        searchType: 'search',
        value: ''
      },
      apiKey: 'AIzaSyB-b-2YLj8k2M9sYXIamR6_ut5LdfwRgs4',
      apiData: {
        dmaps: {
          usCongress: {},
          stCongress: {},
          stSenate: {}
        },
        gmaps: {},
        civic: {
          federal: [],
          state: [],
          district: [],
          county: [],
          local: [],
          other: [],
          all: []
        }
      },
      locationData: {
        position: {}
      }
    }
  },
  computed: {
    iconType: function () {
      return {
        'fa-search': this.locationInput.searchType === 'search',
        'fa-location-arrow': this.locationInput.searchType === 'locate'
      }
    },
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
  border-bottom: 1px solid black;
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

/*
 * LocationInput -- TO-DO: remove
 */
.locate-inputs {
  /*margin: 10px 0;*/

  input,
  button {
    font-size: 1em;
    border-radius: 15px;
    transition: border-color 0.2s ease;
  }

  input:focus,
  button:focus {
    border-color: #AAA;
  }
}

.locate-inputs input {
  height: 30px;
  line-height: 30px;
  box-sizing: border-box;
  padding: 0 15px 0 30px;
  border: 1px solid #e3e3e3;
  outline: none;
  margin-right: 5px;

  &.error {
    border: 1px solid #ff7b7b;
  }
}

.search-icon i.fa {
  z-index: 2;
  position: relative;

  &.fa-search {
    margin-right: -30px;
  }

  &.fa-location-arrow {
    margin-right: -28px;
  }
}

.locate-inputs button {
  height: 30px;
  width: 30px;
  border-color: #e3e3e3;
  border-style: solid;
  border-width: 1px;
  transition: border-color 0.2s ease;
  background: #e3e3e3;

  &:focus {
    outline: none;
  }

  &:active {
    background: #CCC;
  }
}

/*
 * Representative -- TO-DO: remove
 */
.rep-list .representative {
  padding: 4px 8px;
  border: 1px solid black;
  border-top: 0;
  cursor: pointer;
}
.rep-list .representative:first-child {
  border-top: 1px solid black;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.rep-list .representative:last-child {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}
.representative:hover { background-color: #DDD; }

/*
 * PartyAffiliationMaker -- TO-DO: remove
 */
.representative i.fa-square { margin-right: 2px; }
.party-republican { color: #E74C3C; }
.party-democratic { color: #3498DB; }
.party-unknown { color: #2c3e50; }
.party-independent { color: #ECF0F1; }

</style>
