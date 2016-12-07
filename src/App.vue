<template>
  <div id="app">
    <div class="locate-inputs">
      <span class="search-icon"><i class="fa" v-bind:class="iconType"></i></span>
      <input class="search-input" v-bind:class="{ error: locationInput.locateError }" v-on:keyup.enter="submit" type="text" v-bind:placeholder="locationInput.placeholder" v-model="locationInput.value" />
      <button v-on:click="locate"><i class="fa fa-map-marker"></i></button>
    </div>
    <ul class="nav">
      <li v-if="apiData.civic.federal.length > 0"><a href="#">Federal</a></li>
      <li v-if="apiData.civic.state.length > 0"><a href="#">State</a></li>
      <li v-if="apiData.civic.district.length > 0"><a href="#">District</a></li>
      <li v-if="apiData.civic.county.length > 0"><a href="#">County</a></li>
      <li v-if="apiData.civic.local.length > 0"><a href="#">Local</a></li>
      <li v-if="apiData.civic.other.length > 0"><a href="#">Other</a></li>
    </ul>
    <!--<div>
      <img src="./assets/logo.png">
      <hello></hello>
    </div>-->
  </div>
</template>

<script>
import Hello from './components/Hello'

export default {
  name: 'app',
  components: {
    Hello
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
          this.civicLookup(storedData.userAddress)
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
      var district = []
      var county = []
      var local = []
      var other = []

      var levelOfficials = function (level, idxs) { if (idxs) { for (let i of idxs) { level.push(officials[i]) } } }

      for (let office of offices) {
        let olv = office.levels
        let ooi = office.officialIndices
        if (olv) {
          if (olv.indexOf('country') >= 0) levelOfficials(federal, ooi)
          else if (olv.indexOf('administrativeArea1') >= 0) levelOfficials(state, ooi)
          else if (olv.indexOf('locality') >= 0) levelOfficials(local, ooi)
          else levelOfficials(other, ooi)
        } else {
          if (office.divisionId.search(/county|district|place/g) === -1) levelOfficials(state, ooi)
          else if (office.divisionId.search(/ward|place/g) >= 0) levelOfficials(local, ooi)
          else if (office.divisionId.search(/district/g) >= 0) levelOfficials(district, ooi)
          else levelOfficials(county, ooi)
        }
      }
      // var federal = offices.filter(function (o) { if (o.levels) { return o.levels.indexOf('country') >= 0 } })
      // var state = offices.filter(function (o) { if (o.levels) { return o.levels.indexOf('administrativeArea1') >= 0 } else { return !o.levels && o.divisionId.search(/county|district|place/g) === -1 } })
      // var county = offices.filter(function (o) { return !o.levels && o.divisionId.search(/county/g) >= 0 })
      // var local = offices.filter(function (o) { if (o.levels) { return o.levels.indexOf('locality') >= 0 } })

      console.log('fed: ', federal)
      console.log('state: ', state)
      console.log('county: ', county)
      console.log('local: ', local)
      this.apiData.civic = { federal, state, district, county, local, other }
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
            this.civicLookup(userAddress)
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
      apiKey: '',
      apiData: {
        dmaps: {
          usCongress: {},
          stCongress: {},
          stSenate: {}
        },
        gmaps: {},
        civic: {}
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
}

#app {
  color: #2c3e50;
}

.locate-inputs {
  margin: 10px 0;

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

ul.nav {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

ul.nav li {
  margin: 0 5px;
}

</style>
